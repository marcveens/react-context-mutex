import React from 'react';
import { useFetchHook } from './useFetchHook';

export const FetchComponent = () => {
    const { data } = useFetchHook();

    console.log('fetch', data);

    return (
        <div>Let me fetch that for you</div>
    );
};

export const FetchComponent1 = () => {
    const { data } = useFetchHook();

    console.log('fetch1');

    return (
        <div>Let me fetch1 that for you</div>
    );
};