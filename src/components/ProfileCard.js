import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ProfilePicture from './ProfilePicture';
import Input from './Input'
import { useTranslation } from 'react-i18next';
import { updateUser, deleteUser } from '../api/apiCalls'
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import { updateSuccess, logoutSuccess } from '../redux/actions/authActions'
import Modal from './Modal';
import {BACKEND_URL} from '../Constants';

const ProfileCard = (props) => {

    const [user, setUser] = useState({});
    const [newImage, setNewImage] = useState();
    const { username, displayName, image } = user;
    const routeParams = useParams();
    const pathUsername = routeParams.username;
    const pendingApiCall = useApiProgress('put', BACKEND_URL+'api/1.0/users/' + username);
    const pendingApiCallDeleteUser = useApiProgress('delete',  BACKEND_URL+'api/1.0/users/' + username, true)
    const [inEdit, setInEdit] = useState(false);
    const [updatedDisplayName, setUpdatedDisplayName] = useState()
    const [editable, setEditable] = useState(false);
    const [errors, setErrors] = useState({});
    const { username: loggedInUsername } = useSelector((store) => ({
        username: store.username
    }))
    const history = useHistory();
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setUser(props.user);
    }, [props.user])

    useEffect(() => {
        setEditable(loggedInUsername === pathUsername);
    }, [pathUsername, loggedInUsername])

    useEffect(() => {
        if (!inEdit) {
            setUpdatedDisplayName(undefined)
            setNewImage(undefined);
        } else {
            setUpdatedDisplayName(displayName)
        }
    }, [inEdit, displayName])

    //hata sonrasi girilen yeni displayName icin error'un undefined'a set edilmesi
    useEffect(() => {
        setErrors((previousErrors) => {
            return {
                ...previousErrors,
                displayName: undefined
            }
        })
    }, [updatedDisplayName])

    useEffect(() => {
        setErrors((previousErrors) => {
            return {
                ...previousErrors,
                image: undefined
            }
        })
    }, [newImage])

    const { t } = useTranslation();

    const onClickSave = async () => {
        let img;
        if (newImage) {
            img = newImage.split(',')[1];
        }
        const body = {
            displayName: updatedDisplayName,
            image: img
        }
        try {
            const response = await updateUser(username, body);
            setUser(response.data)
            setInEdit(false);
            dispatch(updateSuccess(response.data));
        } catch (error) {
            setErrors(error.response.data.validationErrors);
        }
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
        }
    }
    const { displayName: displayNameError } = errors;
    const { image: imageError } = errors;

    const onClickCancel = () => {
        setModalVisible(false);
    }

    const onClickDeleteUser = async() => {
        await deleteUser(username);
        setModalVisible(false);
        dispatch(logoutSuccess());
        history.push("/")
    }
    return (
        <>

            <div className="card  text-center">
                <div className="card-header">
                    <ProfilePicture
                        width="200"
                        height="200"
                        alt="img"
                        className="rounded-circle shadow"
                        image={image}
                        tempimage={newImage} />
                </div>

                {
                    !inEdit &&
                    <div className="card-body">
                        <h3> {displayName}  @{username}</h3>
                        {

                            editable &&
                            <>
                                <button
                                    className="btn btn-success d-inline-flex"
                                    onClick={() => { setInEdit(true) }}>
                                    <i className="material-icons">edit</i> {t('Edit')}
                                </button>


                                <div className="pt-2">
                                    <button className="btn btn-danger d-inline-flex" onClick={() => setModalVisible(true)}>
                                        <i className="material-icons">directions_run</i>{t('Delete My Account')}
                                    </button>

                                </div>
                            </>
                        }

                    </div>
                }

                {
                    inEdit &&
                    <div className="card-body">
                        <Input
                            label={t('Change Display Name')}
                            defaultValue={displayName}
                            error={displayNameError}
                            onChange={(event) => { setUpdatedDisplayName(event.target.value) }} />

                        <Input type="file"
                            onChange={onChangeFile}
                            error={imageError}
                        />

                        <ButtonWithProgress
                            className="btn btn-primary d-inline-flex"
                            onClick={onClickSave}
                            disabled={pendingApiCall}
                            pendingApiCall={pendingApiCall}
                            text={
                                <>
                                    <i className="material-icons">save</i>{t('Save')}
                                </>
                            }
                        >
                        </ButtonWithProgress>

                        <button className="btn btn-light d-inline-flex ml-3" onClick={() => { setInEdit(false); }} disabled={pendingApiCall}>
                            <i className="material-icons">cancel</i>{t('Cancel')} </button>
                    </div>
                }
            </div>

            <Modal
                visible={modalVisible}
                onClickCancel={onClickCancel}
                question={t('Are you sure to delete your account?')}
                pendingApiCall={pendingApiCallDeleteUser}
                title={t('Delete My Account')}
                message={displayName}
                okButton={t('Delete My Account')}
                onClickOk = {onClickDeleteUser}



            />

        </>

    );
};

export default ProfileCard;
