export interface Blockchain {
  connectionId: string;
  name: string;
  icon: string;
  chain: string;
}

export interface ApiResponse {
  data: Blockchain[];
  headers: Record<string, string>;
  res: Record<string, any>;
  status: number;
}

export type BlockchainApiResponse = ApiResponse;
