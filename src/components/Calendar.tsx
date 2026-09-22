import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

interface CalendarProps {
  rangeStart?: string | undefined;
  rangeEnd?: string | undefined;
  onSelect: (isoDate: string) => void;
}

export function Calendar({ rangeStart, rangeEnd, onSelect }: CalendarProps) {
  const today = startOfToday();
  const [cursor, setCursor] = useState(() => {
    const base = rangeStart ? new Date(`${rangeStart}T00:00:00`) : today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: Array<{ day: number; date: Date } | null> = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, date: new Date(year, month, day) });
  }

  return (
    <div className="rounded-2xl bg-background/95 p-6 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          aria-label="Mês anterior"
          className="inline-flex items-center justify-center rounded-full p-1.5 text-foreground transition-colors hover:bg-secondary"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="font-display text-lg">
          {MESES[month]} {year}
        </p>
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          aria-label="Próximo mês"
          className="inline-flex items-center justify-center rounded-full p-1.5 text-foreground transition-colors hover:bg-secondary"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
        {DIAS_SEMANA.map((dia) => (
          <div key={dia}>{dia}</div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((cell, index) => {
          if (!cell) return <div key={`empty-${index}`} />;

          const iso = toIsoDate(cell.date);
          const isPast = cell.date < today;
          const isStart = rangeStart === iso;
          const isEnd = rangeEnd === iso;
          const isInRange =
            !!rangeStart && !!rangeEnd && iso > rangeStart && iso < rangeEnd;

          return (
            <button
              key={iso}
              type="button"
              disabled={isPast}
              onClick={() => onSelect(iso)}
              className={`aspect-square text-sm transition-colors ${
                isStart || isEnd
                  ? "rounded-lg bg-primary font-semibold text-primary-foreground"
                  : isInRange
                    ? "rounded-none bg-primary/15 text-foreground"
                    : isPast
                      ? "rounded-lg text-muted-foreground/40"
                      : "rounded-lg text-foreground hover:bg-secondary"
              }`}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
