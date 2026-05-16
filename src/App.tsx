import { useState, useCallback, useRef, useEffect, useLayoutEffect, Fragment } from 'react';
import { ChevronDown } from 'lucide-react';
import { allData, STAGES, STAGE_LABELS } from './data';
import type { Day, Act, ItineraryBlock, ItineraryOption } from './data';
import './App.css';

type MobileView = 'plan' | 'lineup' | 'map';

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

function ScheduleGrid({ acts, day, nowMinutes, scrollRef, meetups }: {
  acts: Act[];
  day: Day;
  nowMinutes: number | null;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  meetups: ItineraryBlock[];
}) {
  const isMobile = useIsMobile();
  const hourPx = isMobile ? 40 : HOUR_PX;
  const [rangeStart, rangeEnd] = DAY_RANGES[day];
  const totalHours = (rangeEnd - rangeStart) / 60;
  const gridHeight = totalHours * hourPx + (isMobile ? 20 : 120);

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

          {meetups.map((m, i) => (
            <div
              key={`meetup-${i}`}
              className="meetup-line"
              style={{ top: `${((m.start - rangeStart) / 60) * hourPx}px` }}
              title={`${formatTime(m.start)} · ${m.title}${m.subtitle ? ` · ${m.subtitle}` : ''}`}
            >
              <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="meetup-icon">
                <circle cx="6" cy="6" r="2.5" />
                <circle cx="11" cy="7" r="2" />
                <path d="M2 14c0-2 2-3.5 4-3.5s4 1.5 4 3.5" />
                <path d="M9.5 14c0-1.5 1.5-2.5 3-2.5s2.5 1 2.5 2.5" />
              </svg>
            </div>
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

// Map stage label abbreviations to full Stage keys for color theming
function stageKeyFromLabel(label?: string): string | null {
  if (!label) return null;
  const lower = label.toLowerCase();
  if (lower.includes('kf') || lower.includes('kinetic')) return 'kinetic';
  if (lower.includes('cg') || lower.includes('circuit')) return 'circuit';
  if (lower.includes('cm') || lower.includes('cosmic')) return 'cosmic';
  if (lower.includes('bp') || lower.includes('bass')) return 'bass';
  if (lower.includes('ng') || lower.includes('neon')) return 'neon';
  if (lower.includes('qv') || lower.includes('quantum')) return 'quantum';
  if (lower.includes('sb') || lower.includes('stereo')) return 'stereo';
  if (lower.includes('wl') || lower.includes('waste')) return 'waste';
  if (lower.includes('bj') || lower.includes('bionic')) return 'bionic';
  return null;
}

const MeetupIcon = () => (
  <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="11" cy="7" r="2" />
    <path d="M2 14c0-2 2-3.5 4-3.5s4 1.5 4 3.5" />
    <path d="M9.5 14c0-1.5 1.5-2.5 3-2.5s2.5 1 2.5 2.5" />
  </svg>
);

function ItineraryItem({ block, acts, embeddedMeetups = [] }: {
  block: ItineraryBlock;
  acts: Act[];
  embeddedMeetups?: ItineraryBlock[];
}) {
  const linkedAct = block.actId ? acts.find(a => a.id === block.actId) : undefined;
  const stageKey = linkedAct ? linkedAct.stage : stageKeyFromLabel(block.stage);
  const stageClass = stageKey ? `stage-${stageKey}` : '';
  const tierClass = linkedAct?.tier ? `tier-${linkedAct.tier}` : '';

  if (block.type === 'subheader') {
    return (
      <div className="itinerary-subheader">
        <span>{block.title}</span>
      </div>
    );
  }

  if (block.type === 'meetup') {
    return (
      <div className="itinerary-meetup" data-it-time={block.start}>
        <div className="it-meetup-time">{formatTime(block.start)}</div>
        <div className="it-meetup-pill">
          <MeetupIcon />
          <span className="it-meetup-label">{block.title}</span>
          {block.subtitle && <span className="it-meetup-note">· {block.subtitle.toLowerCase()}</span>}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`itinerary-item it-${block.type} ${stageClass} ${tierClass}`}
      data-it-time={block.start}
    >
      <div className="it-time-col">
        <div className="it-time">{formatTime(block.start)}</div>
        {block.type === 'act' && (
          <div className="it-time-end">–{formatTime(block.end)}</div>
        )}
      </div>
      <div className="it-content">
        <div className="it-connector">
          <div className={`it-dot it-dot-${block.type}`} />
          <div className="it-line" />
        </div>
        <div className={`it-card it-card-${block.type}`}>
          <div className="it-card-header">
            <span className="it-title">{block.title}</span>
            {block.stage && block.type === 'act' && (
              <span className="it-stage">{block.stage}</span>
            )}
          </div>
          {block.subtitle && <div className="it-subtitle">{block.subtitle}</div>}
          {block.note && <div className="it-note">{block.note}</div>}
          {block.options && block.options.length > 0 && (
            <div className="it-options">
              {block.options.map((opt: ItineraryOption) => {
                const optStageKey = stageKeyFromLabel(opt.stage);
                const optActFull = acts.find(a => a.id === opt.actId);
                const optTier = optActFull?.tier;
                return (
                  <div
                    key={opt.actId}
                    className={`it-option ${optStageKey ? `stage-${optStageKey}` : ''} ${optTier ? `tier-${optTier}` : ''}`}
                    data-it-time={optActFull?.start}
                  >
                    <div className="it-option-main">
                      <span className="it-option-name">{opt.name}</span>
                      <span className="it-option-meta">{opt.stage} · {opt.time}</span>
                    </div>
                    {opt.note && <div className="it-option-note">{opt.note}</div>}
                  </div>
                );
              })}
            </div>
          )}
          {embeddedMeetups.length > 0 && (
            <div className="it-embedded-meetups">
              {embeddedMeetups.map((m, i) => (
                <div key={i} className="it-embedded-meetup">
                  <MeetupIcon />
                  <span className="it-embedded-meetup-time">{formatTime(m.start)}</span>
                  <span className="it-embedded-meetup-label">{m.title}</span>
                  {m.subtitle && <span className="it-embedded-meetup-note">· {m.subtitle.toLowerCase()}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ViewSwitcher({
  value,
  onValueChange,
  options,
}: {
  value: string;
  onValueChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const current = options.find(o => o.value === value);

  const optionAt = (x: number, y: number) =>
    document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-option]')?.dataset.option ?? null;

  return (
    <div className="view-switcher-root">
      <div
        className="view-select-trigger"
        onPointerDown={e => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setOpen(true);
          setHighlighted(value);
        }}
        onPointerMove={e => {
          if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
          const opt = optionAt(e.clientX, e.clientY);
          if (opt) setHighlighted(opt);
        }}
        onPointerUp={e => {
          const opt = optionAt(e.clientX, e.clientY);
          if (opt) onValueChange(opt);
          setOpen(false);
          setHighlighted(null);
        }}
        onPointerCancel={() => { setOpen(false); setHighlighted(null); }}
      >
        <span>{current?.label}</span>
        <ChevronDown size={14} strokeWidth={2.5} />
      </div>

      {open && (
        <div className="view-select-content">
          {options.map(opt => (
            <div
              key={opt.value}
              data-option={opt.value}
              className={`view-select-item${highlighted === opt.value ? ' highlighted' : ''}${value === opt.value ? ' checked' : ''}`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PlanNowMarker() {
  return (
    <div className="plan-now-marker">
      <div className="plan-now-line" />
      <span className="plan-now-label">NOW</span>
      <div className="plan-now-line" />
    </div>
  );
}

export default function App() {
  const [day, setDay] = useState<Day>(getDefaultDay);
  const [showMap, setShowMap] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>('plan');
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

  const { acts, itinerary } = allData[day];
  const meetups = itinerary.filter(b => b.type === 'meetup');

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
          <div className="header-info desktop-only">
            <span className="header-day">{DAY_DATE_LABELS[day]}</span>
            <button className="map-btn" onClick={() => setShowMap(true)}>MAP</button>
          </div>
          <div className="header-info mobile-only">
            <ViewSwitcher
              value={mobileView}
              onValueChange={v => setMobileView(v as MobileView)}
              options={[
                { value: 'plan', label: 'Plan' },
                { value: 'lineup', label: 'Lineup' },
                { value: 'map', label: 'Map' },
              ]}
            />
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
        <div className={`grid-panel ${mobileView === 'lineup' ? 'mobile-active' : ''}`} {...gridSwipe}>
          <ScheduleGrid
            acts={acts}
            day={day}
            nowMinutes={nowMinutes}
            scrollRef={gridScrollRef}
            meetups={meetups}
          />
        </div>
        <div className="divider" />
        <div className={`plan-panel ${mobileView === 'plan' ? 'mobile-active' : ''}`}>
          <div className="plan-panel-header">THE PLAN</div>
          <div className="plan-scroll">
            {(() => {
              const isEmbedded = (m: ItineraryBlock) =>
                itinerary.some(b => b.type !== 'meetup' && m.start > b.start && m.start < b.end);
              const embeddedFor = (b: ItineraryBlock) =>
                itinerary.filter(m => m.type === 'meetup' && m.start > b.start && m.start < b.end);
              const visible = itinerary.filter(b => b.type !== 'meetup' || !isEmbedded(b));
              const nowIdx = nowMinutes !== null
                ? visible.reduce<number>((acc, b, i) => b.start <= nowMinutes ? i : acc, -1)
                : null;
              return (
                <>
                  {nowIdx === -1 && <PlanNowMarker />}
                  {visible.map((block, i) => (
                    <Fragment key={i}>
                      <ItineraryItem block={block} acts={acts} embeddedMeetups={embeddedFor(block)} />
                      {nowIdx === i && <PlanNowMarker />}
                    </Fragment>
                  ))}
                </>
              );
            })()}
          </div>
        </div>
        {/* Mobile: map as a 3rd inline view */}
        <div className={`map-panel ${mobileView === 'map' ? 'mobile-active' : ''}`}>
          <div className="map-panel-scroll">
            <img src={`${import.meta.env.BASE_URL}venue-map.png`} alt="EDC Las Vegas 2026 festival map" className="venue-map-img" />
          </div>
        </div>
      </div>

      {/* Desktop: map as a modal overlay */}
      {showMap && (
        <div className="map-overlay" onClick={() => setShowMap(false)}>
          <button className="map-close" onClick={() => setShowMap(false)} aria-label="Close map">×</button>
          <div className="map-modal" onClick={e => e.stopPropagation()}>
            <img src={`${import.meta.env.BASE_URL}venue-map.png`} alt="EDC Las Vegas 2026 festival map" className="venue-map-img" />
            <div className="map-caption">
              EDC Las Vegas 2026 · official festival map
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
