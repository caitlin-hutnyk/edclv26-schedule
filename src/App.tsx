import { useState, useCallback, useRef, useEffect, useLayoutEffect } from 'react';
import { allData, STAGES, STAGE_LABELS } from './data';
import type { Day, Act } from './data';
import './App.css';

function formatTime(mins: number): string {
  let h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h >= 24) h -= 24;
  const period = h >= 12 ? 'PM' : 'AM';
  const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return m === 0 ? `${display} ${period}` : `${display}:${m.toString().padStart(2, '0')} ${period}`;
}

function formatTimeShort(mins: number): string {
  let h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h >= 24) h -= 24;
  const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return m === 0 ? `${display}` : `${display}:${m.toString().padStart(2, '0')}`;
}

// 5 PM (1020) → 5:30 AM next day (1770) — covers earliest acts on Day 1 + all overnight sets
const DAY_RANGES: Record<Day, [number, number]> = {
  day1: [17 * 60, 29 * 60 + 30],
  day2: [17 * 60, 29 * 60 + 30],
  day3: [17 * 60, 29 * 60 + 30],
};

const DAY_LABELS: Record<Day, string> = {
  day1: 'DAY 1',
  day2: 'DAY 2',
  day3: 'DAY 3',
};

const DAY_DATE_LABELS: Record<Day, string> = {
  day1: 'FRI · MAY 15',
  day2: 'SAT · MAY 16',
  day3: 'SUN · MAY 17',
};

const DAYS: Day[] = ['day1', 'day2', 'day3'];

function isZoomedOut() {
  const vv = window.visualViewport;
  return !vv || vv.scale <= 1.05;
}

function useSwipeDay(
  day: Day,
  setDay: (d: Day) => void,
  scrollElRef?: React.RefObject<HTMLDivElement | null>,
) {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const startScroll = useRef<{ left: number; maxLeft: number } | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isZoomedOut()) return;
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    if (scrollElRef?.current) {
      const el = scrollElRef.current;
      startScroll.current = { left: el.scrollLeft, maxLeft: el.scrollWidth - el.clientWidth };
    }
  }, [scrollElRef]);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (startX.current === null || !isZoomedOut()) { startX.current = null; return; }
    const dx = e.changedTouches[0].clientX - startX.current;
    const dy = e.changedTouches[0].clientY - (startY.current ?? 0);
    startX.current = null;
    startY.current = null;
    const scroll = startScroll.current;
    startScroll.current = null;

    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (scroll) {
      if (dx < 0 && scroll.left < scroll.maxLeft - 5) return;
      if (dx > 0 && scroll.left > 5) return;
    }

    const idx = DAYS.indexOf(day);
    if (dx < 0 && idx < DAYS.length - 1) setDay(DAYS[idx + 1]);
    else if (dx > 0 && idx > 0) setDay(DAYS[idx - 1]);
  }, [day, setDay]);

  return { onTouchStart, onTouchEnd };
}

const HOUR_PX = 80;

const DAY_DATES: Record<Day, string> = {
  day1: '2026-05-15',
  day2: '2026-05-16',
  day3: '2026-05-17',
};

// EDC nights run past midnight; the next-day-morning hours still belong to the previous festival day.
function getPacificTime(): { dateStr: string; minutes: number } {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(now);
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? '0';
  const h = parseInt(get('hour'));
  const m = parseInt(get('minute'));

  // Hours before 6 AM count as the previous festival day (sets run till 5:30 AM)
  if (h < 6) {
    const prev = new Date(now.getTime() - 6 * 60 * 60 * 1000);
    const prevParts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(prev);
    const pGet = (type: string) => prevParts.find(p => p.type === type)?.value ?? '0';
    return {
      dateStr: `${pGet('year')}-${pGet('month')}-${pGet('day')}`,
      minutes: 24 * 60 + h * 60 + m,
    };
  }

  return {
    dateStr: `${get('year')}-${get('month')}-${get('day')}`,
    minutes: h * 60 + m,
  };
}

function getDefaultDay(): Day {
  const { dateStr } = getPacificTime();
  if (dateStr === DAY_DATES.day2) return 'day2';
  if (dateStr === DAY_DATES.day3) return 'day3';
  if (dateStr === DAY_DATES.day1) return 'day1';
  return 'day1';
}

