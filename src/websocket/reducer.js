import actions from './actions';

const initialState = {
    connected: false,
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case actions.SOCKET_CONNECTION_ESTABLISHED: {
            return Object.assign({}, state, {
                connected: true,
            });
        }
        case actions.SOCKET_CONNECTION_CLOSED: {
            return Object.assign({}, state, {
                connected: false,
            });
        }
    }
    return state;
}

export default reducer;