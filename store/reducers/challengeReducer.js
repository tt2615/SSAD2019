import { SET_CHALLENGES, DELETE_CHALLENGES } from '../actions/challengeActions';
import Challenge from '../../models/challenge';

const initialState = {
	unreadChallenges: [],
	readChallenges: []
}

export default (state=initialState, action) => {
	switch (action.type){
		case SET_CHALLENGES:
			return{
				unreadChallenges: action.unreadChallenges,
				readChallenges: action.readChallenges
			};
		case DELETE_CHALLENGES:
			console.log('delete challenge in store');
			return {
				unreadChallenges: state.unreadChallenges.filter(
					challenge => challenge.id===action.id
				),
				readChallenges: state.readChallenges.filter(
					challenge => challenge.id===action.id
				)
			}
		default:
			return state;
	}
}