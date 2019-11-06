import Question from '../../models/question';
import QUESTIONS from '../../data/questions';

export const ADD_QUESTION = 'ADD_QUESTION';
export const LOAD_QUESTIONS = 'LOAD_QUESTION';



export /**
 * @method
 * @desc Add questions to question Database
 * 
 */
const addQuestions = () => {
	return async (dispatch, getState) => {
		let response;
		for (const key in QUESTIONS) {
			try {
				response = await fetch(
					`https://ssad2019-1cc69.firebaseio.com/questions/${QUESTIONS[key].worldId}/${QUESTIONS[key].sectionId}.json`,
					{
					  method: 'POST',
					  headers: {
					    'Content-Type': 'application/json'
					  },
					  body: JSON.stringify({
					    diffLvl: QUESTIONS[key].diffLvl,
					    worldId: QUESTIONS[key].worldId,
					    sectionId: QUESTIONS[key].sectionId,
					    questionText:QUESTIONS[key].text,
					    option1: QUESTIONS[key].op1,
					    option2: QUESTIONS[key].op2,
					    option3: QUESTIONS[key].op3,
					    option4: QUESTIONS[key].op4,
					    correctOption: QUESTIONS[key].correct,
					    score: QUESTIONS[key].score
					  })
					}
				);
			} catch (err) {
				throw err;
			}

			if (!response.ok) {
			  throw new Error('Something went wrong when add questions!');
			}
		}

		for (const key in QUESTIONS){
			let response;
			try {
				response = await fetch(
					`https://ssad2019-1cc69.firebaseio.com/questions/d${QUESTIONS[key].diffLvl}.json`,
					{
					  method: 'POST',
					  headers: {
					    'Content-Type': 'application/json'
					  },
					  body: JSON.stringify({
					    diffLvl: QUESTIONS[key].diffLvl,
					    worldId: QUESTIONS[key].worldId,
					    sectionId: QUESTIONS[key].sectionId,
					    questionText:QUESTIONS[key].text,
					    option1: QUESTIONS[key].op1,
					    option2: QUESTIONS[key].op2,
					    option3: QUESTIONS[key].op3,
					    option4: QUESTIONS[key].op4,
					    correctOption: QUESTIONS[key].correct,
					    score: QUESTIONS[key].score
					  })
					}
				);
			} catch(err){
				throw err;
			}	

			if (!response.ok) {
			  throw new Error('Something went wrong when add user!');
			}
		}
	};
};

/**
 * @method
 * @desc Create a new questionObject in a more convevient structure
 * @param {*} sourceObject
 * @param {*} id
 * @returns {Object} A new question object
 */
const formQuestionObject=(sourceObject,id)=>{
	let options=[];
	if (sourceObject.option1) options.push(sourceObject.option1);
	if (sourceObject.option2) options.push(sourceObject.option2);
	if (sourceObject.option3) options.push(sourceObject.option3);
	if (sourceObject.option4) options.push(sourceObject.option4);
	return {
		qid: id,
		diffLvl: sourceObject.diffLvl,
		questionText: sourceObject.questionText,
		options: options,
		correctOption: sourceObject.correctOption,
		score: sourceObject.score
	};
}


/**
 * @method
 * @desc Load questions from databse into reducer
 * @param {*} wid
 * @param {*} sid
 * 
 */
export const getQuestions= (wid,sid)=>{
    return async (dispatch,getState)=>{
        const response = await fetch(
            `https://ssad2019-1cc69.firebaseio.com/questions/${wid}/${sid}.json?`
        );
        
        if (!response.ok){
            throw new Error('Something went wrong when get Questions!');
        }
		let tempQuestionArray={easy:[],medium:[],difficult:[]};
		let count=[0,0,0];
        const resData = await response.json();
        for (const key in resData){
            if (count[0]<5&resData[key].diffLvl===1){
				tempQuestionArray.easy.push(formQuestionObject(resData[key],key));
				count[0]+=1;
			}
			else if (count[1]<2&resData[key].diffLvl===2){
				tempQuestionArray.medium.push(formQuestionObject(resData[key],key));
				count[1]+=1;
			}
			else if (count[2]<3&resData[key].diffLvl===3){
				tempQuestionArray.difficult.push(formQuestionObject(resData[key],key));
				count[2]+=1;
			}
		};

        await dispatch({
            type: LOAD_QUESTIONS,
            payload: tempQuestionArray
		});
		
        return;
    }
};
