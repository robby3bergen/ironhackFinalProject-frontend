import React, { Component } from 'react';
import Webcam from "react-webcam";
import { withAuth } from '../providers/AuthProvider';
import './Camera.css';

class Camera extends Component {
  
  setRef = webcam => {
    this.webcam = webcam;
  };
 
  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    //console.log(imageSrc);

    // perform parent function upon taking a screenshot
    const parentCallback = this.props.onCapture;
    parentCallback(imageSrc);
  };
 
  render() {
    // Hide camera after screenshot
    if (!this.props.showCamera) {
      return null;
    }

    const videoConstraints = {
      width: 320, //1280
      height: 568, //720
      facingMode: "environment"
    };
 
    return (
      <div>
      <div className="webcam">
        <Webcam
          audio={false}
          height={568} // 350
          ref={this.setRef}
          screenshotFormat="image/png" // don't forget to adjust the base64 string for the google vision api if you change this setting!!
          width={320} // 350
          videoConstraints={videoConstraints}
        />
        <button className="btn-capture" onClick={this.capture}>scan</button>
        </div>
      </div>
    );
  }
}

export default withAuth(Camera);