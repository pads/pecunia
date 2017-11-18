export interface Authorization {
  code: string;
  state: string;
}

export interface Token {
  access_token: string;
  client_id: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user_id: string;
}
