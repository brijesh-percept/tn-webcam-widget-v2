import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addDays, format, toDate } from 'date-fns';

const mapStateToProps = state => ({
    webcams: state.webcam.webcams
});

const mapDispatchToProps = dispatch => ({
 });



function Sidebar(props) {
    //const UTCTimestamp = Math.floor((new Date()).getTime());
    //const UTCDate = toDate(UTCTimestamp);
    
    const [location_lat, setLocationLat] = useState(props.webcams[props.camid].latitude);
    const [location_lon, setLocationLon] = useState(props.webcams[props.camid].longitude);
    const unique_id = props.modid + props.camid + 'cams'+props.camkey;
    const acclat = props.acclat;
    const acclon = props.acclon;

    const currentTime = format(new Date(), "yyyy-MM-dd");
    const minTime = (props.webcams[props.camid].minTime) ? props.webcams[props.camid].minTime : format(new Date(), "yyyy-MM-dd");
    
    return (
        <>
            <div className="wtrcam_sbar" id={"wtrcam_sbar" + unique_id}>
                <div className="sbar_header">
                    <div className="close_pop_sbar" modid={unique_id}>x</div>
                </div>
                
                <div className="sbar_body">
                    
                    <label className="c-button c-hide__button">
                        <span id="divulge-date-holder" className="divulge-date-holder">
                            <input type="text" id={"divulge-date-" + unique_id}
                                defaultValue={currentTime}
                                data-min={minTime} />
                        </span>
                    </label>

                    <div id={"cammapbox" + unique_id} className="cammapbox" maplat={location_lat} maplon={location_lon} acclat={acclat} acclon={acclon}>
                        <div className="cam_map_zoom_btn wtrcam_map_zoom">
                        <img src="https://webcamwidget.fullmarketing.at/assets/img/zoom.svg" alt="zoom" />
                        </div>
                        <div className="cam_map_zoom_btn wtrcam_map_unzoom">
                        <span>X</span>
                        </div>
                    </div>
                    
                    <div className="cammapboxinfo" id={"cammapboxinfo" + unique_id} >
                        
                    </div>

                </div>
            </div>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)