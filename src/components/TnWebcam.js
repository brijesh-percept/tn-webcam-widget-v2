import React, { useState, useEffect } from 'react';
import { loadWebcamsAction } from '../actions/webcamAction';
import { connect } from 'react-redux';
import getCams from './api/cams';

const mapStateToProps = state => ({
    state_data : state,
});

const mapDispatchToProps = dispatch => ({
    //bring global action to local action
    loadWebcams: (payload) => dispatch(loadWebcamsAction(payload))
 });

function TnWebcam(props) {
    const [cams, setCams] = useState([]);
    useEffect(() => {
        if (cams.length === 0) {
            (async () => {
                var request = {
                    ids: props.camids
                }
                await getCams(request).then((data) => {
                    console.log(data);
                    //localStorage.setItem('authtoken', JSON.stringify(data));
                    //props.loadWebcams(data.cams);
                    //setCams(data.cams)
                });
            })();
        }
    }, [])

    return (
        <>
            <div>Hello From webcam widget</div>
        </>
    )
}

TnWebcam.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TnWebcam)
