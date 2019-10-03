import { LOG_IN } from '../actions/accountActions';
import { USERS } from  '../../data/dummy-data';

const initialState = {
	userInfo: {}
};

export default (state=initialState, action) => {

	switch (action.type){

		case LOG_IN:

			const userId = action.credential.userId;

			// const selectedUser = USERS.find(userId);

			// console.log( selectedUser );

			const password = action.credential.password;

			//todo: do authentication
	}
	return state;
};