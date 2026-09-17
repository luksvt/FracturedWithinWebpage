<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=300, stale-while-revalidate=600');

const ARTIST_NAME = 'Fractured Within';
const CACHE_TTL = 900;
const STALE_CACHE_TTL = 86400;

function respond(int $status, $payload)
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function getApiKey(): string
{
    $environmentKey = trim((string) getenv('BANDSINTOWN_APP_ID'));
    if ($environmentKey !== '') {
        return $environmentKey;
    }

    $configFile = __DIR__ . '/config.php';
    if (is_file($configFile)) {
        $config = require $configFile;
        if (is_array($config) && isset($config['bandsintown_app_id'])) {
            return trim((string) $config['bandsintown_app_id']);
        }
    }

    return '';
}

function fetchUrl(string $url): array
{
    if (function_exists('curl_init')) {
        $curl = curl_init($url);
        curl_setopt_array($curl, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_CONNECTTIMEOUT => 5,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_USERAGENT => 'FracturedWithinWebsite/1.0',
            CURLOPT_HTTPHEADER => ['Accept: application/json'],
        ]);

        $body = curl_exec($curl);
        $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
        $error = curl_error($curl);
        curl_close($curl);

        if ($body === false) {
            throw new RuntimeException($error !== '' ? $error : 'Bandsintown request failed.');
        }

        return [$status, $body];
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'timeout' => 10,
            'ignore_errors' => true,
            'header' => "Accept: application/json\r\nUser-Agent: FracturedWithinWebsite/1.0\r\n",
        ],
    ]);

    $body = @file_get_contents($url, false, $context);
    if ($body === false) {
        throw new RuntimeException('Bandsintown request failed.');
    }

    $status = 200;
    if (isset($http_response_header) && is_array($http_response_header)) {
        foreach ($http_response_header as $header) {
            if (preg_match('#^HTTP/\S+\s+(\d{3})#', $header, $matches)) {
                $status = (int) $matches[1];
                break;
            }
        }
    }

    return [$status, $body];
}

$apiKey = getApiKey();
if ($apiKey === '') {
    respond(500, ['error' => 'Bandsintown API is not configured on the server.']);
}

$cacheFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR)
    . DIRECTORY_SEPARATOR
    . 'fractured-within-bandsintown-' . sha1(ARTIST_NAME) . '.json';

$cacheAge = is_file($cacheFile) ? time() - (int) filemtime($cacheFile) : PHP_INT_MAX;
if ($cacheAge < CACHE_TTL) {
    $cached = @file_get_contents($cacheFile);
    if ($cached !== false) {
        echo $cached;
        exit;
    }
}

$url = sprintf(
    'https://rest.bandsintown.com/artists/%s/events?app_id=%s&date=upcoming',
    rawurlencode(ARTIST_NAME),
    rawurlencode($apiKey)
);

try {
    [$status, $body] = fetchUrl($url);

    if ($status < 200 || $status >= 300) {
        throw new RuntimeException('Bandsintown returned HTTP ' . $status . '.');
    }

    $decoded = json_decode($body, true, 512, JSON_THROW_ON_ERROR);
    if (!is_array($decoded)) {
        throw new RuntimeException('Bandsintown returned an unexpected response.');
    }

    $json = json_encode($decoded, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    @file_put_contents($cacheFile, $json, LOCK_EX);
    echo $json;
} catch (Throwable $exception) {
    if ($cacheAge < STALE_CACHE_TTL && is_file($cacheFile)) {
        $cached = @file_get_contents($cacheFile);
        if ($cached !== false) {
            header('Warning: 110 - "Response is stale"');
            echo $cached;
            exit;
        }
    }

    error_log('Bandsintown API error: ' . $exception->getMessage());
    respond(502, ['error' => 'Shows are temporarily unavailable.']);
}
