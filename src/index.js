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

            
                            <TnWebcamNew lang={lang} camids={camids} color={color} modid={modid} acclat={acclat} acclon={acclon}></TnWebcamNew>
                        
          
                
        
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