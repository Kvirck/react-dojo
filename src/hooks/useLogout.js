import { signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { auth } from '../firebase/config.js';
import { useAuthContext } from './useAuthContext.js';
import { firestore } from './../firebase/config';

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { user, dispatch } = useAuthContext();
  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await signOut(auth);
      const userRef = doc(firestore, 'users', user.uid);
      await setDoc(userRef, { isOnline: false }, { merge: true }); //блогодоря merge он не будет перезаписывать всю коллекцию а перезапишет необходимое поле
      dispatch({ type: 'LOGOUT' });
      setError(null);
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { logout, error, isPending };
};
