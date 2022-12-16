import React, { useState, useEffect } from 'react';
import { loadWebcamsAction, loadWebcamArchiveAction } from '../actions/webcamAction';
import { connect } from 'react-redux';
import getCams from './api/cams';
import getCamArchive from './api/camArchive';
import Sidebar from './Sidebar';
import Cmobileview from './Cmobileview';

const mapStateToProps = state => ({
    cams: state.webcam.webcams,
});

const mapDispatchToProps = dispatch => ({
    loadWebcams: (payload) => dispatch(loadWebcamsAction(payload)),
    loadWebcamArchive: (payload) => dispatch(loadWebcamArchiveAction(payload))
 });

function TnWebcam(props) {
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

    useEffect(() => {
        //console.log("hello",Object.keys(props.cams).length);
        if (Object.keys(props.cams).length > 0) {
            Object.values(props.cams).forEach((item) => {
                (async () => {
                    var request = {
                        id: item.id
                    }
                    await getCamArchive(request).then((data) => {
                        if(typeof data.archive !== 'undefined'){
                            const archive = {id: data.id, archive: data.archive};
                            props.loadWebcamArchive(archive);
                            //setCams(data.cams);
                        }
                    });                
                })();  
            });
        }      
    }, [props.cams])

    return (
        <>
            <div className="wtrcam_main_pop box_loading" id={"wtrcam_main_pop" + props.modid}>
                <div className="wtrcam_main_pop_overlay"></div>
                <div className="close_pop">x</div>
                <div className={"wtrcam_main wtrcam_main"+props.modid} modid={props.modid} >
                    
                    <div className="wtrcam_frt">
                        
                        <div className="wtrcam_frt_img">
                            
                            <div className="camslider">
                                
                                <div id={"slider-for"+props.modid} className="slider-for">
                                {
                                    Object.values(props.cams).map((item, key) => {
                                        return(
                                            <div key={"a"+key}>
                                                <input type="hidden" id={"textcolor"+props.modid + item.id + "cams" + key} value="#000" />	
                                                <span className="divulge-parent" id={"divulge-parent-"+props.modid + item.id + "cams" + key}>
                                                    <Sidebar modid={props.modid} camid={item.id} camkey={key} acclat={props.acclat} acclon={props.acclon}></Sidebar>
                                                    <Cmobileview modid={props.modid} camid={item.id} camkey={key} acclat={props.acclat} acclon={props.acclon}></Cmobileview>
                                                </span> 
                                            </div>
                                        )
                                    })
                                }
                                </div>

                                <div id={"slider-nav"+props.modid} className="slider-nav" style={{display:'none'}}>
                                {
                                    Object.values(props.cams).map((item, key) => {
                                        return(
                                            <div key={"b"+key} className="slider-nav-in" uniqueid={props.modid + item.id + "cams" + key}>                                            
                                                <div className="activityloader">
                                                    <img className="slickthumb_img" id={"slickthumb_"+props.modid + item.id + "cams" + key} src="/dotplaceholder.png" />	
                                                </div>                                            
                                            </div>
                                        );
                                    })
                                }
                                </div>                                
                            
                            </div>
                    
                        </div>
                
                        <div className="wtrcam_bottom"></div>

                    </div>                   

                </div>
            </div>
        </>
    )
}

TnWebcam.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TnWebcam)
