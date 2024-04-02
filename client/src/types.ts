import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './redux/actionTypes';

export interface AuthState {
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

export interface User {
  login: string;
  email: string;
  userId?: number;
  isInvestor?: boolean;
  createdAt?: string;
}

interface RegistrationRequestAction {
  type: typeof REGISTRATION_REQUEST;
}

interface RegistrationSuccessAction {
  type: typeof REGISTRATION_SUCCESS;
  payload: User;
}

interface RegistrationFailureAction {
  type: typeof REGISTRATION_FAILURE;
  payload: string;
}

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes =
  | RegistrationRequestAction
  | RegistrationSuccessAction
  | RegistrationFailureAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction;
