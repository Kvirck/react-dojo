import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { auth, storage } from '../firebase/config.js';
import { useAuthContext } from './useAuthContext.js';
import {} from './../firebase/config';

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password, name, file) => {
    setError(null);
    setIsPending(true);

    const filePath = `avatars/${response.user.uid}/${file.name}`;
    const img = await uploadBytesResumable(ref(storage, filePath), file);
    const imgUrl = await getDownloadURL(img.ref);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(response.user, {
        displayName: name,
      });

      dispatch({ type: 'SIGN_UP', payload: response.user });

      setError(null);
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { signUp, error, isPending };
};
