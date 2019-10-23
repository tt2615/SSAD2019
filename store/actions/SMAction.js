export const ADD_TOKEN = 'ADD_TOKEN';

/**
 * @method
 * @desc Add a login token
 * @param {*} token
 * @returns
 */
export const addToken = (token) => {
	return dispatch({token: token});
}

