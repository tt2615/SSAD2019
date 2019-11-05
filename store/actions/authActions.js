import { AsyncStorage } from 'react-native';

import * as userActions from './userActions';
import * as worldsActions from './worldsActions';
import * as mapActions from './mapActions';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';


/**
 * @method
 * @desc The method handles user signup. When auth is passed, related user information and basic setup information will be added to database.
 * @param {*} email
 * @param {*} password
 * 
 */
export const signup = (email,password) => {
	return async (dispatch,getState) => {
		const response = await fetch(
		    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEGeWZFNqNx5WoIz_c8bho6px3vHTHIH8',
		{
		    method: 'POST',
		    headers: {
		      'Content-Type': 'application/json'
		   	},
		    body: JSON.stringify({
		      email: email,
		      password: password,
		      returnSecureToken: true
		    })
		});

		if (!response.ok) {
			const errorResult= await response.json();
			const errorId = errorResult.error.message;
			let message = 'Something went wrong!';
			if (errorId === 'EMAIL_EXISTS') {
				message = 'This email exists already!';
			}
			throw new Error(message);
		}
		const resultData = await response.json();
		dispatch(
			authenticate(
				resultData.locaId,
				resultData.idToken,
				parseInt(resultData.expiresIn) * 1000
			)
		);

		const expirationDate = new Date(new Date().getTime() + parseInt(resultData.expiresIn)*1000);

		//add user (with default settings) to database
		dispatch(
			// userActions.addStudent(
			// 	email,
			// 	'student',
			// 	'Anonymous Player',
			// 	0, //character
			// 	0 //totalScore
			// )
			userActions.addTeacher(email, 'teacher', 'Wu Ziqing','','','','')
		);
		//place userInfo to store
		await dispatch(
			userActions.getUser(email)
		);
			//get uid in the store
		const uid=getState().user.userId;
		// use uid as key to store basic sction and world info in db
		dispatch(
			worldsActions.addWorlds(uid)
		);
		
		dispatch(
			mapActions.addSections(uid)
		);
		// put basic world and section info in store
		await dispatch(
			worldsActions.getWorlds(uid)
		);

		const type = getState().user.userType;

		saveDataToStorage(resultData.idToken, resultData.localId, expirationDate, email, type);
	};
};


/**
 * @method
 * @desc The method handles user login. The system returns different home pages based on userType. Information used for progress recording is also loaded to reducer after login.
 * @param {*} email
 * @param {*} password
 * 
 */
export const login = (email, password) => {
	return async (dispatch,getState) => {
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEGeWZFNqNx5WoIz_c8bho6px3vHTHIH8',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true
				})
			}
		);

		if (!response.ok) {
	      	const errorResult = await response.json();
	      	const errorId = errorResult.error.message;
	      	let message = 'Something went wrong!';
	      	if (errorId === 'EMAIL_NOT_FOUND') {
	      	  	message = 'This email could not be found!';
	      	} else if (errorId === 'INVALID_PASSWORD') {
	        	message = 'This password is not valid!';
	      	}
	      	throw new Error(message);
		}

		const resultData = await response.json();

		//place loginInfo to store
		dispatch(
		  	authenticate(
		    	resultData.localId,
		    	resultData.idToken,
		    	parseInt(resultData.expiresIn) * 1000
		  	)
		);

		//place userInfo to store
		await dispatch(
			userActions.getUser(email)
		);
		
		//get uid in the store
		const uid=getState().user.userId;
		
		await dispatch(
			worldsActions.getWorlds(uid)
		);

		const type = getState().user.userType;

		const expirationDate = new Date(
		  	new Date().getTime() + parseInt(resultData.expiresIn) * 1000
		);
		// save userInfo for auto login
		saveDataToStorage(resultData.idToken, resultData.localId, expirationDate, email, type);
	};
};

/**
 * @method
 * @desc The mothod is used for aithentication.
 * @param {*} userId
 * @param {*} token
 * @param {*} expiryTime
 * 
 */
export const authenticate = (userId, token, expiryTime) => {
	return dispatch => {
		dispatch(setLogoutTimer(expiryTime));
		dispatch({ type: AUTHENTICATE, userId:userId, token:token });
	};
};

/**
 * @method
 * @desc User logout. Login status will be cleared in local storage.
 *
 */
export const logout = () => {
  	clearLogoutTimer();
  	AsyncStorage.removeItem('userData');
  	return { type: LOGOUT };
};


let timer;


/**
 * @method
 * @desc Clear logout timer
 */
const clearLogoutTimer = () => {
	if(timer) {
		clearTimeout(timer);
	}
};


/**
 * @method
 * @desc Use a timer to automatically logout after a fixed period of time
 * @param {*} expirationTime
 *
 */
const setLogoutTimer = expirationTime => {
  	return dispatch => {
    	timer = setTimeout(() => {
      		dispatch(logout());
    	}, expirationTime);
  	};
};


/**
 * @method
 * @desc Some basic login information is stored in local storage to help auto login.
 * @param {*} token
 * @param {*} userId
 * @param {*} expirationDate
 * @param {*} email
 * @param {*} type
 */
const saveDataToStorage = (token, userId, expirationDate, email, type) => {
  	AsyncStorage.setItem(
    	'userData',
    	JSON.stringify({
      		token: token,
      		userId: userId,
      		expiryDate: expirationDate.toISOString(),
      		userEmail: email,
      		userType: type
    	})
  	);
};