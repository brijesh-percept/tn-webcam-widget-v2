import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addDays, format, toDate, parse } from 'date-fns';
import * as camwidget from '../../library/camwidget';

const mapStateToProps = state => ({
    state_data: state,
    webcams: state.webcam.webcams
});

const mapDispatchToProps = dispatch => ({
 });



function Cmobileview(props) {
    
    
    const unique_id = props.modid + props.camid + 'cams'+props.camkey;
    const acclat = props.acclat;
    const acclon = props.acclon;
    const [zoomimgsrc, setZoomimgsrc] = useState('https://dummyimage.com/1200x800/b5b5b5/ffffff.jpg&text=No+image+found,+please+select+different+date');
    const [webcam, setWebcam] = useState(props.webcams[props.camid]);
    const [latestArchiveTimestamp, setLatestArchiveTimestamp] = useState('');
    //const [latestArchiveImage, setLatestArchiveImage] = useState('');

    useEffect(()=>{
        if(typeof props.webcams[props.camid].latestarchive_timestamp !== 'undefined'){
            setLatestArchiveTimestamp(props.state_data.webcam.webcams[props.camid].latestarchive_timestamp);
            setZoomimgsrc(props.state_data.webcam.webcams[props.camid].latestarchive_image);
        }        
    },[props.state_data.webcam.webcams[props.camid].latestarchive_timestamp]);

    return (
        <>
            <div className="c-mobile-view" id={"c-mobile-view-" + unique_id}>
                <input type="hidden" id={"divulge_cam_id-" + unique_id}
                    defaultValue={props.camid}/>


                <div className="c-mobile-view__inner">

                    <div className="wtrcam_top">
                    <div className="wtrcam_top_lt divulge-logo">
                        <a target="_blank" href={webcam.url}>
                            <img 
                                src={webcam.logo}
                                className="TourismusNetzCom_img"
                            />
                        </a>
                    </div>

                    <div className="wtrcam_top_rt">
                        <div className="wtrcam_lv">
                        <span className="wtrcam_lv_dot wtrcam_lv_dot_red"></span>
                        <p className="wtrcam_lv_dot_txt">live</p>
                        </div>
                        <div className="wtrcam_zoom">
                        <img src="/assets/img/zoom.svg" alt="zoom" />
                        </div>
                    </div>
                    </div>


                    <div className="divulge-slider-area">
                        <div id={"divulge-slideshow-container-" + unique_id}>
                            <div className="play-pause-center" id={"play-pause-center-" + unique_id}>
                                <i className="fa fa-play"></i>
                            </div>
                            
                            <div className={"divulge_slides_" + unique_id}
                                data-date={latestArchiveTimestamp ? format(latestArchiveTimestamp, "h:m aaa  d-M-yyyy") : ''}
                                onClick={()=>{}/*camwidget.play_pause_function(unique_id)*/}>
                                
                                <img zoomimgsrc={zoomimgsrc}
                                    className={"zoommyimg divulge-loaded-images-" + unique_id}
                                    onLoad={()=>{}/*camwidget.divulge_img_loaded(unique_id)*/}
                                    id={"img-" + unique_id}
                                    alt={webcam.description}
                                    src={zoomimgsrc}/>
                                <input type="hidden" className="slickcamthumb" thumbid={unique_id} defaultValue={zoomimgsrc} />
                            </div>
                            
                        </div>
                    </div>
                </div>


                
                <div className="camsliderbottom_main">
                    <div className="period-box">
                        <select defaultValue="daily" className="period-selector" id={"period-" + unique_id}>
                            <option value="none" disabled>Select Period</option>
                            <option value="daily">Daily</option>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                        </select>
                        <div className="show-week hide-visibility">
                        </div>
                    
                    </div>
                    
                    
                    <div className="camsliderbottom_range">
                
                        <div className="play-pause-left" id={"play-pause-" + unique_id}>
                            <i className="fa fa-play"></i>
                        </div>
                        <div className="range-wrap">
                            <div className="range-value" id={"rangeV-" + unique_id}></div>

                            <div className="range-value" id={"rangeV-" + unique_id}></div>
                            <input id={"range-" + unique_id} type="range"
                                min="1"
                                max="96"
                                defaultValue="90"
                                step="1" />
                            <input type="hidden"
                                defaultValue="11:00 pm"
                                id={"rang-time-"+unique_id}/>

                            <input type="hidden" value="<?php echo gmdate('Y-m-d'); ?>"
                                id={"divulge-today-" + unique_id} />
                            <span data-src="" style={{display:'none'}} id={"temp-img-" + unique_id}>

                            </span>
                        </div>
                        
                    </div>

                    {/*
                    <?php 
                        $modimagepath = $_GET['modimagepath'];
                        
                        $metgis_key = "TFVLVPteKe57d5MPVDwaSfRxZ2fMImOg9AuTfcGPNJ7Tj3nw1";
                        $apilanguage = $_GET['lang'];
                        //$location_name = $accommodation_list['name'];  
                        $location_curr_weather_link = 'https://api.metgis.com/forecast?key='.$metgis_key.'&lat='.$location_lat.'&lon='.$location_lon.'&alt=200&v=premium&lang='.$apilanguage;
                        $multiday_wdata_tal = getMetGis($location_curr_weather_link);
                        $forecast_hourly_tal = $multiday_wdata_tal['Forecast_hourly'];  
                        //echo "<pre>"; print_r($multiday_wdata_tal); echo "</pre>";
                    ?>

                    <div className="cam_hourly_data dragscroll">
                        <!-- <div className="cam_sbar_header">
                            <button type="button" className="close_cam_hourly_data">
                            <span>&times;</span>
                            </button>    
                        </div> -->
                    <?php  
                    foreach ($forecast_hourly_tal['ForecastTimes_LocalTime'] as $key => $value) { 
                        if($key > 24)
                        { break; }
                        $ttime = (new DateTime($value))->format('H:i');
                        $borderleft = "";
                        if($key > 1 && $ttime == "00:00")
                        {
                            $borderleft = "borderleftin";
                        }
                        $iconsvg = $modimagepath."/svg/".str_replace(".png", ".svg", $forecast_hourly_tal['Icon'][$key]);
                    ?>
                        <div className="cam_hourly_data_in">
                            <img style="width:30px" src="<?php echo $iconsvg;?>" alt="" />
                            <h6><?php echo  $ttime; ?></h6>
                            <span className="scrolltempsp"><?php echo round($forecast_hourly_tal['Temperature'][$key]); ?>°</span>
                            <p><?php echo $forecast_hourly_tal['WindSpeed'][$key]; ?> km/h</p>
                            <span>
                            <?php 
                                echo $apilanguage == 'de' ? $directioninde[$forecast_hourly_tal['WindDirection'][$key]] : $directioninen[$forecast_hourly_tal['WindDirection'][$key]]; ?>
                            </span>
                        </div>
                    <?php
                    }
                    ?>
                        
                    </div>

                    <!-- Video Bottom Details -->    
                    <div className="camsliderbottom">
                        <div id="slider_bt_content<?php echo $_GET['unique_id']; ?>" className="slider_bt_content">
                            <div className="slider_content">
                                <div className="slider_content_date">
                                    <h6>
                                        <?php echo getLocalTime($multiday_wdata_tal['Info']['Forecast_Calculated_LocalTime']); ?>
                                    </h6>
                                    <span>
                                        <?php echo getLocalDate($multiday_wdata_tal['Info']['Forecast_Calculated_LocalTime']); ?>
                                    </span>
                                </div>

                                <div className="slider_content_place">
                                    <h6><?php echo $web_cam['name']; ?></h6>
                                    <?php 
                                        
                                        $curl = curl_init();
                                        $agent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)';
                                        curl_setopt_array($curl, array(
                                        CURLOPT_URL => 'https://nominatim.openstreetmap.org/reverse?format=json&lat='.$location_lat.'&lon='.$location_lon.'&zoom=18&addressdetails=1&email=vinay@perceptinfotech.com',
                                        CURLOPT_USERAGENT => $agent,
                                        CURLOPT_RETURNTRANSFER => true,
                                        CURLOPT_ENCODING => '',
                                        CURLOPT_MAXREDIRS => 10,
                                        CURLOPT_TIMEOUT => 0,
                                        CURLOPT_FOLLOWLOCATION => true,
                                        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                                        CURLOPT_CUSTOMREQUEST => 'GET',
                                        ));

                                        $response = curl_exec($curl);
                                        curl_close($curl);
                                        $placeadd = json_decode($response, true);
                                        
                                    ?>
                                    <span><?php echo strtoupper($placeadd['address']['country_code'])." | ".$placeadd['address']['state']; ?></span>
                                </div>

                            <div className="slider_content_temp slider_content_temp<?php echo $_GET['unique_id']; ?>">
                                    <!-- <span className="extlink"><img src="<?php echo $modimagepath; ?>/extlink.png"></span> -->
                                    <?php 
                                    $iconsvg = $modimagepath."/svg/".str_replace(".png", ".svg",  $multiday_wdata_tal['Current']['Icon']);
                                    ?>
                                    <div className="slider_content_temp_lt">
                                        <span><img style="width:32px;" src="<?php echo $iconsvg; ?>"></span>
                                    </div>
                                    <div className="slider_content_temp_rt">
                                        <h6><?php echo  round($multiday_wdata_tal['Current']['Temperature']); ?>°C</h6>
                                        <span>
                                        <?php echo  $multiday_wdata_tal['Current']['PrecipitationRain_Intensity']; ?> l/m²
                                        |
                                        <?php echo  $multiday_wdata_tal['Current']['TotalCloudCover']; ?> %
                                        </span> 
                                    </div>
                                </div>

                                <div className="hourlydata_mobile">
                                    <!-- <span className="close_hourlydata_mobile">X</span> -->
                                    <div className="hourlydata_mobile_scroller dragscroll">
                                    <?php  
                                        foreach ($forecast_hourly_tal['ForecastTimes_LocalTime'] as $key => $value) { 
                                            if($key > 24)
                                            { break; }
                                            $ttime = (new DateTime($value))->format('H:i');
                                            $borderleft = "";
                                            if($key > 1 && $ttime == "00:00")
                                            {
                                                $borderleft = "borderleftin";
                                            }
                                            $iconsvg = $modimagepath."/svg/".str_replace(".png", ".svg", $forecast_hourly_tal['Icon'][$key]);
                                        ?>
                                            <div className="cam_hourly_data_in ">
                                                <img style="width:30px" src="<?php echo $iconsvg;?>" alt="" />
                                                <h6><?php echo  $ttime; ?></h6>
                                                <span className="scrolltempsp"><?php echo round($forecast_hourly_tal['Temperature'][$key]); ?>°C</span>
                                                <!-- <p><?php echo $forecast_hourly_tal['WindSpeed'][$key]; ?> km/h</p>
                                                <span>
                                                <?php 
                                                    echo $apilanguage == 'de' ? $directioninde[$forecast_hourly_tal['WindDirection'][$key]] : $directioninen[$forecast_hourly_tal['WindDirection'][$key]]; ?>
                                                </span> -->
                                            </div>
                                        <?php
                                        }
                                    ?>
                                    </div>
                                </div>

                                <div className="mapbox_mobile">
                                    <!-- <span className="close_map_mobile">X</span> -->
                                    <div id="cammapboxmobile<?php echo $_GET['unique_id']; ?>" className="cammapbox_mobile" maplat="<?php echo $location_lat;?>" maplon="<?php echo $location_lon; ?>" acclat="<?php echo $_GET['acclat']; ?>" acclon="<?php echo $_GET['acclon']; ?>">
                                        <div className="cam_map_zoom_btn wtrcam_map_unzoom">
                                        <span>X</span>
                                        </div>
                                    </div>
                                </div>

                                <?php if(!empty($_GET['camseotext']))  { ?>
                                <div className="slider_content_text">
                                    <h6 style="text-transform: none;">
                                    <?php echo $_GET['lang'] == 'de'? 'Zur Verfügung gestellt von' : 'Provided by';  ?>
                                    </h6>
                                    <span className="cam_providedby">
                                        <a target="_blank" href="<?php echo $_GET['camseolink']; ?>" title="<?php echo $_GET['camseotitle']; ?>">
                                            <?php echo $_GET['camseotext']; ?>
                                        </a>
                                    </span>
                                </div>
                                <?php } ?>

                                <span className="responsive_line"></span>

                                <div className="slider_social_nav">
                                    <a target="_blank" href="https://www.facebook.com/sharer.php?u=<?php echo $web_cam['url']; ?>&t=<?php echo $web_cam['name']; ?>" tabindex="0">
                                        <img src="<?php echo $modimagepath; ?>/fb.png">
                                    </a>
                                    <a target="_blank" href="https://pinterest.com/pin/create/button/?url=<?php echo $web_cam['url']; ?>&description=<?php echo $web_cam['name']; ?>&media=<?php echo urlencode($web_cam['campicurl']);?>" tabindex="0">
                                        <img src="<?php echo $modimagepath; ?>/pintrest.png">
                                    </a>
                                    <a onclick="window.open('<?php echo $site_url; ?>/ecardjoom.php?id=<?php echo $web_cam['id']; ?>&lang=<?php echo $_GET['lang']; ?>','popup','width=460,height=500'); return false;" href="#">
                                        <img src="<?php echo $modimagepath; ?>/email.png">
                                    </a>
                                    
                                </div>

                                <div id="slider_content_bt_txt<?php echo $_GET['unique_id']; ?>" className="slider_content_bt_txt">
                                    <a href="" target="_blank" title=""></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    */}                
                </div>
                

                

            </div>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Cmobileview)