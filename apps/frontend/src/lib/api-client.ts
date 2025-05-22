import { ApiResponse, ApiError } from 'shared';

// API base URL from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * API client options
 */
interface ApiClientOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

/**
 * Generic API client for making HTTP requests
 */
export class ApiClient {
  /**
   * Make a GET request
   * @param endpoint API endpoint
   * @param options Request options
   * @returns Response data
   */
  static async get<T>(endpoint: string, options: ApiClientOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, null, options);
  }

  /**
   * Make a POST request
   * @param endpoint API endpoint
   * @param data Request body
   * @param options Request options
   * @returns Response data
   */
  static async post<T>(endpoint: string, data: unknown, options: ApiClientOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data, options);
  }

  /**
   * Make a PUT request
   * @param endpoint API endpoint
   * @param data Request body
   * @param options Request options
   * @returns Response data
   */
  static async put<T>(endpoint: string, data: unknown, options: ApiClientOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data, options);
  }

  /**
   * Make a DELETE request
   * @param endpoint API endpoint
   * @param options Request options
   * @returns Response data
   */
  static async delete<T>(endpoint: string, options: ApiClientOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, null, options);
  }

  /**
   * Make a request to the API
   * @param method HTTP method
   * @param endpoint API endpoint
   * @param data Request body
   * @param options Request options
   * @returns Response data
   */
  private static async request<T>(
    method: string,
    endpoint: string,
    data: unknown | null,
    options: ApiClientOptions
  ): Promise<ApiResponse<T>> {
    try {
      // Build URL with query parameters
      const url = new URL(`${API_BASE_URL}${endpoint}`);
      if (options.params) {
        Object.entries(options.params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }

      // Build request headers
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers,
      };

      // Make request
      const response = await fetch(url.toString(), {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });

      // Parse response
      const responseData = await response.json();

      // Handle error responses
      if (!response.ok) {
        throw this.handleErrorResponse(response.status, responseData);
      }

      return responseData as ApiResponse<T>;
    } catch (error) {
      // Re-throw API errors
      if (error instanceof ApiClientError) {
        throw error;
      }

      // Handle other errors
      console.error('API request failed:', error);
      throw new ApiClientError(
        'request_failed',
        'Failed to complete the request',
        { originalError: error }
      );
    }
  }

  /**
   * Handle error response from API
   * @param status HTTP status code
   * @param data Response data
   * @returns API client error
   */
  private static handleErrorResponse(status: number, data: Record<string, unknown>): Error {
    // Use error from response if available
    if (data && typeof data.error === 'object' && data.error !== null) {
      const errorObj = data.error as Record<string, unknown>;
      return new ApiClientError(
        (errorObj.code as string) || 'api_error',
        (errorObj.message as string) || 'An error occurred',
        errorObj.details as Record<string, unknown> | undefined
      );
    }

    // Default error messages based on status code
    const statusMessages: Record<number, { code: string; message: string }> = {
      400: { code: 'bad_request', message: 'Bad request' },
      401: { code: 'unauthorized', message: 'Unauthorized' },
      403: { code: 'forbidden', message: 'Forbidden' },
      404: { code: 'not_found', message: 'Resource not found' },
      500: { code: 'server_error', message: 'Internal server error' },
    };

    const defaultError = statusMessages[status] || {
      code: 'unknown_error',
      message: 'An unknown error occurred',
    };

    return new ApiClientError(defaultError.code, defaultError.message);
  }
}

/**
 * API client error
 */
export class ApiClientError extends Error implements ApiError {
  code: string;
  details?: Record<string, unknown>;

  constructor(code: string, message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = 'ApiClientError';
    this.code = code;
    this.details = details;
  }
}
