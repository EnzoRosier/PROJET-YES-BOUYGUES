import { useState } from 'react';
import './Login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login clicked:', { email, password });
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
