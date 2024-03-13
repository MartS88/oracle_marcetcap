export interface Transactions {
  userId: string;
  portfolioName: string;
  id: string;
  coin: string;
  quantity: number;
  price: number;
  totalSpent: number;
  averagePrice: number;
  date: string;
  note: string;
  transactionType: string;
}
