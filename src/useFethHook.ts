import { useEffect } from 'react';
import { useMutex } from './MutexContext/useMutex';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';

export const useFetchHook = () => {
    const { mutexContext, Mutex } = useMutex();
    const data = useSelector((state: RootState) => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = () => {
            const mutex = new Mutex('test1');

            mutex.run(async () => {
                mutex.lock();
                try {
                    const response = await fetch(
                        "https://jsonplaceholder.typicode.com/posts/1"
                    );
                    const data = await response.json();
                    mutex.unlock();

                    dispatch({ type: 'SET_DATA', payload: data });
                } catch (e) {
                    mutex.unlock();
                }
            });
        };

        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return { data };
};
