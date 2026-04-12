import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const TechRider = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 flex-1 flex flex-col">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Technical Rider</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technical specifications and requirements for live performances
          </p>
        </div>

        <div className="max-w-4xl mx-auto w-full">
          {/* Download Button */}
          <div className="text-center mb-8">
            <Button asChild size="lg">
              <a href="/techrider.pdf" download="Fractured_Within_Tech_Rider.pdf">
                <Download size={20} className="mr-2" />
                Download PDF
              </a>
            </Button>
          </div>

          {/* PDF Viewer */}
          <div className="w-full bg-muted rounded-lg overflow-hidden" style={{ height: '80vh' }}>
            <object
              data="/techrider.pdf"
              type="application/pdf"
              width="100%"
              height="100%"
              className="w-full h-full"
            >
              <div className="flex items-center justify-center h-full text-center p-8">
                <div>
                  <p className="text-muted-foreground mb-4">
                    PDF cannot be displayed in your browser.
                  </p>
                  <Button asChild>
                    <a href="/techrider.pdf" download="Fractured_Within_Tech_Rider.pdf">
                      <Download size={16} className="mr-2" />
                      Download PDF instead
                    </a>
                  </Button>
                </div>
              </div>
            </object>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TechRider;