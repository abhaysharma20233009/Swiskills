import axios from 'axios';
import { showAlert } from './alert';
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
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(()=>{
        location.assign('/home');
      },1500);
    }
  } catch (err) {
    
    showAlert('error',err.response.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
  console.log(res.data.status);
    if (res.data.status === 'success') {
      showAlert('success', 'logged out successfully!!!.');
     return res.data.status;
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
