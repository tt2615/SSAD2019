import { LOAD_CHALLENGES } from '../actions/challengeActions';
import Challenge from '../../models/challenge';
import Question from '../../models/question';

const initialState = {
	unreadChallenges: [],
	readChallenges: []
}

export default (state=initialState, action) => {
	switch (action.type){
		case LOAD_CHALLENGES:
			return{
				unreadChallenges: action.unreadChallenges,
				readChallenges: action.readChallenges
			};
		default:
			return state;
	}
}