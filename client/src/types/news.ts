export interface NewsItem {
  id: string;
  searchKeyWords: string[];
  feedDate: number;
  source: string;
  title: string;
  sourceLink: string;
  isFeatured: boolean;
  imgUrl: string;
  reactionsCount: { [key: string]: number };
  shareURL: string;
  relatedCoins: string[];
  content: boolean;
  link: string;
  bigImg: boolean;
}

export interface ApiNewsResponse {
  result: NewsItem[];
  total: number;
}
