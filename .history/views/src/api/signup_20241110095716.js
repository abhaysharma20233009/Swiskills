import axios from 'axios';

export const signup = async (username, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        username,
        email,
        password,
        passwordConfirm,
      },
      withCredentials: true,
    });

    if (res.data.status === 'success') {
      console.log(res.data.data);
      console.log('Signup in successfully!');
      // Store user data in cookies (or localStorage as preferred)
      // window.setTimeout(() => {
      //   location.assign('/'); // Redirect after login
      // }, 1500);
    }
  } catch (err) {
    console.log('Error:', err.response?.data?.message || err.message);
  }
};
