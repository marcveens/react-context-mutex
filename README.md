# react-context-mutex
[![npm version](https://img.shields.io/npm/v/react-context-mutex)](https://www.npmjs.com/package/react-context-mutex)
[![Build Status](https://travis-ci.com/marcveens/react-context-mutext.svg?branch=master)](https://travis-ci.com/marcveens/react-context-mutex)
[![codecov](https://codecov.io/gh/marcveens/react-context-mutex/branch/master/graph/badge.svg)](https://codecov.io/gh/marcveens/react-context-mutex)

A mutex implementation using React and React context. It will prevent a function from running multiple times, until you allow it to run again. Works in browser and NodeJS.

This was created because I wanted to prevent a fetch from running multiple times after implementing a custom hook in multiple components. The custom hook had a `useEffect` which ran the fetch function.

## Install 
    $ npm install react-context-mutex

## Demo
[![Edit react-context-mutex](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-context-mutex-w27h0?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FuseFetchHook.ts&theme=dark)

## How to use
```ts
import { useMutex } from 'react-context-mutex';

const useFetchHook = () => {
    const MutexRunner = useMutex();
    const mutex = new MutexRunner('myUniqueKey1');

    mutex.run(async () => {
        mutex.lock();
        try {
            const response = await fetch('http://myurl');
            const data = await response.json();
            mutex.unlock();
        } catch (e) {
            mutex.unlock();
        }
    });
};
```

The `useFetchHook` hook can runs multiple times but the actual fetch is only done once. When the mutex is unlocked again, the fetch can also be executed again.

## API
Create a new instance of the mutex runner:
```ts
const mutex = new MutexRunner('myUniqueKey1');
```

Try to run a function. If the mutex is not locked, the `resolveCallback` will run. If it is locked, the optional `rejectCallback` will run:
```ts
mutex.run(resolveCallback: () => void, rejectCallback?: () => void) => void 
/*
    Usage: mutex.run(() => { yourFunction(); });
    or: 
    mutex.run(
        () => { yourFunction(); }, 
        () => { myMutexIsLocked(); }
    );
    returns void
*/
```

Lock a mutex:
```ts
mutex.lock() // returns void
```

Unlock a mutex:
```ts
mutex.unlock() // returns void
```

Check if a mutex is locked:
```ts
mutex.isLocked() // returns a boolean
```

## Behind the scenes
Behind the scenes there's an array of strings, representing the mutex keys, registered using React context. A new record is added to the array when a process should be locked. Likewise, the record is removed when the process is unlocked. 

When using the `mutex.run` method, there's a check to see if the process is locked or not. If it is, the callback within the `mutex.run` is abandoned. If the provided key does not reference to a locked process, the callback is executed. 

Why React context? Because that way the "mutex store" array will only be initiated once, thus able to use throughout multiple components without causing unwanted collisions.