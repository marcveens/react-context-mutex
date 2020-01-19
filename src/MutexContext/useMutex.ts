import { useContext } from 'react';
import { MutexContext } from './MutexContext';
import { createMutex } from './createMutex';

export const useMutex = () => {
    const mutexContext = useContext(MutexContext);
    const MutexRunner = createMutex(mutexContext);

    return MutexRunner;
};