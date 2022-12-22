import { parse } from 'date-fns';
const initialState = {
    webcams:[],
    images:[],
    rangeValues:[],
    rangeSettings:[]
};

export default function webcamReducer(state = initialState, action) {
    switch (action.type) {
        case "LOAD_WEBCAMS":
            return {
                ...state,
                webcams: action.payload
            };
        case "SET_IMAGES":
            return {
                ...state,
                images: action.payload
            };   
        case "SET_RANGE_VALUES":
            return {
                ...state,
                rangeValues: action.payload
            }; 
        case "SET_RANGE_SETTINGS":
            return {
                ...state,
                rangeSettings: action.payload
            };  
        /*        
        case "LOAD_WEBCAM_ARCHIVE":
            const webcams = state.webcams;
            webcams[action.payload.id].archive = action.payload.archive;
            if(typeof action.payload.archive[0] !== 'undefined'){
                webcams[action.payload.id].latestarchive = action.payload.archive[0];   
                webcams[action.payload.id].latestarchive_timestamp =  parse(webcams[action.payload.id].latestarchive.timestamp, 'yyyy-MM-dd HH:mm:ss', new Date());
                var image = webcams[action.payload.id].latestarchive.imgpath;
                var parts = image.split(".");
                webcams[action.payload.id].latestarchive_image =  'https://webcamwidget.fullmarketing.at/camsimg/' + action.payload.id + '/' + parts.join('-1210.');
            }
            return {
                ...state,
                webcams: webcams
            }  
        */      
        default:
            return state;
    }
}