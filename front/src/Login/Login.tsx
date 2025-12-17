import { useState } from 'react';
import './Login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:3001/admins/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mail: email,
        password: password,
      }),
    });

    const data = await response.json();
    
    // 👉 le token JWT renvoyé par le backend
    const token = data.accessToken;
    console.log(token);

    // ⚠️ simple pour le moment (on en reparlera)
    localStorage.setItem('jwt', token);

    console.log('JWT reçu :', token);

    // exemple : redirection
    // navigate('/dashboard');

  } catch (error) {
    console.log('Erreur login');
    //alert('Erreur de connexion');
  }
};

  return (
    <div className="login-page">
      <h1 className="login-title">LOGIN MANAGER</h1>

      <div className="login-card">
        {/* Formulaire */}
        <div className="login-form">
          <h2>Connexion</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>
        </div>

        
        <div className="login-logo">
          <img src="/ressources/Logo.png" alt="Logo" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
