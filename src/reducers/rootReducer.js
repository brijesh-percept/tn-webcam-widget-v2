import {combineReducers} from "redux";
import webcamReducer from "./webcamReducer";

const rootReducer = combineReducers({
    webcam : webcamReducer
});

export default rootReducer;