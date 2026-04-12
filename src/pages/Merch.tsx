import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import logoSvg from '@/assets/FracturedWithin_Logo_4C.svg';
import SocialLinks from '@/components/SocialLinks';

import LogoShirt from "@/assets/FracturedWithin_Shirt_logo_black.png";

const Merch = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 flex-1 flex flex-col">
        <div className="text-center mb-12">
          {/* <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-primary" /> */}
          <h1 className="text-4xl font-bold text-foreground mb-4">Merch</h1>
          {/* <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Shirts shirts shirts, more shirts, and some other stuff.
          </p> */}
        </div>

        {/* Big Cartel Integration Notice */}
        <div className="mb-12">
          
        </div>

        {/* Shop Link */}
        <div className="mb-12 flex justify-center">
          <Card 
            className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 max-w-md w-full"
            onClick={() => window.open('https://fracturedwithin.bigcartel.com/product/t-shirt-fractured-within-logo', '_blank', 'noopener,noreferrer')}
          >
            <CardHeader className="text-center">
              <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center p-6">
                <img 
                  src={LogoShirt}
                  alt="Fractured Within Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <CardTitle className="text-xl">Shirt - Fractured Within Logo</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              {/* <p className="text-muted-foreground text-sm mb-4">
                Official Fractured Within merchandise. Click to view and purchase at Big Cartel.
              </p> */}
              <div className="flex items-center justify-center gap-2 text-primary font-medium">
                <ExternalLink size={16} />
                <span>Visit Big Cartel</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          
        </div>
      
        {/* Social Media Links */}
        <div className="mt-20">
          <SocialLinks />
        </div>
      </main>
    </div>
  );
};

export default Merch;