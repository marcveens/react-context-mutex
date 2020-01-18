import React from 'react';

type MutexContext = string[];

export const MutexContext = React.createContext<MutexContext>([]);