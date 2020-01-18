import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export type RootState = {
    data: any;
};

type DataActionTypes = {
    type: 'SET_DATA';
    payload: any;
};

const dataReducer = (state = null, action: DataActionTypes) => {
    switch(action.type) {
        case 'SET_DATA': 
            return { data: action.payload };
        default:
            return state;
    }
};

const reducers = combineReducers<RootState>({
    data: dataReducer
});

export const store = createStore(
    reducers,
    { data: null },
    composeWithDevTools()
);