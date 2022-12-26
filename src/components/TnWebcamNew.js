import React, { useState, useEffect, useRef } from 'react';
import { loadWebcamsAction/*, loadWebcamArchiveAction*/ } from '../actions/webcamAction';
import { connect } from 'react-redux';
import getCams from './api/cams';
import getCamArchive from './api/camArchive';
import ImageGallery from 'react-image-gallery';
import Slider from "react-slick";
import PlayPause from './PlayPause';
import TnWebcamSliderBottom from './TnWebcamSliderBottom';
import DatePicker from "react-datepicker";
import { addDays, subDays, format, isWeekend } from 'date-fns';



const mapStateToProps = state => ({
    cams: state.webcam.webcams,
});

const mapDispatchToProps = dispatch => ({
    loadWebcams: (payload) => dispatch(loadWebcamsAction(payload)),
    //loadWebcamArchive: (payload) => dispatch(loadWebcamArchiveAction(payload))
});

function TnWebcamNew(props) {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    const [images, setImages] = useState([]);

    const [rangeValues, setRangeValues] = useState([]);
    const [rangeSettings, setRangeSettings] = useState([]);
    const [isSliderPlayings, setIsSliderPlaying] = useState([]);
    const [cameraInterval, setCameraInterval] = useState([]);
    const [dateSelected, setDateFilter] = useState([]);
    const MAX = 100;
    const getBackgroundSize = (camid) => {
        return {
            backgroundSize: `${(rangeValues['cam' + camid] * 100) / MAX}% 100%`,
        };
    };

    const setCamImages = (imgs, camid)=>{
        images['cam'+camid] = imgs;
        setImages({...images});
    }

    const setCamRangeValues = (values, camid) => {
        rangeValues['cam' + camid] = values;
        setRangeValues({ ...rangeValues });
    }
    const setCamCameraInterval = (values, camid) => {
        cameraInterval['cam' + camid] = values;
        setCameraInterval({ ...cameraInterval });
        if(values !== 'daily'){
            getCameraImages(camid, values);
        }
    }
    const setCamDateFilter = (selected_date, camid) => {
        var old_date = dateSelected['cam' + camid] ? dateSelected['cam' + camid] : null;
        dateSelected['cam' + camid] = selected_date;
        setDateFilter({ ...dateSelected });
        if(old_date && old_date.getTime() !== selected_date.getTime()){ //we need to fetch images of the selected date for current camera
            //console.log("old date=", old_date," and selecteddate=", selected_date);
            //console.log("Make an API call for cam",camid, " and for the ", selected_date);
            getCameraImages(camid, 'daily', selected_date);
        }
    }

    const changeCamGalleryImage = (values, camid) => {
        if('cam'+camid in cameraGallery.current){
            if(typeof images['cam'+camid][values-1] !== 'undefined'){
                cameraGallery.current['cam'+camid].slideToIndex(values-1);
            }
        }
    }
    const setCamRangeSettings = (setting, camid) => {
        rangeSettings['cam' + camid] = setting;
        setRangeSettings({ ...rangeSettings });
    }

    const setIsCamSliderPlaying = (isPlaying, camid) => {
        isSliderPlayings['cam' + camid] = !isPlaying;
        setIsSliderPlaying({ ...isSliderPlayings });
    }

    const [isFade, setIsFade] = useState(false);

    const handleClick = event => {
        setIsFade(!isFade);
    };

    const cameraGallery = useRef({});

    const getCameraImages = (camid, type='daily', date=new Date())=>{
        (async () => {
            var request = {
                id: camid,
                type: type,
                date: format(date, "yyyy-MM-dd")
            }
            await getCamArchive(request).then((data) => {
                if (typeof data.archive !== 'undefined') {
                    var imagesArr = [];
                    Object.values(data.archive).map((image, innerkey) => {
                        var imgpath = image.imgpath;
                        var parts = imgpath.split(".");
                        imagesArr.push({
                            original: 'https://webcamwidget.fullmarketing.at/camsimg/' + camid + '/' + parts.join('-1210.'),
                            thumbnail: 'https://webcamwidget.fullmarketing.at/camsimg/' + camid + '/' + parts.join('-310.'),
                            timestamp: image.timestamp,
                            originalTitle: image.timeInner,
                        });
                    })
                    
                    setCamImages(imagesArr, camid);
                    var setting = {'max':imagesArr.length-1, 'step':1}
                    setCamRangeSettings(setting, camid);
                    setCamRangeValues(imagesArr.length-1, camid);
                }

            });


        })();
    }

    useEffect(() => {
        if (props.cams.length === 0) {
            var cams = props.camids.split(',');
            cams.forEach((camid) => {
                // initialize all camera slider
                setCamRangeValues(0, camid); 
                var setting = { 'max': MAX, 'step': 1 }
                setCamRangeSettings(setting, camid);
                //setCamImages([], camid);
                setIsCamSliderPlaying(true, camid);
                setCamCameraInterval('daily', camid);
                setCamDateFilter(new Date(), camid);
            });
            (async () => {
                var request = {
                    ids: props.camids
                }
                await getCams(request).then((data) => {
                    if (typeof data.cams !== 'undefined') {
                        props.loadWebcams(data.cams);
                    }
                });
            })();
        }
    }, [])


    useEffect(() => {
        if (Object.keys(props.cams).length > 0) {
            (async () => {
                Object.values(props.cams).forEach((item, key) => {
                    getCameraImages(item.id);
                });
            })();
        }

    }, [props.cams])
    console.log("images", images);
    console.log("rangeValues", rangeValues);
    return (
        <div className='tn-webcam-component'>
                <h1 className='main-title'>TN-Webcam</h1>

                <div className='tn-webcam-main'>
                    <div className='tn-webcam-sidebar'></div>
                    <div className='tn-webcam-details-area'>
                    <div className='tn-webcam-slider'>
                        <div className='tn-webcam-slider-top'>

                        <div className='tn-webcam-slider-top-lt'>
                            <div className='tn-webcam-logo'>
                            <img src="https://www.walchsee.co/media/cms/walchsee.co/u/2022/04/walchsee-white.png" alt='logo' />
                            </div>                          
                        </div>

                        <div className='tn-webcam-slider-top-rt'>
                            <div className="tn-webcam-live">
                            <span className="tn-webcam-live-dot"></span>
                            <p className="tn-webcam-live-txt">live</p>
                            </div>
                            <div className="tn-webcam-zoom">
                            <img src="https://webcamwidget.fullmarketing.at/assets/img/zoom.svg" alt="zoom" />
                            </div>
                        </div>

                        </div>
                        <div className='tn-webcam-slider-middle'>
        {Object.keys(images).length === Object.keys(props.cams).length ?
            <>
                <Slider
                    asNavFor={nav2}
                    fade={true}
                    speed={1000}
                    ref={slider => (setNav1(slider))}
                    draggable={false}
                >
                    {
                        Object.keys(props.cams)?.map((item, key) => {
                                return(
                                    ('cam'+item in images) ? 
                                    <div key={"a"+item} className={"cam"+item}>
                                        <ImageGallery 
                                        ref={(e)=>{cameraGallery.current['cam'+item] = e}}
                                        accessibility={false}
                                        showThumbnails={false} 
                                        showNav={false}
                                        slideDuration={500}
                                        slideInterval={3500}
                                        items={images['cam'+item]} 
                                        useTranslate3D={false}
                                        disableSwipe={true}
                                        onSlide={(currentIndex)=>{setCamRangeValues(currentIndex, item)}}
                                        startIndex={Object.keys(images['cam'+item]).length-1}
                                        renderPlayPauseButton={(onClick, isPlaying) => {
                                            return (
                                                <>
                                                    <div className='camera-interval-control'>
                                                        <select id={'cam'+item} 
                                                            className='cameraintervalselect' 
                                                            defaultValue={cameraInterval['cam'+item]}
                                                            value={cameraInterval['cam'+item]}
                                                            onChange={(e)=>setCamCameraInterval(e.target.value, item)}>
                                                                <option value='daily'>Daily</option>
                                                                <option value='week'>Week</option>
                                                                <option value='month'>Month</option>
                                                                <option value='year'>Year</option>
                                                        </select>
                                                        {
                                                            cameraInterval['cam'+item] === 'daily' ? 
                                                            <>
                                                                <DatePicker 
                                                                    selected={dateSelected['cam'+item]}
                                                                    onChange={(date)=>setCamDateFilter(date, item)}
                                                                    maxDate={new Date()}
                                                                    />
                                                            </>
                                                            : <p class="time-label">{
                                                                images['cam' + item][rangeValues['cam' + item]].originalTitle
                                                                /*
                                                                rangeValues['cam' + item]-1 >=0 ?
                                                                images['cam' + item][rangeValues['cam' + item]-1].originalTitle
                                                                :
                                                                images['cam' + item][rangeValues['cam' + item]].originalTitle
                                                                */
                                                                }</p>
                                                        }
                                                    </div>
                                                    <div className='slide-bottom-content'>
                                                        <div className='slide-play-control'>
                                                            <PlayPause
                                                                onClick={() => { onClick(); setIsCamSliderPlaying(isPlaying, item); }}
                                                                isPlaying={isPlaying}

                                                            />
                                                            {cameraInterval['cam'+item] === 'daily' ? 
                                                                <>
                                                                <input type="range"
                                                                    min="0"
                                                                    max={rangeSettings['cam' + item]['max']}
                                                                    step={rangeSettings['cam' + item]['step']}
                                                                    onChange={(e) => {setCamRangeValues(e.target.value, item); changeCamGalleryImage(e.target.value, item);}}
                                                                    style={getBackgroundSize(item)}
                                                                    value={rangeValues['cam' + item]} />
                                                                <p className='value' >{
                                                                    images['cam' + item][rangeValues['cam' + item]].originalTitle
                                                                    /*
                                                                    rangeValues['cam' + item]-1 >=0 ?
                                                                    images['cam' + item][rangeValues['cam' + item]-1].originalTitle
                                                                    :
                                                                    images['cam' + item][rangeValues['cam' + item]].originalTitle
                                                                    */
                                                                    }
                                                                </p>
                                                                </>
                                                                : ''
                                                            }    
                                                        </div>
                                                        <div className={'TnWebcamSliderBottom-btn' + (isFade ? ' show' : '')} onClick={handleClick} ></div>
                                                        <div className={'TnWebcamSliderBottom' + (isFade ? ' show' : '')}>
                                                            <TnWebcamSliderBottom />
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                            }
                                        }   
                                        />
                                    </div>
                                    : <div key={"a" + item}>Loading</div>
                            )

                        })
                    }
                </Slider>

                <Slider
                    asNavFor={nav1}
                    ref={slider => (setNav2(slider))}
                    slidesToShow={2}
                    swipeToSlide={true}
                    focusOnSelect={true}
                >
                    {
                        Object.keys(images).length === Object.keys(props.cams).length && Object.keys(props.cams)?.map((item, key) => {
                                return(
                                    ('cam'+item in images) ? 
                                    <div key={"a"+item}>
                                        <img alt={''} src={images['cam'+item].slice(-1)[0].thumbnail} /> 
                                    </div>
                                    : <div key={"a" + item}>
                                        <h1>{key}</h1>
                                    </div>
                            )

                        })
                    }
                </Slider>

            </>
            :
            <>
                <p>Loading....</p>
            </>
        }
        </div>
                       

                       </div>
                       </div>
                   </div>
                   </div>
    )
}

TnWebcamNew.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TnWebcamNew)
