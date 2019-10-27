import Challenge from '../../models/challenge';
import * as userActions from './userActions';

export const SET_CHALLENGES = 'SET_CHALLENGES';
export const DELETE_CHALLENGES = 'DELETE_CHALLENGES';
export const ACCEPT_CHALLENGES = 'ACCEPT_CHALLENGES';
export const ANSWER_CHALLENGES = 'ANSWER_CHALLENGES';
export const COMPLETE_CHALLENGES = 'COMPLETE_CHALLENGES';
export const CONFIRM_CHALLENGES = 'CONFIRM_CHALLENGES';


/**
 * @method
 * @desc Create a new challenge and add it to database
 * @param {*} diffLvl
 * @param {*} challengerId
 * @param {*} challengeeId
 * @param {*} bidAmount
 * 
 */
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
						challengeeScore: 0,
						isChallengerRead: false,	 
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


/**
 * @method
 * @desc Using userId as key, searching for challenges in the database and store the challenges in the reducer.
 * @param {*} userId
 * 
 */
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
	    		if (!((resData[key].isChallengerRead===3&&resData[key].challengerId===userId)||(resData[key].isChallengeeRead===3&&resData[key].challengeeId===userId))) {
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
		    				resData[key].challengerScore,
		    				resData[key].challengeeScore,
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


/**
 * @method
 * @desc Delete a specific challenge in database
 * @param {*} id
 * @param {*} bid
 * 
 */
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
			type: DELETE_CHALLENGES,
			id:id
		});
		//return point to users
		await dispatch(userActions.updateStudent(userInfo.userId, userInfo.userEmail, 'student', userInfo.userName, userInfo.character, userInfo.userTotalScore+bid));
	};
};


/**
 * @method
 * @desc After accepting a challenge, the method is used to update its status in database.
 * @param {*} id
 * @param {*} bid
 * @returns
 */
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
	    if(!resData.auth){
	    	throw new Error('The challenge has been deleted!')
	    }
	    const token = resData.auth;

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
			const errorResult= await response.json();
			const errorId = errorResult.error;
			let message = 'Something went wrong when accept challenge!';
			if (errorId === 'EMAIL_EXISTS') {
				message = 'The challenge has been deleted!';
			}
			if (errorId === 'Auth token is expired') {
					async () => {
						await dispatch(cancelChallenge(id,bid));
					}
	    			message = 'The challenge has expired!';
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


/**
 * @method	
 * @desc Updata user score after users answer challenge questionss
 * @param {*} id
 * @param {*} bid
 * @param {*} score
 * 
 */
export const answerChallenge = (id, bid, score) => {
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
	    if(!resData.auth){
	    	throw new Error('The challenge has been deleted!')
	    }
	    const token = resData.auth;

	    let opponentAnswered = false;
	    if(userInfo.userEmail===resData.challengeeId){//userIsChallengee
	    	if(resData.isChallengerRead) {
	    		opponentAnswered=true;
	    	}
	    	const response = await fetch(
	    	  `https://ssad2019-1cc69.firebaseio.com/challenges/${id}.json?auth=${token}`,
	    	    {
	    	    method: 'PATCH',
	    	    headers: {
	    	      'Content-Type': 'application/json'
	    	    },
	    	    body: JSON.stringify({
	    	      challengeeScore:score,
	    	      isChallengeeRead:true
	    	    })
	    	  } 
	    	);	

	    	if(!response.ok) {
	    		const errorResult= await response.json();
	    		const errorId = errorResult.error;
	    		console.log(errorId);
	    		let message = 'Something went wrong when update challenge answer!';
	    		if (errorId === 'EMAIL_EXISTS') {
	    			message = 'The challenge has been deleted!';
	    		}
	    		if (errorId === 'Auth token is expired') {
	    			console.log(1);
	    			async () => {
	    				await dispatch(completeChallenge(id));
	    			}
	    			message = 'The challenge has expired!';
	    		}
	    		throw new Error(message);
	    	}
	    	

	    	//update challenge store
	    	await dispatch({
	    		type:ANSWER_CHALLENGES,
	    		id:id,
	    		answerer:'challengee',
	    		score: score
	    	});
	    } else {//challenger
	    	if(resData.isChallengeeRead) {
	    		opponentAnswered=true;
	    	}
	    	const response = await fetch(
	    	  `https://ssad2019-1cc69.firebaseio.com/challenges/${id}.json?auth=${token}`,
	    	    {
	    	    method: 'PATCH',
	    	    headers: {
	    	      'Content-Type': 'application/json'
	    	    },
	    	    body: JSON.stringify({
	    	      challengerScore:score,
	    	      isChallengerRead:true,
	    	    })
	    	  } 
	    	);	
			
			if(!response.ok) {
				const errorResult= await response.json();
				const errorId = errorResult.error;
				console.log(errorId);
				let message = 'Something went wrong when update challenge answer!';
				if (errorId === 'EMAIL_EXISTS') {
					message = 'The challenge has been deleted!';
				}
				if (errorId === 'Auth token is expired') {
					console.log(2);
					dispatch(completeChallenge(id))
	    			message = 'The challenge has expired!';
	    		}
				throw new Error(message);

			}

			//update challenge store
			await dispatch({
				type: ANSWER_CHALLENGES,
				id:id,
				answerer:'challenger',
				score: score
			});
		}
		//if both user answered, update challenge
		if(opponentAnswered){
			dispatch(completeChallenge(id));
		}
	};
};


