import React, { Component } from 'react';

import './Home.css';

import ImageRenderer from '../image-renderer/ImageRenderer';

import { createController } from '../controller/Controller';
import exampleImage from '../fixtures/example-image';

export default class Home extends Component {
  state = {
    imageLoaded: false,
    imageLoadingError: false,
    loadingImage: false
  }

  controller = null;
  originalImageURI = null;

  invertImageClicked = () => {
    if (this.state.imageLoaded) {
      this.image.invertImage();

      this.image.setNeedsRender();

      this.setState({
        imageLoaded: true
      });
    }
  }

  handleExampleImageClicked = () => {
    if (!this.loadingImage && !this.imageLoaded) {
      this.controller = createController();
      this.originalImageURI = exampleImage;

      this.setState({
        loadingImage: false,
        imageLoaded: true,
        imageLoadingError: false
      });
    }
  }

  handleImageChange = () => {
    if (!this.state.loadingImage && this.imageInputRef.files &&
      this.imageInputRef.files[0]
    ) {
      this.setState({
        loadingImage: true,
        imageLoadingError: false
      });

      const reader = new FileReader();

      reader.onloadend = () => {
        this.controller = createController();
        this.originalImageURI = reader.result;

        this.setState({
          loadingImage: false,
          imageLoaded: true
        });
      };

      reader.onerror = () => {
        this.setState({
          loadingImage: false,
          imageLoadingError: true
        });
      };

      setImmediate(() => {
        reader.readAsDataURL(this.imageInputRef.files[0]);
      });
    }
  }

