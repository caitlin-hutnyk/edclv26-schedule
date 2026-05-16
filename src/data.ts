export type Stage =
  | 'cosmic'
  | 'stereo'
  | 'bionic'
  | 'kinetic'
  | 'quantum'
  | 'neon'
  | 'circuit'
  | 'bass'
  | 'waste';

export const STAGE_LABELS: Record<Stage, string> = {
  cosmic: 'cosmicMEADOW',
  stereo: 'stereoBLOOM',
  bionic: 'bionicJUNGLE',
  kinetic: 'kineticFIELD',
  quantum: 'quantumVALLEY',
  neon: 'neonGARDEN',
  circuit: 'circuitGROUNDS',
  bass: 'bassPOD',
  waste: 'wasteLAND',
};

// Ordered clockwise around the speedway oval, starting from the entry side.
// Cosmic Meadow is near the entry; Kinetic Field anchors the top; Waste Land closes the loop.
export const STAGES: Stage[] = [
  'cosmic',
  'stereo',
  'bionic',
  'kinetic',
  'quantum',
  'neon',
  'circuit',
  'bass',
  'waste',
];

export type Tier = 'must' | 'want' | 'could';

export interface Act {
  id: string;
  name: string;
  stage: Stage;
  start: number;
  end: number;
  tier?: Tier;
}

export type BlockType = 'act' | 'meander' | 'walk' | 'flex' | 'subheader' | 'meetup';

export interface ItineraryOption {
  actId: string;
  name: string;
  stage: string;
  time: string;
  note?: string;
}

export interface ItineraryBlock {
  type: BlockType;
  actId?: string;
  title: string;
  subtitle?: string;
  start: number;
  end: number;
  stage?: string;
  note?: string;
  options?: ItineraryOption[];
}

export type Day = 'day1' | 'day2' | 'day3';

function t(hour: number, min: number): number {
  return hour * 60 + min;
}

