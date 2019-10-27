import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	Button,
	Alert,
	ActivityIndicator,
	Image,
	TouchableOpacity,
	View
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
			<View style={styles.card}>

				<Text style={styles.wait}>Waiting for opponent's response...</Text>
				<Text style={styles.opp}>Opponent: {props.challenge.challengeeId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text style={styles.time}>Challenge Time: {time}</Text>
				{isCancelLoading?(
					<ActivityIndicator size='small'/>
				) : (
					<TouchableOpacity style={{alignItems:'center'}} activeOpacity={.5} onPress={e=>cancelChallenge(props.challenge.id, props.challenge.bid)}>
						<Image resizeMode='contain'
	                        style ={{width: 213, height: 35}}
	                        source={require("../../assets/images/icons/cancel.png")}/>
					</TouchableOpacity>
				)}		
			</View>
		);
	}
	//before accepted, challengee
	else if(props.challenge.stage===0 && props.userId===props.challenge.challengeeId){
		return(
			<View style={styles.card}>
				<Text style={styles.challenged}>You are challenged!</Text>
				<Text style={styles.opp}>Opponent: {props.challenge.challengerId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text>Challenge Time: {time}</Text>
				{isAcceptLoading?(
					<ActivityIndicator size='small'/>
				) : (
					<TouchableOpacity style={{alignItems:'center'}} activeOpacity={.5} onPress={e=>acceptChallenge(props.challenge.id, props.challenge.bid)}>
						<Image resizeMode='contain'
	                        style ={{width: 213, height: 35}}
	                        source={require("../../assets/images/icons/accept.png")}/>
					</TouchableOpacity>
				)}
			</View>
		);
	}

	//challenger, has done question
	//todo:countdown
	else if(props.challenge.stage===1 && props.userId===props.challenge.challengerId && props.challenge.isChallengerRead){
		return(
			<View style={styles.card}>
				<Text style={styles.wait}>Waiting for opponent to answer...</Text>	
				<Text style={styles.opp}>Opponent: {props.challenge.challengeeId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text>Challenge Time: {time}</Text>
			</View>
		);
	}

	//challengee, has done question
	//todo:countdown
	else if(props.challenge.stage===1 && props.userId===props.challenge.challengeeId && props.challenge.isChallengeeRead){
		return(
			<View style={styles.card}>
				<Text style={styles.wait}>Waiting for opponent to answer...</Text>	
				<Text style={styles.opp}>Opponent: {props.challenge.challengerId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text>Challenge Time: {time}</Text>
			</View>
		);
	}

	//do question, challenger
	//todo: count down
	else if(props.challenge.stage===1 && props.userId===props.challenge.challengerId){
		return(
			<View style={styles.card}>
				<Text style={styles.opp}>Opponent: {props.challenge.challengeeId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text>Challenge Time: {time}</Text>
				{isDoQuesLoading?(
					<ActivityIndicator size='small'/>
				) : (
					<TouchableOpacity style={{alignItems:'center'}} activeOpacity={.5} onPress={e=>startDoQuestion(props.challenge.id,props.challenge.diffLvl)}>
						<Image resizeMode='contain'
	                        style ={{width: 213, height: 35}}
	                        source={require("../../assets/images/icons/start.png")}/>
					</TouchableOpacity>
				)}
			</View>
		);
	}

	//do question, challengee
	else if(props.challenge.stage===1 && props.userId===props.challenge.challengeeId){
		return(
			<View style={styles.card}>
				<Text style={styles.opp}>Opponent: {props.challenge.challengerId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text style={styles.time}>Challenge Time: {time}</Text>
				{isDoQuesLoading?(
					<ActivityIndicator size='small'/>
				) : (
					<TouchableOpacity style={{alignItems:'center'}} activeOpacity={.5} onPress={startDoQuestion}>
						<Image resizeMode='contain'
	                        style ={{width: 213, height: 35}}
	                        source={require("../../assets/images/icons/start.png")}/>
					</TouchableOpacity>
				)}	
			</View>
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
			<View style={styles.card}>
				<Text style={styles.resultText}>Result: {resultMsg}</Text>
				<Text style={styles.opp}>Opponent: {props.challenge.challengeeId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text style={styles.time}>Challenge Time: {time}</Text>
				{isConfirmLoading?(
					<ActivityIndicator size='small'/>
				) : (
					<TouchableOpacity style={{alignItems:'center'}} activeOpacity={.5} onPress={e=>confirm(props.challenge.id)}>
						<Image resizeMode='contain'
	                        style ={{width: 213, height: 35}}
	                        source={require("../../assets/images/icons/confirm.png")}/>
					</TouchableOpacity>
				)}
			</View>
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
			<View style={styles.card}>
				<Text style={styles.resultText}>Result: {resultMsg}</Text>
				<Text style={styles.opp}>Opponent: {props.challenge.challengerId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text style={styles.time}>Challenge Time: {time}</Text>
				{isConfirmLoading?(
					<ActivityIndicator size='small'/>
				) : (
					<TouchableOpacity style={{alignItems:'center'}} activeOpacity={.5} onPress={e=>confirm(props.challenge.id)}>
						<Image resizeMode='contain'
	                        style ={{width: 213, height: 35}}
	                        source={require("../../assets/images/icons/confirm.png")}/>
					</TouchableOpacity>
				)}
			</View>
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
			<View style={styles.card}>
				<Text style={styles.resultText}>Result: {resultMsg}</Text>
				<Text style={styles.opp}>Opponent: {props.challenge.challengeeId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text style={styles.time}>Challenge Time: {time}</Text>
			</View>
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
			<View style={styles.card}>
				<Text style={styles.resultText}>Result: {resultMsg}</Text>
				<Text style={styles.opp}>Opponent: {props.challenge.challengerId}</Text>
				<Text style={styles.bid}>Bid: {props.challenge.bid}</Text>
				<Text style={styles.diff}>Difficulty: {diffLvl}</Text>
				<Text style={styles.time}>Challenge Time: {time}</Text>
			</View>
		);
	}

	return null;
};

const styles = StyleSheet.create({
	card:{
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderBottomColor:'#DAA520',
		borderTopColor:'#DAA520',
		backgroundColor: '#00000088',
		borderWidth: 0.5,
		padding: 20,
	},
	wait:{
		textAlign: 'center',
		width:'100%',
		color: '#D97D54',
		fontSize: 16,
		fontFamily: 'trajan-pro-bold'
	},
	opp:{
		color:'#868686',
		fontFamily: 'trajan-pro'
	},
	bid:{
		color:'#868686',
		fontFamily: 'trajan-pro'
	},
	diff:{
		color:'#868686',
		fontFamily: 'trajan-pro'
	},
	time:{
		color:'#868686',
		fontFamily: 'trajan-pro'
	},
	challenged:{
		textAlign: 'center',
		width:'100%',
		color: '#D97D54',
		fontSize: 16,
		fontFamily: 'trajan-pro-bold'
	},
	resultText:{
		textAlign: 'center',
		width:'100%',
		color: '#D97D54',
		fontSize: 16,
		fontFamily: 'trajan-pro-bold'
	}
});

export default ChallengeCard;