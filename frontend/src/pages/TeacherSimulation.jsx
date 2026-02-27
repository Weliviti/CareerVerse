import React from 'react';

const TeacherSimulation = () => {
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
      <iframe
        src="/games/teacher-sim/index.html"
        width="1280"
        height="720"
        style={{ border: 'none', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        title="Teacher Simulation"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default TeacherSimulation;