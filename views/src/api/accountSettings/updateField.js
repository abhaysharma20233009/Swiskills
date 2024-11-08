import axios from 'axios';

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
      console.log('Field Update successful!');
      // return res.data.data.skills; // Assuming skills are in this path, update if different
    }
    // return [];
  } catch (err) {
    console.log('Error:', err.response?.data?.message || err.message);
    // return [];
  }
};

export default updateField;
