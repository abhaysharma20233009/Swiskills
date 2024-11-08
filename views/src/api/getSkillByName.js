import axios from 'axios';

export const getSkillByName = async (name) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/skills',
      data: {
        name,
      },
      withCredentials: true, // Only if your backend uses cookies for session management
    });

    if (res.data.status === 'success') {
      console.log('Skill search successful!');
      return res.data.data.skills; // Assuming skills are in this path, update if different
    }
    return [];
  } catch (err) {
    console.log('Error:', err.response?.data?.message || err.message);
    return [];
  }
};

export default getSkillByName;
