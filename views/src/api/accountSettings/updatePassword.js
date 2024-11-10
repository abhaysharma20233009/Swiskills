import axios from 'axios';

export const updatePassword = async (data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMyPassword',
      data: data,
      withCredentials: true, // Only if your backend uses cookies for session management
    });
    console.log('response ', res);
    if (res.data.status === 'success') {
      console.log('Field Update successful!');
    }
    // return [];
  } catch (err) {
    console.log('Error:', err.response?.data?.message || err.message);
    // return [];
  }
};

export default updatePassword;
