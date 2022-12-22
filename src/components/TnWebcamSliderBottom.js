import React, {useState} from 'react';


const TnWebcamSliderBottom = () => {

   
    return(
        <>
             <div className='tn-webcam-slider-bottom'>

                <div className='tn-webcam-slider-bottom-inner'>

                    <div className="slider-content">
                        <div className="slider-content-top">
                            <div className="slider-content-date">
                                <span className="slide-content-title">04:46</span>
                                <span>21.12.2022</span>
                            </div>
                            <div className="slider-content-place">
                                <span className="slide-content-title">Walchsee</span>
                                <span>AT | Tirol</span>
                            </div>
                            <div className="slider-content-temp">
                                <div className="slider-content-temp-lt">
                                
                                    <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                                
                                </div>
                                <div className="slider-content-temp-rt">
                                    <span className="slide-content-title">6°C</span>
                                    <span>0 l/m² | 14 %</span> 
                                </div>
                            </div>
                            <div className="slider-content-text">
                                <span className="slide-content-title">Zur Verfügungs gestellt von:</span>
                                <span>"Wanderung auf der Loferer Alm"</span>
                            </div>
                            <div className="slider-social-nav">
                                <a target="-blank" href="#" tabindex="0">
                                    <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/fb.png" alt="" />
                                </a>
                                <a target="_blank" href="#" tabindex="0" >
                                    <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/pintrest.png" alt="" />
                                </a>
                                <a target="_blank" href="#">
                                    <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/email.png" alt="" />
                                </a>
                                
                            </div>
                        </div>
                        <div className="slider-content-bottom">
                            <a href="#" target="_blank">© Hier kommt der Copyright Hinweis mit noch ein bisschen Text dazu</a>
                        </div>
                    </div>

                </div>

                </div>
        </>
    )
}


export default TnWebcamSliderBottom;