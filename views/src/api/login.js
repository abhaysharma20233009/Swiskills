import axios from 'axios';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
      withCredentials: true, // Only if your backend uses cookies for session management
    });

    if (res.data.status === 'success') {
      console.log(res.data.data);
      console.log('Logged in successfully!');
      console.log;
      // Store user data in cookies (or localStorage as preferred)
      // window.setTimeout(() => {
      //   location.assign('/'); // Redirect after login
      // }, 1500);
    }
  } catch (err) {
    console.log('Error:', err.response?.data?.message || err.message);
  }
};
