import { createStore } from 'redux';

const initialState = {
    count: 0,
    click: 0,
};

function count(state = initialState, action) {
    switch (action.type) {
        case 'INCREASE_COUNT_REQUEST':
            return {
                ...state,
                count: state.count + 1,
                click: state.click + 1,
            };
        case 'DECREASE_COUNT_REQUEST':
            return {
                ...state,
                count: state.count - 1,
                click: state.click + 1,
            };
        case 'RESET_REQUEST':
            return {
                ...state,
                count: 0,
                click: 0,
            };
        default:
            return state;
    }
}

const store = createStore(count);

export default store;