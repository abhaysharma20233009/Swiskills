import React, { useState } from 'react';

const skillsList = ['JavaScript', 'React', 'Node.js', 'CSS', 'Python', 'Java', 'C++', 'Ruby'];

function SkillModal({ closeModal, addSkill }) {
  const [selectedSkill, setSelectedSkill] = useState('');

  const handleSkillSelect = () => {
    addSkill(selectedSkill);
    closeModal();
  };

  return (
    <div className="modal">
      <h3>Select a Skill</h3>
      <ul>
        {skillsList.map((skill) => (
          <li key={skill} onClick={() => setSelectedSkill(skill)} className="cursor-pointer">
            {skill}
          </li>
        ))}
      </ul>
      <button onClick={handleSkillSelect}>Add Skill</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
}

export default SkillModal;
