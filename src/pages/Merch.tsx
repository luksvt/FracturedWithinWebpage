import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Loader2, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Seo from '@/components/Seo';
import SocialLinks from '@/components/SocialLinks';

const BIG_CARTEL_SUBDOMAIN = 'fracturedwithin';
const BIG_CARTEL_SHOP_URL = `https://${BIG_CARTEL_SUBDOMAIN}.bigcartel.com`;
const BIG_CARTEL_API_URL = `https://api.bigcartel.com/${BIG_CARTEL_SUBDOMAIN}`;

type BigCartelImage = {
  url?: string;
  secure_url?: string;
  width?: number;
  height?: number;
};

type BigCartelOption = {
  id: number;
  name: string;
  price: number;
  sold_out: boolean;
  has_custom_price: boolean;
};

type BigCartelProduct = {
  id: number;
  name: string;
  permalink: string;
  position: number;
  price: number;
  default_price: number;
  url: string;
  status: 'active' | 'sold_out' | 'coming_soon' | string;
  on_sale: boolean;
  description?: string;
  options?: BigCartelOption[];
  images?: BigCartelImage[];
};

type BigCartelStore = {
  name: string;
  url: string;
  currency?: {
    sign: string;
    code: string;
    locale: string;
  };
};

const getProductImage = (product: BigCartelProduct) => {
  const image = product.images?.[0];
  return image?.secure_url || image?.url || null;
};

const getProductUrl = (product: BigCartelProduct) => {
  if (/^https?:\/\//i.test(product.url)) return product.url;
  return `${BIG_CARTEL_SHOP_URL}${product.url.startsWith('/') ? '' : '/'}${product.url}`;
};

const Merch = () => {
  const [products, setProducts] = useState<BigCartelProduct[]>([]);
  const [store, setStore] = useState<BigCartelStore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadMerch = async () => {
      try {
        setLoading(true);
        setError(null);

        const [productsResponse, storeResponse] = await Promise.all([
          fetch(`${BIG_CARTEL_API_URL}/products.json`, { signal: controller.signal }),
          fetch(`${BIG_CARTEL_API_URL}/store.json`, { signal: controller.signal }),
        ]);

        if (!productsResponse.ok) {
          throw new Error(`Big Cartel returned ${productsResponse.status}`);
        }

        const productsData = (await productsResponse.json()) as BigCartelProduct[];
        setProducts([...productsData].sort((a, b) => a.position - b.position));

        if (storeResponse.ok) {
          setStore((await storeResponse.json()) as BigCartelStore);
        }
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        console.error('Could not load Big Cartel products:', requestError);
        setError('Merch is currently unavailable here. You can still visit our shop directly.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadMerch();
    return () => controller.abort();
  }, []);

  const priceFormatter = useMemo(() => {
    const currency = store?.currency?.code || 'EUR';
    const locale = store?.currency?.locale || 'en-IE';

    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      });
    } catch {
      return new Intl.NumberFormat('en-IE', {
        style: 'currency',
        currency: 'EUR',
      });
    }
  }, [store]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="Merch"
        path="/merch"
        description="Official Fractured Within merch. Browse current products from the band's Big Cartel store."
      />
      <Navigation />

      <main className="container mx-auto px-4 py-12 flex-1 flex flex-col">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Merch</h1>
          <p className="text-muted-foreground">Official Fractured Within merchandise.</p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p>Loading merch...</p>
          </div>
        )}

        {!loading && error && (
          <div className="max-w-xl mx-auto text-center py-12">
            <ShoppingBag className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button asChild>
              <a href={BIG_CARTEL_SHOP_URL} target="_blank" rel="noopener noreferrer">
                Visit Big Cartel
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="max-w-xl mx-auto text-center py-12">
            <ShoppingBag className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-6">No merch available right now.</p>
            <Button asChild variant="outline">
              <a href={BIG_CARTEL_SHOP_URL} target="_blank" rel="noopener noreferrer">
                Visit Big Cartel
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mx-auto">
              {products.map((product) => {
                const image = getProductImage(product);
                const productUrl = getProductUrl(product);
                const soldOut = product.status === 'sold_out';
                const comingSoon = product.status === 'coming_soon';

                return (
                  <Card key={product.id} className="overflow-hidden flex flex-col group">
                    <a
                      href={productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block aspect-square bg-muted overflow-hidden"
                      aria-label={`View ${product.name} in the Fractured Within shop`}
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <ShoppingBag className="h-12 w-12" />
                        </div>
                      )}
                    </a>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-xl leading-tight">{product.name}</CardTitle>
                        {soldOut && <Badge variant="secondary">Sold out</Badge>}
                        {comingSoon && <Badge variant="secondary">Coming soon</Badge>}
                        {product.on_sale && !soldOut && !comingSoon && <Badge>Sale</Badge>}
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0 mt-auto">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-lg font-semibold">
                          {priceFormatter.format(product.default_price ?? product.price)}
                        </span>
                        <Button asChild variant="outline" size="sm">
                          <a href={productUrl} target="_blank" rel="noopener noreferrer">
                            View product
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Button asChild variant="ghost">
                <a href={BIG_CARTEL_SHOP_URL} target="_blank" rel="noopener noreferrer">
                  View full shop on Big Cartel
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </>
        )}

        <div className="mt-20">
          <SocialLinks />
        </div>
      </main>
    </div>
  );
};

export default Merch;
