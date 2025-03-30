import { type ApiError } from '../types/api';

export const throwIfApiError = (response: unknown) => {
  if ((response as ApiError)?.message) {
    throw new Error((response as ApiError).message);
  }
};
