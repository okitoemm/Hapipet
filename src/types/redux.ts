import { User, DogsitterProfile } from './index';

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface DogsitterState {
  dogsitters: DogsitterProfile[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  dogsitter: DogsitterState;
}