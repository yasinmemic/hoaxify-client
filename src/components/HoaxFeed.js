import React, { useEffect, useState } from 'react';
import { getAllHoaxes, getOldHoaxes, getNewHoaxCount, getNewHoaxes } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import HoaxView from './HoaxView';
import Spinner from '../components/Spinner';
import { useApiProgress } from '../shared/ApiProgress';
import { useParams } from 'react-router-dom';

const HoaxFeed = () => {

    const { username } = useParams();
    const [hoaxes, setHoaxes] = useState({ content: [], last: true, number: 0 });
    const [newHoaxCount, setNewHoaxCount] = useState(0);

    const path = username ? `/api/1.0/users/${username}/hoaxes?page=` : '/api/1.0/hoaxes?page='
    const initialHoaxLoadProgress = useApiProgress('get', path,true);

    let lastHoaxId = 0;
    let firstHoaxId = 0;
    if (hoaxes.content.length > 0) {
        firstHoaxId = hoaxes.content[0].id;
        const lastHoaxIndex = hoaxes.content.length - 1;
        lastHoaxId = hoaxes.content[lastHoaxIndex].id;
    }
  
    const newPath = username ? `/api/1.0/users/${username}/hoaxes/${firstHoaxId}?direction=after` : `/api/1.0/hoaxes/${firstHoaxId}?direction=after`;
    const loadNewHoaxesProgress = useApiProgress('get', newPath, true);
    const oldPath = username ? `/api/1.0/users/${username}/hoaxes/${lastHoaxId}` : `/api/1.0/hoaxes/${lastHoaxId}`;
    const loadOldHoaxesProgress = useApiProgress('get', oldPath, true);

    useEffect(() => {
        const loadHoaxes = async (page) => {
            try {
                const response = await getAllHoaxes(username, page);
                setHoaxes(previousHoaxes => ({
                    ...response.data, //last,number vb degerlerini al
                    content: [...previousHoaxes.content, ...response.data.content]
                }));
            } catch (error) {

            }
        }
        loadHoaxes();
    }, [username]);


    useEffect(() => {
        const getCount = async () => {
            const response = await getNewHoaxCount(firstHoaxId, username);
            setNewHoaxCount(response.data.count);
        }
        let looper = setInterval(() => {
            getCount();
        }, 1000)
        return function cleanup() {
            clearInterval(looper);
        }
    }, [firstHoaxId, username])

    const loadOldHoaxes = async () => {
        try {
            const response = await getOldHoaxes(lastHoaxId, username);
            setHoaxes(previousHoaxes => ({
                ...response.data,
                content: [...previousHoaxes.content, ...response.data.content]
            }));
        } catch (error) {

        }
    }

    const loadNewHoaxes = async () => {
        try {
            const responseNewHoaxes = await getNewHoaxes(firstHoaxId, username);
            setHoaxes(previousHoaxes => ({
                ...previousHoaxes,
                content: [...responseNewHoaxes.data, ...previousHoaxes.content]
            }));
            setNewHoaxCount(0);
        } catch (error) {
        }
    }

    const { t } = useTranslation();
    const { content, last } = hoaxes;
    if (hoaxes.content.length === 0) {
        return <div className="alert alert-secondary text-center">{initialHoaxLoadProgress ? <Spinner /> : t('There are no hoaxes.')}</div>
    }

    const onDeleteHoaxSuccess = id => {
        setHoaxes(previousHoaxes => ({
            ...previousHoaxes,
            content: previousHoaxes.content.filter((hoax) => hoax.id !== id)
        }));
    }
    return (
        <div className="list-group list-group-flush">
            {
                newHoaxCount > 0 &&
                <div className="alert alert-info text-center mb-1"
                    style={{ cursor: loadNewHoaxesProgress ? 'not-allowed' : 'pointer' }}
                    onClick={loadNewHoaxesProgress ? () => { } : () => loadNewHoaxes()}>
                    {
                        loadNewHoaxesProgress ? <Spinner /> :
                            t('There are new hoaxes.')
                    }
                </div>
            }

            {
                content.map(hoax => (
                    <HoaxView hoax={hoax} key={hoax.id} onDeleteHoax = {onDeleteHoaxSuccess}/>
                ))
            }
            {
                !last && 
                <div className="alert alert-secondary text-center" 
                onClick={loadOldHoaxesProgress ? () => { } : () => loadOldHoaxes()} 
                style={{ cursor: loadOldHoaxesProgress ? 'not-allowed' : 'pointer' }}>
                    {
                        loadOldHoaxesProgress ? <Spinner /> : t('Load old hoaxes')
                    }
                </div>
            }
        </div>


    );
};

export default HoaxFeed;