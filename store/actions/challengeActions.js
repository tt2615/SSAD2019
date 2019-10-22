import Challenge from '../../models/challenge';

export const SET_CHALLENGES = 'SET_CHALLENGES';
export const DELETE_CHALLENGES = 'DELETE_CHALLENGES';
export const ACCEPT_CHALLENGE = 'ACCEPT_CHALLENGE';
export const ANSWER_CHALLENGE = 'ANSWER_CHALLENGE';
export const COMPLETE_CHALLENGE = 'COMPLETE_CHALLENGE';

//create challenge in ChallengeCreationScreen
export const addChallenge = (diffLvl, challengerId, challengeeId,bidAmount) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const date = new Date();
		try {
			const response = await fetch(
				`https://ssad2019-1cc69.firebaseio.com/challenges.json?auth=${token}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						diffLvl,
						challengerId,
						challengeeId,
						bid: bidAmount,
						date: date.toISOString(),
						stage: 0,
						winnerId: null,
						challengerScore: 0,
						challengeeScroe: 0,
						isChallengerRead: true,	 
						isChallengeeRead: false
					})
				}
			);

			if (!response.ok) {	        
				throw new Error('Something went wrong when create new challenge!');
		    }
		} catch(err){
			throw err;
		}
	};
};

//load challenges when enter screens with challenger list 
export const loadChallenge = (userId) => {
	return async (dispatch, getState) => {
		try {
			const response = await fetch(
			`https://ssad2019-1cc69.firebaseio.com/challenges.json?`,
			);

			if (!response.ok) {	        
				throw new Error('Something went wrong when create new challenge!');
	    	}
	    	const resData = await response.json();
	    	const unreadChallenges = [];
	    	const readChallenges = [];

	    	for (const key in resData) {
	    		if (resData[key].stage!==3) {
		    		unreadChallenges.push(
		    			new Challenge(
		    				key,
		    				resData[key].diffLvl,
		    				resData[key].challengerId,
		    				resData[key].challengeeId,
		    				resData[key].bid,
		    				new Date(resData[key].date),
		    				resData[key].stage,
		    				resData[key].winnerId,
		    				resData[key].ChallengerScore,
		    				resData[key].ChallengeeScore,
		    				resData[key].isChallengerRead,
		    				resData[key].isChallengeeRead
		    			)
		    		);
		    	} else{
		    		readChallenges.push(
		    			new Challenge(
		    				key,
		    				resData[key].diffLvl,
		    				resData[key].challengerId,
		    				resData[key].challengeeId,
		    				resData[key].bid,
		    				new Date(resData[key].date),
		    				resData[key].stage,
		    				resData[key].winnerId,
		    				resData[key].ChallengerScore,
		    				resData[key].ChallengeeScore,
		    				resData[key].isChallengerRead,
		    				resData[key].isChallengeeRead
		    			)
		    		);
		    	}
	    	}
	    	await dispatch({
	    		type: SET_CHALLENGES,
	    		unreadChallenges: unreadChallenges,
	    		readChallenges: readChallenges
	    	});
	    } catch (err) {
	    	throw err;
	    }
	};
};

//cancel challenge
export const cancelChallenge = id => {
	return async (dispatch, getState) => {
		//update firebase
		const token = getState().auth.token;
		const response = await fetch(
			`https://ssad2019-1cc69.firebaseio.com/challenges/${id}/.json??auth=${token}`,
			{
				method: 'DELETE'
			}
		);
		if(!response.ok) {
			throw new Error('Something went wrong when cancel challenge!')
		}
		//update state
		await dispatch({
			type: DELETE_CHALLENGES,
			id:id
		});


		
	};
};