// ============================================================
// DAY 1 — Friday, May 15
// ============================================================
export const day1Acts: Act[] = [
  // kineticFIELD
  { id: 'd1-kf-laidback', name: 'Laidback Luke B2B Chuckie', stage: 'kinetic', start: t(19, 0), end: t(20, 0) },
  { id: 'd1-kf-korolova', name: 'Korolova', stage: 'kinetic', start: t(20, 0), end: t(21, 0) },
  { id: 'd1-kf-argy', name: 'Argy', stage: 'kinetic', start: t(21, 0), end: t(22, 0) },
  { id: 'd1-kf-chris-lorenzo', name: 'Chris Lorenzo', stage: 'kinetic', start: t(22, 7), end: t(23, 15) },
  { id: 'd1-kf-sofi-tukker', name: 'Sofi Tukker', stage: 'kinetic', start: t(23, 19), end: t(24, 30) },
  { id: 'd1-kf-chainsmoker', name: 'The Chainsmokers', stage: 'kinetic', start: t(24, 32), end: t(25, 42), tier: 'could' },
  { id: 'd1-kf-fisher', name: 'Fisher', stage: 'kinetic', start: t(25, 47), end: t(26, 57), tier: 'could' },
  { id: 'd1-kf-porter', name: 'Porter Robinson', stage: 'kinetic', start: t(27, 1), end: t(28, 11), tier: 'could' },
  { id: 'd1-kf-charlotte', name: 'Charlotte De Witte', stage: 'kinetic', start: t(28, 14), end: t(29, 29), tier: 'could' },

  // circuitGROUNDS
  { id: 'd1-cg-1991', name: '1991', stage: 'circuit', start: t(19, 0), end: t(20, 0), tier: 'want' },
  { id: 'd1-cg-bou', name: 'Bou', stage: 'circuit', start: t(20, 0), end: t(21, 0), tier: 'could' },
  { id: 'd1-cg-nico-moreno', name: 'Nico Moreno', stage: 'circuit', start: t(21, 0), end: t(22, 0) },
  { id: 'd1-cg-i-hate-models', name: 'I Hate Models', stage: 'circuit', start: t(22, 0), end: t(23, 15) },
  { id: 'd1-cg-levity', name: 'Levity', stage: 'circuit', start: t(23, 15), end: t(24, 25), tier: 'could' },
  { id: 'd1-cg-wooli', name: 'Wooli', stage: 'circuit', start: t(24, 25), end: t(25, 35), tier: 'want' },
  { id: 'd1-cg-outlaw', name: 'The Outlaw', stage: 'circuit', start: t(25, 35), end: t(26, 35) },
  { id: 'd1-cg-holy-priest', name: 'Holy Priest', stage: 'circuit', start: t(26, 35), end: t(27, 30) },
  { id: 'd1-cg-ray-volpe', name: 'Ray Volpe', stage: 'circuit', start: t(27, 30), end: t(28, 30) },
  { id: 'd1-cg-level-up', name: 'Level Up', stage: 'circuit', start: t(28, 30), end: t(29, 30), tier: 'could' },

  // cosmicMEADOW
  { id: 'd1-cm-max-luke', name: 'Max Dean B2B Luke Dean', stage: 'cosmic', start: t(17, 0), end: t(18, 50) },
  { id: 'd1-cm-jackie', name: 'Jackie Hollander', stage: 'cosmic', start: t(19, 0), end: t(19, 55) },
  { id: 'd1-cm-roddy', name: 'Roddy Lima', stage: 'cosmic', start: t(19, 55), end: t(20, 55) },
  { id: 'd1-cm-westend', name: 'Westend', stage: 'cosmic', start: t(20, 55), end: t(21, 55) },
  { id: 'd1-cm-walker-royce', name: 'Walker & Royce B2B Vnssa', stage: 'cosmic', start: t(21, 55), end: t(22, 55) },
  { id: 'd1-cm-underworld', name: 'Underworld', stage: 'cosmic', start: t(23, 10), end: t(24, 10) },
  { id: 'd1-cm-meduza', name: 'Meduza', stage: 'cosmic', start: t(24, 25), end: t(25, 45) },
  { id: 'd1-cm-notion', name: 'Notion', stage: 'cosmic', start: t(25, 47), end: t(26, 47), tier: 'could' },
  { id: 'd1-cm-mph', name: 'MPH', stage: 'cosmic', start: t(26, 47), end: t(28, 2), tier: 'want' },
  { id: 'd1-cm-san-pacho', name: 'San Pacho', stage: 'cosmic', start: t(28, 2), end: t(29, 30) },

  // bassPOD
  { id: 'd1-bp-riot', name: 'Riot', stage: 'bass', start: t(19, 0), end: t(19, 50) },
  { id: 'd1-bp-heyz', name: 'Heyz', stage: 'bass', start: t(19, 50), end: t(20, 40) },
  { id: 'd1-bp-muzz', name: 'Muzz', stage: 'bass', start: t(20, 40), end: t(21, 30), tier: 'could' },
  { id: 'd1-bp-gorillat', name: 'Gorillat', stage: 'bass', start: t(21, 30), end: t(22, 30) },
  { id: 'd1-bp-ghengar', name: 'Ghengar', stage: 'bass', start: t(22, 30), end: t(23, 30) },
  { id: 'd1-bp-deathpact', name: 'Deathpact', stage: 'bass', start: t(23, 30), end: t(24, 30) },
  { id: 'd1-bp-atliens', name: 'ATLiens', stage: 'bass', start: t(24, 30), end: t(25, 30) },
  { id: 'd1-bp-kai-wachi', name: 'Kai Wachi', stage: 'bass', start: t(25, 30), end: t(26, 30) },
  { id: 'd1-bp-adventure', name: 'Adventure Club', stage: 'bass', start: t(26, 30), end: t(27, 30) },
  { id: 'd1-bp-culture-shock', name: 'Culture Shock', stage: 'bass', start: t(27, 30), end: t(28, 30), tier: 'want' },
  { id: 'd1-bp-cyclops', name: 'Cyclops', stage: 'bass', start: t(28, 30), end: t(29, 30) },

  // neonGARDEN
  { id: 'd1-ng-anastazja', name: 'Anastazja', stage: 'neon', start: t(19, 0), end: t(20, 30) },
  { id: 'd1-ng-mestiza', name: 'Mestiza', stage: 'neon', start: t(20, 30), end: t(22, 0) },
  { id: 'd1-ng-tennis-chloe', name: 'DJ Tennis B2B Chloe Caillet', stage: 'neon', start: t(22, 0), end: t(23, 30) },
  { id: 'd1-ng-peggy-gou', name: 'Peggy Gou', stage: 'neon', start: t(23, 30), end: t(25, 0) },
  { id: 'd1-ng-adriatique', name: 'Adriatique', stage: 'neon', start: t(25, 0), end: t(26, 30), tier: 'could' },
  { id: 'd1-ng-capriati', name: 'Joseph Capriati', stage: 'neon', start: t(26, 30), end: t(28, 0) },
  { id: 'd1-ng-eli-brown', name: 'Eli Brown', stage: 'neon', start: t(28, 0), end: t(29, 30) },

  // quantumVALLEY
  { id: 'd1-qv-sarah-de-warren', name: 'Sarah de Warren', stage: 'quantum', start: t(19, 0), end: t(20, 0) },
  { id: 'd1-qv-matty-ralph', name: 'Matty Ralph', stage: 'quantum', start: t(20, 0), end: t(21, 0) },
  { id: 'd1-qv-cold-blue', name: 'Cold Blue', stage: 'quantum', start: t(21, 0), end: t(22, 0) },
  { id: 'd1-qv-pegassi', name: 'Pegassi', stage: 'quantum', start: t(22, 0), end: t(23, 0) },
  { id: 'd1-qv-darude', name: 'Darude', stage: 'quantum', start: t(23, 0), end: t(24, 0) },
  { id: 'd1-qv-cosmic-gate', name: 'Cosmic Gate', stage: 'quantum', start: t(24, 0), end: t(25, 0) },
  { id: 'd1-qv-gareth-emery', name: 'Gareth Emery', stage: 'quantum', start: t(25, 0), end: t(26, 0) },
  { id: 'd1-qv-ilan-bluestone', name: 'Ilan Bluestone', stage: 'quantum', start: t(26, 0), end: t(27, 0) },
  { id: 'd1-qv-paul-van-dyk', name: 'Paul Van Dyk', stage: 'quantum', start: t(27, 0), end: t(28, 0) },
  { id: 'd1-qv-darren-porter', name: 'Darren Porter', stage: 'quantum', start: t(28, 0), end: t(29, 30) },

  // stereoBLOOM
  { id: 'd1-sb-abana-juliet', name: 'Abana B2B Juliet Mendoza', stage: 'stereo', start: t(19, 0), end: t(20, 0) },
  { id: 'd1-sb-slamm', name: 'Slamm', stage: 'stereo', start: t(20, 0), end: t(21, 0) },
  { id: 'd1-sb-luuk', name: 'Luuk Van Dijk', stage: 'stereo', start: t(21, 0), end: t(22, 15) },
  { id: 'd1-sb-omar', name: 'Omar+', stage: 'stereo', start: t(22, 15), end: t(23, 30) },
  { id: 'd1-sb-luke-dean', name: 'Luke Dean', stage: 'stereo', start: t(23, 30), end: t(24, 45) },
  { id: 'd1-sb-josh-baker', name: 'Josh Baker', stage: 'stereo', start: t(24, 45), end: t(26, 0) },
  { id: 'd1-sb-max-dean', name: 'Max Dean', stage: 'stereo', start: t(26, 0), end: t(27, 15) },
  { id: 'd1-sb-obskur', name: 'Obskur', stage: 'stereo', start: t(27, 15), end: t(28, 30) },
  { id: 'd1-sb-toman', name: 'Toman', stage: 'stereo', start: t(28, 30), end: t(29, 30) },

  // wasteLAND
  { id: 'd1-wl-domina', name: 'Domina', stage: 'waste', start: t(19, 0), end: t(20, 30) },
  { id: 'd1-wl-serafina', name: 'Serafina', stage: 'waste', start: t(20, 30), end: t(21, 30) },
  { id: 'd1-wl-johannes', name: 'Johannes Schuster', stage: 'waste', start: t(21, 30), end: t(22, 30) },
  { id: 'd1-wl-adrian', name: 'Adrian Mills', stage: 'waste', start: t(22, 30), end: t(23, 30) },
  { id: 'd1-wl-cloudy', name: 'Cloudy', stage: 'waste', start: t(23, 30), end: t(24, 30) },
  { id: 'd1-wl-kuko', name: 'Kuko', stage: 'waste', start: t(24, 30), end: t(25, 30) },
  { id: 'd1-wl-gravedgr', name: 'Gravedgr', stage: 'waste', start: t(25, 30), end: t(26, 30) },
  { id: 'd1-wl-rebekah', name: 'Rebekah', stage: 'waste', start: t(26, 30), end: t(27, 30) },
  { id: 'd1-wl-dyen', name: 'Dyen', stage: 'waste', start: t(27, 30), end: t(28, 30) },
  { id: 'd1-wl-stan-christ', name: 'Stan Christ', stage: 'waste', start: t(28, 30), end: t(29, 30) },

  // bionicJUNGLE
  { id: 'd1-bj-heidi-masha', name: 'Heidi Lawden B2B Masha Mar', stage: 'bionic', start: t(17, 0), end: t(19, 0) },
  { id: 'd1-bj-stacy', name: 'Stacy Christine', stage: 'bionic', start: t(19, 0), end: t(20, 0) },
  { id: 'd1-bj-carry-nation', name: 'The Carry Nation', stage: 'bionic', start: t(20, 0), end: t(21, 30) },
  { id: 'd1-bj-massimiliano', name: 'Massimiliano Pagliara', stage: 'bionic', start: t(21, 30), end: t(23, 0) },
  { id: 'd1-bj-paramida', name: 'Paramida', stage: 'bionic', start: t(23, 0), end: t(24, 30) },
  { id: 'd1-bj-salute-chloe', name: 'Salute B2B Chloe Caillet', stage: 'bionic', start: t(24, 30), end: t(26, 30), tier: 'want' },
  { id: 'd1-bj-robert-hood', name: 'Robert Hood', stage: 'bionic', start: t(26, 30), end: t(28, 0) },
  { id: 'd1-bj-avalon', name: 'Avalon Emerson', stage: 'bionic', start: t(28, 0), end: t(29, 30) },
];

