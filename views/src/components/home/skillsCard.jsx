import React from 'react';

const SkillsCard = ({ skill, level, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 w-full max-w-sm">
      {/* Icon for the skill */}
      <div className="text-blue-500 text-3xl">
        {icon}
      </div>

      {/* Skill information */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{skill}</h3>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${level}%` }}
          ></div>
        </div>

        {/* Display level percentage */}
        <p className="text-sm text-gray-600 mt-1">{level}% proficiency</p>
      </div>
    </div>
  );
};

export default SkillsCard;

