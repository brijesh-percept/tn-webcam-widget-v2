import React from "react";
import ReactDOM from 'react-dom/client';
import reactToWebComponent from "react-to-webcomponent";
import TnWebcam from './components/TnWebcam';
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

    
    return (

        <Provider store={store}>

            <div styles={styles}>
                <TnWebcam lang={lang} camids={camids} color={color} modid={modid} ></TnWebcam>
            </div>

        </Provider>

    );
};


Index.propTypes = {
    lang: PropTypes.string,
    camids: PropTypes.string,
    color: PropTypes.string,
    modid: PropTypes.string
}


customElements.define(
    "tn-webcam-widget",
    reactToWebComponent(Index, React, ReactDOM, {
        props: ["Lang", "Camids", "Color", "Modid"],
    }),
)