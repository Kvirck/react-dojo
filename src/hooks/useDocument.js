import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { firestore } from './../firebase/config';

export const useDocument = (collectionName, id) => {
  const [document, setDocument] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const docName = doc(firestore, collectionName, id);
    const unsub = onSnapshot(
      docName,
      (snap) => {
        if (snap.data()) {
          setDocument({ ...snap.data(), id: snap.id });
          setError(null);
        } else {
          setError('Такого документа нет в системе');
        }
      },
      (err) => {
        setError(err.message);
      },
    );
    return () => {
      unsub();
    };
  }, [collectionName, id]);
  return { document, error };
};
