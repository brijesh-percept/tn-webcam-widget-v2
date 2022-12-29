import React, { useRef,  useState } from "react";

import '../Tempslider.css';
import DragScroll from '../../node_modules/dragscroll/dragscroll';

const Tempslider = () => {

    const ref = useRef(null);
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };

    // const [loaded, setloaded] = useState(false);

    // const stuffLoaded = () => {
    //     setTimeout(() => {
    //         setloaded(true);    
    //     }, 2000)
        
    // }

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };


    return<>
    <div className="weathersmallmod">
          
                <div className="weathersmall_arrows">
                    <span className="weathersmall_arrows_inner weathersmall_arrows_left" 
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={() => scroll(-60)}></span>
                    <span className="weathersmall_arrows_inner weathersmall_arrows_right" 
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={() => scroll(60)}></span>
                </div>

                <div className="weathersmallmod_inner dragscroll" 
                style={{'scrollBehavior': isHovering ? 'smooth' : '',}} 
                ref={ref}
                >
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                    <div className="weathersmallin">
                        <img src="https://www.busy-shaw.82-165-64-236.plesk.page/modules/mod_tnwebcam/images/svg/sun_bright_cloud.svg" alt="" />
                        <h6>10:00</h6>
                        <span className="scrolltempsp">6°</span>
                        <p>6 km/h</p>
                    </div>
                </div>
            </div>

       
    </>
}

export default Tempslider;