const baseUrl = '/api/signup';

const signup = async (username, password) => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.message };
    }
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: 'An error occurred' };
  }
};

export default signup;
