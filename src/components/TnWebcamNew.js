import React, { useState, useEffect } from 'react';
import { loadWebcamsAction, loadWebcamArchiveAction } from '../actions/webcamAction';
import { connect } from 'react-redux';
import getCams from './api/cams';
import getCamArchive from './api/camArchive';
import ImageGallery from 'react-image-gallery';
import Slider from "react-slick";

const mapStateToProps = state => ({
    cams: state.webcam.webcams,
});

const mapDispatchToProps = dispatch => ({
    loadWebcams: (payload) => dispatch(loadWebcamsAction(payload)),
    loadWebcamArchive: (payload) => dispatch(loadWebcamArchiveAction(payload))
 });

function TnWebcamNew(props) {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    //const [slider1, setSlider1] = useState(null);
    //const [slider2, setSlider2] = useState(null);
    useEffect(() => {
        if (props.cams.length === 0) {
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

    
    const [images, setImages] = useState([]);
    useEffect(() => {
        if (Object.keys(props.cams).length > 0) {
            var imagesArr = [];
            Object.values(props.cams).forEach((item, key) => {
                //console.log("key",key);
                (async () => {
                    var request = {
                        id: item.id
                    }
                    await getCamArchive(request).then((data) => {
                        if(typeof data.archive !== 'undefined'){
                            const archive = {
                                id: data.id, 
                                archive: data.archive
                            };
                            props.loadWebcamArchive(archive);
                            //setCams(data.cams);
                            //imagesArr[key] = [];
                            imagesArr['cam'+item.id] = [];
                            Object.values(data.archive).map((image, innerkey) => {
                                var imgpath = image.imgpath;
                                var parts = imgpath.split(".");
                                imagesArr['cam'+item.id].push({
                                    original: 'https://webcamwidget.fullmarketing.at/camsimg/' + item.id + '/' + parts.join('-1210.'),
                                    thumbnail: 'https://webcamwidget.fullmarketing.at/camsimg/' + item.id + '/' + parts.join('-310.'),
                                    timestamp: image.timestamp,
                                    originalTitle: image.timestamp,
                                });
                            })
                            
                        }
                        //console.log("imagesArr",imagesArr);
                        setImages(imagesArr);
                    });
                    
                    
                })();  
            });
        }      
        
    }, [props.cams])

    //console.log("images",images);

    
    
    return (
        <>
                <Slider
                    asNavFor={nav2}
                    ref={slider => (setNav1(slider))}
                >
                    {
                        images && Object.keys(props.cams)?.map((item, key) => {
                                //console.log('length',Object.keys(images[key]).length)
                                return(
                                    //(typeof images['cam'+item] !== 'undefined' && Object.keys(images['cam'+item]).length > 0) ? 
                                    ('cam'+item in images) ? 
                                    <div key={"a"+item}>
                                        <ImageGallery 
                                        showThumbnails={false} 
                                        showNav={false}
                                        items={images['cam'+item]} 
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
                        images && Object.keys(props.cams)?.map((item, key) => {
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
    )
}

TnWebcamNew.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TnWebcamNew)
