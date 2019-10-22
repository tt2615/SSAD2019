export const LOAD_QUESTIONS='LOAD_QUESTIONS';

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

export const getChallengeQues=(diffLvl)=>{
    return async (dispatch,getState)=>{
        const diff='d'+diffLvl;
        const response = await fetch(
            `https://ssad2019-1cc69.firebaseio.com/questions/${diff}.json?`
        );
        
        if (!response.ok){
            throw new Error('Something went wrong when get Challenge Questions!');
        }
        let tempQuestionArray=[];
        let resQuestionArray=[];
		let count=0;
        const resData = await response.json();
        let range=0;
        let random;
        let duplicate=[];
        let keys=[];

        for (const key in resData) {
            range+=1;
            keys.push(key);}

        while (count<5){
            random=Math.floor(Math.random()*Number(range)+1);
            console.log(random);
            if (duplicate.indexOf(random)!=-1) continue;
            else {
                duplicate.push(random);
                tempQuestionArray.push(resData[keys[random-1]]);
                count+=1;
            }
        };

        for (let j=0;j<tempQuestionArray.length;j++){
            resQuestionArray.push(formQuestionObject(tempQuestionArray[j]));
        }

        dispatch({
            type: LOAD_QUESTIONS,
            payload: resQuestionArray
        })

        return;
    }
}