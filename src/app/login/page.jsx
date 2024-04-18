"use client"

import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import styles from './loginPage.module.css';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleManualSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn('credentials', { ...credentials, redirect: false });
      router.push('/');
    } catch (error) {
      alert('Erreur lors de la connexion');
      console.error('Erreur lors de la connexion:', error);
      
      // Gérer les erreurs de connexion, afficher un message d'erreur, etc.
    }
  };

  if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === 'authenticated') {
    router.push('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form onSubmit={handleManualSignIn} className={styles.form} >
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />

          <button type="submit"  className={styles.button}> CONNECTER </button>
         
        </form>
        <div className={styles.signupLink}>
          Vous n&apos;avez pas de compte ? <a href="/signup">Inscrivez-vous ici</a>
        </div>
       
        <div className={styles.socialButton} onClick={() => signIn("google")}>
          Sign in with Google
        </div>
        
      </div>
      </div>
    
  );
};

export default LoginPage;
