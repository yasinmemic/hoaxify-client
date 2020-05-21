import React, { useState, useEffect } from 'react';
import ButtonWithProgress from './ButtonWithProgress';
import { useSelector } from 'react-redux';
import ProfilePicture from './ProfilePicture';
import { useTranslation } from 'react-i18next';
import { postHoax, postHoaxAttachment } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import Input from './Input'
import AutoUploadImage from './AutoUploadImage';
import { BACKEND_URL } from '../Constants';

const HoaxSubmit = () => {
    const { image } = useSelector((store) => ({
        image: store.image,

    }))
    const [focused, setFocued] = useState(false);
    const [newImage, setNewImage] = useState();

    const [hoax, setHoax] = useState('');
    const [errors, setErrors] = useState({});
    const [attachmentId, setAttachmentId] = useState();
    useEffect(() => {
        if (!focused) {
            setHoax('');
            setErrors({});
            setNewImage();
            setAttachmentId();
        }
    }, [focused])

    const { t } = useTranslation();

    const pendingApiCall = useApiProgress('post', BACKEND_URL+'api/1.0/hoaxes', true);
    const pendingFileUpload = useApiProgress('post', BACKEND_URL+'api/1.0/hoax-attachments', true);


    useEffect(() => {
        setErrors({});
    }, [hoax])


    const onClickHoaxify = async () => {
        const body = {
            content: hoax,
            attachmentId: attachmentId
        }
        try {
            await (postHoax(body));
            setFocued(false);
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors)
            }
        }
    }

    let textAreaClass = "form-control";
    if (errors.content) {
        textAreaClass += " is-invalid"
    }

    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
            uploadFile(file);
        }
    }

    const uploadFile = async (file) => {
        const attachment = new FormData();
        attachment.append('file', file);
        const response = await postHoaxAttachment(attachment);
        setAttachmentId(response.data.id);
    }


    return (
        <div className="card p-1 flex-row">
            <ProfilePicture
                image={image}
                width="32"
                height="32"
                className="rounded-circle mr-1"
            />

            <div className="flex-fill">
                <textarea
                    className={textAreaClass}
                    rows={focused ? '3' : '1'}
                    onFocus={() => { setFocued(true) }}
                    onChange={(event) => { setHoax(event.target.value) }}
                    value={hoax} />


                <div className="invalid-feedback">{errors.content}

                </div>

                {
                    focused &&
                    <>

                        {!newImage && 
                        <Input type="file" onChange={onChangeFile} />
                        }                          {
                            newImage && <AutoUploadImage image={newImage} uploading={pendingFileUpload} />
                        }
                        <div className="text-right mt-1">
                            <ButtonWithProgress
                                className="btn btn-primary"
                                text="Hoaxify"
                                onClick={onClickHoaxify}
                                pendingApiCall={pendingApiCall}
                                disabled={pendingApiCall || pendingFileUpload}
                            />

                            <button className="btn btn-light d-inline-flex ml-3" onClick={() => { setFocued(false); }} disabled={pendingApiCall || pendingFileUpload}>
                                <i className="material-icons">cancel</i>{t('Cancel')} </button>
                        </div>
                    </>
                }

            </div>
        </div>

    );
};

export default HoaxSubmit;