import Navigation from '@/components/Navigation';

const Impressum = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 flex-1 flex flex-col">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Impressum</h1>
        </div>

        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="text-muted-foreground mb-8">
            <p className="mb-6"><strong>Fractured Within GbR</strong></p>
            <p className="mb-2">Anton-Bauer-Weg 1</p>
            <p className="mb-2">45657 Recklinghausen</p>
            <p className="mb-6">Deutschland</p>
            
            <p className="mb-2"><strong>Kontakt / Contact</strong></p>
            <p className="mb-2">📞 +49 (0) 176 801 777 43</p>
            <p className="mb-6">✉️ info@fracturedwithin.de</p>
            
            <p className="mb-2"><strong>Vertreten durch / Represented by:</strong></p>
            <p className="mb-2">Dominik Huthmacher</p>
            <p className="mb-6">Lukas Vaut</p>
          </div>
          
          <h2 className="text-2xl font-semibold text-foreground mb-4">Haftung für Inhalte / Liability for content</h2>
          <p className="text-muted-foreground mb-4">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p className="text-muted-foreground mb-6">
            As a service provider, we are responsible for our own content on these pages according to general laws (§ 7 Abs.1 TMG). However, according to §§ 8 to 10 TMG, we are not obliged to monitor transmitted or stored external information or to investigate circumstances indicating illegal activity.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Haftung für Links / Liability for links</h2>
          <p className="text-muted-foreground mb-4">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
          <p className="text-muted-foreground mb-6">
            Our offer contains links to external websites of third parties, on whose content we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the content of the linked pages.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Urheberrecht / Copyright</h2>
          <p className="text-muted-foreground mb-4">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
          <p className="text-muted-foreground mb-8">
            The content and works created by the site operators on these pages are subject to German copyright law. Contributions from third parties are marked as such. The duplication, processing, distribution, or any form of commercialization of such material beyond the scope of copyright law requires the prior written consent of its respective author or creator.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mb-4">DSGVO / Privacy Policy</h2>
          
          <h3 className="text-xl font-semibold text-foreground mb-3">1. Datenschutz auf einen Blick / Privacy at a glance</h3>
          <p className="text-muted-foreground mb-4">
            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Personenbezogene Daten werden vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung behandelt.
          </p>
          <p className="text-muted-foreground mb-6">
            We take the protection of your personal data very seriously. Personal data is handled confidentially and in accordance with statutory data protection regulations as well as this privacy policy.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">2. Verantwortliche Stelle / Responsible entity</h3>
          <p className="text-muted-foreground mb-2">
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          </p>
          <p className="text-muted-foreground mb-4">
            The responsible entity for data processing on this website is:
          </p>
          <div className="text-muted-foreground mb-6">
            <p>Fractured Within GbR</p>
            <p>Anton-Bauer-Weg 1</p>
            <p>45657 Recklinghausen</p>
            <p>Deutschland</p>
          </div>

          <h3 className="text-xl font-semibold text-foreground mb-3">3. Erfassung von Daten / Data collection</h3>
          <p className="text-muted-foreground mb-4">
            Daten werden automatisch erfasst, wenn Sie unsere Website betreten (z. B. IP-Adresse, verwendeter Browser, Betriebssystem, Uhrzeit des Seitenaufrufs). Diese Daten sind technisch notwendig, um Ihnen die Website korrekt anzuzeigen.
          </p>
          <p className="text-muted-foreground mb-6">
            Data is automatically collected when you visit our website (e.g., IP address, browser used, operating system, time of access). This data is technically necessary to display the website correctly.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">4. Kontaktformular & E-Mail / Contact form & email</h3>
          <p className="text-muted-foreground mb-4">
            Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben zwecks Bearbeitung der Anfrage gespeichert. Ohne Ihre Einwilligung geben wir diese Daten nicht weiter.
          </p>
          <p className="text-muted-foreground mb-6">
            If you send us inquiries via contact form or email, your details will be stored to process the request. Without your consent, these data will not be shared with third parties.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">5. Cookies</h3>
          <p className="text-muted-foreground mb-4">
            Unsere Website verwendet Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Sie dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
          </p>
          <p className="text-muted-foreground mb-6">
            Our website uses cookies. Cookies do not harm your device and contain no viruses. They serve to make our offer more user-friendly, effective, and secure.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">6. Eingebettete Inhalte von Drittanbietern / Third party content</h3>
          <p className="text-muted-foreground mb-4">
            Wir binden ggf. Inhalte von Plattformen wie YouTube, Spotify oder Instagram ein. Beim Aufruf solcher Inhalte werden Daten (z. B. IP-Adresse) an die jeweiligen Anbieter übertragen.
          </p>
          <p className="text-muted-foreground mb-6">
            We may embed content from platforms like YouTube, Spotify, or Instagram. When you access such content, data (e.g., your IP address) may be transmitted to these providers.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">7. Ihre Rechte / Your rights</h3>
          <p className="text-muted-foreground mb-4">
            Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft, Empfänger und den Zweck der Datenverarbeitung. Außerdem haben Sie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
          </p>
          <p className="text-muted-foreground mb-6">
            You have the right to free information about your stored personal data at any time, including its origin, recipients, and the purpose of data processing. Additionally, you have the right to correction, blocking, or deletion of this data.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">8. Sicherheit / Security</h3>
          <p className="text-muted-foreground mb-4">
            Wir verwenden SSL-Verschlüsselung, um die Übertragung vertraulicher Inhalte zu schützen.
          </p>
          <p className="text-muted-foreground mb-6">
            We use SSL encryption to protect the transmission of confidential content.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">9. Server-Log-Dateien / Server log files</h3>
          <p className="text-muted-foreground mb-4">
            Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind:
          </p>
          <ul className="text-muted-foreground mb-4 list-disc list-inside">
            <li>Browsertyp und Browserversion</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            The provider of the pages automatically collects and stores information in so-called server log files that your browser automatically transmits. These are:
          </p>
          <ul className="text-muted-foreground list-disc list-inside">
            <li>Browser type and version</li>
            <li>Operating system used</li>
            <li>Referrer URL</li>
            <li>Hostname of the accessing computer</li>
            <li>Time of server request</li>
            <li>IP address</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Impressum;