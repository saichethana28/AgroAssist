// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

// Ensure API URL has proper format
export const getApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`
}