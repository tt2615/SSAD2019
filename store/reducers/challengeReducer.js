import { 
	SET_CHALLENGES, 
	DELETE_CHALLENGES, 
	ACCEPT_CHALLENGES, 
	ANSWER_CHALLENGES,
	COMPLETE_CHALLENGES,
	CONFIRM_CHALLENGES
} from '../actions/challengeActions';
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
			};
		case ACCEPT_CHALLENGES:
			const selectedChallenge = state.unreadChallenges.filter(
				challenge => challenge.id===action.id
			)[0];
			const updatedChallenge = new Challenge(
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
			otherChallenge = state.unreadChallenges.filter(
				challenge => challenge.id!==action.id
			);
			return{
				...state,
				unreadChallenges: [updatedChallenge, ...otherChallenge]
			};
		case ANSWER_CHALLENGES:
			const selected2Challenge = state.unreadChallenges.filter(
				challenge => challenge.id===action.id
			)[0];
			let updated2Challenge={};
			if(action.answerer==='challengee'){//challengee
				updated2Challenge = new Challenge(
					selected2Challenge.id,
					selected2Challenge.diffLvl,
					selected2Challenge.challengerId,
					selected2Challenge.challengeeId,
					selected2Challenge.bid,
					selected2Challenge.date,
					selected2Challenge.stage,
					selected2Challenge.winnerId,
					selected2Challenge.ChallengerScore,
					action.score,
					selected2Challenge.isChallengerRead,
					true
				);	
			} else {//challenger
				updated2Challenge = new Challenge(
					selected2Challenge.id,
					selected2Challenge.diffLvl,
					selected2Challenge.challengerId,
					selected2Challenge.challengeeId,
					selected2Challenge.bid,
					selected2Challenge.date,
					selected2Challenge.stage,
					selected2Challenge.winnerId,
					action.score,
					selected2Challenge.ChallengeeScore,
					true,
					selected2Challenge.isChallengeeRead
				);	
			}
			otherChallenge = state.unreadChallenges.filter(
				challenge => challenge.id!==action.id
			);
			console.log([updated2Challenge, ...otherChallenge]);
			return{
				...state,
				unreadChallenges: [updated2Challenge, ...otherChallenge]
			};
		case COMPLETE_CHALLENGES:
				const selected3Challenge = state.unreadChallenges.filter(
					challenge => challenge.id===action.id
				)[0];
				const updated3Challenge = new Challenge(
					selected3Challenge.id,
					selected3Challenge.diffLvl,
					selected3Challenge.challengerId,
					selected3Challenge.challengeeId,
					selected3Challenge.bid,
					selected3Challenge.date,
					2,
					selected3Challenge.winnerId,
					selected3Challenge.ChallengerScore,
					selected3Challenge.ChallengeeScore,
					selected3Challenge.isChallengerRead,
					selected3Challenge.isChallengeeRead
				);
				otherChallenge = state.unreadChallenges.filter(
					challenge => challenge.id!==action.id
				);
				return{
					...state,
					unreadChallenges: [updated3Challenge, ...otherChallenge]
				};
		case CONFIRM_CHALLENGES:
			const selected4Challenge = state.unreadChallenges.filter(
				challenge => challenge.id===action.id
			)[0];
			if(action.answerer==='challenger'){ //challenger
				updated4Challenge = new Challenge(
					selected4Challenge.id,
					selected4Challenge.diffLvl,
					selected4Challenge.challengerId,
					selected4Challenge.challengeeId,
					selected4Challenge.bid,
					selected4Challenge.date,
					3, //stage
					selected4Challenge.winnerId,
					selected4Challenge.ChallengerScore,
					selected4Challenge.ChallengeeScore,
					3, //isChallengerRead
					selected4Challenge.isChallengeeRead
				);
			} else { //challengee
				updated4Challenge = new Challenge(
					selected4Challenge.id,
					selected4Challenge.diffLvl,
					selected4Challenge.challengerId,
					selected4Challenge.challengeeId,
					selected4Challenge.bid,
					selected4Challenge.date,
					3, //stage
					selected4Challenge.winnerId,
					selected4Challenge.ChallengerScore,
					selected4Challenge.ChallengeeScore,
					selected4Challenge.isChallengerRead,
					3 //isChallengeeRead
				);
			}
			otherChallenge = state.unreadChallenges.filter(
				challenge => challenge.id!==action.id
			);
			return{
				unreadChallenges: otherChallenge,
				readChallenges: [updated4Challenge,...state.readChallenges]
			};
		default:
			return state;
	}
}