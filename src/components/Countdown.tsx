import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string;
  completeMessage?: string;
}

export function Countdown({ targetDate, completeMessage = "The event is live now!" }: CountdownProps) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isComplete: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isComplete: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Completed case
  if (timeLeft.isComplete) {
    return (
      <div className="text-xl md:text-2xl font-semibold text-emerald-400">
        🎉 {completeMessage}
      </div>
    );
  }

  const items = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HRS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEC", value: timeLeft.seconds },
  ];

  return (
    <div className="mt-4 flex justify-center gap-4 md:gap-6 text-center">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col w-20 md:w-24 rounded-2xl bg-black/60 border border-white/10 px-3 py-3 md:px-4 md:py-4"
        >
          <span className="text-2xl md:text-3xl font-semibold text-foreground leading-none">
            {item.value.toString().padStart(2, "0")}
          </span>
          <span className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.18em] text-foreground/60">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
