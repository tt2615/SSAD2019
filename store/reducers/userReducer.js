import { LOAD_USER, UPDATE_USER } from '../actions/userActions';
import socialMediaCredential from '../../models/socialMediaCredential'

// todo: add social media is bad design
const initialState = {
	userId: '',
	userEmail: '',
	userType: '',
	userName: '',
	userTotalScore: 0,
	character: null,
	fbAccountunt: null,
	fbPassword: null,
	ttAccount: null,
	ttPassword: null
};

export default (state=initialState, action) => {
	switch (action.type) {
		case LOAD_USER:
			if(action.userType==='student'){
				return {
					...state,
					userId: action.userId,
					userEmail:action.userEmail,
					userType: action.userType,
					userName: action.userName,
					character: action.character,
					userTotalScore: action.totalScore
				};
			} else{
				return{
					...state,
					userId: action.userId,
					userEmail:action.userEmail,
					userType: action.userType,
					userName: action.userName,
					fbAccountunt: action.userFbAccount,
					fbPassword: action.userFbPassword,
            		ttAccount: action.userTtAccount,
            		ttPassword: action.userTtPassword
				};
			}
		default: 
			return state;
	}
};