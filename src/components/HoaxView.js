import React, { useState } from 'react';
import ProfilePicture from './ProfilePicture'
import { Link } from 'react-router-dom';
import { format } from 'timeago.js'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deleteHoax } from '../api/apiCalls';
import Modal from './Modal';
import { useApiProgress } from '../shared/ApiProgress';
import { BACKEND_URL } from '../Constants';

const HoaxView = (props) => {
    const loggedInUser = useSelector(store => store.username)
    const { hoax, onDeleteHoax } = props;
    const { userVM, content, timeStamp, fileAttachment, id } = hoax;
    const { username, displayName, image } = userVM;
    const { i18n, t } = useTranslation();
    const formatted = format(timeStamp, i18n.language);
    const [modalVisible, setModalVisible] = useState(false);
    const ownedByLoggedInUser = loggedInUser === username;

    const onClickDelete = async () => {
        await deleteHoax(id);
        onDeleteHoax(id);
    }
    const onClickCancel = () => {
        setModalVisible(false);
    }
    const pendingApiCall = useApiProgress('delete', BACKEND_URL+'api/1.0/hoaxes/' + id, true);
    return (
        <>
            <div className="card p-1">

                <div className="d-flex">

                    <ProfilePicture image={image} width="32" height="32" className="rounded-circle m-1" />
                    <div className="flex-fill m-auto pl-2" >
                        <Link to={`/users/${username}`} className="text-dark">
                            <h6 className="d-inline">
                                {displayName} @{username}
                            </h6> <span> - </span>
                            <span>{formatted}</span>
                        </Link>
                    </div>
                    {ownedByLoggedInUser &&
                        <button className="btn btn-delete-link btn-sm" onClick={() => setModalVisible(true)}>
                            <i className="material-icons">delete_outline</i>
                        </button>
                    }

                </div>
                <div className="pl-5">
                    {content}
                </div>
                {fileAttachment && (
                    <div className="pl-5">
                        {fileAttachment.fileType.startsWith('image') && (
                            <img className="img-fluid" src={BACKEND_URL+'images/attachments/' + fileAttachment.name} alt="attachment"></img>
                        )
                        }
                        {!fileAttachment.fileType.startsWith('image') && (
                            <strong>Hoax has unknown attachment.</strong>
                        )
                        }
                    </div>)}
            </div>
            <Modal
                visible={modalVisible}
                onClickCancel={onClickCancel}
                message={hoax.content}
                onClickOk={onClickDelete}
                pendingApiCall={pendingApiCall}
                question={t('Are you sure to delete hoax?')}
                title={t('Delete Hoax')}
                okButton={t('Delete Hoax')}
            />
        </>
    );
};

export default HoaxView;