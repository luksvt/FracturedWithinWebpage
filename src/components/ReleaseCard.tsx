import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Music } from "lucide-react";
import { Countdown } from "@/components/Countdown";

export function ReleaseCard({
  dateLabel,
  title,
  releaseDateText,
  countdownDate,
  presaveUrl,
  artwork,
}: {
  dateLabel: string;
  title: string;
  releaseDateText: string;
  countdownDate: string;
  presaveUrl: string;
  artwork: string;
}) {
  return (
    <>
      <div className="text-center mb-6">
        <p className="text-2xl font-semibold text-foreground">{dateLabel}</p>
      </div>

      <section className="w-full max-w-4xl mx-auto mb-16">
        <Card className="overflow-hidden bg-card/80 border border-primary/40 shadow-xl">
          <CardHeader className="text-center space-y-3 py-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-5 py-1.5 text-sm md:text-base font-medium uppercase tracking-[0.25em] text-primary mx-auto">
              <Music className="h-4 w-4 md:h-5 md:w-5" />
              <span>New Single</span>
            </div>

            <CardTitle 
                className="
                    font-messiah
                    text-3xl tracking-[0.2em]
                    sm:text-4xl sm:tracking-[0.25em]
                    md:text-6xl md:tracking-[0.35em]
                    uppercase
                    text-foreground
                    drop-shadow-[0_0_18px_rgba(0,0,0,0.8)]
                "
                >
              {title}
            </CardTitle>

            <CardDescription className="flex flex-col items-center gap-2 text-foreground/80">
              <span className="inline-flex items-center gap-2 text-base md:text-lg">
                <Calendar className="h-5 w-5" />
                <span>
                  Release: <strong>{releaseDateText}</strong>
                </span>
              </span>

              <span className="text-xs md:text-sm uppercase tracking-[0.22em] text-primary/80">
                Presave now &amp; be first when it drops
              </span>
            </CardDescription>

            <div className="pt-6">
              <Countdown
                targetDate={countdownDate}
                completeMessage="The single is out now!"
              />
            </div>

            <div className="pt-8">
              <Button asChild size="lg" className="rounded-full px-10 py-3.5 text-base md:text-lg">
                <Link to={presaveUrl} target="_blank">
                  Click here to presave
                </Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <img src={artwork} alt={title} className="w-full h-auto" />
          </CardContent>
        </Card>
      </section>
    </>
  );
}