// ============================================================
// DAY 2 — Saturday, May 16
// ============================================================
export const day2Acts: Act[] = [
  // kineticFIELD
  { id: 'd2-kf-arco', name: 'Ar/Co', stage: 'kinetic', start: t(19, 0), end: t(20, 0) },
  { id: 'd2-kf-hayla', name: 'Hayla', stage: 'kinetic', start: t(20, 0), end: t(21, 0) },
  { id: 'd2-kf-sub-focus', name: 'Sub Focus', stage: 'kinetic', start: t(21, 0), end: t(22, 0), tier: 'want' },
  { id: 'd2-kf-aoki', name: 'Steve Aoki', stage: 'kinetic', start: t(22, 7), end: t(23, 15) },
  { id: 'd2-kf-hardwell', name: 'Hardwell', stage: 'kinetic', start: t(23, 19), end: t(24, 29) },
  { id: 'd2-kf-john-summit', name: 'John Summit', stage: 'kinetic', start: t(24, 32), end: t(25, 42), tier: 'could' },
  { id: 'd2-kf-subtronics', name: 'Subtronics', stage: 'kinetic', start: t(25, 47), end: t(26, 57), tier: 'could' },
  { id: 'd2-kf-kaskade', name: 'Kaskade', stage: 'kinetic', start: t(27, 1), end: t(28, 11), tier: 'want' },
  { id: 'd2-kf-above-beyond', name: 'Above & Beyond', stage: 'kinetic', start: t(28, 14), end: t(29, 29), tier: 'want' },

  // circuitGROUNDS
  { id: 'd2-cg-dj-mandy', name: 'DJ Mandy', stage: 'circuit', start: t(19, 0), end: t(20, 0) },
  { id: 'd2-cg-roz', name: 'Roz', stage: 'circuit', start: t(20, 0), end: t(21, 15) },
  { id: 'd2-cg-kettama', name: 'Kettama', stage: 'circuit', start: t(21, 15), end: t(22, 45), tier: 'could' },
  { id: 'd2-cg-sammy-virji', name: 'Sammy Virji', stage: 'circuit', start: t(22, 45), end: t(24, 15), tier: 'want' },
  { id: 'd2-cg-tiesto', name: 'Tiësto', stage: 'circuit', start: t(24, 15), end: t(25, 45), tier: 'could' },
  { id: 'd2-cg-peggy-kiki', name: 'Peggy Gou B2B Ki/Ki', stage: 'circuit', start: t(25, 45), end: t(27, 15) },
  { id: 'd2-cg-boys-noize', name: 'Boys Noize', stage: 'circuit', start: t(27, 15), end: t(28, 30) },
  { id: 'd2-cg-lilly-palmer', name: 'Lilly Palmer', stage: 'circuit', start: t(28, 30), end: t(29, 30) },

  // cosmicMEADOW
  { id: 'd2-cm-frost', name: 'Frost Children', stage: 'cosmic', start: t(19, 0), end: t(20, 15) },
  { id: 'd2-cm-hannah-laing', name: 'Hannah Laing', stage: 'cosmic', start: t(20, 15), end: t(21, 25) },
  { id: 'd2-cm-snow-strippers', name: 'Snow Strippers', stage: 'cosmic', start: t(21, 25), end: t(22, 15) },
  { id: 'd2-cm-vtss', name: 'VTSS', stage: 'cosmic', start: t(22, 15), end: t(23, 30) },
  { id: 'd2-cm-prodigy', name: 'The Prodigy', stage: 'cosmic', start: t(23, 35), end: t(24, 35) },
  { id: 'd2-cm-bunt', name: 'Bunt.', stage: 'cosmic', start: t(24, 40), end: t(26, 10), tier: 'could' },
  { id: 'd2-cm-interplanetary', name: 'Interplanetary Criminal', stage: 'cosmic', start: t(26, 10), end: t(27, 30) },
  { id: 'd2-cm-malugi', name: 'Malugi', stage: 'cosmic', start: t(27, 30), end: t(28, 30) },
  { id: 'd2-cm-gigola-mcrt', name: 'DJ Gigola B2B MCR-T', stage: 'cosmic', start: t(28, 30), end: t(29, 30) },

  // bassPOD
  { id: 'd2-bp-fallen-dino', name: 'Fallen With MC Dino', stage: 'bass', start: t(19, 0), end: t(19, 50) },
  { id: 'd2-bp-avello-dennett', name: 'Avello B2B Dennett', stage: 'bass', start: t(19, 50), end: t(20, 40) },
  { id: 'd2-bp-viperactive', name: 'Viperactive', stage: 'bass', start: t(20, 40), end: t(21, 30) },
  { id: 'd2-bp-hybrid-minds', name: 'Hybrid Minds', stage: 'bass', start: t(21, 30), end: t(22, 30), tier: 'want' },
  { id: 'd2-bp-ydg', name: 'YDG', stage: 'bass', start: t(22, 30), end: t(23, 30) },
  { id: 'd2-bp-delta-heavy', name: 'Delta Heavy', stage: 'bass', start: t(23, 30), end: t(24, 30), tier: 'want' },
  { id: 'd2-bp-getter', name: 'Getter', stage: 'bass', start: t(24, 30), end: t(25, 30) },
  { id: 'd2-bp-eptic-space-laces', name: 'Eptic B2B Space Laces', stage: 'bass', start: t(25, 30), end: t(26, 30) },
  { id: 'd2-bp-doctor-flux-funtcase', name: 'Doctor P B2B Flux Pavilion B2B Funtcase', stage: 'bass', start: t(26, 30), end: t(27, 30), tier: 'want' },
  { id: 'd2-bp-hol', name: 'Hol!', stage: 'bass', start: t(27, 30), end: t(28, 30) },
  { id: 'd2-bp-mary-droppinz', name: 'Mary Droppinz', stage: 'bass', start: t(28, 30), end: t(29, 30), tier: 'want' },

  // neonGARDEN
  { id: 'd2-ng-mink', name: 'Mink', stage: 'neon', start: t(19, 0), end: t(20, 30) },
  { id: 'd2-ng-silvie-loto', name: 'Silvie Loto', stage: 'neon', start: t(20, 30), end: t(22, 0) },
  { id: 'd2-ng-ahmed-spins', name: 'Ahmed Spins', stage: 'neon', start: t(22, 0), end: t(23, 30) },
  { id: 'd2-ng-luciano', name: 'Luciano', stage: 'neon', start: t(23, 30), end: t(25, 30) },
  { id: 'd2-ng-prospa', name: 'Prospa', stage: 'neon', start: t(25, 30), end: t(27, 30), tier: 'could' },
  { id: 'd2-ng-josh-kettama-prospa', name: 'Josh Baker B2B Kettama B2B Prospa', stage: 'neon', start: t(27, 30), end: t(29, 30) },

  // quantumVALLEY
  { id: 'd2-qv-maria-healy', name: 'Maria Healy', stage: 'quantum', start: t(19, 0), end: t(20, 30) },
  { id: 'd2-qv-superstrings', name: 'Superstrings', stage: 'quantum', start: t(20, 30), end: t(21, 30) },
  { id: 'd2-qv-billy-gillies', name: 'Billy Gillies', stage: 'quantum', start: t(21, 30), end: t(22, 30) },
  { id: 'd2-qv-paul-oakenfold', name: 'Paul Oakenfold', stage: 'quantum', start: t(22, 30), end: t(23, 30) },
  { id: 'd2-qv-andrew-rayel', name: 'Andrew Rayel', stage: 'quantum', start: t(23, 30), end: t(24, 30) },
  { id: 'd2-qv-maddix', name: 'Maddix', stage: 'quantum', start: t(24, 30), end: t(25, 30) },
  { id: 'd2-qv-mathame', name: 'Mathame', stage: 'quantum', start: t(25, 30), end: t(26, 30) },
  { id: 'd2-qv-astrix', name: 'Astrix', stage: 'quantum', start: t(26, 30), end: t(27, 30) },
  { id: 'd2-qv-t78', name: 'T78', stage: 'quantum', start: t(27, 30), end: t(28, 30) },
  { id: 'd2-qv-thomas-schumacher', name: 'Thomas Schumacher', stage: 'quantum', start: t(28, 30), end: t(29, 30) },

  // stereoBLOOM
  { id: 'd2-sb-slugg', name: 'Slugg', stage: 'stereo', start: t(19, 0), end: t(20, 0) },
  { id: 'd2-sb-dreya-v', name: 'Dreya V', stage: 'stereo', start: t(20, 0), end: t(21, 0) },
  { id: 'd2-sb-discip', name: 'Discip', stage: 'stereo', start: t(21, 0), end: t(22, 0) },
  { id: 'd2-sb-omnom', name: 'Omnom', stage: 'stereo', start: t(22, 0), end: t(23, 15) },
  { id: 'd2-sb-noizu', name: 'Noizu', stage: 'stereo', start: t(23, 15), end: t(24, 30) },
  { id: 'd2-sb-wax-motif', name: 'Wax Motif', stage: 'stereo', start: t(24, 30), end: t(25, 45) },
  { id: 'd2-sb-cid', name: 'CID', stage: 'stereo', start: t(25, 45), end: t(27, 0) },
  { id: 'd2-sb-hntr', name: 'HNTR', stage: 'stereo', start: t(27, 0), end: t(28, 15) },
  { id: 'd2-sb-bolo', name: 'Bolo', stage: 'stereo', start: t(28, 15), end: t(29, 30) },

  // wasteLAND
  { id: 'd2-wl-cutdwn', name: 'Cutdwn', stage: 'waste', start: t(19, 0), end: t(20, 30) },
  { id: 'd2-wl-dead-x', name: 'Dead X', stage: 'waste', start: t(20, 30), end: t(21, 30) },
  { id: 'd2-wl-the-saints', name: 'The Saints', stage: 'waste', start: t(21, 30), end: t(22, 30) },
  { id: 'd2-wl-rob-gee-lenny', name: 'Rob Gee B2B Lenny Dee', stage: 'waste', start: t(22, 30), end: t(23, 30) },
  { id: 'd2-wl-lady-faith-lny', name: 'Lady Faith B2B LNY TNZ', stage: 'waste', start: t(23, 30), end: t(24, 30) },
  { id: 'd2-wl-code-black-audiofreq', name: 'Code Black B2B Audiofreq B2B Toneshifterz', stage: 'waste', start: t(24, 30), end: t(25, 30) },
  { id: 'd2-wl-da-tweekaz', name: 'Da Tweekaz', stage: 'waste', start: t(25, 30), end: t(26, 30) },
  { id: 'd2-wl-lil-texas', name: 'Lil Texas', stage: 'waste', start: t(26, 30), end: t(27, 30) },
  { id: 'd2-wl-mish', name: 'Mish', stage: 'waste', start: t(27, 30), end: t(28, 30) },
  { id: 'd2-wl-alyssa-jolee', name: 'Alyssa Jolee', stage: 'waste', start: t(28, 30), end: t(29, 30) },

  // bionicJUNGLE
  { id: 'd2-bj-player-dave', name: 'Player Dave', stage: 'bionic', start: t(19, 0), end: t(20, 0) },
  { id: 'd2-bj-spray', name: 'Spray', stage: 'bionic', start: t(20, 0), end: t(21, 0) },
  { id: 'd2-bj-bashkka-sedef', name: 'Bashkka B2B Sedef Adasi', stage: 'bionic', start: t(21, 0), end: t(22, 30) },
  { id: 'd2-bj-haai-luke', name: 'HAAi B2B Luke Alessi', stage: 'bionic', start: t(22, 30), end: t(24, 0) },
  { id: 'd2-bj-mcrt', name: 'MCR-T', stage: 'bionic', start: t(24, 0), end: t(25, 15) },
  { id: 'd2-bj-bad-boombox-ollie', name: 'Bad Boombox B2B Ollie Lishman', stage: 'bionic', start: t(25, 15), end: t(26, 30) },
  { id: 'd2-bj-benwal', name: 'Benwal', stage: 'bionic', start: t(26, 30), end: t(27, 30) },
  { id: 'd2-bj-baugruppe90', name: 'Baugruppe90', stage: 'bionic', start: t(27, 30), end: t(28, 30) },
  { id: 'd2-bj-club-angel', name: 'Club Angel', stage: 'bionic', start: t(28, 30), end: t(29, 30) },
];

