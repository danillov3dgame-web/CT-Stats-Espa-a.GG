// Tipos para el sistema VLR España

export type TierMasculino = 'LR' | 'DIV 1' | 'DIV 2';
export type TierFemenino = 'LRF' | 'GC';
export type TierTorneo = 'Paradas' | 'Torneo Comunitario' | 'Torneos AM';
export type TierType = TierMasculino | TierFemenino | TierTorneo;

export type Gender = 'masculino' | 'femenino' | 'torneo';

export type PlayerRole = 'Duelist' | 'Initiator' | 'Controller' | 'Sentinel' | 'Flex' | '';

export const ROLES: { value: PlayerRole; label: string; color: string }[] = [
  { value: 'Duelist', label: 'Duelista', color: '#ff4655' },
  { value: 'Initiator', label: 'Iniciador', color: '#f7931e' },
  { value: 'Controller', label: 'Controlador', color: '#3b82f6' },
  { value: 'Sentinel', label: 'Centinela', color: '#22c55e' },
  { value: 'Flex', label: 'Flex', color: '#a855f7' },
];

export interface TierInfo {
  id: TierType;
  name: string;
  gender: Gender;
  priority: number;
  color: string;
}

export const TIERS: TierInfo[] = [
  { id: 'LR', name: 'Liga Radiante', gender: 'masculino', priority: 100, color: '#ff4655' },
  { id: 'DIV 1', name: 'División 1', gender: 'masculino', priority: 80, color: '#ff6b35' },
  { id: 'DIV 2', name: 'División 2', gender: 'masculino', priority: 60, color: '#f7931e' },
  { id: 'LRF', name: 'Liga Radiante Femenina', gender: 'femenino', priority: 100, color: '#ff4655' },
  { id: 'GC', name: 'Game Changers', gender: 'femenino', priority: 70, color: '#c084fc' },
  { id: 'Paradas', name: 'Paradas', gender: 'torneo', priority: 50, color: '#3b82f6' },
  { id: 'Torneo Comunitario', name: 'Torneo Comunitario', gender: 'torneo', priority: 30, color: '#22c55e' },
  { id: 'Torneos AM', name: 'Torneos AM', gender: 'torneo', priority: 20, color: '#6b7280' },
];

export interface PlayerStats {
  acs: number;
  kd: number;
  adr: number;
  kast: number;
  fb: number;
  fd: number;
  fkfd: number;
  roundsPlayed: number;
  matchesPlayed: number;
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  assists: number;
  headshotPercentage: number;
  clutches: number;
  clutchesWon: number;
}

export interface Player {
  id: string;
  name: string;
  tag?: string;
  realName?: string;
  nationality?: string;
  role?: PlayerRole;
  teamId?: string;
  stats: PlayerStats;
  rating: number;
  peakRating: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamStats {
  matchesPlayed: number;
  wins: number;
  losses: number;
  roundsWon: number;
  roundsLost: number;
  tournamentWins: number;
  tournamentTop4: number;
  recentForm: ('W' | 'L')[];
}

export interface Team {
  id: string;
  name: string;
  shortName?: string;
  logo?: string;
  tier: TierType;
  gender: Gender;
  players: string[];
  stats: TeamStats;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export type MatchStatus = 'upcoming' | 'live' | 'completed' | 'cancelled';

export interface PlayerMatchStats {
  playerId: string;
  agent: string;
  kills: number;
  deaths: number;
  assists: number;
  acs: number;
  adr: number;
  kast: number;
  fb: number;
  fd: number;
  headshots: number;
  bodyshots: number;
  legshots: number;
  econRating: number;
  plants: number;
  defuses: number;
  clutches: number;
  clutchesWon: number;
  firstKills: number;
  firstDeaths: number;
  multiKills: number[];
}

export interface MapResult {
  map: string;
  teamAScore: number;
  teamBScore: number;
  teamAStats: PlayerMatchStats[];
  teamBStats: PlayerMatchStats[];
  pickedBy?: string;
  duration?: number;
}

export interface Match {
  id: string;
  eventId: string;
  tier: TierType;
  gender: Gender;
  teamAId: string;
  teamBId: string;
  teamAScore: number;
  teamBScore: number;
  maps: MapResult[];
  status: MatchStatus;
  scheduledAt: string;
  completedAt?: string;
  streamUrl?: string;
  vodUrl?: string;
  mvpId?: string;
  createdAt: string;
  updatedAt: string;
}

export type EventStatus = 'upcoming' | 'ongoing' | 'completed';
export type EventType = 'league' | 'tournament' | 'lan';

export interface Event {
  id: string;
  name: string;
  shortName?: string;
  tier: TierType;
  gender: Gender;
  type: EventType;
  description?: string;
  prizePool?: string;
  location?: string;
  startDate: string;
  endDate: string;
  status: EventStatus;
  teams: string[];
  matches: string[];
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ranking {
  teamId: string;
  rank: number;
  previousRank: number;
  points: number;
  tier: TierType;
  gender: Gender;
  matchesPlayed: number;
  wins: number;
  losses: number;
  winRate: number;
  tournamentPoints: number;
  matchPoints: number;
  recentFormPoints: number;
}

export interface SystemConfig {
  version: string;
  lastUpdated: string;
  ratingWeights: {
    acs: number;
    kd: number;
    adr: number;
    kast: number;
    fkfd: number;
    winBonus: number;
    tierMultiplier: Record<TierType, number>;
  };
  rankingPoints: {
    win: number;
    loss: number;
    tournamentWin: number;
    tournamentTop4: number;
    tierMultiplier: Record<TierType, number>;
  };
}

export interface AppState {
  players: Record<string, Player>;
  teams: Record<string, Team>;
  matches: Record<string, Match>;
  events: Record<string, Event>;
  rankings: Record<string, Ranking>;
  config: SystemConfig;
}

// Tipos para autenticación
export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  displayName?: string;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

// Tipos para noticias y fichajes
export type NewsType = 'news' | 'transfer' | 'rumor' | 'announcement';
export type NewsStatus = 'draft' | 'published' | 'archived';

export interface News {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  type: NewsType;
  status: NewsStatus;
  authorId: string;
  image?: string;
  tags: string[];
  relatedTeamId?: string;
  relatedPlayerId?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Tipos para transferencias/fichajes
export interface Transfer {
  id: string;
  playerId: string;
  fromTeamId?: string;
  toTeamId: string;
  type: 'transfer' | 'loan' | 'free_agent' | 'promotion';
  date: string;
  announcedAt?: string;
  status: 'rumor' | 'confirmed' | 'official';
  notes?: string;
  createdAt: string;
}
