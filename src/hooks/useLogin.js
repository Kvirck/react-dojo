import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/config.js';
import { useAuthContext } from './useAuthContext.js';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from './../firebase/config';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userRef = doc(firestore, 'users', user.uid);
      await setDoc(userRef, { isOnline: true }, { merge: true }); //блогодоря merge он не будет перезаписывать всю коллекцию а перезапишет необходимое поле

      dispatch({ type: 'LOGIN', payload: user });

      setError(null);
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);
  return { login, error, isPending, isCanceled };
};
