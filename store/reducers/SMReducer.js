import { ADD_TOKEN } from '../actions/SMActions';

const initialState = {
	token: null
}

export default (state=initialState, action) => {
	switch (action.type) {
		case ADD_TOKEN:
			return {
				token: action.token
			};
		default:
			return state;
	}
}