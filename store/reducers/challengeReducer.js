import { SET_CHALLENGES, DELETE_CHALLENGES, ACCEPT_CHALLENGES } from '../actions/challengeActions';
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
			return {
				...state,
				unreadChallenges: state.unreadChallenges.filter(
					challenge => challenge.id!==action.id
				)
			}
		case ACCEPT_CHALLENGES:
			selectedChallenge = unreadChallenges.filter(
				challenge => challenge.id===action.id
			);
			updatedChallenge = new Challenge(
				selectedChallenge.id,
				selectedChallenge.diffLvl,
				selectedChallenge.challengerId,
				selectedChallenge.challengeeId,
				selectedChallenge.bid,
				selectedChallenge.date,
				1,
				selectedChallenge.winnerId,
				selectedChallenge.ChallengerScore,
				selectedChallenge.ChallengeeScore,
				selectedChallenge.isChallengerRead,
				selectedChallenge.isChallengeeRead
			);
			otherChallenge = unreadChallenges.filter(
				challenge => challenge.id!==action.id
			);
			return{
				...state,
				unreadChallenges: [...updatedChallenge, ...otherChallenge]
			};
		default:
			return state;
	}
}