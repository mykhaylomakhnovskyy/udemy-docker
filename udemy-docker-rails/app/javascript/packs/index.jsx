import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Home from "../components/Home";

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/index.scss'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Home/>,
        document.body.appendChild(document.createElement('div')),
    )
})