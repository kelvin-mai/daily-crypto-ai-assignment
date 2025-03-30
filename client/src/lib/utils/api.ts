import { type ApiError } from '../types/api';

export const throwIfApiError = (request: Response, response: unknown) => {
  if (!request.ok) {
    throw new Error((response as ApiError).message);
  }
};
