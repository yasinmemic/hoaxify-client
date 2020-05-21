import React, { useState, useEffect } from 'react'
import Input from '../components/Input'
import { useTranslation } from 'react-i18next'
import ButtonWithProgress from '../components/ButtonWithProgress'
import { useApiProgress } from '../shared/ApiProgress'
import { useDispatch } from 'react-redux'
import { loginHandler } from '../redux/actions/authActions'
import { BACKEND_URL } from '../Constants'

const UserSigninPage = (props) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        setError(undefined);
    }, [username, password])

    const onClickSignin = async event => {
        event.preventDefault();

        const { history } = props;

        const { push } = history;

        const creds = {
            username,
            password
        }
        setError(undefined);
        try {
            await dispatch(loginHandler(creds));
            push('/')
        } catch (apiError) {
            setError(apiError.response.data.message);
        }
    }

    const pendingApiCall = useApiProgress('post', BACKEND_URL+'api/1.0/auth');
    const { t } = useTranslation();
    const buttonEnabled = password && username;
    return (
        <div className="container">
            <form>
                <h1 className="text-center">{t('Login')}</h1>
                <Input name="username" label={t('Username')} onChange={(event) => {
                    setUsername(event.target.value);
                }} />
                <Input name="password" label={t('Password')} type="password" onChange={(event) => {
                    setPassword(event.target.value);
                }} />
                {
                    error && <div className="alert alert-danger">{error} </div>
                }
                <div className="form-group text-center">
                    <ButtonWithProgress
                        onClick={onClickSignin}
                        disabled={!buttonEnabled || pendingApiCall}
                        text={t('Login')}
                        pendingApiCall={pendingApiCall} />
                </div>

            </form>
        </div>
    )
}

export default UserSigninPage;