// Utility functions for managing attendance via API (shared across all users)

// Use environment variable for backend URL in production, or fallback to localhost
// Set VITE_API_URL in your deployment environment (e.g., https://your-backend.railway.app)
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : 'http://localhost:3001');
const STORAGE_KEY = 'makhdoomeen_attendance_cache'; // Used for caching/offline fallback

/**
 * Get attendance count for a specific person from the server
 * @param {string} personId - The ID of the person
 * @returns {Promise<number>} The attendance count
 */
export const getAttendanceCount = async (personId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/${personId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch attendance');
    }
    const data = await response.json();
    if (data.success) {
      // Cache the result in localStorage for offline use
      const cache = getCachedData();
      cache[personId] = data.data.count;
      setCachedData(cache);
      return data.data.count;
    }
    return 0;
  } catch (error) {
    console.warn('API unavailable, using cached data:', error.message);
    // Fallback to cached data
    const cache = getCachedData();
    return cache[personId] || 0;
  }
};

/**
 * Get all attendance data from the server
 * @returns {Promise<Object>} Object with person IDs as keys and attendance counts as values
 */
export const getAttendanceData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance`);
    if (!response.ok) {
      throw new Error('Failed to fetch attendance data');
    }
    const data = await response.json();
    if (data.success) {
      // Cache the result
      setCachedData(data.data);
      return data.data;
    }
    return {};
  } catch (error) {
    console.warn('API unavailable, using cached data:', error.message);
    return getCachedData();
  }
};

/**
 * Get cached data from localStorage
 * @returns {Object} Cached attendance data
 */
const getCachedData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error reading cached data:', error);
    return {};
  }
};

/**
 * Set cached data in localStorage
 * @param {Object} data - Attendance data to cache
 */
const setCachedData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error caching data:', error);
  }
};

/**
 * Increment attendance count for a person (saves to server - shared with all users)
 * @param {string} personId - The ID of the person
 * @returns {Promise<number>} The new attendance count
 */
export const markAttendance = async (personId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/${personId}/increment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to mark attendance');
    }
    
    const data = await response.json();
    if (data.success) {
      // Update cache
      const cache = getCachedData();
      cache[personId] = data.data.count;
      setCachedData(cache);
      return data.data.count;
    }
    return 0;
  } catch (error) {
    console.error('Error marking attendance:', error);
    // Fallback: increment local cache
    const cache = getCachedData();
    const currentCount = cache[personId] || 0;
    cache[personId] = currentCount + 1;
    setCachedData(cache);
    return cache[personId];
  }
};

/**
 * Decrement attendance count for a person (saves to server - shared with all users)
 * @param {string} personId - The ID of the person
 * @returns {Promise<number>} The new attendance count
 */
export const unmarkAttendance = async (personId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/${personId}/decrement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to unmark attendance');
    }
    
    const data = await response.json();
    if (data.success) {
      // Update cache
      const cache = getCachedData();
      cache[personId] = data.data.count;
      setCachedData(cache);
      return data.data.count;
    }
    return 0;
  } catch (error) {
    console.error('Error unmarking attendance:', error);
    // Fallback: decrement local cache
    const cache = getCachedData();
    const currentCount = cache[personId] || 0;
    if (currentCount > 0) {
      cache[personId] = currentCount - 1;
    } else {
      cache[personId] = 0;
    }
    setCachedData(cache);
    return cache[personId];
  }
};

/**
 * Reset attendance count for a person (saves to server)
 * @param {string} personId - The ID of the person
 */
export const resetAttendance = async (personId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/${personId}/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      // Update cache
      const cache = getCachedData();
      delete cache[personId];
      setCachedData(cache);
    }
  } catch (error) {
    console.error('Error resetting attendance:', error);
    // Fallback: update local cache
    const cache = getCachedData();
    delete cache[personId];
    setCachedData(cache);
  }
};
