import React from 'react';
import './AutoUploadImage.css';

const AutoUploadImage = ({ image, uploading }) => {
    return (
        <div style={{ position: 'relative' }}>

            <img src={image} alt="hoax-attachment" className="img-thumbnail" height="100" width="100"/>

            <div className="overlay" style={{opacity: uploading ? '1' : '0'}}>
                <div className="d-flex justify-content-center h-100">
                    <div className="spinner-border text-info m-auto" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutoUploadImage;