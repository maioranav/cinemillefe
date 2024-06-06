export interface LoginDTO {
  username: string;
  password: string;
}

export interface AuthStatus {
  isAuthenticated: boolean;
  isLoading: boolean;
  errorMessage?: string;
  authToken?: string;
}

export interface LoginResponse {
  username: string;
  tokenType: 'Bearer';
  accessToken: string;
}
