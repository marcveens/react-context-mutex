import { createMutex } from '../createMutex';

describe('createMutex', () => {
    let mutexStore: string[] = [];

    beforeEach(() => {
        mutexStore = [];
    });

    it('should be able to create a mutex and run the callback without any locks', () => {
        // arrange
        const Mutex = createMutex(mutexStore);
        const mutexInstance = new Mutex('test1');
        const mockCall = jest.fn();

        // act 
        mutexInstance.run(() => {
            mockCall();
        });

        // assert
        expect(mockCall).toBeCalledTimes(1);
    });

    it('should be able to run the callback and register a lock', () => {
        // arrange
        const Mutex = createMutex(mutexStore);
        const mutexInstance = new Mutex('test1');
        const mockCall = jest.fn();

        // act 
        mutexInstance.run(() => {
            mutexInstance.lock();
            mockCall();
        });

        // assert
        expect(mockCall).toBeCalledTimes(1);
        expect(mutexStore).toEqual(['test1']);
    });
 
    it('should not be able to run "mockCall()" again if not unlocked', () => {
        // arrange
        const Mutex = createMutex(mutexStore);
        const mutexInstance = new Mutex('test1');
        const mockCall = jest.fn();

        // act 
        mutexInstance.run(() => {
            mutexInstance.lock();
            mockCall();
        });

        mutexInstance.run(() => {
            mockCall();
        });

        // assert
        expect(mockCall).toBeCalledTimes(1);
    });

    it('should be able to run "mockCall()" again if unlocked', () => {
        // arrange
        const Mutex = createMutex(mutexStore);
        const mutexInstance = new Mutex('test1');
        const mockCall = jest.fn();

        // act 
        mutexInstance.run(() => {
            mutexInstance.lock();
            mockCall();
            mutexInstance.unlock();
        });

        mutexInstance.run(() => {
            mockCall();
        });

        // assert
        expect(mockCall).toBeCalledTimes(2);
    });

    it('should not register a lock twice', () => {
        // arrange
        const Mutex = createMutex(mutexStore);
        const mutexInstance = new Mutex('test1');
        const mockCall = jest.fn();

        // act 
        mutexInstance.run(() => {
            mutexInstance.lock();
            mutexInstance.lock();
            mockCall();
        });

        // assert
        expect(mockCall).toBeCalledTimes(1);
        expect(mutexStore).toEqual(['test1']);
    });

    it('should not break when an unlock runs multiple times', () => {
        // arrange
        const Mutex = createMutex(mutexStore);
        const mutexInstance = new Mutex('test1');
        const mockCall = jest.fn();

        // act 
        mutexInstance.run(() => {
            mutexInstance.lock();
            mockCall();
            mutexInstance.unlock();
            mutexInstance.unlock();
        });

        // assert
        expect(mockCall).toBeCalledTimes(1);
        expect(mutexStore).toEqual([]);
    });

    it('should run the second callback in case of a locked mutax', () => {
        // arrange
        const Mutex = createMutex(mutexStore);
        const mutexInstance = new Mutex('test1');
        const mockCall = jest.fn();

        // act 
        mutexInstance.run(() => {
            mutexInstance.lock();
        });

        mutexInstance.run(() => {
            //
        }, () => {
            mockCall();
        });

        // assert
        expect(mockCall).toBeCalledTimes(1);
    });
});