// ============================================================
// DAY 3 — Sunday, May 17
// ============================================================
export const day3Acts: Act[] = [
  // kineticFIELD
  { id: 'd3-kf-trace', name: 'Trace', stage: 'kinetic', start: t(19, 0), end: t(20, 0) },
  { id: 'd3-kf-ship-wrek', name: 'Ship Wrek', stage: 'kinetic', start: t(20, 0), end: t(21, 0) },
  { id: 'd3-kf-layton', name: 'Layton Giordani', stage: 'kinetic', start: t(21, 0), end: t(22, 0), tier: 'could' },
  { id: 'd3-kf-funk-tribu', name: 'Funk Tribu', stage: 'kinetic', start: t(22, 7), end: t(23, 15) },
  { id: 'd3-kf-griz-wooli', name: 'Griz B2B Wooli', stage: 'kinetic', start: t(23, 19), end: t(24, 29), tier: 'want' },
  { id: 'd3-kf-zedd', name: 'Zedd', stage: 'kinetic', start: t(24, 32), end: t(25, 42), tier: 'could' },
  { id: 'd3-kf-martin-garrix', name: 'Martin Garrix', stage: 'kinetic', start: t(25, 47), end: t(26, 57), tier: 'could' },
  { id: 'd3-kf-cloonee', name: 'Cloonee', stage: 'kinetic', start: t(27, 1), end: t(28, 11), tier: 'could' },
  { id: 'd3-kf-armin', name: 'Armin van Buuren', stage: 'kinetic', start: t(28, 14), end: t(29, 29), tier: 'could' },

  // circuitGROUNDS
  { id: 'd3-cg-linska', name: 'Linska', stage: 'circuit', start: t(19, 0), end: t(20, 30) },
  { id: 'd3-cg-anna', name: 'Anna', stage: 'circuit', start: t(20, 30), end: t(22, 0) },
  { id: 'd3-cg-beltran', name: 'Beltran', stage: 'circuit', start: t(22, 0), end: t(23, 30) },
  { id: 'd3-cg-chris-stussy', name: 'Chris Stussy', stage: 'circuit', start: t(23, 30), end: t(25, 0) },
  { id: 'd3-cg-solomun', name: 'Solomun', stage: 'circuit', start: t(25, 0), end: t(26, 30), tier: 'could' },
  { id: 'd3-cg-vintage-culture', name: 'Vintage Culture', stage: 'circuit', start: t(26, 30), end: t(28, 0) },
  { id: 'd3-cg-kevin-de-vries', name: 'Kevin de Vries', stage: 'circuit', start: t(28, 0), end: t(29, 30) },

  // cosmicMEADOW
  { id: 'd3-cm-gravagerz', name: 'Gravagerz', stage: 'cosmic', start: t(19, 0), end: t(20, 0) },
  { id: 'd3-cm-nostalgix', name: 'Nostalgix', stage: 'cosmic', start: t(20, 0), end: t(21, 0) },
  { id: 'd3-cm-william-black', name: 'William Black', stage: 'cosmic', start: t(21, 0), end: t(22, 0) },
  { id: 'd3-cm-san-holo', name: 'San Holo', stage: 'cosmic', start: t(22, 0), end: t(23, 0) },
  { id: 'd3-cm-dabin', name: 'Dabin', stage: 'cosmic', start: t(23, 0), end: t(24, 5), tier: 'could' },
  { id: 'd3-cm-alison-wonderland', name: 'Alison Wonderland', stage: 'cosmic', start: t(24, 5), end: t(25, 5), tier: 'could' },
  { id: 'd3-cm-seven-lions', name: 'Seven Lions', stage: 'cosmic', start: t(25, 5), end: t(26, 20), tier: 'could' },
  { id: 'd3-cm-restricted', name: 'Restricted', stage: 'cosmic', start: t(26, 20), end: t(27, 20) },
  { id: 'd3-cm-btsm', name: 'Black Tiger Sex Machine', stage: 'cosmic', start: t(27, 20), end: t(28, 30), tier: 'could' },
  { id: 'd3-cm-nico-holy', name: 'Nico Moreno B2B Holy Priest', stage: 'cosmic', start: t(28, 30), end: t(29, 30) },

  // bassPOD
  { id: 'd3-bp-nightstalker', name: 'Nightstalker', stage: 'bass', start: t(19, 0), end: t(19, 50) },
  { id: 'd3-bp-sippy', name: 'Sippy', stage: 'bass', start: t(19, 50), end: t(20, 40) },
  { id: 'd3-bp-eazybaked', name: 'Eazybaked', stage: 'bass', start: t(20, 40), end: t(21, 30) },
  { id: 'd3-bp-infekt-samplifire', name: 'Infekt B2B Samplifire', stage: 'bass', start: t(21, 30), end: t(22, 30) },
  { id: 'd3-bp-amc', name: 'A.M.C', stage: 'bass', start: t(22, 30), end: t(23, 30), tier: 'want' },
  { id: 'd3-bp-virtual-riot', name: 'Virtual Riot', stage: 'bass', start: t(23, 30), end: t(24, 30) },
  { id: 'd3-bp-peekaboo', name: 'Peekaboo', stage: 'bass', start: t(24, 30), end: t(25, 30) },
  { id: 'd3-bp-ahee-liquid', name: 'Ahee B2B Liquid Stranger', stage: 'bass', start: t(25, 30), end: t(26, 30) },
  { id: 'd3-bp-whethan', name: 'Whethan', stage: 'bass', start: t(26, 30), end: t(27, 30) },
  { id: 'd3-bp-boogie-distinct', name: 'Boogie T B2B Distinct Motive', stage: 'bass', start: t(27, 30), end: t(28, 30) },
  { id: 'd3-bp-aeon-mode', name: 'AEON:MODE', stage: 'bass', start: t(28, 30), end: t(29, 30), tier: 'want' },

  // neonGARDEN
  { id: 'd3-ng-bad-beat', name: 'Bad Beat', stage: 'neon', start: t(19, 0), end: t(20, 15) },
  { id: 'd3-ng-frankie-bones', name: 'Frankie Bones', stage: 'neon', start: t(20, 15), end: t(21, 30) },
  { id: 'd3-ng-adiel', name: 'Adiel', stage: 'neon', start: t(21, 30), end: t(22, 50) },
  { id: 'd3-ng-dj-gigola', name: 'DJ Gigola', stage: 'neon', start: t(22, 50), end: t(24, 10) },
  { id: 'd3-ng-999999999', name: '999999999', stage: 'neon', start: t(24, 10), end: t(25, 30) },
  { id: 'd3-ng-indira', name: 'Indira Paganotto', stage: 'neon', start: t(25, 30), end: t(26, 50) },
  { id: 'd3-ng-kiki', name: 'Ki/Ki', stage: 'neon', start: t(26, 50), end: t(28, 10) },
  { id: 'd3-ng-klangkuenstler', name: 'Klangkuenstler', stage: 'neon', start: t(28, 10), end: t(29, 30) },

  // quantumVALLEY
  { id: 'd3-qv-warung', name: 'Warung', stage: 'quantum', start: t(19, 0), end: t(20, 0) },
  { id: 'd3-qv-shingo', name: 'Shingo Nakamura', stage: 'quantum', start: t(20, 0), end: t(21, 0) },
  { id: 'd3-qv-rebuke', name: 'Rebuke', stage: 'quantum', start: t(21, 0), end: t(22, 0) },
  { id: 'd3-qv-cristoph', name: 'Cristoph', stage: 'quantum', start: t(22, 0), end: t(23, 0) },
  { id: 'd3-qv-eli-fur', name: 'Eli & Fur', stage: 'quantum', start: t(23, 0), end: t(24, 0) },
  { id: 'd3-qv-tinlicker', name: 'Tinlicker', stage: 'quantum', start: t(24, 0), end: t(25, 0) },
  { id: 'd3-qv-cassian', name: 'Cassian', stage: 'quantum', start: t(25, 0), end: t(26, 15) },
  { id: 'd3-qv-massano', name: 'Massano', stage: 'quantum', start: t(26, 15), end: t(27, 30) },
  { id: 'd3-qv-innellea', name: 'Innellea', stage: 'quantum', start: t(27, 30), end: t(28, 30) },
  { id: 'd3-qv-kream', name: 'Kream', stage: 'quantum', start: t(28, 30), end: t(29, 30) },

  // stereoBLOOM
  { id: 'd3-sb-klo', name: 'Klo', stage: 'stereo', start: t(19, 0), end: t(20, 0) },
  { id: 'd3-sb-murphys-law', name: "Murphy's Law", stage: 'stereo', start: t(20, 0), end: t(21, 15) },
  { id: 'd3-sb-sidney-bushbaby', name: 'Sidney Charles B2B Bushbaby', stage: 'stereo', start: t(21, 15), end: t(22, 30) },
  { id: 'd3-sb-skream', name: 'Skream', stage: 'stereo', start: t(22, 30), end: t(23, 45) },
  { id: 'd3-sb-hamdi', name: 'Hamdi', stage: 'stereo', start: t(23, 45), end: t(25, 0) },
  { id: 'd3-sb-lorenzo-bullet', name: 'Chris Lorenzo B2B Bullet Tooth', stage: 'stereo', start: t(25, 0), end: t(26, 15) },
  { id: 'd3-sb-silva-bumpa', name: 'Silva Bumpa', stage: 'stereo', start: t(26, 15), end: t(27, 30), tier: 'could' },
  { id: 'd3-sb-morgan-seatree', name: 'Morgan Seatree', stage: 'stereo', start: t(27, 30), end: t(28, 30), tier: 'could' },
  { id: 'd3-sb-lure', name: 'Lu.Re', stage: 'stereo', start: t(28, 30), end: t(29, 30) },

  // wasteLAND
  { id: 'd3-wl-sihk', name: 'Sihk', stage: 'waste', start: t(19, 0), end: t(20, 30) },
  { id: 'd3-wl-clawz', name: 'Clawz', stage: 'waste', start: t(20, 30), end: t(21, 30) },
  { id: 'd3-wl-the-purge', name: 'The Purge', stage: 'waste', start: t(21, 30), end: t(22, 30) },
  { id: 'd3-wl-yosuf', name: 'Yosuf', stage: 'waste', start: t(22, 30), end: t(23, 30) },
  { id: 'd3-wl-dj-isaac', name: 'DJ Isaac', stage: 'waste', start: t(23, 30), end: t(24, 30) },
  { id: 'd3-wl-vieze-asbak', name: 'Vieze Asbak', stage: 'waste', start: t(24, 30), end: t(25, 30) },
  { id: 'd3-wl-sub-zero', name: 'Sub Zero Project', stage: 'waste', start: t(25, 30), end: t(26, 30) },
  { id: 'd3-wl-rooler', name: 'Rooler', stage: 'waste', start: t(26, 30), end: t(27, 30) },
  { id: 'd3-wl-warface', name: 'Warface', stage: 'waste', start: t(27, 30), end: t(28, 30) },
  { id: 'd3-wl-madgrrl-vessel', name: 'Madgrrl B2B Vessel', stage: 'waste', start: t(28, 30), end: t(29, 30) },

  // bionicJUNGLE
  { id: 'd3-bj-alves', name: 'Alves', stage: 'bionic', start: t(19, 0), end: t(20, 30) },
  { id: 'd3-bj-isabella', name: 'Isabella', stage: 'bionic', start: t(20, 30), end: t(22, 30) },
  { id: 'd3-bj-kinahau', name: 'Kinahau', stage: 'bionic', start: t(22, 30), end: t(24, 0) },
  { id: 'd3-bj-tiga', name: 'Tiga', stage: 'bionic', start: t(24, 0), end: t(25, 30) },
  { id: 'd3-bj-tennis-red-axes', name: 'DJ Tennis B2B Red Axes', stage: 'bionic', start: t(25, 30), end: t(27, 30) },
  { id: 'd3-bj-beltran-simas', name: 'Beltran B2B Simas', stage: 'bionic', start: t(27, 30), end: t(29, 30) },
];

