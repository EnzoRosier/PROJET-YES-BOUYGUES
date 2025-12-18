import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './Login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/admins/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({
          mail: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }


      console.log('Login OK, cookie reçu');

      const meResponse = await fetch('http://localhost:3001/admins/me', {
        credentials: 'include',
      });

      if (meResponse.ok) {
        const me = await meResponse.json();

        if (me.isSuperAdmin) {
          console.log('crinje');
          navigate('/super-admin');
        } else {
          console.log('cronje');
          navigate('/admin');
        }

        
      }

    } catch (error) {
      console.log('Erreur login');
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
