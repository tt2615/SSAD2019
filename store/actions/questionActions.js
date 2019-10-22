import Question from '../../models/question';
import QUESTIONS from '../../data/questions';

export const ADD_QUESTION = 'ADD_QUESTION';
export const LOAD_QUESTIONS = 'LOAD_QUESTION';

export const addQuestions = () => {
	return async (dispatch, getState) => {
		for (const key in QUESTIONS){
			const response = await fetch(
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

			if (!response.ok) {
			  throw new Error('Something went wrong when add user!');
			}
		}

		for (const key in QUESTIONS){
			const response = await fetch(
				`https://ssad2019-1cc69.firebaseio.com/questions/${QUESTIONS[key].diffLvl}.sectionId}.json`,
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

			if (!response.ok) {
			  throw new Error('Something went wrong when add user!');
			}
		}
	};
};