// ============================================================
// ITINERARIES — tentative plans, flexible
// ============================================================

export const day1Itinerary: ItineraryBlock[] = [
  {
    type: 'meander',
    title: 'Arrive early + explore',
    start: t(20, 0),
    end: t(23, 0),
  },
  {
    type: 'meetup',
    title: 'Group meet @ water fill · Gate S',
    start: t(21, 30),
    end: t(21, 35),
  },
  {
    type: 'meetup',
    title: 'Group meet @ water fill · Gate S',
    subtitle: 'Before Levity',
    start: t(22, 45),
    end: t(22, 50),
  },
  {
    type: 'act',
    actId: 'd1-cg-levity',
    title: 'Levity',
    stage: 'circuitGROUNDS',
    start: t(23, 15),
    end: t(24, 25),
  },
  {
    type: 'flex',
    title: 'Wooli or Salute',
    start: t(24, 25),
    end: t(25, 47),
    options: [
      { actId: 'd1-cg-wooli', name: 'Wooli', stage: 'CG', time: '12:25–1:35 AM' },
      { actId: 'd1-bj-salute-chloe', name: 'Salute B2B Chloe Caillet', stage: 'BJ', time: '12:30–2:30 AM', note: '~15 min walk from CG' },
    ],
  },
  {
    type: 'flex',
    title: 'Notion or Fisher',
    start: t(25, 47),
    end: t(26, 57),
    options: [
      { actId: 'd1-cm-notion', name: 'Notion', stage: 'CM', time: '1:47–2:47 AM' },
      { actId: 'd1-kf-fisher', name: 'Fisher', stage: 'KF', time: '1:47–2:57 AM' },
    ],
  },
  {
    type: 'meetup',
    title: 'Group meet @ water fill · Gate S',
    start: t(26, 0),
    end: t(26, 5),
  },
  {
    type: 'flex',
    title: 'MPH, Porter Robinson, or Culture Shock',
    start: t(26, 47),
    end: t(28, 30),
    options: [
      { actId: 'd1-cm-mph', name: 'MPH', stage: 'CM', time: '2:47–4:02 AM' },
      { actId: 'd1-kf-porter', name: 'Porter Robinson', stage: 'KF', time: '3:01–4:11 AM' },
      { actId: 'd1-bp-culture-shock', name: 'Culture Shock', stage: 'BP', time: '3:30–4:30 AM' },
    ],
  },
  {
    type: 'flex',
    title: 'Charlotte or head home',
    start: t(28, 14),
    end: t(29, 29),
    options: [
      { actId: 'd1-kf-charlotte', name: 'Charlotte De Witte', stage: 'KF', time: '4:14–5:29 AM' },
      { actId: 'd1-cg-level-up', name: 'Level Up', stage: 'CG', time: '4:30–5:30 AM' },
    ],
  },
];

