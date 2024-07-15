import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
	e.preventDefault();
	try {
	  const response = await fetch('https://acc-api.samesoft.app/user/login', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	  });
	  if (response.ok) {
		const data = await response.json();
		console.log('Login Success:', data);
		// Navigate to another route upon success
		navigate('/dashboard');
	  } else {
		console.error('Login failed');
	  }
	} catch (error) {
	  console.error('Error:', error);
	}
  };

  return (
	<div>
	  <h2>Login</h2>
	  <form onSubmit={handleLogin}>
		<div>
		  <label>Email:</label>
		  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
		</div>
		<div>
		  <label>Password:</label>
		  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
		</div>
		<button type="submit">Login</button>
	  </form>
	  <p>Or</p>
	  <button onClick={() => navigate('/signup')}>Sign Up</button>
	</div>
  );
}

export default HomePage;