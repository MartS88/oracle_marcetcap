import { Transactions } from './transactions';

export interface Portfolio {
  userId: number;
  id: number;
  name: string;
  avatar: string;
  totalProfitLoss: string;
  icon: string;
  transactions: Transactions[];
}