export const day2Itinerary: ItineraryBlock[] = [
  {
    type: 'meander',
    title: 'Arrive + settle in',
    start: t(20, 0),
    end: t(21, 0),
  },
  {
    type: 'flex',
    title: 'Sub Focus or Hybrid Minds',
    subtitle: 'Overlap 9:30–10 PM — Sub Focus at KF, Hybrid Minds at BP',
    start: t(21, 0),
    end: t(22, 30),
    options: [
      { actId: 'd2-kf-sub-focus', name: 'Sub Focus', stage: 'KF', time: '9–10 PM' },
      { actId: 'd2-bp-hybrid-minds', name: 'Hybrid Minds', stage: 'BP', time: '9:30–10:30 PM' },
    ],
  },
  {
    type: 'meetup',
    title: 'Group meet @ water fill · Gate S',
    start: t(22, 30),
    end: t(22, 35),
  },
  {
    type: 'walk',
    title: '~5 min · BP → CG',
    start: t(22, 30),
    end: t(22, 45),
  },
  {
    type: 'act',
    actId: 'd2-cg-sammy-virji',
    title: 'Sammy Virji',
    stage: 'circuitGROUNDS',
    start: t(22, 45),
    end: t(24, 15),
  },
  {
    type: 'walk',
    title: '~5 min · CG → BP',
    start: t(24, 15),
    end: t(24, 20),
  },
  {
    type: 'act',
    actId: 'd2-bp-delta-heavy',
    title: 'Delta Heavy (tail)',
    stage: 'bassPOD',
    start: t(24, 20),
    end: t(24, 30),
    note: 'Only the last 10 min if Sammy goes full',
  },
  {
    type: 'walk',
    title: '~15 min · BP → KF',
    subtitle: 'Via CG, NG, QV',
    start: t(24, 30),
    end: t(24, 45),
  },
  {
    type: 'flex',
    title: 'KF anchor',
    start: t(24, 45),
    end: t(29, 30),
    options: [
      { actId: 'd2-kf-john-summit', name: 'John Summit (tail)', stage: 'KF', time: 'ends 1:42 AM' },
      { actId: 'd2-kf-subtronics', name: 'Subtronics', stage: 'KF', time: '1:47–2:57 AM' },
      { actId: 'd2-kf-kaskade', name: 'Kaskade', stage: 'KF', time: '3:01–4:11 AM' },
      { actId: 'd2-kf-above-beyond', name: 'Above & Beyond', stage: 'KF', time: '4:14–5:29 AM' },
    ],
  },
  {
    type: 'meetup',
    title: 'Group meet @ water fill · Gate S',
    subtitle: 'To find lost people',
    start: t(25, 0),
    end: t(25, 5),
  },
  {
    type: 'meetup',
    title: 'Group meet @ water fill · Gate S',
    start: t(27, 30),
    end: t(27, 35),
  },
];

