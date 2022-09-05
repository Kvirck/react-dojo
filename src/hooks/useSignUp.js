import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { auth, storage } from '../firebase/config.js';
import { firestore } from './../firebase/config';
import { setDoc, doc } from 'firebase/firestore';

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signUp = async (email, password, name, file) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);

      const filePath = `avatars/${response.user.uid}/${file.name}`;
      const img = await uploadBytesResumable(ref(storage, filePath), file);
      const imgUrl = await getDownloadURL(img.ref);

      await updateProfile(response.user, {
        displayName: name,
        photoURL: imgUrl,
      });

      const userRef = doc(firestore, 'users', response.user.uid);

      await setDoc(userRef, {
        isOnline: true,
        name,
        photoURL: imgUrl,
      });

      setError(null);
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { signUp, error, isPending };
};
