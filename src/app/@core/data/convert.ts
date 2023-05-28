export class LatestRates {
  success: boolean = false;
  query: Query = new Query();
  info: Info = new Info();
  historical: string = '';
  date: Date = new Date();
  result: number = 0;
}

export class Query {
  from: string = '';
  to: string = '';
  amount: number = 0;
}
export class Info {
  timestamp: number = 0;
  rate: number = 0;
}
