const initialState = {
    webcams:[]
};

export default function webcamReducer(state = initialState, action) {
    switch (action.type) {
        case "LOAD_WEBCAMS":
            return {
                ...state,
                webcams: action.payload
            };
        case "LOAD_WEBCAM_ARCHIVE":
            const webcams = state.webcams;
            webcams[action.payload.id].archive = action.payload.archive;
            return {
                ...state,
                webcams: webcams
            }    
        default:
            return state;
    }
}