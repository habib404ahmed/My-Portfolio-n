// Centralized Admin API Client with Robust Error Handling, CORS & Credentials Support

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export class ApiError extends Error {
  status: number
  code?: string

  constructor(message: string, status: number = 0, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

/**
 * Perform an authenticated API request with automatic credential handling,
 * CORS headers, and resilient diagnostic error formatting.
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('admin_token') : null

  const headers = new Headers(options.headers || {})
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const mergedOptions: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // Always send HTTP-only cookies
  }

  try {
    const res = await fetch(url, mergedOptions)
    return res
  } catch (err: any) {
    // Network / connectivity error handling
    const isNetworkError =
      err instanceof TypeError ||
      err.message?.includes('Failed to fetch') ||
      err.message?.includes('NetworkError') ||
      err.message?.includes('Network request failed') ||
      err.message?.includes('ECONNREFUSED')

    if (isNetworkError) {
      throw new ApiError(
        'Unable to connect to the authentication server. Please ensure the backend is running.',
        0,
        'NETWORK_DISCONNECTED'
      )
    }

    throw new ApiError(err.message || 'An unexpected error occurred.', 0, 'UNKNOWN')
  }
}

/**
 * Helper to parse JSON safely with user-friendly error fallback
 */
export async function parseApiResponse<T = any>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorMsg = `Server responded with status ${res.status}`
    try {
      const data = await res.json()
      if (data && data.error) {
        errorMsg = data.error
      }
    } catch {
      // Ignore JSON parse error on non-JSON response
    }

    if (res.status === 401) {
      throw new ApiError('Invalid username or password.', 401, 'UNAUTHORIZED')
    }
    if (res.status === 429) {
      throw new ApiError(errorMsg || 'Too many attempts. Please try again later.', 429, 'RATE_LIMITED')
    }
    if (res.status === 502 || res.status === 503 || res.status === 504) {
      throw new ApiError('The authentication server is temporarily unavailable.', res.status, 'UNAVAILABLE')
    }

    throw new ApiError(errorMsg, res.status)
  }

  return res.json()
}
