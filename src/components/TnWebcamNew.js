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
                            imagesArr[key] = [];
                            Object.values(data.archive).map((image, innerkey) => {
                                var imgpath = image.imgpath;
                                var parts = imgpath.split(".");
                                imagesArr[key].push({
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

    var sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    
    return (
        <>
            <div id={"slider-for"+props.modid} className="slider-for">
                <Slider {...sliderSettings}>
                    {
                        images && Object.values(props.cams)?.map((item, key) => {
                                //console.log('length',Object.keys(images[key]).length)
                                return(
                                    (typeof images[key] !== 'undefined' && Object.keys(images[key]).length > 0) ? 
                                    <div key={"a"+key}>
                                        <ImageGallery 
                                        showThumbnails={false} 
                                        items={images[key]} 
                                        />
                                    </div>
                                    : <div key={"a"+key}>Loading</div>
                                )
                            
                        })
                    }
                </Slider>    
            </div>
        </>
    )
}

TnWebcamNew.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TnWebcamNew)