function ActBlock({ act, rangeStart, hourPx }: {
  act: Act;
  rangeStart: number;
  hourPx: number;
}) {
  const top = ((act.start - rangeStart) / 60) * hourPx;
  const height = Math.max(((act.end - act.start) / 60) * hourPx - 2, hourPx < 50 ? 10 : 20);
  const tierClass = act.tier ? `tier-${act.tier}` : 'tier-unpicked';

  return (
    <div
      className={`act-block stage-${act.stage} ${tierClass}`}
      style={{ top: `${top}px`, height: `${height}px` }}
      id={`grid-${act.id}`}
    >
      <div className="act-name">{act.name}</div>
      {height > 25 && (
        <div className="act-time-label">{formatTimeShort(act.start)}–{formatTimeShort(act.end)}</div>
      )}
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

function ScheduleGrid({ acts, day, nowMinutes, scrollRef }: {
  acts: Act[];
  day: Day;
  nowMinutes: number | null;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const isMobile = useIsMobile();
  const hourPx = isMobile ? 44 : HOUR_PX;
  const [rangeStart, rangeEnd] = DAY_RANGES[day];
  const totalHours = (rangeEnd - rangeStart) / 60;
  const gridHeight = totalHours * hourPx + (isMobile ? 60 : 120);

  const hours: number[] = [];
  for (let h = Math.ceil(rangeStart / 60); h <= Math.floor(rangeEnd / 60); h++) {
    hours.push(h);
  }

  const headerRef = useRef<HTMLDivElement>(null);

  const onGridScroll = useCallback(() => {
    if (headerRef.current && scrollRef.current) {
      headerRef.current.scrollLeft = scrollRef.current.scrollLeft;
    }
  }, [scrollRef]);

  return (
    <div className="schedule-grid">
      <div className="grid-header" ref={headerRef}>
        <div className="grid-time-spacer" />
        {STAGES.map(stage => (
          <div key={stage} className={`grid-header-stage stage-label-${stage}`}>
            <span>{STAGE_LABELS[stage]}</span>
          </div>
        ))}
      </div>
      <div className="grid-scroll" ref={scrollRef} onScroll={onGridScroll}>
        <div className="grid-mobile-header">
          <div className="grid-time-spacer" />
          {STAGES.map(stage => (
            <div key={stage} className={`grid-header-stage stage-label-${stage}`}>
              <span>{STAGE_LABELS[stage]}</span>
            </div>
          ))}
        </div>
        <div className="grid-body" style={{ height: `${gridHeight}px` }}>
          <div className="time-axis">
            {hours.map(h => (
              <div
                key={h}
                className="time-marker"
                style={{ top: `${((h * 60 - rangeStart) / 60) * hourPx}px` }}
              >
                <span>{formatTime(h * 60)}</span>
              </div>
            ))}
          </div>

          {hours.map(h => (
            <div
              key={`line-${h}`}
              className="hour-line"
              style={{ top: `${((h * 60 - rangeStart) / 60) * hourPx}px` }}
            />
          ))}

          {nowMinutes !== null && nowMinutes >= rangeStart && nowMinutes <= rangeEnd && (
            <div
              className="now-indicator"
              style={{ top: `${((nowMinutes - rangeStart) / 60) * hourPx}px` }}
            >
              <div className="now-indicator-triangle" />
            </div>
          )}

          <div className="stage-columns">
            {STAGES.map(stage => (
              <div key={stage} className={`stage-column stage-col-${stage}`}>
                {acts
                  .filter(a => a.stage === stage)
                  .map(act => (
                    <ActBlock
                      key={act.id}
                      act={act}
                      rangeStart={rangeStart}
                      hourPx={hourPx}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [day, setDay] = useState<Day>(getDefaultDay);
  const [showMap, setShowMap] = useState(false);
  const gridScrollRef = useRef<HTMLDivElement>(null);
  const dayTabsRef = useRef<HTMLElement>(null);

  const handleDayChange = useCallback((d: Day) => {
    setDay(d);
  }, []);

  const gridSwipe = useSwipeDay(day, handleDayChange, gridScrollRef);

  // Animate the sliding tab indicator on day change
  useLayoutEffect(() => {
    const nav = dayTabsRef.current;
    if (!nav) return;
    const tabs = nav.querySelectorAll<HTMLElement>('.day-tab');
    const indicator = nav.querySelector<HTMLElement>('.tab-indicator');
    const idx = DAYS.indexOf(day);
    const activeTab = tabs[idx];
    if (indicator && activeTab) {
      const navRect = nav.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      indicator.style.left = `${tabRect.left - navRect.left}px`;
      indicator.style.width = `${tabRect.width}px`;
    }
  }, [day]);

  const { acts } = allData[day];

  const [nowMinutes, setNowMinutes] = useState<number | null>(() => {
    const { dateStr, minutes } = getPacificTime();
    return dateStr === DAY_DATES[day] ? minutes : null;
  });

  useEffect(() => {
    const update = () => {
      const { dateStr, minutes } = getPacificTime();
      setNowMinutes(dateStr === DAY_DATES[day] ? minutes : null);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [day]);

  return (
    <div className={`app day-${day}`}>
      <div className="bg-stars" />
      <header className="app-header">
        <div className="header-top">
          <div className="header-brand">
            <span className="brand-edc">EDC</span>
            <span className="brand-lv">LAS VEGAS</span>
            <span className="brand-year">'26</span>
          </div>
          <div className="header-info">
            <span className="header-day">{DAY_DATE_LABELS[day]}</span>
            <button className="map-btn" onClick={() => setShowMap(true)}>MAP</button>
          </div>
        </div>
        <nav className="day-tabs" ref={dayTabsRef as React.RefObject<HTMLElement>}>
          {DAYS.map(d => (
            <button
              key={d}
              className={`day-tab ${d === day ? 'active' : ''}`}
              onClick={() => handleDayChange(d)}
            >
              {DAY_LABELS[d]}
            </button>
          ))}
          <div className="tab-indicator" />
        </nav>
      </header>

      <div className="main-content">
        <div className="grid-panel" {...gridSwipe}>
          <ScheduleGrid
            acts={acts}
            day={day}
            nowMinutes={nowMinutes}
            scrollRef={gridScrollRef}
          />
        </div>
      </div>

      {showMap && (
        <div className="map-overlay" onClick={() => setShowMap(false)}>
          <button className="map-close" onClick={() => setShowMap(false)} aria-label="Close map">×</button>
          <div className="map-scroll" onClick={e => e.stopPropagation()}>
            <img src={`${import.meta.env.BASE_URL}venue-map.jpg`} alt="EDC Las Vegas venue map" className="venue-map-img" />
            <div className="map-caption">
              EDC Las Vegas '25 recharge map · 2026 layout TBA
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
