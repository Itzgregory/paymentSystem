export type ApiError = {
    response?: {
      data?: {
        message?: string;
      };
      status?: number;
    };
  } & Error;
  
  export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const apiError = error as ApiError;
      return apiError.response?.data?.message || 'An unknown error occurred';
    }
    return 'An unknown error occurred';
  }