/**
 * @method
 * @desc Update winner information after both users finished all 5 question.
 * @param {*} id
 * @param {*} bid
 * @returns
 */
export const completeChallenge = (id) => {
	console.log('enter completeChallenge');
	return async (dispatch, getState) => {
		const userInfo = getState().user;
		//increase challenge stage
		const challengeResponse = await fetch(
      		`https://ssad2019-1cc69.firebaseio.com/challenges/${id}.json`
    	);

    	if (!challengeResponse.ok) {
	        throw new Error('Something went wrong when get challenge!');
	    }

	    const resData = await challengeResponse.json();
	    if(!resData.auth){
	    	throw new Error('The challenge has been deleted!')
	    }
	    const token = resData.auth;
	    const challengerScore = resData.challengerScore;
	    const challengeeScore = resData.challengeeScore;
	    const challengerId = resData.challengerId;
	    const challengeeId = resData.challengeeId;
	    const bid = resData.bid;
	    const opponentEmail = challengeeId===userInfo.userEmail?challengerId:challengeeId;

	    const response = await fetch(
	      `https://ssad2019-1cc69.firebaseio.com/challenges/${id}.json?auth=${token}`,
	        {
	        method: 'PATCH',
	        headers: {
	          'Content-Type': 'application/json'
	        },
	        body: JSON.stringify({
	          stage:2
	        })
	      } 
	    );	
	    if(!response.ok) {
	    	const errorResult= await response.json();
	    	const errorId = errorResult.error.message;
	    	let message = 'Something went wrong when update challenge completion!';
	    	if (errorId === 'EMAIL_EXISTS') {
	    		message = 'The challenge has been deleted!';
	    	}
	    	throw new Error(message);
	    }

	    //update challenge list store
	    dispatch({
	    	type: COMPLETE_CHALLENGES,
	    	id: id
	    });

	    //update user score
	    if((challengerScore>challengeeScore&&challengerId===userInfo.userEmail)||(challengeeScore>challengerScore&&challengeeId===userInfo.userEmail)){//user win: add point to user
	    	await dispatch(
	    		userActions.updateStudent(
	    			userInfo.userId, 
	    			userInfo.userEmail, 
	    			'student', 
	    			userInfo.userName, 
	    			userInfo.character, 
	    			userInfo.userTotalScore+bid*2
	    		)
	    	);
	    } else if((challengerScore>challengeeScore&&challengeeId===userInfo.userEmail)||(challengeeScore>challengerScore&&challengerId===userInfo.userEmail)) { //opponent win: add point to opponent
	    	//get opponent info
	    	const response = await fetch(
	    	  `https://ssad2019-1cc69.firebaseio.com/users.json?`
	    	);

	    	if (!response.ok) {
	    	    throw new Error('Something went wrong when get user!');
	    	}

	    	const resData = await response.json();
	    	for (const key in resData) {
	    	  if (resData[key].userEmail===opponentEmail){
	    	    if(resData[key].userType==='student'){ 
	    	      //load student Info to store
	    	      await dispatch(userActions.updateStudent(
      	    		resData[key].userId,
      	    		resData[key].userEmail, 
      	    		'student', 
      	    		resData[key].userName, 
      	    		resData[key].character, 
      	    		resData[key].userTotalScore+bid*2));
	    	      return;
	    	    }
	    	  }
	        }

	    } else { //draw: return points to both players
	    	await dispatch(userActions.updateStudent(
	    		userInfo.userId, 
	    		userInfo.userEmail, 
	    		'student', 
	    		userInfo.userName, 
	    		userInfo.character, 
	    		userInfo.userTotalScore+bid));

	    	//get opponent info
	    	const response = await fetch(
	    	  `https://ssad2019-1cc69.firebaseio.com/users.json?`
	    	);

	    	if (!response.ok) {
	    	    throw new Error('Something went wrong when get user!');
	    	}

	    	const resData = await response.json();
	    	for (const key in resData) {
	    	  if (resData[key].userEmail===opponentEmail){
	    	    if(resData[key].userType==='student'){ 
	    	      //load student Info to store
	    	      await dispatch(userActions.updateStudent(
      	    		resData[key].userId,
      	    		resData[key].userEmail, 
      	    		'student', 
      	    		resData[key].userName, 
      	    		resData[key].character, 
      	    		resData[key].userTotalScore+bid*2));
	    	      return;
	    	    }
	    	  }
	    	}
	    }
	};
};


