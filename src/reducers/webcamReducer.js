const initialState = {};

export default function webcamReducer(state = initialState, action) {
    switch (action.type) {
        case "LOAD_WEBCAMS":
            return {
                ...state,
                webcams: action.payload
            };
        default:
            return state;
    }
}