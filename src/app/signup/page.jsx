"use client";

import { useState } from 'react';
import styles from './signupForm.module.css';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
  const router = useRouter();
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      console.log(username, email, password); // Afficher les données dans la console
      if (response.ok) {
        router.push('/login'); // Rediriger vers la page de connexion après inscription réussie
        alert('Félicitations! inscription réussite!');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Une erreur est survenue lors de l\'inscription');
        
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error.message);
      // Gérer les erreurs d'inscription, afficher un message d'erreur, etc.
      alert('Erreur lors de l\'inscription!');
    }
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Nom"
          value={username}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.button} onClick={handleSubmit}>S&apos;inscrire</button>
      </form>
    </div>
    </div>
  );
};

export default SignUpForm;