/**
 * @method
 * @desc Update both user scores after confirming the result
 * @param {*} id
 * 
 */
export const confirmChallenge = (id) => {
	console.log('enter confirmChallenge');
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
	    if(!resData.auth){
	    	throw new Error('The challenge has been deleted!')
	    }
	    const token = resData.auth;
	    console.log(token);

	    if(userInfo.userEmail===resData.challengeeId){//challengee
	    	console.log('enter challengee');
			const response = await fetch(
			  `https://ssad2019-1cc69.firebaseio.com/challenges/${id}.json?auth=${token}`,
			    {
			    method: 'PATCH',
			    headers: {
			      'Content-Type': 'application/json'
			    },
			    body: JSON.stringify({
			      isChallengeeRead:3,
			      stage:3
			    })
			  } 
			);		

			if(!response.ok) {
	    		const errorResult= await response.json();
	    		const errorId = errorResult.error;
	    		let message = 'Something went wrong when confirm challenge!';
	    		if (errorId === 'Auth token is expired') {
	    			message = 'The challenge has expired!';
	    		}
	    		throw new Error(message);
	    	}

			//update challenge list store
		    dispatch({
		    	type: CONFIRM_CHALLENGES,
		    	id: id,
		    	answerer:'challengee'
		    });
	    } else {//challenger
	    	console.log('enter challenger');
	    	const response = await fetch(
	    	  `https://ssad2019-1cc69.firebaseio.com/challenges/${id}.json?auth=${token}`,
	    	    {
	    	    method: 'PATCH',
	    	    headers: {
	    	      'Content-Type': 'application/json'
	    	    },
	    	    body: JSON.stringify({
	    	      isChallengerRead:3,
	    	      stage:3
	    	    })
	    	  } 
	    	);		

	    	if(!response.ok) {
	    		const errorResult= await response.json();
	    		const errorId = errorResult.error;	    		let message = 'Something went wrong when confirm challenge!';
	    		if (errorId === 'Auth token is expired') {
	    			message = 'The challenge has expired!';
	    		}
	    		throw new Error(message);
	    	}

    		//update challenge list store
    	    dispatch({
    	    	type: CONFIRM_CHALLENGES,
    	    	id: id,
    	    	answerer:'challenger'
    	    });
	    }
	
	};
};