  render() {
    const { imageLoaded, imageLoadingError, loadingImage } = this.state;

    return (
      <div className="svgee-home">
        {!imageLoaded &&
          <div className="svgee-import-image-prompt">
            <a href="https://github.com/Anemy/svgurt">
              <img
                className="svgee-github-banner"
                src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"
                alt="Fork me on GitHub"
              />
            </a>
            <h1>Svgurt</h1>
            <h2>PNG -&gt; SVG Vectorizing Tool</h2>
            <h3>Free &amp; Open Source</h3>
            <button
              onClick={this.handleExampleImageClicked}
              className={`svgee svgee-image-upload ${loadingImage && 'svgee-image-upload-disabled'}`}
            >Use Example Image</button>
            <br />
            <label
              htmlFor="image-upload"
              className={`svgee svgee-image-upload ${loadingImage && 'svgee-image-upload-disabled'}`}
            >
              Import Image
            </label>
            <input
              accept="image/*"
              disabled={loadingImage}
              id="image-upload"
              onChange={this.handleImageChange}
              ref={ref => { this.imageInputRef = ref; }}
              type="file"
            />
            <div className="svgee-import-image-example">
              <img
                className="svgee-example-image"
                src="/images/palm.png"
                alt="palm tree"
              />
              <div className="svgee-example-text">
                --&gt;
              </div>
              <svg className="svgee-example-svg" height="300" width="235"><path d="M22.25 94.565l2.782 2.781 2.781 2.782 2.782 2.78M22.25 102.909l2.782 2.781 2.781 2.781h2.782M25.032 83.44l2.781 2.78 2.782 2.782 2.78 2.782M25.032 89.002l2.781 2.782 2.782 2.78 2.78 2.782M25.032 94.565l2.781 2.781 2.782 2.782 2.78 2.78M25.032 100.128l2.781 2.78 2.782 2.782 2.78 2.781M25.032 102.909l2.781 2.781M27.813 83.44l2.782 2.78 2.78 2.782 2.782 2.782M27.813 94.565l2.782 2.781 2.78 2.782 2.782 2.78M30.595 83.44l2.78 2.78 2.782 2.782 2.781 2.782M30.595 91.784l2.78 2.78 2.782 2.782 2.781 2.782M33.376 80.658l2.781 2.782 2.781 2.78 2.782 2.782M33.376 83.44l2.781 2.78 2.781 2.782 2.782 2.782M33.376 105.69l2.781 2.781 2.781 2.782h2.782M33.376 111.253h2.781M36.157 80.658l2.781 2.782 2.782 2.78 2.781 2.782M36.157 94.565l2.781 2.781 2.782 2.782 2.781 2.78M36.157 100.128l2.781 2.78 2.782 2.782 2.781 2.781M36.157 105.69l2.781 2.781h2.782l2.781 2.782M38.938 80.658l2.782 2.782 2.781 2.78 2.781 2.782M38.938 94.565l2.782 2.781 2.781 2.782 2.781 2.78M41.72 80.658L44.5 83.44l2.781 2.78 2.782 2.782M41.72 94.565l2.781 2.781 2.781 2.782 2.782 2.78M41.72 102.909l2.781 2.781 2.781 2.781 2.782 2.782M44.501 77.877l2.781 2.781 2.782 2.782 2.781 2.78M44.501 80.658l2.781 2.782 2.782 2.78 2.781 2.782M44.501 91.784l2.781 2.78 2.782 2.782 2.781 2.782M44.501 94.565l2.781 2.781 2.782 2.782 2.781 2.78M44.501 114.034l2.781 2.781 2.782 2.782h2.781M47.282 77.877l2.782 2.781 2.781 2.782 2.781 2.78M47.282 91.784l2.782 2.78 2.781 2.782 2.781 2.782M47.282 105.69l2.782 2.781 2.781 2.782 2.781 2.781M47.282 111.253l2.782 2.781 2.781 2.781 2.781 2.782M47.282 114.034l2.782 2.781M50.064 91.784l2.781 2.78 2.781 2.782 2.782 2.782M50.064 105.69l2.781 2.781 2.781 2.782 2.782 2.781M52.845 91.784l2.781 2.78 2.782 2.782 2.781 2.782M52.845 105.69l2.781 2.781 2.782 2.782 2.781 2.781M52.845 114.034l2.781 2.781 2.782 2.782 2.781 2.781M52.845 164.098l2.781 2.781 2.782 2.782 2.781 2.78M52.845 166.88l2.781 2.78 2.782 2.782 2.781 2.781M55.626 83.44l2.782 2.78 2.781 2.782 2.781 2.782M55.626 89.002l2.782 2.782 2.781 2.78 2.781 2.782M55.626 91.784l2.782 2.78 2.781 2.782 2.781 2.782M55.626 102.909l2.782 2.781 2.781 2.781 2.781 2.782M55.626 105.69l2.782 2.781 2.781 2.782 2.781 2.781M55.626 164.098l2.782 2.781h2.781l2.781 2.782M55.626 178.004l2.782 2.782h2.781l2.781 2.781M58.408 80.658l2.781 2.782 2.781 2.78 2.782 2.782M58.408 83.44l2.781 2.78 2.781 2.782 2.782 2.782M58.408 89.002l2.781 2.782 2.781 2.78 2.782 2.782M58.408 102.909l2.781 2.781 2.781 2.781 2.782 2.782M58.408 116.815l2.781 2.782 2.781 2.781 2.782 2.781M58.408 164.098h2.781l2.781 2.781 2.782 2.782M58.408 175.223l2.781 2.781 2.781 2.782 2.782 2.781M61.189 102.909l2.781 2.781 2.782 2.781 2.781 2.782M61.189 116.815l2.781 2.782 2.782 2.781 2.781 2.781M61.189 161.317l2.781 2.78 2.782 2.782 2.781 2.782M61.189 186.348h2.781l2.782 2.782h2.781M63.97 75.096l2.782 2.781 2.781 2.781 2.781 2.782M63.97 77.877l2.782 2.781 2.781 2.782 2.781 2.78M63.97 83.44l2.782 2.78 2.781 2.782 2.781 2.782M63.97 102.909l2.782 2.781 2.781 2.781 2.781 2.782M63.97 116.815l2.782 2.782 2.781 2.781 2.781 2.781M63.97 161.317l2.782 2.78 2.781 2.782 2.781 2.782M63.97 172.442l2.782 2.781 2.781 2.781 2.781 2.782M63.97 175.223l2.782 2.781 2.781 2.782 2.781 2.781M63.97 178.004l2.782 2.782 2.781 2.781 2.781 2.781M66.752 83.44l2.781 2.78 2.781 2.782 2.782 2.782M66.752 94.565l2.781 2.781 2.781 2.782 2.782 2.78M66.752 100.128l2.781 2.78 2.781 2.782 2.782 2.781M66.752 102.909l2.781 2.781 2.781 2.781 2.782 2.782M66.752 114.034l2.781 2.781 2.781 2.782 2.782 2.781M66.752 116.815l2.781 2.782 2.781 2.781 2.782 2.781M66.752 155.754l2.781 2.781h2.781l2.782 2.782M66.752 161.317l2.781 2.78 2.781 2.782 2.782 2.782M66.752 172.442l2.781 2.781 2.781 2.781 2.782 2.782M66.752 186.348h2.781l2.781 2.782 2.782 2.781M66.752 191.911l2.781 2.781 2.781 2.782h2.782M69.533 77.877l2.781 2.781 2.782 2.782v2.78M69.533 91.784l2.781 2.78 2.782 2.782 2.781 2.782M69.533 94.565l2.781 2.781 2.782 2.782 2.781 2.78M69.533 100.128l2.781 2.78 2.782 2.782 2.781 2.781M69.533 114.034l2.781 2.781 2.782 2.782h2.781M69.533 147.41l2.781 2.781 2.782 2.782 2.781 2.78M69.533 152.973l2.781 2.78 2.782 2.782 2.781 2.782M69.533 161.317l2.781 2.78 2.782 2.782 2.781 2.782M69.533 172.442l2.781 2.781 2.782 2.781 2.781 2.782M72.314 75.096v2.781l2.782 2.781M72.314 114.034l2.782 2.781h2.781l2.781 2.782M72.314 147.41l2.782 2.781 2.781 2.782 2.781 2.78M72.314 152.973l2.782 2.78 2.781 2.782 2.781 2.782M72.314 172.442l2.782 2.781 2.781 2.781 2.781 2.782M72.314 191.911l2.782 2.781h5.562M75.096 89.002l2.781 2.782 2.781 2.78 2.782 2.782M75.096 94.565l2.781 2.781 2.781 2.782 2.782 2.78M75.096 114.034h2.781l2.781 2.781 2.782 2.782M75.096 141.847l2.781 2.782 2.781 2.781 2.782 2.781M75.096 147.41l2.781 2.781 2.781 2.782 2.782 2.78M75.096 164.098l2.781 2.781 2.781 2.782 2.782 2.78M75.096 172.442l2.781 2.781 2.781 2.781 2.782 2.782M75.096 183.567l2.781 2.781 2.781 2.782 2.782 2.781M75.096 186.348l2.781 2.782 2.781 2.781 2.782 2.781M75.096 189.13l2.781 2.781M77.877 89.002l2.781 2.782 2.782 2.78 2.78 2.782M77.877 94.565l2.781 2.781 2.782 2.782 2.78 2.78M77.877 105.69l2.781 2.781 2.782 2.782 2.78 2.781M77.877 111.253l2.781 2.781h2.782l2.78 2.781M77.877 136.285l2.781 2.781 2.782 2.781 2.78 2.782M77.877 141.847l2.781 2.782 2.782 2.781 2.78 2.781M77.877 147.41l2.781 2.781 2.782 2.782 2.78 2.78M77.877 164.098l2.781 2.781 2.782 2.782 2.78 2.78M77.877 172.442l2.781 2.781 2.782 2.781 2.78 2.782M77.877 183.567l2.781 2.781 2.782 2.782h2.78M80.658 36.157l2.782 2.781 2.78 2.782 2.782 2.781M80.658 55.626l2.782 2.782 2.78 2.781 2.782 2.781M80.658 80.658V86.22l2.782 2.782M80.658 89.002l2.782 2.782 2.78 2.78 2.782 2.782M80.658 102.909l2.782 2.781 2.78 2.781 2.782 2.782M80.658 105.69l2.782 2.781 2.78 2.782 2.782 2.781M80.658 133.503l2.782 2.782 2.78 2.781 2.782 2.781M80.658 141.847l2.782 2.782 2.78 2.781 2.782 2.781M80.658 158.535l2.782 2.782 2.78 2.78 2.782 2.782M80.658 164.098l2.782 2.781 2.78 2.782 2.782 2.78M80.658 172.442l2.782 2.781 2.78 2.781 2.782 2.782M80.658 183.567h2.782l2.78 2.781 2.782 2.782M83.44 27.813l2.78 2.782 2.782 2.78 2.782 2.782M83.44 33.376l2.78 2.781 2.782 2.781 2.782 2.782M83.44 36.157l2.78 2.781 2.782 2.782 2.782 2.781M83.44 41.72l2.78 2.781 2.782 2.781 2.782 2.782M83.44 44.501l2.78 2.781 2.782 2.782 2.782 2.781M83.44 47.282l2.78 2.782 2.782 2.781 2.782 2.781M83.44 55.626l2.78 2.782 2.782 2.781 2.782 2.781M83.44 61.189l2.78 2.781 2.782 2.782 2.782 2.781M83.44 63.97l2.78 2.782v2.781M83.44 130.722h2.78l2.782 2.781 2.782 2.782M83.44 158.535l2.78 2.782 2.782 2.78 2.782 2.782M83.44 164.098l2.78 2.781 2.782 2.782 2.782 2.78M86.22 27.813l2.782 2.782 2.782 2.78 2.78 2.782M86.22 33.376l2.782 2.781 2.782 2.781 2.78 2.782M86.22 52.845l2.782 2.781 2.782 2.782 2.78 2.781M86.22 55.626l2.782 2.782 2.782 2.781 2.78 2.781M86.22 75.096l2.782 2.781 2.782 2.781v2.782M86.22 77.877v2.781M86.22 89.002l2.782 2.782 2.782 2.78 2.78 2.782M86.22 91.784l2.782 2.78M86.22 100.128l2.782 2.78 2.782 2.782 2.78 2.781M86.22 105.69l2.782 2.781 2.782 2.782 2.78 2.781M86.22 152.973l2.782 2.78 2.782 2.782 2.78 2.782M86.22 158.535l2.782 2.782 2.782 2.78 2.78 2.782M86.22 175.223l2.782 2.781 2.782 2.782 2.78 2.781M86.22 183.567l2.782 2.781 2.782 2.782h2.78M89.002 25.032l2.782 2.781 2.78 2.782 2.782 2.78M89.002 27.813l2.782 2.782 2.78 2.78 2.782 2.782M89.002 75.096l2.782 2.781h2.78M89.002 89.002l2.782 2.782h2.78l2.782 2.78M89.002 100.128l2.782 2.78 2.78 2.782 2.782 2.781M89.002 105.69l2.782 2.781 2.78 2.782 2.782 2.781M89.002 116.815l2.782 2.782 2.78 2.781 2.782 2.781M89.002 119.597l2.782 2.781 2.78 2.781v2.782M89.002 125.16l2.782 2.78 2.78 2.782 2.782 2.781M89.002 127.94v2.782l2.782 2.781 2.78 2.782M89.002 136.285l2.782 2.781 2.78 2.781 2.782 2.782M89.002 139.066l2.782 2.781 2.78 2.782 2.782 2.781M89.002 144.629l2.782 2.781 2.78 2.781 2.782 2.782M89.002 147.41l2.782 2.781 2.78 2.782 2.782 2.78M89.002 152.973l2.782 2.78 2.78 2.782 2.782 2.782M89.002 158.535l2.782 2.782 2.78 2.78 2.782 2.782M89.002 175.223l2.782 2.781 2.78 2.782 2.782 2.781M89.002 183.567l2.782 2.781H97.346M89.002 191.911h2.782M91.784 22.25l2.78 2.782 2.782 2.781 2.782 2.782M91.784 25.032l2.78 2.781 2.782 2.782 2.782 2.78M91.784 47.282l2.78 2.782 2.782 2.781 2.782 2.781M91.784 66.752l2.78 2.781 2.782 2.781 2.782 2.782M91.784 72.314l2.78 2.782h2.782l2.782 2.781M91.784 86.22l2.78 2.782 2.782 2.782 2.782 2.78M91.784 100.128l2.78 2.78 2.782 2.782 2.782 2.781M91.784 114.034l2.78 2.781 2.782 2.782 2.782 2.781M91.784 116.815l2.78 2.782 2.782 2.781 2.782 2.781M91.784 144.629l2.78 2.781 2.782 2.781 2.782 2.782M91.784 152.973l2.78 2.78 2.782 2.782 2.782 2.782M91.784 169.66l2.78 2.782 2.782 2.781 2.782 2.781M91.784 175.223l2.78 2.781 2.782 2.782 2.782 2.781M94.565 22.25l2.781 2.782 2.782 2.781 2.78 2.782M94.565 38.938l2.781 2.782 2.782 2.781 2.78 2.781M94.565 44.501l2.781 2.781 2.782 2.782 2.78 2.781M94.565 47.282l2.781 2.782 2.782 2.781 2.78 2.781M94.565 52.845l2.781 2.781 2.782 2.782 2.78 2.781M94.565 55.626l2.781 2.782 2.782 2.781 2.78 2.781M94.565 58.408l2.781 2.781 2.782 2.781 2.78 2.782M94.565 66.752l2.781 2.781 2.782 2.781 2.78 2.782M94.565 100.128l2.781 2.78 2.782 2.782 2.78 2.781M94.565 133.503l2.781 2.782 2.782 2.781 2.78 2.781M94.565 139.066l2.781 2.781 2.782 2.782 2.78 2.781M94.565 169.66l2.781 2.782 2.782 2.781 2.78 2.781M94.565 175.223l2.781 2.781 2.782 2.782 2.78 2.781M97.346 19.47l2.782 2.78 2.78 2.782 2.782 2.781M97.346 38.938l2.782 2.782 2.78 2.781 2.782 2.781M97.346 44.501l2.782 2.781 2.78 2.782 2.782 2.781M97.346 63.97l2.782 2.782 2.78 2.781 2.782 2.781M97.346 66.752l2.782 2.781 2.78 2.781 2.782 2.782M97.346 83.44l2.782 2.78 2.78 2.782 2.782 2.782M97.346 86.22v2.782l2.782 2.782 2.78 2.78M97.346 97.346l2.782 2.782 2.78 2.78 2.782 2.782M97.346 100.128l2.782 2.78 2.78 2.782M97.346 111.253l2.782 2.781 2.78 2.781 2.782 2.782M97.346 116.815l2.782 2.782 2.78 2.781 2.782 2.781M97.346 130.722l2.782 2.781 2.78 2.782 2.782 2.781M97.346 139.066l2.782 2.781 2.78 2.782h2.782M97.346 164.098l2.782 2.781 2.78 2.782v2.78M97.346 169.66l2.782 2.782 2.78 2.781 2.782 2.781M100.128 19.47l2.78 2.78 2.782 2.782 2.781 2.781M100.128 25.032l2.78 2.781 2.782 2.782 2.781 2.78M100.128 36.157l2.78 2.781 2.782 2.782 2.781 2.781M100.128 38.938l2.78 2.782 2.782 2.781 2.781 2.781M100.128 80.658l2.78 2.782 2.782 2.78 2.781 2.782M100.128 83.44l2.78 2.78 2.782 2.782 2.781 2.782M100.128 97.346l2.78 2.782 2.782 2.78 2.781 2.782M100.128 111.253l2.78 2.781 2.782 2.781 2.781 2.782M100.128 116.815l2.78 2.782 2.782 2.781 2.781 2.781M100.128 127.94l2.78 2.782 2.782 2.781 2.781 2.782M100.128 136.285l2.78 2.781 2.782 2.781 2.781 2.782M100.128 147.41l2.78 2.781 2.782 2.782 2.781 2.78M100.128 150.191l2.78 2.782 2.782 2.78 2.781 2.782M100.128 155.754l2.78 2.781v2.782l2.782 2.78M100.128 164.098l2.78 2.781h2.782l2.781 2.782M100.128 186.348v2.782M102.909 19.47l2.781 2.78 2.781 2.782 2.782 2.781M102.909 33.376l2.781 2.781 2.781 2.781 2.782 2.782M102.909 36.157l2.781 2.781 2.781 2.782 2.782 2.781M102.909 58.408l2.781 2.781 2.781 2.781 2.782 2.782M102.909 77.877l2.781 2.781 2.781 2.782 2.782 2.78M102.909 80.658l2.781 2.782 2.781 2.78 2.782 2.782M102.909 97.346l2.781 2.782 2.781 2.78h2.782M102.909 111.253l2.781 2.781 2.781 2.781 2.782 2.782M102.909 125.16l2.781 2.78 2.781 2.782 2.782 2.781M102.909 127.94l2.781 2.782 2.781 2.781 2.782 2.782M105.69 16.688h2.781M105.69 33.376l2.781 2.781 2.782 2.781 2.781 2.782M105.69 50.064l2.781 2.781 2.782 2.781 2.781 2.782M105.69 55.626l2.781 2.782 2.782 2.781 2.781 2.781M105.69 58.408l2.781 2.781 2.782 2.781 2.781 2.782M105.69 63.97l2.781 2.782 2.782 2.781 2.781 2.781M105.69 66.752l2.781 2.781 2.782 2.781 2.781 2.782M105.69 69.533l2.781 2.781 2.782 2.782 2.781 2.781M105.69 77.877l2.781 2.781 2.782 2.782 2.781 2.78M105.69 94.565l2.781 2.781 2.782 2.782 2.781 2.78M105.69 97.346l2.781 2.782M105.69 111.253l2.781 2.781 2.782 2.781 2.781 2.782M105.69 136.285l2.781 2.781 2.782 2.781h2.781M105.69 150.191l2.781 2.782h2.782M105.69 264.225l2.781 2.782 2.782 2.781h2.781M105.69 267.007l2.781 2.781V275.351M105.69 269.788v2.781M105.69 305.945l2.781 2.782M105.69 308.727v2.78l2.781 2.782h2.782M105.69 314.29l2.781 2.78M105.69 317.07v2.782M108.471 30.595l2.782 2.78 2.781 2.782 2.781 2.781M108.471 50.064l2.782 2.781 2.781 2.781 2.781 2.782M108.471 55.626l2.782 2.782 2.781 2.781 2.781 2.781M108.471 75.096l2.782 2.781 2.781 2.781 2.781 2.782M108.471 77.877l2.782 2.781 2.781 2.782 2.781 2.78M108.471 94.565l2.782 2.781 2.781 2.782 2.781 2.78M108.471 108.471l2.782 2.782 2.781 2.781 2.781 2.781M108.471 111.253l2.782 2.781 2.781 2.781 2.781 2.782M108.471 122.378l2.782 2.781 2.781 2.782 2.781 2.781M108.471 127.94l2.782 2.782h2.781l2.781 2.781M108.471 147.41h2.782M108.471 164.098h2.782M108.471 261.444l2.782 2.781 2.781 2.782 2.781 2.781M108.471 264.225l2.782 2.782M108.471 278.132l2.782 2.781h2.781l2.781 2.782M108.471 280.913l2.782 2.782v2.781M108.471 283.695v5.562M108.471 300.383l2.782 2.78 2.781 2.782h2.781M108.471 305.945h2.782M111.253 25.032l2.781 2.781 2.781 2.782 2.782 2.78M111.253 30.595l2.781 2.78 2.781 2.782 2.782 2.781M111.253 36.157l2.781 2.781 2.781 2.782 2.782 2.781M111.253 47.282l2.781 2.782 2.781 2.781 2.782 2.781M111.253 50.064l2.781 2.781 2.781 2.781 2.782 2.782M111.253 91.784l2.781 2.78 2.781 2.782 2.782 2.782M111.253 108.471l2.781 2.782 2.781 2.781 2.782 2.781M111.253 122.378l2.781 2.781 2.781 2.782 2.782 2.781M111.253 139.066h5.562M111.253 158.535h2.781l2.781 2.782 2.782 2.78M111.253 214.162l2.781 2.781h2.781l2.782 2.781M111.253 216.943l2.781 2.781 2.781 2.782 2.782 2.78M111.253 219.724v2.782l2.781 2.78 2.781 2.782M111.253 225.287V230.85l2.781 2.78M111.253 236.412l2.781 2.782 2.781 2.78h2.782M111.253 239.194l2.781 2.78V247.538M111.253 241.975V250.319M111.253 253.1H119.597M111.253 255.881v2.782l2.781 2.781 2.781 2.781M111.253 261.444l2.781 2.781M111.253 278.132h5.562l2.782 2.781M114.034 30.595l2.781 2.78 2.782 2.782 2.781 2.781M114.034 44.501l2.781 2.781 2.782 2.782 2.781 2.781M114.034 47.282l2.781 2.782 2.782 2.781 2.781 2.781M114.034 69.533l2.781 2.781 2.782 2.782 2.781 2.781M114.034 89.002l2.781 2.782 2.782 2.78 2.781 2.782M114.034 91.784l2.781 2.78 2.782 2.782 2.781 2.782M114.034 97.346l2.781 2.782 2.782 2.78 2.781 2.782M114.034 108.471l2.781 2.782 2.782 2.781 2.781 2.781M114.034 122.378H119.597l2.781 2.781M114.034 136.285H119.597l2.781 2.781M114.034 169.66l2.781 2.782 2.782 2.781h2.781M114.034 175.223l2.781 2.781 2.782 2.782 2.781 2.781M114.034 178.004l2.781 2.782 2.782 2.781 2.781 2.781M114.034 180.786l2.781 2.781M114.034 183.567v2.781l2.781 2.782 2.782 2.781M114.034 189.13l2.781 2.781 2.782 2.781 2.781 2.782M114.034 191.911l2.781 2.781 2.782 2.782 2.781 2.781M114.034 197.474h2.781l2.782 2.781 2.781 2.781M114.034 200.255l2.781 2.781 2.782 2.782v2.781M114.034 203.036l2.781 2.782v2.781l2.782 2.781M114.034 205.818v2.781l2.781 2.781v2.782M114.034 275.35h2.781l2.782 2.782M114.034 292.039l2.781 2.78 2.782 2.782h2.781M114.034 311.508h2.781M114.034 322.633H122.378M116.815 25.032l2.782 2.781M116.815 44.501l2.782 2.781 2.781 2.782 2.781 2.781M116.815 61.189l2.782 2.781 2.781 2.782 2.781 2.781M116.815 66.752l2.782 2.781 2.781 2.781 2.781 2.782M116.815 69.533l2.782 2.781 2.781 2.782 2.781 2.781M116.815 75.096l2.782 2.781 2.781 2.781 2.781 2.782M116.815 77.877l2.782 2.781 2.781 2.782 2.781 2.78M116.815 80.658l2.782 2.782 2.781 2.78 2.781 2.782M116.815 89.002l2.782 2.782 2.781 2.78 2.781 2.782M116.815 108.471l2.782 2.782 2.781 2.781 2.781 2.781M116.815 150.191l2.782 2.782h2.781l2.781 2.78M116.815 155.754l2.782 2.781 2.781 2.782 2.781 2.78M116.815 164.098l2.782 2.781 2.781 2.782 2.781 2.78M116.815 166.88l2.782 2.78 2.781 2.782 2.781 2.781M116.815 175.223l2.782 2.781 2.781 2.782 2.781 2.781M116.815 225.287l2.782 2.781 2.781 2.782 2.781 2.78M116.815 230.85l2.782 2.78 2.781 2.782 2.781 2.782M116.815 233.63l2.782 2.782 2.781 2.782 2.781 2.78M116.815 236.412l2.782 2.782 2.781 2.78 2.781 2.782M116.815 250.319h2.782l2.781 2.781 2.781 2.781M116.815 261.444l2.782 2.781v2.782l2.781 2.781M116.815 272.57h2.782l2.781 2.78 2.781 2.782M116.815 289.257h2.782M116.815 292.039l2.782 2.78h5.562M116.815 319.852h2.782M119.597 41.72l2.781 2.781 2.781 2.781 2.782 2.782M119.597 61.189l2.781 2.781 2.781 2.782 2.782 2.781M119.597 66.752l2.781 2.781 2.781 2.781 2.782 2.782M119.597 86.22l2.781 2.782 2.781 2.782 2.782 2.78M119.597 89.002l2.781 2.782 2.781 2.78 2.782 2.782M119.597 105.69l2.781 2.781 2.781 2.782 2.782 2.781M119.597 108.471l2.781 2.782 2.781 2.781 2.782 2.781M119.597 119.597l2.781 2.781 2.781 2.781 2.782 2.782M119.597 127.94l2.781 2.782 2.781 2.781 2.782 2.782M119.597 147.41l2.781 2.781 2.781 2.782 2.782 2.78M119.597 247.537l2.781 2.782 2.781 2.781 2.782 2.781M119.597 258.663h2.781l2.781 2.781h2.782M119.597 269.788l2.781 2.781h2.781l2.782 2.782M119.597 286.476h2.781l2.781 2.781 2.782 2.782M119.597 300.383v2.78l2.781 2.782 2.781 2.782M122.378 36.157l2.781 2.781 2.782 2.782 2.781 2.781M122.378 41.72l2.781 2.781 2.782 2.781 2.781 2.782M122.378 47.282l2.781 2.782 2.782 2.781 2.781 2.781M122.378 58.408l2.781 2.781 2.782 2.781 2.781 2.782M122.378 61.189l2.781 2.781 2.782 2.782M122.378 102.909l2.781 2.781 2.782 2.781 2.781 2.782M122.378 119.597l2.781 2.781 2.782 2.781 2.781 2.782M122.378 127.94l2.781 2.782 2.782 2.781 2.781 2.782M122.378 133.503l2.781 2.782 2.782 2.781 2.781 2.781M122.378 136.285l2.781 2.781 2.782 2.781 2.781 2.782M122.378 141.847l2.781 2.782h2.782l2.781 2.781M122.378 144.629l2.781 2.781 2.782 2.781h2.781M122.378 147.41l2.781 2.781 2.782 2.782 2.781 2.78M122.378 158.535h2.781l2.782 2.782 2.781 2.78M122.378 164.098l2.781 2.781 2.782 2.782 2.781 2.78M122.378 166.88l2.781 2.78 2.782 2.782 2.781 2.781M122.378 191.911l2.781 2.781 2.782 2.782 2.781 2.781M122.378 194.692l2.781 2.782 2.782 2.781 2.781 2.781M122.378 214.162l2.781 2.781 2.782 2.781 2.781 2.782M122.378 216.943l2.781 2.781 2.782 2.782 2.781 2.78M122.378 228.068l2.781 2.782 2.782 2.78h2.781M122.378 233.63l2.781 2.782M122.378 247.537l2.781 2.782h2.782l2.781 2.781M122.378 283.695l2.781 2.781M122.378 311.508h2.781l2.782 2.781 2.781 2.781M122.378 314.29l2.781 2.78 2.782 2.782 2.781 2.781M125.16 41.72l2.78 2.781 2.782 2.781h2.781M125.16 55.626l2.78 2.782 2.782 2.781 2.781 2.781M125.16 58.408l2.78 2.781 2.782 2.781 2.781 2.782M125.16 80.658l2.78 2.782 2.782 2.78 2.781 2.782M125.16 100.128l2.78 2.78 2.782 2.782 2.781 2.781M125.16 102.909l2.78 2.781 2.782 2.781 2.781 2.782M125.16 108.471l2.78 2.782 2.782 2.781 2.781 2.781M125.16 119.597l2.78 2.781 2.782 2.781 2.781 2.782M125.16 127.94l2.78 2.782 2.782 2.781 2.781 2.782M125.16 178.004l2.78 2.782 2.782 2.781 2.781 2.781M125.16 180.786l2.78 2.781 2.782 2.781 2.781 2.782M125.16 186.348l2.78 2.782 2.782 2.781 2.781 2.781M125.16 191.911l2.78 2.781 2.782 2.782 2.781 2.781M125.16 200.255l2.78 2.781 2.782 2.782 2.781 2.781M125.16 214.162l2.78 2.781 2.782 2.781 2.781 2.782M125.16 247.537h2.78l2.782 2.782 2.781 2.781M125.16 264.225l2.78 2.782 2.782 2.781h2.781M125.16 267.007l2.78 2.781v2.781M125.16 280.913l2.78 2.782 2.782 2.781 2.781 2.781M125.16 300.383h2.78l2.782 2.78 2.781 2.782M125.16 303.164v2.781l2.78 2.782 2.782 2.78M125.16 319.852l2.78 2.781M127.94 36.157l2.782 2.781 2.781 2.782 2.782 2.781M127.94 38.938l2.782 2.782 2.781 2.781M127.94 55.626l2.782 2.782 2.781 2.781h2.782M127.94 72.314l2.782 2.782 2.781 2.781 2.782 2.781M127.94 77.877l2.782 2.781 2.781 2.782 2.782 2.78M127.94 80.658l2.782 2.782 2.781 2.78 2.782 2.782M127.94 86.22l2.782 2.782 2.781 2.782 2.782 2.78M127.94 89.002l2.782 2.782 2.781 2.78 2.782 2.782M127.94 91.784l2.782 2.78 2.781 2.782 2.782 2.782M127.94 100.128l2.782 2.78 2.781 2.782 2.782 2.781M127.94 119.597l2.782 2.781 2.781 2.781 2.782 2.782M127.94 158.535l2.782 2.782 2.781 2.78h2.782M127.94 164.098l2.782 2.781 2.781 2.782M127.94 166.88l2.782 2.78M127.94 175.223l2.782 2.781 2.781 2.782v2.781M127.94 178.004l2.782 2.782M127.94 186.348l2.782 2.782 2.781 2.781M127.94 191.911l2.782 2.781 2.781 2.782 2.782 2.781M127.94 205.818l2.782 2.781 2.781 2.781 2.782 2.782M127.94 208.599l2.782 2.781 2.781 2.782 2.782 2.781M127.94 211.38l2.782 2.782 2.781 2.781 2.782 2.781M127.94 214.162l2.782 2.781 2.781 2.781 2.782 2.782M127.94 225.287l2.782 2.781 2.781 2.782 2.782 2.78M127.94 230.85h2.782l2.781 2.78 2.782 2.782M127.94 241.975l2.782 2.781 2.781 2.781 2.782 2.782M127.94 244.756l2.782 2.781 2.781 2.782 2.782 2.781M127.94 258.663l2.782 2.781 2.781 2.781 2.782 2.782M127.94 278.132l2.782 2.781H136.285M127.94 280.913l2.782 2.782M127.94 294.82h2.782l2.781 2.781 2.782 2.782M127.94 297.601l2.782 2.782 2.781 2.78 2.782 2.782M127.94 311.508l2.782 2.781 2.781 2.781 2.782 2.782M127.94 317.07l2.782 2.782 2.781 2.781h2.782M130.722 33.376l2.781 2.781 2.782 2.781 2.781 2.782M130.722 36.157l2.781 2.781 2.782 2.782M130.722 72.314l2.781 2.782 2.782 2.781 2.781 2.781M130.722 77.877l2.781 2.781 2.782 2.782 2.781 2.78M130.722 97.346l2.781 2.782 2.782 2.78 2.781 2.782M130.722 100.128l2.781 2.78 2.782 2.782 2.781 2.781M130.722 116.815l2.781 2.782 2.782 2.781 2.781 2.781M130.722 119.597l2.781 2.781 2.782 2.781 2.781 2.782M130.722 130.722l2.781 2.781 2.782 2.782h2.781M130.722 139.066l2.781 2.781 2.782 2.782 2.781 2.781M130.722 158.535l2.781 2.782h2.782l2.781 2.78M130.722 239.194l2.781 2.78 2.782 2.782 2.781 2.781M130.722 241.975l2.781 2.781 2.782 2.781 2.781 2.782M130.722 255.881l2.781 2.782 2.782 2.781 2.781 2.781M130.722 258.663l2.781 2.781 2.782 2.781 2.781 2.782M130.722 264.225l2.781 2.782 2.782 2.781 2.781 2.781M130.722 289.257l2.781 2.782 2.782 2.78 2.781 2.782M130.722 292.039l2.781 2.78 2.782 2.782M133.503 30.595v2.78l2.782 2.782 2.781 2.781M133.503 58.408h2.782M133.503 69.533l2.782 2.781 2.781 2.782 2.781 2.781M133.503 72.314l2.782 2.782 2.781 2.781 2.781 2.781M133.503 114.034l2.782 2.781 2.781 2.782 2.781 2.781M133.503 130.722l2.782 2.781h2.781l2.781 2.782M133.503 139.066l2.782 2.781 2.781 2.782 2.781 2.781M133.503 144.629l2.782 2.781 2.781 2.781 2.781 2.782M133.503 150.191l2.782 2.782 2.781 2.78 2.781 2.782M133.503 152.973l2.782 2.78 2.781 2.782 2.781 2.782M133.503 155.754l2.782 2.781 2.781 2.782 2.781 2.78M133.503 203.036l2.782 2.782v2.781l2.781 2.781M133.503 225.287l2.782 2.781 2.781 2.782 2.781 2.78M133.503 228.068l2.782 2.782 2.781 2.78 2.781 2.782M133.503 236.412l2.782 2.782 2.781 2.78 2.781 2.782M133.503 239.194l2.782 2.78 2.781 2.782 2.781 2.781M133.503 255.881l2.782 2.782 2.781 2.781 2.781 2.781M133.503 275.35l2.782 2.782 2.781 2.781 2.781 2.782M133.503 300.383l2.782 2.78 2.781 2.782 2.781 2.782M133.503 308.727v2.78l2.782 2.782 2.781 2.781M136.285 91.784l2.781 2.78 2.781 2.782 2.782 2.782M136.285 111.253l2.781 2.781h2.781l2.782 2.781M136.285 114.034l2.781 2.781 2.781 2.782 2.782 2.781M136.285 119.597l2.781 2.781 2.781 2.781 2.782 2.782M136.285 130.722h2.781l2.781 2.781 2.782 2.782M136.285 139.066l2.781 2.781 2.781 2.782 2.782 2.781M136.285 150.191l2.781 2.782 2.781 2.78 2.782 2.782M136.285 211.38l2.781 2.782v5.562M136.285 225.287l2.781 2.781 2.781 2.782 2.782 2.78M136.285 255.881l2.781 2.782 2.781 2.781 2.782 2.781M136.285 275.35l2.781 2.782 2.781 2.781 2.782 2.782M136.285 286.476l2.781 2.781 2.781 2.782 2.782 2.78M136.285 292.039l2.781 2.78 2.781 2.782 2.782 2.782M139.066 63.97l2.781 2.782 2.782 2.781 2.781 2.781M139.066 66.752l2.781 2.781 2.782 2.781 2.781 2.782M139.066 69.533l2.781 2.781 2.782 2.782 2.781 2.781M139.066 83.44l2.781 2.78 2.782 2.782 2.781 2.782M139.066 89.002l2.781 2.782 2.782 2.78 2.781 2.782M139.066 91.784l2.781 2.78 2.782 2.782 2.781 2.782M139.066 97.346l2.781 2.782 2.782 2.78 2.781 2.782M139.066 100.128l2.781 2.78M139.066 166.88h2.781M139.066 222.506l2.781 2.78v2.782M139.066 236.412l2.781 2.782 2.782 2.78v2.782M139.066 239.194l2.781 2.78M139.066 253.1l2.781 2.781 2.782 2.782 2.781 2.781M139.066 255.881l2.781 2.782 2.782 2.781 2.781 2.781M139.066 269.788l2.781 2.781 2.782 2.782 2.781 2.781M139.066 275.35l2.781 2.782h2.782l2.781 2.781M139.066 283.695l2.781 2.781 2.782 2.781 2.781 2.782M139.066 286.476l2.781 2.781 2.782 2.782 2.781 2.78M139.066 292.039l2.781 2.78 2.782 2.782 2.781 2.782M139.066 303.164l2.781 2.781 2.782 2.782 2.781 2.78M139.066 308.727l2.781 2.78 2.782 2.782 2.781 2.781M139.066 311.508l2.781 2.781 2.782 2.781 2.781 2.782M139.066 314.29l2.781 2.78 2.782 2.782 2.781 2.781M139.066 322.633H144.629M141.847 58.408l2.782 2.781 2.781 2.781 2.781 2.782M141.847 61.189l2.782 2.781 2.781 2.782 2.781 2.781M141.847 63.97l2.782 2.782 2.781 2.781 2.781 2.781M141.847 75.096l2.782 2.781 2.781 2.781 2.781 2.782M141.847 83.44l2.782 2.78 2.781 2.782 2.781 2.782M141.847 89.002l2.782 2.782 2.781 2.78 2.781 2.782M141.847 127.94l2.782 2.782 2.781 2.781 2.781 2.782M141.847 130.722l2.782 2.781M141.847 139.066l2.782 2.781 2.781 2.782 2.781 2.781M141.847 141.847l2.782 2.782 2.781 2.781 2.781 2.781M141.847 150.191l2.782 2.782 2.781 2.78 2.781 2.782M141.847 250.319l2.782 2.781 2.781 2.781 2.781 2.782M141.847 253.1l2.782 2.781 2.781 2.782 2.781 2.781M141.847 267.007l2.782 2.781 2.781 2.781 2.781 2.782M141.847 269.788l2.782 2.781 2.781 2.782 2.781 2.781M141.847 300.383l2.782 2.78 2.781 2.782 2.781 2.782M141.847 303.164l2.782 2.781 2.781 2.782 2.781 2.78M144.629 52.845l2.781 2.781 2.781 2.782 2.782 2.781M144.629 55.626l2.781 2.782 2.781 2.781 2.782 2.781M144.629 58.408l2.781 2.781 2.781 2.781 2.782 2.782M144.629 80.658l2.781 2.782 2.781 2.78 2.782 2.782M144.629 83.44l2.781 2.78 2.781 2.782 2.782 2.782M144.629 119.597l2.781 2.781M144.629 139.066l2.781 2.781 2.781 2.782 2.782 2.781M144.629 150.191l2.781 2.782 2.781 2.78 2.782 2.782M144.629 155.754l2.781 2.781 2.781 2.782v2.78M144.629 161.317l2.781 2.78v2.782M144.629 236.412v2.782M144.629 247.537l2.781 2.782v2.781M144.629 267.007l2.781 2.781 2.781 2.781 2.782 2.782M144.629 286.476l2.781 2.781 2.781 2.782 2.782 2.78M144.629 311.508l2.781 2.781 2.781 2.781 2.782 2.782M147.41 52.845l2.781 2.781 2.782 2.782 2.78 2.781M147.41 127.94l2.781 2.782 2.782 2.781 2.78 2.782M147.41 130.722l2.781 2.781 2.782 2.782 2.78 2.781M147.41 150.191l2.781 2.782 2.782 2.78 2.78 2.782M147.41 267.007l2.781 2.781M147.41 283.695l2.781 2.781 2.782 2.781 2.78 2.782M147.41 286.476l2.781 2.781 2.782 2.782 2.78 2.78M147.41 297.601l2.781 2.782 2.782 2.78 2.78 2.782M147.41 303.164l2.781 2.781 2.782 2.782 2.78 2.78M150.191 75.096l2.782 2.781 2.78 2.781 2.782 2.782M150.191 77.877l2.782 2.781 2.78 2.782 2.782 2.78M150.191 80.658l2.782 2.782 2.78 2.78 2.782 2.782M150.191 94.565l2.782 2.781 2.78 2.782 2.782 2.78M150.191 100.128l2.782 2.78h2.78M150.191 127.94l2.782 2.782 2.78 2.781 2.782 2.782M150.191 139.066l2.782 2.781 2.78 2.782 2.782 2.781M150.191 141.847l2.782 2.782 2.78 2.781 2.782 2.781M150.191 172.442l2.782 2.781 2.78 2.781 2.782 2.782M150.191 264.225v2.782M150.191 280.913l2.782 2.782 2.78 2.781 2.782 2.781M150.191 283.695l2.782 2.781 2.78 2.781 2.782 2.782M150.191 294.82l2.782 2.781 2.78 2.782 2.782 2.78M150.191 297.601l2.782 2.782 2.78 2.78 2.782 2.782M150.191 303.164l2.782 2.781 2.78 2.782 2.782 2.78M150.191 314.29l2.782 2.78 2.78 2.782 2.782 2.781M150.191 319.852l2.782 2.781h2.78M152.973 52.845l2.78 2.781 2.782 2.782 2.782 2.781M152.973 55.626l2.78 2.782 2.782 2.781 2.782 2.781M152.973 69.533l2.78 2.781 2.782 2.782 2.782 2.781M152.973 72.314l2.78 2.782 2.782 2.781 2.782 2.781M152.973 75.096l2.78 2.781 2.782 2.781 2.782 2.782M152.973 86.22l2.78 2.782 2.782 2.782 2.782 2.78M152.973 94.565l2.78 2.781 2.782 2.782 2.782 2.78M152.973 139.066l2.78 2.781 2.782 2.782 2.782 2.781M152.973 150.191l2.78 2.782 2.782 2.78 2.782 2.782M152.973 152.973l2.78 2.78 2.782 2.782 2.782 2.782M152.973 169.66l2.78 2.782 2.782 2.781 2.782 2.781M152.973 172.442l2.78 2.781 2.782 2.781M152.973 278.132l2.78 2.781 2.782 2.782 2.782 2.781M152.973 280.913l2.78 2.782 2.782 2.781 2.782 2.781M152.973 311.508l2.78 2.781 2.782 2.781v2.782M152.973 314.29l2.78 2.78M155.754 47.282l2.781 2.782 2.782 2.781 2.78 2.781M155.754 50.064l2.781 2.781 2.782 2.781 2.78 2.782M155.754 52.845l2.781 2.781 2.782 2.782 2.78 2.781M155.754 63.97l2.781 2.782 2.782 2.781 2.78 2.781M155.754 66.752l2.781 2.781 2.782 2.781 2.78 2.782M155.754 69.533l2.781 2.781 2.782 2.782 2.78 2.781M155.754 91.784l2.781 2.78 2.782 2.782 2.78 2.782M155.754 94.565l2.781 2.781 2.782 2.782 2.78 2.78M155.754 130.722l2.781 2.781 2.782 2.782 2.78 2.781M155.754 150.191l2.781 2.782 2.782 2.78 2.78 2.782M155.754 161.317l2.781 2.78 2.782 2.782 2.78 2.782M155.754 164.098l2.781 2.781 2.782 2.782 2.78 2.78M155.754 166.88l2.781 2.78 2.782 2.782 2.78 2.781M155.754 169.66l2.781 2.782 2.782 2.781 2.78 2.781M155.754 297.601l2.781 2.782 2.782 2.78 2.78 2.782M158.535 47.282l2.782 2.782 2.78 2.781 2.782 2.781M158.535 63.97l2.782 2.782 2.78 2.781 2.782 2.781M158.535 127.94l2.782 2.782 2.78 2.781 2.782 2.782M158.535 139.066l2.782 2.781 2.78 2.782 2.782 2.781M158.535 141.847l2.782 2.782 2.78 2.781 2.782 2.781M158.535 161.317l2.782 2.78 2.78 2.782 2.782 2.782M158.535 294.82l2.782 2.781h2.78M158.535 297.601l2.782 2.782 2.78 2.78M158.535 308.727l2.782 2.78 2.78 2.782M158.535 314.29h2.782M161.317 41.72l2.78 2.781 2.782 2.781 2.782 2.782M161.317 44.501l2.78 2.781 2.782 2.782 2.782 2.781M161.317 47.282l2.78 2.782 2.782 2.781 2.782 2.781M161.317 86.22l2.78 2.782 2.782 2.782 2.782 2.78M161.317 89.002l2.78 2.782 2.782 2.78 2.782 2.782M161.317 139.066l2.78 2.781 2.782 2.782 2.782 2.781M161.317 150.191l2.78 2.782 2.782 2.78 2.782 2.782M161.317 152.973l2.78 2.78 2.782 2.782 2.782 2.782M161.317 292.039l2.78 2.78M161.317 305.945l2.78 2.782M164.098 41.72l2.781 2.781 2.782 2.781 2.78 2.782M164.098 63.97l2.781 2.782 2.782 2.781 2.78 2.781M164.098 66.752l2.781 2.781 2.782 2.781 2.78 2.782M164.098 80.658l2.781 2.782 2.782 2.78 2.78 2.782M164.098 83.44l2.781 2.78 2.782 2.782 2.78 2.782M164.098 86.22l2.781 2.782 2.782 2.782 2.78 2.78M164.098 97.346l2.781 2.782h2.782M164.098 105.69h2.781M164.098 122.378l2.781 2.781 2.782 2.782 2.78 2.781M164.098 127.94l2.781 2.782 2.782 2.781 2.78 2.782M164.098 130.722l2.781 2.781 2.782 2.782 2.78 2.781M164.098 136.285l2.781 2.781 2.782 2.781 2.78 2.782M164.098 150.191l2.781 2.782 2.782 2.78 2.78 2.782M164.098 161.317l2.781 2.78 2.782 2.782 2.78 2.782M164.098 164.098l2.781 2.781 2.782 2.782v2.78M164.098 180.786H169.66M166.88 38.938l2.78 2.782 2.782 2.781 2.781 2.781M166.88 41.72l2.78 2.781 2.782 2.781 2.781 2.782M166.88 58.408l2.78 2.781 2.782 2.781 2.781 2.782M166.88 61.189l2.78 2.781 2.782 2.782 2.781 2.781M166.88 63.97l2.78 2.782 2.782 2.781 2.781 2.781M166.88 75.096l2.78 2.781 2.782 2.781 2.781 2.782M166.88 77.877l2.78 2.781 2.782 2.782 2.781 2.78M166.88 80.658l2.78 2.782 2.782 2.78 2.781 2.782M166.88 141.847l2.78 2.782 2.782 2.781 2.781 2.781M166.88 161.317l2.78 2.78 2.782 2.782M166.88 172.442l2.78 2.781 2.782 2.781M166.88 175.223l2.78 2.781M169.66 36.157l2.782 2.781 2.781 2.782 2.781 2.781M169.66 38.938l2.782 2.782 2.781 2.781 2.781 2.781M169.66 58.408l2.782 2.781 2.781 2.781 2.781 2.782M169.66 75.096l2.782 2.781 2.781 2.781 2.781 2.782M169.66 122.378l2.782 2.781 2.781 2.782 2.781 2.781M169.66 125.16l2.782 2.78M169.66 139.066l2.782 2.781 2.781 2.782 2.781 2.781M169.66 150.191l2.782 2.782 2.781 2.78 2.781 2.782M169.66 152.973l2.782 2.78 2.781 2.782 2.781 2.782M172.442 33.376l2.781 2.781 2.781 2.781 2.782 2.782M172.442 36.157l2.781 2.781 2.781 2.782 2.782 2.781M172.442 52.845l2.781 2.781 2.781 2.782 2.782 2.781M172.442 55.626l2.781 2.782 2.781 2.781 2.782 2.781M172.442 58.408l2.781 2.781 2.781 2.781 2.782 2.782M172.442 122.378l2.781 2.781h2.781M172.442 133.503l2.781 2.782 2.781 2.781 2.782 2.781M172.442 150.191l2.781 2.782 2.781 2.78 2.782 2.782M172.442 161.317l2.781 2.78 2.781 2.782 2.782 2.782M175.223 52.845l2.781 2.781 2.782 2.782 2.781 2.781M175.223 75.096l2.781 2.781 2.782 2.781 2.781 2.782M175.223 77.877l2.781 2.781 2.782 2.782v2.78M175.223 91.784l2.781 2.78M175.223 133.503l2.781 2.782 2.782 2.781 2.781 2.781M175.223 139.066l2.781 2.781 2.782 2.782 2.781 2.781M175.223 141.847l2.781 2.782 2.782 2.781 2.781 2.781M175.223 147.41l2.781 2.781 2.782 2.782 2.781 2.78M175.223 161.317l2.781 2.78 2.782 2.782 2.781 2.782M178.004 50.064l2.782 2.781 2.781 2.781 2.781 2.782M178.004 52.845l2.782 2.781 2.781 2.782 2.781 2.781M178.004 69.533l2.782 2.781 2.781 2.782 2.781 2.781M178.004 72.314l2.782 2.782 2.781 2.781 2.781 2.781M178.004 75.096l2.782 2.781 2.781 2.781 2.781 2.782M178.004 86.22l2.782 2.782v2.782M178.004 89.002v2.782M178.004 133.503h2.782l2.781 2.782 2.781 2.781M178.004 152.973l2.782 2.78 2.781 2.782 2.781 2.782M180.786 38.938l2.781 2.782 2.781 2.781v2.781M180.786 47.282l2.781 2.782 2.781 2.781 2.782 2.781M180.786 50.064l2.781 2.781 2.781 2.781M180.786 69.533l2.781 2.781 2.781 2.782 2.782 2.781M180.786 130.722h2.781l2.781 2.781 2.782 2.782M180.786 150.191l2.781 2.782 2.781 2.78 2.782 2.782M180.786 161.317l2.781 2.78 2.781 2.782 2.782 2.782M180.786 164.098l2.781 2.781 2.781 2.782 2.782 2.78M183.567 44.501v2.781l2.781 2.782 2.782 2.781M183.567 63.97l2.781 2.782 2.782 2.781 2.781 2.781M183.567 66.752l2.781 2.781 2.782 2.781 2.781 2.782M183.567 69.533l2.781 2.781 2.782 2.782 2.781 2.781M183.567 139.066l2.781 2.781 2.782 2.782 2.781 2.781M183.567 144.629l2.781 2.781 2.782 2.781 2.781 2.782M183.567 161.317l2.781 2.78 2.782 2.782 2.781 2.782M183.567 172.442l2.781 2.781 2.782 2.781h2.781M186.348 38.938v2.782M186.348 63.97l2.782 2.782 2.781 2.781 2.781 2.781M186.348 144.629l2.782 2.781 2.781 2.781 2.781 2.782M186.348 150.191l2.782 2.782 2.781 2.78 2.781 2.782M186.348 152.973l2.782 2.78 2.781 2.782 2.781 2.782M186.348 158.535l2.782 2.782 2.781 2.78 2.781 2.782M186.348 172.442l2.782 2.781h5.562M186.348 178.004l2.782 2.782M189.13 61.189l2.781 2.781 2.781 2.782 2.782 2.781M189.13 63.97l2.781 2.782 2.781 2.781 2.782 2.781M189.13 139.066l2.781 2.781 2.781 2.782 2.782 2.781M189.13 141.847l2.781 2.782 2.781 2.781 2.782 2.781M189.13 164.098l2.781 2.781 2.781 2.782 2.782 2.78M191.911 55.626l2.781 2.782 2.782 2.781 2.781 2.781M191.911 58.408l2.781 2.781 2.782 2.781 2.781 2.782M191.911 61.189l2.781 2.781 2.782 2.782 2.781 2.781M191.911 136.285v2.781l2.781 2.781 2.782 2.782M191.911 161.317l2.781 2.78 2.782 2.782 2.781 2.782M191.911 172.442h2.781l2.782 2.781 2.781 2.781M194.692 52.845l2.782 2.781 2.781 2.782 2.781 2.781M194.692 55.626l2.782 2.782 2.781 2.781 2.781 2.781M194.692 75.096l2.782 2.781M194.692 83.44h2.782M194.692 150.191l2.782 2.782 2.781 2.78 2.781 2.782M194.692 155.754l2.782 2.781 2.781 2.782 2.781 2.78M197.474 52.845h2.781M197.474 75.096h2.781M197.474 139.066l2.781 2.781M197.474 155.754l2.781 2.781 2.781 2.782 2.782 2.78M197.474 161.317l2.781 2.78 2.781 2.782 2.782 2.782M197.474 164.098l2.781 2.781M197.474 178.004v2.782l2.781 2.781M200.255 72.314h2.781M200.255 150.191l2.781 2.782 2.782 2.78v2.782M200.255 152.973l2.781 2.78M200.255 172.442v2.781M203.036 58.408l2.782 2.781v2.781M203.036 69.533h2.782M205.818 161.317h2.781M205.818 166.88h2.781M205.818 172.442" stroke="#1c2026" fill="none"/></svg>
            </div>
          </div>
        }
        {loadingImage && <p>Importing Image...</p>}
        {imageLoadingError && <p>Failed to load image. Please try again.</p>}
        {imageLoaded && <ImageRenderer controller={this.controller} imageURI={this.originalImageURI}/>}
        <div className="svgee-about-section">
          <a
            className="svgee-about-link"
            target="_blank"
            rel="noopener noreferrer"
            href="http://github.com/Anemy/svgurt"
          >
            Code
          </a>
        </div>
      </div>
    );
  }
}
