import React, {useState} from 'react';
import { format, parseISO } from 'date-fns';
import {MODIMAGEPATH} from './api';


const TnWebcamSliderBottom = (props) => {
    const localTime = props.data?.Info?.Forecast_Calculated_LocalTime;
    const date_time = (typeof localTime !== 'undefined') ? localTime.split('T') : [];
    let date = (typeof date_time[0] !== 'undefined') ? date_time[0] : '';
    const time = (typeof date_time[1] !== 'undefined') ? date_time[1].split('+')[0] : '';
    let imageIcon = props.data?.Current?.Icon;

    if(imageIcon){
        imageIcon = imageIcon.replace(".png", ".svg");
    }
    
    if(date){
        date = format(parseISO(date), "dd.MM.yyyy");        
    }
    //console.log("props.address", props.address);
    return(
        <>
             <div className='tn-webcam-slider-bottom'>

                <div className='tn-webcam-slider-bottom-inner'>

                    <div className="slider-content">
                        <div className="slider-content-top">
                                <div className="slider-content-date">
                                    <span className="slide-content-title">{time}</span>
                                    <span>{date}</span>
                                </div>
                                <div className="slider-content-place">
                                    <span className="slide-content-title">{props.camera.name}</span>
                                    <span>{props.place?.address?.country_code} | {props.place?.address?.state}</span>
                                </div>
                                <div className="slider-content-temp">
                                    <div className="slider-content-temp-lt">                                    
                                        <img src={MODIMAGEPATH + "svg/" + imageIcon } alt="" />                                    
                                    </div>
                                    <div className="slider-content-temp-rt">
                                        <span className="slide-content-title">{props.data?.Current?.Temperature} {props.data?.Current?.Temperature_Unit}</span>
                                        <span>{props.data?.Current?.PrecipitationRain_Intensity} {props.data?.Current?.PrecipitationRain_Intensity_Unit} 
                                        {" | "} 
                                        {props.data?.Current?.TotalCloudCover} {props.data?.Current?.TotalCloudCover_Unit}</span> 
                                    </div>
                                </div>
                                  
                            <div className="slider-content-text">
                                <span className="slide-content-title">{props.camera?.seotext ? "Zur Verfügungs gestellt von:" : ""}</span>
                                <span>
                                    <a target="_blank" rel="noreferrer" href={props.camera?.seolink} title={props.camera?.seotitle}>
                                        {props.camera?.seotext}
                                    </a>
                                </span>
                            </div>
                            <div className="slider-social-nav">
                                <a target="_blank" rel="noreferrer" href={"https://www.facebook.com/sharer.php?u=" + props.camera.url + "&t=" + props.camera.name}>
                                    <img src={MODIMAGEPATH + "fb.png"} alt="" />
                                </a>
                                <a target="_blank" rel="noreferrer" href={"https://pinterest.com/pin/create/button/?url=" + props.camera.url + "&description=" + props.camera.name + "&media=" + props.camera.campicurl} >
                                    <img src={MODIMAGEPATH + "pintrest.png"} alt="" />
                                </a>
                                <a target="_blank" rel="noreferrer" onClick={()=>{window.open('https://webcamwidget.fullmarketing.at/ecardjoom.php?id=' + props.camera.id + '&lang=' + props?.lang ,'popup','width=460,height=500'); return false;}} href={"#"}>
                                    <img src={MODIMAGEPATH + "email.png"} alt="" />
                                </a>
                                
                            </div>
                        </div>
                        <div className="slider-content-bottom">
                            {props.camera?.copyrightlink ? 
                                <a href={props.camera?.copyrightlink} alt={props.camera?.copyrighttitle} target="_blank">
                                    {props.camera?.copyrighttext}
                                </a>
                            :
                                <>{props.camera?.copyrighttext}</>
                            }
                        </div>
                    </div>

                </div>

                </div>
        </>
    )
}


export default TnWebcamSliderBottom;