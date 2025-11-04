import { dummyData } from '../assets/assets';

// Use environment variable for backend URL in production, or fallback to localhost
// Set VITE_API_URL in your deployment environment (e.g., https://your-backend.railway.app)
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : 'http://localhost:3001');

/**
 * Convert dummyData to API format
 * @returns {Array} Array of people in API format
 */
function getDummyPeople() {
  try {
    return dummyData
      .filter(item => item && item.student && item.student._id)
      .map(item => ({
        id: item.student._id,
        name: item.student.name || '',
        imageUrl: item.student.imageUrl,
        phone: item.student.phone || '',
        address: item.student.address || '',
        date: item.student.date || '',
        attendance: item.student.attendance || 'absent'
      }));
  } catch (error) {
    console.error('Error processing dummy data:', error);
    return [];
  }
}

/**
 * Fetch all people from the backend, fallback to dummy data if backend unavailable
 * @returns {Promise<Array>} Array of people
 */
export async function fetchPeople() {
  try {
    const response = await fetch(`${API_BASE_URL}/people`);
    if (!response.ok) {
      throw new Error('Failed to fetch people');
    }
    const data = await response.json();
    return data.success ? data.data : getDummyPeople();
  } catch (error) {
    console.warn('Backend unavailable, using dummy data:', error.message);
    return getDummyPeople();
  }
}

/**
 * Fetch a single person by ID, fallback to dummy data if backend unavailable
 * @param {string} id - Person ID
 * @returns {Promise<Object|null>} Person object or null
 */
export async function fetchPersonById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/people`);
    if (!response.ok) {
      throw new Error('Failed to fetch people');
    }
    const data = await response.json();
    if (data.success) {
      const person = data.data.find(person => person.id === id);
      if (person) return person;
    }
    // Fallback to dummy data
    return getDummyPeople().find(person => person.id === id) || null;
  } catch (error) {
    console.warn('Backend unavailable, using dummy data:', error.message);
    // Fallback to dummy data
    return getDummyPeople().find(person => person.id === id) || null;
  }
}

/**
 * Add a new person
 * @param {Object} person - Person object with name and optional attendance
 * @returns {Promise<Object>} Created person
 */
export async function addPerson(person) {
  try {
    const response = await fetch(`${API_BASE_URL}/people`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    });
    if (!response.ok) {
      throw new Error('Failed to add person');
    }
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error adding person:', error);
    throw error;
  }
}

/**
 * Update a person
 * @param {string} id - Person ID
 * @param {Object} updates - Object with fields to update
 * @returns {Promise<Object>} Updated person
 */
export async function updatePerson(id, updates) {
  try {
    const response = await fetch(`${API_BASE_URL}/people/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update person');
    }
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error updating person:', error);
    throw error;
  }
}

/**
 * Delete a person
 * @param {string} id - Person ID
 * @returns {Promise<boolean>} True if deleted successfully
 */
export async function deletePerson(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/people/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete person');
    }
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error deleting person:', error);
    throw error;
  }
}

/**
 * Update attendance status
 * @param {string} id - Person ID
 * @param {string} attendance - 'present' or 'absent'
 * @returns {Promise<Object>} Updated person
 */
export async function updateAttendance(id, attendance) {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attendance }),
    });
    if (!response.ok) {
      throw new Error('Failed to update attendance');
    }
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error updating attendance:', error);
    throw error;
  }
}

