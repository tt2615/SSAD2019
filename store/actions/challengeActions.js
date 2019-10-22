import Challenge from '../../models/challenge';
import * as userActions from './userActions';

export const SET_CHALLENGES = 'SET_CHALLENGES';
export const DELETE_CHALLENGES = 'DELETE_CHALLENGES';
export const ACCEPT_CHALLENGES = 'ACCEPT_CHALLENGES';
export const ANSWER_CHALLENGES = 'ANSWER_CHALLENGES';
export const COMPLETE_CHALLENGES = 'COMPLETE_CHALLENGES';

//create challenge in ChallengeCreationScreen
export const addChallenge = (diffLvl, challengerId, challengeeId,bidAmount) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const date = new Date();
		try {
			const response = await fetch(
				`https://ssad2019-1cc69.firebaseio.com/challenges.json`,
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
						isChallengeeRead: false,
						auth:token
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
export const cancelChallenge = (id, bid) => {
	return async (dispatch, getState) => {
		//update firebase
		const token = getState().auth.token;
		const userInfo = getState().user;
		const response = await fetch(
			`https://ssad2019-1cc69.firebaseio.com/challenges/${id}/.json?auth=${token}`,
			{
				method: 'DELETE'
			}
		);
		if(!response.ok) {
			throw new Error('The other party')
		}
		//update challenge store
		await dispatch({
			type: ACCEPT_CHALLENGES,
			id:id
		});
		//return point to users
		await dispatch(userActions.updateStudent(userInfo.userId, userInfo.userEmail, 'student', userInfo.userName, userInfo.character, userInfo.userTotalScore+bid));
	};
};

//accept challenge
export const acceptChallenge = (id, bid) => {
	return async (dispatch, getState) => {
		//update firebase
		const userInfo = getState().user;
		const challengeResponse = await fetch(
      		`https://ssad2019-1cc69.firebaseio.com/challenges/${id}.json`
    	);

    	if (!challengeResponse.ok) {
	        throw new Error('Something went wrong when get challenge!');
	    }

	    const resData = await challengeResponse.json();
	    const token = resData.auth;
	    console.log(token);

		const response = await fetch(
		  `https://ssad2019-1cc69.firebaseio.com/challenges/${id}.json?auth=${token}`,
		    {
		    method: 'PATCH',
		    headers: {
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({
		      stage:1
		    })
		  } 
		);		

		if(!response.ok) {
			console.log(response);
			const errorResult= await response.json();
			const errorId = errorResult.error.message;
			console.log('errorId: ' + errorId);
			let message = 'Something went wrong when accept challenge!';
			if (errorId === 'EMAIL_EXISTS') {
				message = 'This email exists already!';
			}
			throw new Error(message);
		}

		//update challenge store
		await dispatch({
			type: ACCEPT_CHALLENGES,
			id:id
		});
		//return point to users
		await dispatch(userActions.updateStudent(userInfo.userId, userInfo.userEmail, 'student', userInfo.userName, userInfo.character, userInfo.userTotalScore-bid));
	};
}