import React from 'react';
import defaultPicture from '../assets/profile.png'
import { BACKEND_URL } from '../Constants';

const ProfilePicture = (props) => {

    const { alt, width, height, image, tempimage, className } = props;

    let imageSource = defaultPicture;

    if (image) {
        imageSource = BACKEND_URL+'images/profile/' + image;
    }

    let clsName = "rounded-circle shadow";
    if(className){
        clsName = className;
    }
    return (
        <img className={clsName}
            width={width}
            height={height}
            src={tempimage || imageSource}
            alt={alt}
            onError={(event) => {
                event.target.src = defaultPicture
            }}
        >
        </img>
    );
};

export default ProfilePicture;