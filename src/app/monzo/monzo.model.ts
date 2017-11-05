export type AccountType = 'uk_retail' | 'uk_prepaid';

export interface Account {
  id: string;
  type: AccountType;
  description: string;
  created: string;
  account_number?: number;
  sort_code?: number;
}

export interface Accounts {
  accounts: Account[];
}
