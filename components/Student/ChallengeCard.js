import React from 'react';
import {
	StyleSheet,
	Text,
	Button,
	Alert
} from 'react-native';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import Card from '../UI/Card';
import * as challengeActions from '../../store/actions/challengeActions';
import * as challengeQuesActions from '../../store/actions/challengeQuesActions';

const diff = {
	'1':'Easy',
	'2':'Medium',
	'3':'Hard'
};

const ChallengeCard = props => {

	const dispatch = useDispatch();

	const cancelChallenge = async (id) => {
		Alert.alert('Confirm Cancel Challenge', 'Do you want to cancel this challenge?',
			 [
			 	{ text: 'Okay', onPress: async ()=>{
	 				await dispatch(challengeActions.cancelChallenge(id, props.challenge.bid));
			 	}},
			 	{ text: 'Cancel' }
			 ]
		);
	};

	const acceptChallenge = async (id) => {
		Alert.alert('Confirm Accept Challenge', 'Do you want to accept this challenge of points ?',
			 [
			 	{ text: 'Okay', onPress: async ()=>{
			 		try{
	 					await dispatch(challengeActions.acceptChallenge(id, props.challenge.bid));
			 		} catch (err) {
			 			Alert.alert('Acceptance Error!', err.message, [{text:'Okay' }]);
			 		}
			 	}},
			 	{ text: 'Cancel' }
			 ]
		);
	};

	const startDoQuestion = () => {
		Alert.alert('Confirm Start Challenge', 'Do you want to proceed with answering the questions?',
			 [
			 	{ text: 'Okay', onPress: async() => {
					 await dispatch(challengeQuesActions.getChallengeQues(props.challenge.diffLvl));
			 		props.props.navigation.navigate('ChallengeQuestion',
			 			{
			 				challenge: props.challenge
			 			}
			 		);
			 	}},
			 	{ text: 'Cancel' }
			 ]
		);
	};

	const confirm = (id) => {
		dispatch(challengeActions.confirmChallenge(id));
	};

	const time = moment(props.challenge.date).format('MMMM DD YYYY, HH:mm:ss');
	const diffLvl = diff[(props.challenge.diffLvl)];

	//before accepted, challenger
	if(props.challenge.stage===0 && props.userId===props.challenge.challengerId){
		return(
			<Card style={styles.card}>
				<Text>Waiting for opponent's response...</Text>
				<Text>Opponent: {props.challenge.challengeeId}</Text>
				<Text>Bid: {props.challenge.bid}</Text>
				<Text>Difficulty: {diffLvl}</Text>
				<Text>Challenge Time: {time}</Text>
				<Button 
					title='Cancel'
					onPress={e=>cancelChallenge(props.challenge.id, props.challenge.bid)}
				/>
			</Card>
		);
	}
	//before accepted, challengee
	else if(props.challenge.stage===0&&props.userId===props.challenge.challengeeId){
		return(
			<Card style={styles.card}>
				<Text>You are challenged!</Text>
				<Text>Opponent: {props.challenge.challengerId}</Text>
				<Text>Bid: {props.challenge.bid}</Text>
				<Text>Difficulty: {diffLvl}</Text>
				<Text>Challenge Time: {time}</Text>
				<Button 
					title='Accept'
					onPress={e=>acceptChallenge(props.challenge.id, props.challenge.bid)}
				/>
			</Card>
		);
	}

	//challenger, has done question 1
	//todo:countdown
	else if(props.challenge.stage===1&&props.userId===props.challenge.challengerId&&props.challenge.isChallengerRead){
		return(
			<Card style={styles.card}>
				<Text>Waiting for opponent to answer...</Text>	
				<Text>Opponent: {props.challenge.challengeeId}</Text>
				<Text>Bid: {props.challenge.bid}</Text>
				<Text>Difficulty: {diffLvl}</Text>
				<Text>Challenge Time: {time}</Text>
			</Card>
		);
	}

	//challenger, has done question 1
	//todo:countdown
	else if(props.challenge.stage===1&&props.userId===props.challenge.challengeeId&&props.challenge.isChallengeeRead){
		return(
			<Card style={styles.card}>
				<Text>Waiting for opponent to answer...</Text>	
				<Text>Opponent: {props.challenge.challengeeId}</Text>
				<Text>Bid: {props.challenge.bid}</Text>
				<Text>Difficulty: {diffLvl}</Text>
				<Text>Challenge Time: {time}</Text>
			</Card>
		);
	}

	//do question, challenger
	//todo: count down
	else if(props.challenge.stage===1&&props.userId===props.challenge.challengerId){
		return(
			<Card style={styles.card}>
				<Text>Opponent: {props.challenge.challengeeId}</Text>
				<Text>Bid: {props.challenge.bid}</Text>
				<Text>Difficulty: {diffLvl}</Text>
				<Text>Challenge Time: {time}</Text>
				<Button 
					title='Start Challenge'
					onPress={e=>startDoQuestion(props.challenge.id,props.challenge.diffLvl)}
				/>
			</Card>
		);
	}
	//do question, challengee
	else if(props.challenge.stage===1&&props.userId===props.challenge.challengeeId){
		return(
			<Card style={styles.card}>
				<Text>Opponent: {props.challenge.challengerId}</Text>
				<Text>Bid: {props.challenge.bid}</Text>
				<Text>Difficulty: {diffLvl}</Text>
				<Text>Challenge Time: {time}</Text>
				<Button 
					title='Start Challenge'
					onPress={startDoQuestion}
				/>
			</Card>
		);
	}

	//completed, challenger
	else if(props.challenge.stage===2){
		let resultMsg = 'You lose...';
		if(props.challengerScore === props.challengeeScore){
			resultMsg='Draw';
		}
		else if((props.challengerScore > props.challengeeScore && props.userId === props.challengerId)||(props.challengeeScore > props.challengerScore&&props.userId === props.challengeeId)){
			resultMsg = 'You win!';
		}
		return(
			<Card style={styles.card}>
				<Text>Result: {resultMsg}</Text>
				<Text>Opponent: {props.challenge.challengeeId}</Text>
				<Text>Bid: {props.challenge.bid}</Text>
				<Text>Difficulty: {diffLvl}</Text>
				<Text>Challenge Time: {time}</Text>
				<Button 
					title='Confirm'
					onPress={e=>confirm(props.challenge.id)}
				/>
			</Card>
		);
	}

	//completed, challenger
	else if(props.challenge.stage===3){
		let resultMsg = 'You lose...';
		if(props.challengerScore === props.challengeeScore){
			resultMsg='Draw';
		}
		else if((props.challengerScore > props.challengeeScore && props.userId === props.challengerId)||(props.challengeeScore > props.challengerScore&&props.userId === props.challengeeId)){
			resultMsg = 'You win!';
		}
		return(
			<Card style={styles.card}>
				<Text>Result: {resultMsg}</Text>
				<Text>Opponent: {props.challenge.challengeeId}</Text>
				<Text>Bid: {props.challenge.bid}</Text>
				<Text>Difficulty: {diffLvl}</Text>
				<Text>Challenge Time: {time}</Text>
			</Card>
		);
	}

	return null;
};

const styles = StyleSheet.create({
	card:{

	}
});

export default ChallengeCard;