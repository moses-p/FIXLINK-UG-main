const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5051';

interface ApiResponse<T = any> {
  status: string;
  message: string;
  data?: T;
}

interface ApiError {
  status: string;
  message: string;
  error?: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  
  if (!response.ok) {
    const error: ApiError = {
      status: 'error',
      message: data.message || 'An error occurred',
      error: data.error
    };
    throw error;
  }
  
  return data;
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };
  
  return fetch(url, { ...options, headers });
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse<ApiResponse>(response);
  },
  
  register: async (userData: any) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse<ApiResponse>(response);
  }
};

// Users API
export const usersApi = {
  getProfile: async () => {
    const response = await fetchWithAuth(`${API_URL}/api/users/profile`);
    return handleResponse<ApiResponse>(response);
  },
  
  updateProfile: async (userData: any) => {
    const response = await fetchWithAuth(`${API_URL}/api/users/profile`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
    return handleResponse<ApiResponse>(response);
  }
};

// Providers API
export const providersApi = {
  getProviders: async () => {
    const response = await fetch(`${API_URL}/api/providers`);
    return handleResponse<ApiResponse>(response);
  },
  
  getProvider: async (id: number) => {
    const response = await fetch(`${API_URL}/api/providers/${id}`);
    return handleResponse<ApiResponse>(response);
  },
  
  getSavedProviders: async () => {
    const response = await fetchWithAuth(`${API_URL}/api/providers/saved`);
    return handleResponse<ApiResponse>(response);
  },
  
  saveProvider: async (id: number) => {
    const response = await fetchWithAuth(`${API_URL}/api/providers/${id}/save`, {
      method: 'POST'
    });
    return handleResponse<ApiResponse>(response);
  }
};

// Services API
export const servicesApi = {
  getServices: async (providerId?: number) => {
    const url = providerId 
      ? `${API_URL}/api/services?provider_id=${providerId}`
      : `${API_URL}/api/services`;
    const response = await fetch(url);
    return handleResponse<ApiResponse>(response);
  },
  
  getService: async (id: number) => {
    const response = await fetch(`${API_URL}/api/services/${id}`);
    return handleResponse<ApiResponse>(response);
  },
  
  createService: async (serviceData: any) => {
    const response = await fetchWithAuth(`${API_URL}/api/services`, {
      method: 'POST',
      body: JSON.stringify(serviceData)
    });
    return handleResponse<ApiResponse>(response);
  },
  
  updateService: async (id: number, serviceData: any) => {
    const response = await fetchWithAuth(`${API_URL}/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData)
    });
    return handleResponse<ApiResponse>(response);
  }
};

// Bookings API
export const bookingsApi = {
  getBookings: async () => {
    const response = await fetchWithAuth(`${API_URL}/api/bookings`);
    return handleResponse<ApiResponse>(response);
  },
  
  getBooking: async (id: number) => {
    const response = await fetchWithAuth(`${API_URL}/api/bookings/${id}`);
    return handleResponse<ApiResponse>(response);
  },
  
  createBooking: async (bookingData: any) => {
    const response = await fetchWithAuth(`${API_URL}/api/bookings`, {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
    return handleResponse<ApiResponse>(response);
  },
  
  updateBooking: async (id: number, bookingData: any) => {
    const response = await fetchWithAuth(`${API_URL}/api/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookingData)
    });
    return handleResponse<ApiResponse>(response);
  }
};

// Reviews API
export const reviewsApi = {
  getProviderReviews: async (providerId: number) => {
    const response = await fetch(`${API_URL}/api/reviews/provider/${providerId}`);
    return handleResponse<ApiResponse>(response);
  },
  
  createReview: async (reviewData: any) => {
    const response = await fetchWithAuth(`${API_URL}/api/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
    return handleResponse<ApiResponse>(response);
  },
  
  updateReview: async (id: number, reviewData: any) => {
    const response = await fetchWithAuth(`${API_URL}/api/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData)
    });
    return handleResponse<ApiResponse>(response);
  }
};

// Documents API
export const documentsApi = {
  uploadDocument: async (formData: FormData) => {
    const response = await fetchWithAuth(`${API_URL}/api/documents/upload`, {
      method: 'POST',
      body: formData
    });
    return handleResponse<ApiResponse>(response);
  },
  
  getUserDocuments: async () => {
    const response = await fetchWithAuth(`${API_URL}/api/documents/user`);
    return handleResponse<ApiResponse>(response);
  },
  
  getDocument: async (id: number) => {
    const response = await fetchWithAuth(`${API_URL}/api/documents/${id}`);
    return handleResponse<ApiResponse>(response);
  }
};

// Transactions API
export const transactionsApi = {
  createTransaction: async (transactionData: any) => {
    const response = await fetchWithAuth(`${API_URL}/api/transactions`, {
      method: 'POST',
      body: JSON.stringify(transactionData)
    });
    return handleResponse<ApiResponse>(response);
  },
  
  getUserTransactions: async () => {
    const response = await fetchWithAuth(`${API_URL}/api/transactions/user`);
    return handleResponse<ApiResponse>(response);
  },
  
  getTransaction: async (id: number) => {
    const response = await fetchWithAuth(`${API_URL}/api/transactions/${id}`);
    return handleResponse<ApiResponse>(response);
  },
  
  verifyTransaction: async (id: number) => {
    const response = await fetchWithAuth(`${API_URL}/api/transactions/${id}/verify`, {
      method: 'POST'
    });
    return handleResponse<ApiResponse>(response);
  }
}; 