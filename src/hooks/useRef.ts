import { useContext } from 'react';
import { RefsContext } from '../context/RefsContext';

const useRef = () => {
  const refsContext = useContext(RefsContext);

  return refsContext;
};

export { useRef };
