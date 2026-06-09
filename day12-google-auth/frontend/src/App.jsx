import React from 'react'

const App = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>continue with google</button>
    </div>
  )
}

export default App
