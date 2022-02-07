import { createContext, useRef, MutableRefObject } from 'react';

interface RefsContextProps {
  inputRef: MutableRefObject<HTMLInputElement | null>;
  labelRef: MutableRefObject<HTMLLabelElement | null>;
}

const RefsContext = createContext({} as RefsContextProps);

const RefsProvider: React.FC = ({ children }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const labelRef = useRef<HTMLLabelElement | null>(null);

  return (
    <RefsContext.Provider value={{ inputRef, labelRef }}>
      {children}
    </RefsContext.Provider>
  );
};

export { RefsContext, RefsProvider };
