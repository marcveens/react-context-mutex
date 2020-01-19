import React from 'react';

type MutexStore = string[];

export const MutexContext = React.createContext<MutexStore>([]);