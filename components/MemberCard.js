import React from 'react';

const MemberCard = ({ member }) => {
  return (
    <div className="member-card">
      <h3>{member.name}</h3>
      <p>Course: {member.course}</p>
      <p>Student ID: {member.studentId}</p>
      <p>Email: {member.email}</p>
    </div>
  );
};

export default MemberCard;