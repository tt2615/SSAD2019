class Question{
	constructor(diffLvl, worldId, sectionId, text, op1, op2, op3, op4, correct, score){
		this.diffLvl = diffLvl;
		this.worldId = worldId;
		this.sectionId = sectionId;
		this.text = text;
		this.op1 = op1;
		this.op2 = op2;
		this.op3 = op3;
		this.op4 = op4;
		this.correct = correct;
		this.score = score;
	}
}

export default Question;