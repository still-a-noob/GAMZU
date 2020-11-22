import axios from 'axios';

import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER } from './types';

// GET CURRENT PROFILE
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
            )
        .catch(err => 
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
            )
}

// GET PROFILE BY HANDLE
// export const getProfileByHandle = (handle) => dispatch => {
//     dispatch(setProfileLoading());
//     axios.get(`/api/profile/handle/${handle}`)
//         .then(res => 
//             dispatch({
//                 type: GET_PROFILE,
//                 payload: res.data
//             })
//             )
//         .catch(err => 
//             dispatch({
//                 type: GET_PROFILE,
//                 payload: {}
//             })
//             )
// }

// CREATE PROFILE
export const createProfile = (profileData, history) => dispatch => {
    axios
        .post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            )
}

// DELTE PROFILE
export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')) {
        axios
            .delete('/api/profile')
            .then(res => 
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
                )
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
    }
}

// PROFILE LOADING
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

// CLEAR CURRENT PROFILE   
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}