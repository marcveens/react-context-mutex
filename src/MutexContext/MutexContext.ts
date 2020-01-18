import React from 'react';

type MutextContext = string[];

export const MutexContext = React.createContext<MutextContext>([]);