export const day3Itinerary: ItineraryBlock[] = [
  {
    type: 'meander',
    title: 'Arrive + drift',
    start: t(20, 0),
    end: t(22, 30),
  },
  {
    type: 'meetup',
    title: 'Group meet @ water fill · Gate S',
    start: t(22, 30),
    end: t(22, 35),
  },
  {
    type: 'act',
    actId: 'd3-bp-amc',
    title: 'A.M.C',
    stage: 'bassPOD',
    start: t(22, 30),
    end: t(23, 10),
    note: 'Leave ~11:10 PM to walk to KF',
  },
  {
    type: 'walk',
    title: '~15 min · BP → KF',
    subtitle: 'Via CG, NG, QV',
    start: t(23, 10),
    end: t(23, 25),
  },
  {
    type: 'act',
    actId: 'd3-kf-griz-wooli',
    title: 'Griz B2B Wooli',
    stage: 'kineticFIELD',
    start: t(23, 25),
    end: t(24, 29),
    note: 'Catch the back ~60 min (set started 11:19 PM)',
  },
  {
    type: 'flex',
    title: 'Open to close — skip Cloonee',
    start: t(24, 29),
    end: t(29, 30),
    options: [
      { actId: 'd3-kf-zedd', name: 'Zedd', stage: 'KF', time: '12:32–1:42 AM' },
      { actId: 'd3-kf-martin-garrix', name: 'Martin Garrix', stage: 'KF', time: '1:47–2:57 AM' },
      { actId: 'd3-kf-armin', name: 'Armin van Buuren', stage: 'KF', time: '4:14–5:29 AM' },
      { actId: 'd3-bp-aeon-mode', name: 'AEON:MODE', stage: 'BP', time: '4:30–5:30 AM', note: '~15 min walk from KF · mutually exclusive with full Armin' },
    ],
  },
  {
    type: 'meetup',
    title: 'Group meet @ water fill · Gate S',
    subtitle: 'To find lost people',
    start: t(25, 0),
    end: t(25, 5),
  },
  {
    type: 'meetup',
    title: 'Group meet @ water fill · Gate S',
    start: t(27, 30),
    end: t(27, 35),
  },
];

export const allData: Record<Day, { acts: Act[]; itinerary: ItineraryBlock[] }> = {
  day1: { acts: day1Acts, itinerary: day1Itinerary },
  day2: { acts: day2Acts, itinerary: day2Itinerary },
  day3: { acts: day3Acts, itinerary: day3Itinerary },
};
