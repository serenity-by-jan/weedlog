/* ------------------------------------------------------------------ */
/*  Shared types & mock data for Preview demos                         */
/* ------------------------------------------------------------------ */

export type StrainType = 'sativa' | 'indica' | 'hybrid';

export interface Strain {
  id: string;
  name: string;
  type: StrainType;
  thc: number;
  cbd: number;
  aliases: string[];
  description: string;
  parents: [string, string] | null;
  terpenes: TerpeneProfile[];
  flavors: string[];
}

export interface TerpeneProfile {
  name: string;
  percentage: number;
}

export interface Session {
  id: string;
  strainId: string;
  method: ConsumptionMethod;
  rating: number;
  reactions: string[];
  note: string;
  date: string;
  friendRatings: { name: string; rating: number }[];
}

export type ConsumptionMethod =
  | 'smoke'
  | 'vape'
  | 'dab'
  | 'edible'
  | 'drink'
  | 'topical';

export const CONSUMPTION_METHODS: ConsumptionMethod[] = [
  'smoke',
  'vape',
  'dab',
  'edible',
  'drink',
  'topical',
];

export const METHOD_LABELS: Record<ConsumptionMethod, string> = {
  smoke: 'Smoke',
  vape: 'Vape',
  dab: 'Dab',
  edible: 'Edible',
  drink: 'Drink',
  topical: 'Topical',
};

export const REACTIONS = [
  'Relaxed',
  'Happy',
  'Euphoric',
  'Uplifted',
  'Creative',
  'Focused',
  'Energetic',
  'Sleepy',
  'Hungry',
  'Tingly',
  'Giggly',
  'Talkative',
];

export const FLAVORS = [
  'Citrus',
  'Berry',
  'Pine',
  'Earthy',
  'Diesel',
  'Floral',
  'Spicy',
  'Sweet',
  'Woody',
  'Tropical',
  'Herbal',
  'Mint',
  'Cheese',
  'Grape',
  'Lavender',
  'Vanilla',
];

export const TERPENE_NAMES = [
  'Myrcene',
  'Limonene',
  'Caryophyllene',
  'Linalool',
  'Pinene',
  'Humulene',
  'Terpinolene',
  'Ocimene',
];

export const mockStrains: Strain[] = [
  {
    id: 's1',
    name: 'Blue Dream',
    type: 'hybrid',
    thc: 21,
    cbd: 0.2,
    aliases: ['Azure Haze', 'Blueberry Dream'],
    description: 'A balanced hybrid with full-body relaxation and gentle cerebral invigoration.',
    parents: ['Blueberry', 'Haze'],
    terpenes: [
      { name: 'Myrcene', percentage: 0.38 },
      { name: 'Caryophyllene', percentage: 0.21 },
      { name: 'Limonene', percentage: 0.16 },
      { name: 'Pinene', percentage: 0.11 },
      { name: 'Linalool', percentage: 0.08 },
      { name: 'Humulene', percentage: 0.05 },
    ],
    flavors: ['Berry', 'Sweet', 'Herbal'],
  },
  {
    id: 's2',
    name: 'Sour Diesel',
    type: 'sativa',
    thc: 26,
    cbd: 0.1,
    aliases: ['Sour D', 'Sour Deez'],
    description: 'Fast-acting, dreamy cerebral effects. Great for daytime productivity.',
    parents: ['Chemdawg 91', 'Super Skunk'],
    terpenes: [
      { name: 'Caryophyllene', percentage: 0.34 },
      { name: 'Myrcene', percentage: 0.28 },
      { name: 'Limonene', percentage: 0.22 },
      { name: 'Pinene', percentage: 0.09 },
      { name: 'Linalool', percentage: 0.04 },
      { name: 'Humulene', percentage: 0.03 },
    ],
    flavors: ['Diesel', 'Citrus', 'Earthy'],
  },
  {
    id: 's3',
    name: 'Granddaddy Purple',
    type: 'indica',
    thc: 23,
    cbd: 0.1,
    aliases: ['GDP', 'Grand Daddy Purp', 'Granddaddy Purps'],
    description: 'Potent indica with grape and berry aroma. Delivers relaxation and euphoria.',
    parents: ['Purple Urkle', 'Big Bud'],
    terpenes: [
      { name: 'Myrcene', percentage: 0.42 },
      { name: 'Pinene', percentage: 0.18 },
      { name: 'Caryophyllene', percentage: 0.14 },
      { name: 'Linalool', percentage: 0.12 },
      { name: 'Limonene', percentage: 0.07 },
      { name: 'Ocimene', percentage: 0.03 },
    ],
    flavors: ['Grape', 'Berry', 'Sweet'],
  },
  {
    id: 's4',
    name: 'Jack Herer',
    type: 'sativa',
    thc: 24,
    cbd: 0.1,
    aliases: ['JH', 'The Jack', 'Premium Jack'],
    description: 'Named after the cannabis activist — blissful, clear-headed, and creative.',
    parents: ['Haze', 'Northern Lights #5'],
    terpenes: [
      { name: 'Terpinolene', percentage: 0.36 },
      { name: 'Pinene', percentage: 0.22 },
      { name: 'Myrcene', percentage: 0.15 },
      { name: 'Caryophyllene', percentage: 0.10 },
      { name: 'Limonene', percentage: 0.08 },
      { name: 'Ocimene', percentage: 0.06 },
    ],
    flavors: ['Pine', 'Earthy', 'Spicy'],
  },
];

export const mockSessions: Session[] = [
  {
    id: 'sess1',
    strainId: 's1',
    method: 'smoke',
    rating: 8,
    reactions: ['Relaxed', 'Happy', 'Creative'],
    note: 'Perfect after-work session. Felt chill but still productive.',
    date: '2026-02-15',
    friendRatings: [
      { name: 'Alex', rating: 7 },
      { name: 'Jordan', rating: 9 },
    ],
  },
  {
    id: 'sess2',
    strainId: 's2',
    method: 'vape',
    rating: 9,
    reactions: ['Energetic', 'Focused', 'Uplifted'],
    note: 'Great for the morning hike. Kept me energized all day.',
    date: '2026-02-14',
    friendRatings: [
      { name: 'Alex', rating: 8 },
      { name: 'Sam', rating: 9 },
    ],
  },
  {
    id: 'sess3',
    strainId: 's3',
    method: 'edible',
    rating: 7,
    reactions: ['Sleepy', 'Relaxed', 'Hungry'],
    note: 'Movie night special. Knocked me out by midnight.',
    date: '2026-02-13',
    friendRatings: [
      { name: 'Jordan', rating: 6 },
    ],
  },
];
