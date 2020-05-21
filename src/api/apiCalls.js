import axios from 'axios'

export const signup = (body) => {
    return axios.post('/api/1.0/users', body)
}

export const signin = (creds) => {
    return axios.post('/api/1.0/auth', {}, { auth: creds })
}

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
}

export const getUsers = (page = 0, size = 3) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
}

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
    if (isLoggedIn) {
        const authorizationHeaderValue = `Basic ${btoa(username + ':' + password)}`; //btoa converts to base64 from string.
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
}

export const getUser = (username) => {
    return axios.get(`/api/1.0/users/${username}`);
}

export const updateUser = (username, body) => {
    return axios.put(`/api/1.0/users/${username}`, body);
}

export const postHoax = (hoax) => {
    return axios.post('/api/1.0/hoaxes', hoax)
}

export const getAllHoaxes = (username, page = 0) => {
    return axios.get(username ? `/api/1.0/users/${username}/hoaxes?page=` + page : '/api/1.0/hoaxes?page=' + page)
}

export const getOldHoaxes = (id, username) => {
    return axios.get(username ? `/api/1.0/users/${username}/hoaxes/${id}` : '/api/1.0/hoaxes/' + id)
}

export const getNewHoaxCount = (id, username) => {
    return axios.get(username ? `/api/1.0/users/${username}/hoaxes/${id}?count=true` : `/api/1.0/hoaxes/${id}?count=true`)
}

export const getNewHoaxes = (id, username) => {
    return axios.get(username ? `/api/1.0/users/${username}/hoaxes/${id}?direction=after` : `/api/1.0/hoaxes/${id}?direction=after`)
}
export const postHoaxAttachment = attachment => {
    return axios.post('/api/1.0/hoax-attachments', attachment);
}

export const deleteHoax = id => {
    return axios.delete('/api/1.0/hoaxes/' + id);
}

export const deleteUser = username => {
    return axios.delete('/api/1.0/users/' + username);
}