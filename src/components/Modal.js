import React from 'react';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from './ButtonWithProgress';

const Modal = (props) => {

    let className = 'modal fade'
    const { visible, onClickCancel, message, onClickOk, pendingApiCall, question, title, okButton } = props;
    if (visible) {
        className += ' show d-block'
    }
    const { t } = useTranslation();
    
    return (
        <div className={className} style={{ backgroundColor: '#000000b0' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>

                    </div>
                    <div className="modal-body"><strong>{question}</strong>
                        <div>
                            {message}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClickCancel}>{t('Cancel')}</button>
                        <ButtonWithProgress className="btn btn-danger" onClick={onClickOk} pendingApiCall={pendingApiCall} text={okButton} disabled={pendingApiCall}></ButtonWithProgress>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;