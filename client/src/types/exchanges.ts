import { Blockchain } from './blockchains';

export interface Exchange {
  change24h: number;
  icon: string;
  id: string;
  name: string;
  rank: number;
  url: string;
  volume1m: number;
  volume7d: number;
  volume24h: number;
}

export interface ApiResponse {
  data: Exchange[];
  headers: Record<string, string>;
  res: Record<string, any>;
  status: number;
}

export type BlockchainApiResponse = ApiResponse;
