import axios from 'axios';
import { showAlert } from './alert';
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
      showAlert('success',"Signed up successfully");
      window.setTimeout(()=>{
        location.assign('/home');
      },1500);
    }
    }
  } catch (err) {
    console.log('Error:', err.response?.data?.message || err.message);
  }
};
