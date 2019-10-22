import React from 'react';
import {
	StyleSheet,
	Text,
	Button
} from 'react-native';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import Card from '../UI/Card';
import * as challengeActions from '../../store/actions/challengeActions';

const ChallengeCard = props => {

	const dispatch = useDispatch();

	const cancelChallenge = (id) => {
		console.log('cancel Challenge');
		dispatch(challengeActions.cancelChallenge(id));
	};

	const acceptChallenge = () => {
		console.log('accept challenge');
	};

	const startDoQuestion = () => {
		console.log('start do question');
	}

	const confirm = () => {
		console.log('confirm');
	}

	const time = moment(props.challenge.time).format('MMMM DD YYYY, HH:mm:ss');
	//before accepted, challenger
	if(props.challenge.stage===0 && props.userId===props.challenge.challengerId){
		return(
			<Card style={styles.card}>
				<Text>Waiting for opponent's response...</Text>
				<Text>Opponent: {props.challenge.challengeeId}</Text>
				<Text>Bid: {props.challenge.bid}</Text>
				<Text>Challenge Time: {time}</Text>
				<Button 
					title='Cancel'
					onPress={e=>cancelChallenge(props.challenge.id)}
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
				<Text>Challenge Time: {time}</Text>
				<Button 
					title='Accept'
					onPress={acceptChallenge}
				/>
			</Card>
		);
	}
	//do question, challenger
	else if(props.stage===1&&props.userId===props.challenge.challengerId){
		return(
			<Card style={styles.card}>
				<Text>Opponent: {props.challenge.challengeeId}</Text>
				<Button 
					title='Start Challenge'
					onPress={startDoQuestion}
				/>
			</Card>
		);
	}
	//do question, challengee
	else if(props.stage===1&&props.userId===props.challenge.challengeeId){
		return(
			<Card style={styles.card}>
				<Text>Opponent: {props.challenge.challengerId}</Text>
				<Button 
					title='Start Challenge'
					onPress={startDoQuestion}
				/>
			</Card>
		);
	}
	//completed, challenger
	else if(props.stage===3&&props.userId===props.challenge.challengerId){
		return(
			<Card style={styles.card}>
				<Text>Opponent: {props.challenge.challengeeId}</Text>
				<Button 
					title='Confirm'
					onPress={confirm}
				/>
			</Card>
		);
	}
	//completed, challengee
	else if(props.stage===3&&props.userId===props.challenge.challengeeId){
		return(
			<Card style={styles.card}>
				<Text>Opponent: {props.challenge.challengerId}</Text>
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