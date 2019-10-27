import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	Button,
	Alert,
	ActivityIndicator
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
	const [err, setErr] = useState();
	const [isConfirmLoading, setIsConfirmLoading] = useState(false);
	const [isAcceptLoading, setIsAcceptLoading] = useState(false);
	const [isCancelLoading, setIsCancelLoading] = useState(false);
	const [isDoQuesLoading, setIsDoQuesLoading] = useState(false);

	const cancelChallenge = async (id) => {
		Alert.alert('Confirm Cancel Challenge', 'Do you want to cancel this challenge?',
			 [
			 	{ text: 'Okay', onPress: async ()=>{
			 		setIsCancelLoading(true);
			 		try{
	 					await dispatch(challengeActions.cancelChallenge(id, props.challenge.bid));
			 		} catch (err) {
			 			setErr(err.message);
			 		}
			 		setIsCancelLoading(false);
			 	}},
			 	{ text: 'Cancel' }
			 ]
		);
	};

	const acceptChallenge = async (id) => {
		Alert.alert('Confirm Accept Challenge', 'Do you want to accept this challenge of points ?',
			 [
			 	{ text: 'Okay', onPress: async ()=>{
			 		setIsAcceptLoading(true);
			 		try{
	 					await dispatch(challengeActions.acceptChallenge(id, props.challenge.bid));
			 		} catch (err) {
			 			setErr(err.message);
			 		}
			 		setIsAcceptLoading(false);
			 	}},
			 	{ text: 'Cancel' }
			 ]
		);
	};

	const startDoQuestion = () => {
		Alert.alert('Confirm Start Challenge', 'Do you want to proceed with answering the questions?',
			 [
			 	{ text: 'Okay', onPress: async() => {
			 		setIsDoQuesLoading(true);
			 		try{
					 	await dispatch(challengeQuesActions.getChallengeQues(props.challenge.diffLvl));
					} catch (err){
					 		setErr(err.message);
					}
					setIsDoQuesLoading(false);
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

	const confirm = async (id) => {
		setIsConfirmLoading(true);
		try{
			await dispatch(challengeActions.confirmChallenge(id));
		} catch (err){
			setErr(err.message);
		}
		setIsConfirmLoading(false);
	};

	const time = moment(props.challenge.date).format('MMMM DD YYYY, HH:mm:ss');
	const diffLvl = diff[(props.challenge.diffLvl)];

  	//show error
	useEffect(() => {
    	if (err) {
      		Alert.alert('An Error Occurred!', err, [{ text: 'Okay' }]);
    	}
    	setErr(null);
  	}, [err]);

	//before accepted, challenger
	if(props.challenge.stage===0 && props.userId===props.challenge.challengerId){
		return(
			<Card style={styles.card}>

				<Text style={styles.wait}>Waiting for opponent's response...</Text>
				<Text style={styles.opp}>Opponent: {props.challenge.challengeeId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text style={styles.time}>Challenge Time: {time}</Text>
				{isCancelLoading?(
					<ActivityIndicator size='small'/>
				) : (
					<Button 
						title='Cancel'
						color = '#324755'
						onPress={e=>cancelChallenge(props.challenge.id, props.challenge.bid)}
					/>
				)}
				
			</Card>
		);
	}
	//before accepted, challengee
	else if(props.challenge.stage===0 && props.userId===props.challenge.challengeeId){
		return(
			<Card style={styles.card}>
				<Text style={styles.challenged}>You are challenged!</Text>
				<Text style={styles.opp}>Opponent: {props.challenge.challengerId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text>Challenge Time: {time}</Text>
				{isAcceptLoading?(
					<ActivityIndicator size='small'/>
				) : (
					<Button 
						title='Accept'
						color = '#324755'
						onPress={e=>acceptChallenge(props.challenge.id, props.challenge.bid)}
					/>
				)}
			</Card>
		);
	}

	//challenger, has done question
	//todo:countdown
	else if(props.challenge.stage===1 && props.userId===props.challenge.challengerId && props.challenge.isChallengerRead){
		return(
			<Card style={styles.card}>
				<Text style={styles.wait}>Waiting for opponent to answer...</Text>	
				<Text style={styles.opp}>Opponent: {props.challenge.challengeeId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text>Challenge Time: {time}</Text>
			</Card>
		);
	}

	//challengee, has done question
	//todo:countdown
	else if(props.challenge.stage===1 && props.userId===props.challenge.challengeeId && props.challenge.isChallengeeRead){
		return(
			<Card style={styles.card}>
				<Text style={styles.wait}>Waiting for opponent to answer...</Text>	
				<Text style={styles.opp}>Opponent: {props.challenge.challengerId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text>Challenge Time: {time}</Text>
			</Card>
		);
	}

	//do question, challenger
	//todo: count down
	else if(props.challenge.stage===1 && props.userId===props.challenge.challengerId){
		return(
			<Card style={styles.card}>
				<Text style={styles.opp}>Opponent: {props.challenge.challengeeId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text>Challenge Time: {time}</Text>
				{isDoQuesLoading?(
					<ActivityIndicator size='small'/>
				) : (
					<Button 
						title='Start Challenge'
						color = '#324755'
						onPress={e=>startDoQuestion(props.challenge.id,props.challenge.diffLvl)}
					/>
				)}
			</Card>
		);
	}

	//do question, challengee
	else if(props.challenge.stage===1 && props.userId===props.challenge.challengeeId){
		return(
			<Card style={styles.card}>
				<Text style={styles.opp}>Opponent: {props.challenge.challengerId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text style={styles.time}>Challenge Time: {time}</Text>
				{isDoQuesLoading?(
					<ActivityIndicator size='small'/>
				) : (
					<Button 
						title='Start Challenge'
						color = '#324755'
						onPress={startDoQuestion}
					/>
				)}
			</Card>
		);
	}

	//completed, challenger
	else if(props.challenge.stage===2 && props.challenge.challengerId===props.userId){
		let resultMsg = 'You lose...';
		if(props.challenge.ChallengerScore === props.challenge.ChallengeeScore){
			resultMsg='Draw';
		}
		else if(props.challenge.ChallengerScore > props.challenge.ChallengeeScore){
			resultMsg = 'You win!';
		}
		return(
			<Card style={styles.card}>
				<Text style={styles.resultText}>Result: {resultMsg}</Text>
				<Text style={styles.opp}>Opponent: {props.challenge.challengeeId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text style={styles.time}>Challenge Time: {time}</Text>
				{isConfirmLoading?(
					<ActivityIndicator size='small'/>
				) : (
					<Button 
						title='Confirm'
						color = '#324755'
						onPress={e=>confirm(props.challenge.id)}
					/>
				)}
			</Card>
		);
	}

	//completed, challengee
	else if(props.challenge.stage===2 && props.challenge.challengeeId===props.userId){
		let resultMsg = 'You lose...';
		if(props.challenge.ChallengerScore === props.challenge.ChallengeeScore){
			resultMsg='Draw';
		}
		else if(props.challenge.ChallengeeScore > props.challenge.ChallengerScore){
			resultMsg = 'You win!';
		}
		return(
			<Card style={styles.card}>
				<Text style={styles.resultText}>Result: {resultMsg}</Text>
				<Text style={styles.opp}>Opponent: {props.challenge.challengerId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text style={styles.time}>Challenge Time: {time}</Text>
				{isConfirmLoading?(
					<ActivityIndicator size='small'/>
				) : (
					<Button 
						title='Confirm'
						color = '#324755'
						onPress={e=>confirm(props.challenge.id)}
					/>
				)}
			</Card>
		);
	}

	//confirmed, challenger
	else if(props.challenge.isChallengerRead===3&&props.challenge.challengerId===props.userId){
		let resultMsg = 'You lose...';
		if(props.challenge.ChallengerScore === props.challenge.ChallengeeScore){
			resultMsg='Draw';
		}
		else if(props.challenge.ChallengerScore > props.challenge.ChallengeeScore){
			resultMsg = 'You win!';
		}
		return(
			<Card style={styles.card}>
				<Text style={styles.resultText}>Result: {resultMsg}</Text>
				<Text style={styles.opp}>Opponent: {props.challenge.challengeeId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text style={styles.time}>Challenge Time: {time}</Text>
			</Card>
		);
	}

	//confirmed, challengee
	else if(props.challenge.isChallengeeRead===3&&props.challenge.challengeeId===props.userId){
		let resultMsg = 'You lose...';
		if(props.challenge.ChallengerScore === props.challenge.ChallengeeScore){
			resultMsg='Draw';
		}
		else if(props.challenge.ChallengeeScore > props.challenge.ChallengerScore){
			resultMsg = 'You win!';
		}
		return(
			<Card style={styles.card}>
				<Text style={styles.resultText}>Result: {resultMsg}</Text>
				<Text style={styles.opp}>Opponent: {props.challenge.challengerId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text style={styles.time}>Challenge Time: {time}</Text>
			</Card>
		);
	}

	return null;
};

const styles = StyleSheet.create({
	wait:{
		textAlign: 'center',
		width:'100%',
		color: '#D97D54',
		fontSize: 16,
		fontWeight: 'bold',
	},
	opp:{
		color:'#324755',
	},
	bid:{
		color:'#324755',
	},
	diff:{
		color:'#324755',
	},
	time:{
		color:'#324755',
	},
	challenged:{
		textAlign: 'center',
		width:'100%',
		color: '#D97D54',
		fontSize: 16,
		fontWeight: 'bold',
	},
	resultText:{
		textAlign: 'center',
		width:'100%',
		color: '#D97D54',
		fontSize: 16,
		fontWeight: 'bold',
	}
});

export default ChallengeCard;