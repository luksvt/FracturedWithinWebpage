import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SocialLinks from '@/components/SocialLinks';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">About</h1>
          
            {/* Bio Section */}
            <Card className="mb-8 overflow-hidden bg-card/80 border border-primary/30 shadow-xl">
            <CardHeader className="text-center py-10">
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-foreground">
                Heavy, Grooving, Uncompromising
                </p>
                <p className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-foreground">
                Modern Metal .
                </p>

            </CardHeader>

            <CardContent className="pb-12 px-6 sm:px-10">
                <div className="space-y-8 text-base sm:text-lg md:text-xl leading-relaxed text-foreground/80">
                
                <p>
                    Fractured Within play unrelenting, groove-driven modern metal. Their sound fuses elements of death metal, metalcore, thrash, and more – without tying themselves down to a single genre. Formed in 2024, the band quickly set their sights on creating music that goes beyond a simple hobby.
                </p>

                <p>
                    Their upcoming debut Messiah delivers three songs that confront inner struggles, loss, and blind devotion to false leaders. The project took a year of hard work and became a lesson in persistence.
                </p>

                <p>
                    Lyrically, the band moves between personal struggles and political concepts. With Messiah, they take their first step toward bigger stages, both national and international.
                </p>

                </div>
            </CardContent>
            </Card>




          {/* Line-Up Section */}
          <Card>
            <CardHeader>
              <CardTitle>Line-Up</CardTitle>
              <CardDescription>Meet the band members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Norman Menz-Student</span>
                  <span className="text-muted-foreground">Drums</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Milan Müller</span>
                  <span className="text-muted-foreground">Bass</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Aaron Merkel</span>
                  <span className="text-muted-foreground">Vocals</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Lukas Vaut</span>
                  <span className="text-muted-foreground">Guitar</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Dominik Huthmacher</span>
                  <span className="text-muted-foreground">Guitar</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Media Links */}
        <div className="mt-20">
          <SocialLinks />
        </div>
      </main>
    </div>
  );
};

export default About;