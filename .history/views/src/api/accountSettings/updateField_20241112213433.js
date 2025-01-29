import axios from 'axios';
import { showAlert } from '../alert';

export const updateField = async (name) => {
  try {
    console.log(name);
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMe',
      data: {
        name,
      },
      withCredentials: true, // Only if your backend uses cookies for session management
    });
    console.log('response ', res);
    if (res.data.status === 'success') {
      showAlert('success', 'Field updated successfully!');
      window.setTimeout(()=>{
        location.assign('/home');
      },1500);
      // return res.data.data.skills; // Assuming skills are in this path, update if different
    }
    // return [];
  } catch (err) {
    showAlert('error',`${err.response?.data?.message}`);
    // console.log('Error:', err.response?.data?.message || err.message);
    // return [];
  }
};

export default updateField;
