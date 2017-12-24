export type AccountType = 'uk_retail' | 'uk_prepaid';

export type MonzoErrorCode = 'unauthorized.bad_access_token';

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

export interface Authentication {
  authenticated: boolean;
  client_id: string;
  user_id: string;
}

export interface MonzoError {
  code: MonzoErrorCode;
  error: string;
  error_description: string;
  message: string;
}
