import React from "react";
import ReactDOM from 'react-dom/client';
import reactToWebComponent from "react-to-webcomponent";
import TnWebcamNew from './components/TnWebcamNew';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux'
import configureStore from "./store/configureStore";
import styles from './App.css';

const store = configureStore();

const Index = (props) => {
    const lang = props.Lang ? props.Lang : 'de';
    const color = props.Color;
    const camids = props.Camids;
    const modid = props.Modid;
    const acclat = props.Acclat;
    const acclon = props.Acclon;

    
    return (

        <Provider store={store}>

            <div styles={styles}>

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
                            <TnWebcamNew lang={lang} camids={camids} color={color} modid={modid} acclat={acclat} acclon={acclon}></TnWebcamNew>
                        </div>
                       

                    </div>
                    </div>
                </div>
                </div>
          
                
        
            </div>

        </Provider>

    );
};


Index.propTypes = {
    lang: PropTypes.string,
    camids: PropTypes.string,
    color: PropTypes.string,
    modid: PropTypes.string,
    acclat: PropTypes.string,
    acclon: PropTypes.string
}


customElements.define(
    "tn-webcam-widget",
    reactToWebComponent(Index, React, ReactDOM, {
        props: ["Lang", "Camids", "Color", "Modid", "Acclat", "Acclon"],
    }),
)