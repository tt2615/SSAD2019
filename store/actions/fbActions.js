export const LOAD_FB= 'LOAD_FB';
export const DELETE_FB='DELETE_FB';

export const getFb = (id, name, email, pictureUrl, token) => {
    return async (dispatch, getStates) => {
        await dispatch({
            type: LOAD_FB,
            id,
            name,
            email,
            pictureUrl,
            token
        });
    }
}

export const deleteFb = () => {
    return async (dispatch, getStates) => {
        await dispatch({
            type: DELETE_FB
        });
    }
}