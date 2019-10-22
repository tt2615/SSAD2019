  
import React,{useState,useEffect} from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	FlatList,
	Button
} from 'react-native';
import useInterval from '../../../components/UI/intervalHook';
import * as userActions from '../../../store/actions/userActions';
import * as challengeQuesActions from '../../../store/actions/challengeQuesActions';
import { useDispatch, useSelector } from 'react-redux';


const GameQuestionScreen = props => {
    const dispatch=useDispatch();
    const curChallenge=props.navigation.state.params.challenge;
    const userInfo=useSelector(state=>state.user);
    const questionBase=useSelector(state=>state.challengeQues);
	//current question states
		//cursors to the next question retrieved and curScore
	const [controls,setControls]=useState(
		{
			score: 0,
			internalIndex: 0,
			count:1
		}
	);

	const initControls={
		score: 0,
		internalIndex: 0,
		count:99999999999
	};
		//location of current question
	const curQuestion=questionBase[controls.internalIndex];
		//seconds
	const [seconds, setSeconds]=useState(5);
		//styles for question options
	const [correctStyle, setCorrectStyle]=useState(
		{
			backgroundColor: 'green',
			fontSize: 30,
			height:100,
			lineHeight: 100,
			marginVertical: 15,
			textAlign: 'center',
			width: 'auto'
		}
	);

	const defaultStyle={
		backgroundColor: 'green',
		fontSize: 30,
		height:100,
		lineHeight: 100,
		marginVertical: 15,
		textAlign: 'center',
		width: 'auto'
	}

	//functions
	const checkAnswer = (e,res) =>{
		if (res===curQuestion.options[curQuestion.correctOption-1]){
			getNextQues(diff,true);
		}
		else{

			getNextQues(diff,false);
		}
	}

	const getNextQues=(diff,correct)=>{
            loadNextQues(0,correct);
	}

	const loadNextQues=(diffChange,correct)=>{
		const tempCount=controls.count+1;
		let tempScore=controls.score;
        const tempIndex=controls.internalIndex+1;
		if (correct===true)
			tempScore+=curQuestion.score;
		if (tempCount<6){
			setSeconds(5);
			setControls({
				score: tempScore,
				internalIndex: tempIndex,
				count: tempCount
			});
		}
		else if (tempCount===6){
			setControls(initControls);
			props.navigation.navigate('ChallengeResult',
				{
                    challenge:curChallenge,
                    score: controls.score
				}
			);
		}
	}

	useInterval(()=>{
        if (seconds>0){
            setSeconds(seconds-1);
        }
        else {
				getNextQues(0,false);
				setSeconds(5);
			}

	},1000);

	//render
	return(
		<ScrollView style={styles.questionContainer}>
			<Text style={styles.timer}>{seconds}</Text>
			<Text>Current score: {controls.score}</Text>
			<Text style={styles.questionHeader} numberOfLines={5}>{curQuestion.questionText}</Text>
			<View style={styles.questionBody}>
				{curQuestion.options.map(res=>(<Text key={curQuestion.options.indexOf(res)} onPress={e=> checkAnswer(e,res)} style={chooseStyle(curQuestion.options.indexOf(res))}>
				{res}</Text>))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	questionContainer:{
		height:'100%',
		width: '100%',
		paddingTop: 50,
		paddingHorizontal: 20
	},
	questionHeader:{
		textAlign:'center',
		height:260,
		padding: 20,
		fontSize: 35,
		backgroundColor: 'blue',
		width: 'auto'
	},
	questionBody:{
		backgroundColor: 'red',
		paddingHorizontal: 10,
		height: 'auto'
	},
	questionOptions:{
		backgroundColor: 'green',
		fontSize: 30,
		height:100,
		lineHeight: 100,
		marginVertical: 15,
		textAlign: 'center',
		width: 'auto'
	},
	timer:{}

});

export default GameQuestionScreen;