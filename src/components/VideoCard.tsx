import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";

export function VideoCard({
  dateLabel,
  title,
  embedUrl,
  subtitle,
}: {
  dateLabel: string;
  title: string;
  embedUrl: string;
  subtitle?: string;
}) {
  return (
    <>
      <div className="text-center mb-6">
        <p className="text-2xl font-semibold text-foreground">{dateLabel}</p>
      </div>

      <section className="w-full max-w-4xl mx-auto mb-16">
        <Card className="w-full overflow-hidden bg-card/80 border border-primary/40 shadow-xl">
          <CardHeader className="text-center space-y-3 py-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-5 py-1.5 text-sm md:text-base font-medium uppercase tracking-[0.25em] text-primary mx-auto">
              <Play className="h-4 w-4 md:h-5 md:w-5" />
              <span>Video</span>
            </div>

            <CardTitle 
                className="
                    font-messiah
                    text-2xl tracking-[0.2em]
                    sm:text-2xl sm:tracking-[0.25em]
                    md:text-4xl md:tracking-[0.35em]
                    uppercase
                    text-foreground
                    drop-shadow-[0_0_18px_rgba(0,0,0,0.8)]
                "
                >
              {title}
            </CardTitle>

            {subtitle && (
              <CardDescription className="text-base md:text-lg text-foreground/80">
                {subtitle}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="p-0">
            <div className="aspect-video w-full overflow-hidden">
              <iframe
                src={embedUrl}
                title={title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}