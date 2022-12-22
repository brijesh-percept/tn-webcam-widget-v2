import React, { useState, useEffect } from 'react';
import { loadWebcamsAction/*, loadWebcamArchiveAction*/ } from '../actions/webcamAction';
import { connect } from 'react-redux';
import getCams from './api/cams';
import getCamArchive from './api/camArchive';
import ImageGallery from 'react-image-gallery';
import Slider from "react-slick";
import PlayPause from './PlayPause';


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
    const MAX=100;
    const getBackgroundSize = (camid) => {
        return {
            backgroundSize: `${(rangeValues['cam'+camid] * 100) / MAX}% 100%`,
        };
    };

    const setCamImages = (imgs, camid)=>{
        images['cam'+camid] = imgs;
        //var newimgs = [];
        //newimgs['cam'+camid] = imgs;
        setImages({...images});
    }

    const setCamRangeValues = (values, camid)=>{
        rangeValues['cam'+camid] = values;
        setRangeValues({...rangeValues});
    }
    const setCamRangeSettings = (setting, camid)=>{
        rangeSettings['cam'+camid] = setting;
        setRangeSettings({...rangeSettings});
    }

    

    useEffect(() => {
        if (props.cams.length === 0) {
            var cams = props.camids.split(',');
            cams.forEach((camid)=>{
                setCamRangeValues(0, camid); // initialize rangeValues array for all camera
                var setting = {'max':MAX, 'step':1}
                setCamRangeSettings(setting, camid);
                //setCamImages([], camid);
            });
            (async () => {
                var request = {
                    ids: props.camids
                }
                await getCams(request).then((data) => {
                    //console.log(data);
                    if(typeof data.cams !== 'undefined'){
                        //console.log(data.cams);
                        props.loadWebcams(data.cams);
                        //setCams(data.cams);
                    }
                    //localStorage.setItem('authtoken', JSON.stringify(data));
                    //props.loadWebcams(data.cams);
                    //setCams(data.cams)
                });
            })();
        } 
    }, [])

    
    useEffect(() => {
        if (Object.keys(props.cams).length > 0) {
            (async () => {
                Object.values(props.cams).forEach((item, key) => {
                    //console.log("key",key);
                    (async () => {
                        var request = {
                            id: item.id
                        }
                        await getCamArchive(request).then((data) => {
                            if(typeof data.archive !== 'undefined'){
                                /*
                                const archive = {
                                    id: data.id, 
                                    archive: data.archive
                                };
                                props.loadWebcamArchive(archive);
                                */
                                //setCams(data.cams);
                                //imagesArr[key] = [];
                                var imagesArr = [];
                                Object.values(data.archive).map((image, innerkey) => {
                                    var imgpath = image.imgpath;
                                    var parts = imgpath.split(".");
                                    imagesArr.push({
                                        original: 'https://webcamwidget.fullmarketing.at/camsimg/' + item.id + '/' + parts.join('-1210.'),
                                        thumbnail: 'https://webcamwidget.fullmarketing.at/camsimg/' + item.id + '/' + parts.join('-310.'),
                                        timestamp: image.timestamp,
                                        originalTitle: image.timestamp,
                                    });
                                })
                                
                                //console.log("imagesArr",imagesArr);
                                setCamImages(imagesArr, item.id);
                            }
                            
                        });
                        
                        
                    })();  
                });
            })();   
        }      
        
    }, [props.cams])

    

    console.log("images",images);
    //console.log("length", Object.keys(images).length, Object.keys(props.cams).length)
    return (
        Object.keys(images).length === Object.keys(props.cams).length ?
        <>
                <Slider
                    asNavFor={nav2}
                    ref={slider => (setNav1(slider))}
                    draggable={false}
                >
                    {
                        Object.keys(props.cams)?.map((item, key) => {
                                //console.log('length',Object.keys(images[key]).length)
                                return(
                                    //(typeof images['cam'+item] !== 'undefined' && Object.keys(images['cam'+item]).length > 0) ? 
                                    ('cam'+item in images) ? 
                                    <div key={"a"+item}>
                                        <ImageGallery 
                                        showThumbnails={false} 
                                        showNav={false}
                                        items={images['cam'+item]} 
                                        disableSwipe={true}
                                        renderPlayPauseButton={(onClick, isPlaying) => {
                                            return(
                                                <div>
                                                    <PlayPause onClick={onClick} isPlaying={isPlaying} />
                                                    <input type="range" 
                                                    min="0"
                                                    max={rangeSettings['cam'+item]['max']}
                                                    step={rangeSettings['cam'+item]['step']}
                                                    onChange={(e) => setCamRangeValues(e.target.value, item)}
                                                    style={getBackgroundSize(item)}
                                                    value={rangeValues['cam'+item]} />
                                                    <p>value:{rangeValues['cam'+item]}</p>
                                                    
                                                </div>
                                            )
                                            }
                                          }
                                        />
                                    </div>
                                    : <div key={"a"+item}>Loading</div>
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
                                //console.log('length',Object.keys(images[key]).length)
                                return(
                                    //(typeof images['cam'+item] !== 'undefined' && Object.keys(images['cam'+item]).length > 0) ? 
                                    ('cam'+item in images) ? 
                                    <div key={"a"+item}>
                                        <img alt={''} src={images['cam'+item][0].thumbnail} /> 
                                    </div>
                                    :<div key={"a"+item}>
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
    )
}

TnWebcamNew.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TnWebcamNew)
