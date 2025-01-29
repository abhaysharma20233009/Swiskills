import axios from 'axios';

export const updateField = async (data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMe',
      data: data,
      withCredentials: true, // Only if your backend uses cookies for session management
    });
    console.log('response ', res);
    if (res.data.status === 'success') {
      showAlert('success', 'Field updated successfully!');
      window.setTimeout(()=>{
        location.assign('/home');
      },1500);
    }
    // return [];
  } catch (err) {
    showAlert('error',`${err.response?.data?.message}`);
    console.log('Error:', err.response?.data?.message || err.message);
    // return [];
  }
};

export default updateField;
