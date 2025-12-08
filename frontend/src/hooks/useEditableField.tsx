import { useState, useCallback } from 'react';

// T = OBJETO COMPLETO, EJ: TaskerProfile
// K = LA KEY DEL OBJETO A EDITAR EJ: description
// value ==> EL VALOR ACTUAL EDITABLE
// isDirty ==> SI CAMBIO O NO
const  useEditableField = <T extends object, K extends keyof T>(initialData: T, field: K) => {
  const [value, setValue] = useState<T[K]>(initialData[field]);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  // EVENTO ONCHANGE ==> ACTUALIZA EL VALOR.
  const onChange = useCallback((newValue: T[K]) => {
    setValue(newValue);
    setIsDirty(true);
  }, []);

  // EVENTO ONRESET ==> REVIERTE AL ORIGINAL
  const onReset = useCallback(() => {
    setValue(initialData[field]); 
    setIsDirty(false);
  }, [initialData, field]); // ==> DEPENDENCIAS

  return {
    value,
    isDirty,
    onChange,
    onReset,
  };
}
export default useEditableField;