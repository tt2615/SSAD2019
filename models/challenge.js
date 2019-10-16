class Challenge{
	constructor(id, diffLvl, challengerId, challengeeId, date, stage, winnerId, ChallengerScore, ChallengeeScore, isChallengerRead, isChallengeeRead){
		this.id = id;
		this.diffLvl = diffLvl;
		this.challengerId = challengerId;
		this.challengeeId = challengeeId;
		this.date = date;
		//stage: 0-created, 1-accepted, 2-answered, 3-completed
		this.stage = stage;
		this.winnerId = winnerId;
		this.ChallengerScore = ChallengerScore;
		this.ChallengeeScore = ChallengeeScore;
		this.isChallengerRead = isChallengerRead;
		this.isChallengeeRead = isChallengeeRead;
	}
}

export default Challenge;