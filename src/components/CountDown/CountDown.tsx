import { useEffect, useMemo, useState } from "react";

type Props = {
  /** thời điểm kết thúc (Date | string | timestamp) */
  target: Date | string | number;
  className?: string;
};

const pad = (n: number) => n.toString().padStart(2, "0");

export default function Countdown({ target, className }: Props) {
  const targetMs = useMemo(() => new Date(target).getTime(), [target]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const msLeft = Math.max(0, targetMs - now);
  const days = Math.floor(msLeft / 86_400_000);
  const hours = Math.floor((msLeft % 86_400_000) / 3_600_000);
  const minutes = Math.floor((msLeft % 3_600_000) / 60_000);
  const seconds = Math.floor((msLeft % 60_000) / 1_000);

  const Block = ({ label, value }: { label: string; value: string }) => (
    <div className="countdown-block text-center flex flex-col justify-center">
      <div className="countdown-label text-[12px]">{label}</div>
      <div className="countdown-value text-[32px] font-bold tracking-[1.28px]">
        {value}
      </div>
    </div>
  );

  return (
    <div className={`flex items-end gap-3 ${className ?? ""}`}>
      <Block label="Days" value={pad(days)} />
      <span className="separator text-red-500 font-semibold self-center mb-1">
        :
      </span>
      <Block label="Hours" value={pad(hours)} />
      <span className="separator text-red-500 font-semibold self-center mb-1">
        :
      </span>
      <Block label="Minutes" value={pad(minutes)} />
      <span className="separator text-red-500 font-semibold self-center mb-1">
        :
      </span>
      <Block label="Seconds" value={pad(seconds)} />
    </div>
  );
}
