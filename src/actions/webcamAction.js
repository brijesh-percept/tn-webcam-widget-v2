export const loadWebcamsAction = (payload) => {
    return {
        type: "LOAD_WEBCAMS",
        payload
    }
};

export const setImagesAction = (payload) => {
    console.log("action called", payload);
    return {
        type: "SET_IMAGES",
        payload
    }
};
export const setRangeValuesAction = (payload) => {
    return {
        type: "SET_RANGE_VALUES",
        payload
    }
};
export const setRangeSettingsAction = (payload) => {
    return {
        type: "SET_RANGE_SETTINGS",
        payload
    }
};