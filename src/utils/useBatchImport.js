import { useState, useCallback } from 'react';

// onAddOne(element): ajoute un élément créé au store
// createDefault(name): construit un élément par défaut à partir d'un nom
export function useBatchImport(onAddOne, createDefault, setNotification) {
  const [showBatchImport, setShowBatchImport] = useState(false);

  const handleBatchImport = useCallback((text) => {
    const names = text
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    names.forEach(name => {
      onAddOne(createDefault(name));
    });

    setShowBatchImport(false);
    if (setNotification) {
      setNotification({
        type: 'success',
        message: `${names.length} élément(s) importé(s)`
      });
      setTimeout(() => setNotification(null), 5000);
    }
  }, [onAddOne, createDefault, setNotification]);

  return { showBatchImport, setShowBatchImport, handleBatchImport };
}
