import React,{useState,useEffect} from 'react';
import {
	View,
	Text,
	Button,
	StyleSheet
} from 'react-native';
import useInterval from '../../../components/UI/intervalHook.js';
import { StackGestureContext } from 'react-navigation-stack';
const GameQuestionScreen = props => {
	const params=props.navigation.state.params;
	// fake question base
	const [questionBase, setQuestionBase]=useState([
		[
			{
				qid:1,
				difficulty:1,
				question: 'This is a test easy1-1',
				options: ['This is A','This is B', 'This is C','This is D'],
				answerIndex: 1
			},
			{
				qid:2,
				difficulty:1,
				question: 'This is test easy1-2',
				options: ['This is A','This is B', 'This is C','This is D'],
				answerIndex: 1
			},
			{
				qid:3,
				difficulty:1,
				question: 'This is test easy1-3',
				options: ['This is A','This is B', 'This is C','This is D'],
				answerIndex: 1
			},
			{
				qid:4,
				difficulty:1,
				question: 'This is test easy1-4',
				options: ['This is A','This is B', 'This is C','This is D'],
				answerIndex: 1
			},
			{
				qid:5,
				difficulty:1,
				question: 'This is test easy1-5',
				options: ['This is A','This is B', 'This is C','This is D'],
				answerIndex: 1
			}
		],
		[
			{
				qid:6,
				difficulty:2,
				question: 'This is a test easy2-1',
				options: ['This is A','This is B', 'This is C','This is D'],
				answerIndex: 1
			},
			{
				qid:7,
				difficulty:2,
				question: 'This is a test easy2-2',
				options: ['This is A','This is B', 'This is C','This is D'],
				answerIndex: 1
			},
			{
				qid:8,
				difficulty:2,
				question: 'This is a test easy2-3',
				options: ['This is A','This is B', 'This is C','This is D'],
				answerIndex: 1
			},
			{
				qid:9,
				difficulty:2,
				question: 'This is a test easy2-4',
				options: ['This is A','This is B', 'This is C','This is D'],
				answerIndex: 1
			}
		],
		[
			{
				qid:10,
				difficulty:3,
				question: 'This is a test diff1',
				options: ['This is A','This is B', 'This is C','This is D'],
				answerIndex: 1
			},
			{
				qid:11,
				difficulty:3,
				question: 'This is test diff2',
				options: ['This is A','This is B', 'This is C','This is D'],
				answerIndex: 1
			},
			{
				qid:12,
				difficulty:3,
				question: 'This is test diff3',
				options: ['This is A','This is B', 'This is C','This is D'],
				answerIndex: 1
			}
		]
		
	]);
	//current question states
		//cursors to the next question retrieved and curScore
	const [controls,setControls]=useState(
		{
			score: 0,
			diff:1,
			internalIndex: 0,
			count:1,
			visited:[]
		}
	);
		//location of current question
	const curQuestionBase=questionBase[controls.diff-1];
	const curQuestion=curQuestionBase[controls.internalIndex];
		//visited flag and total count
	const [visited,setVisited]=useState([]);
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
		const newScore=curQuestion.difficulty;
		//tbc
		setCorrectStyle({
			backgroundColor:'yellow'
		});
		setCorrectStyle(defaultStyle);
		//tbc
		if (res===curQuestion.options[curQuestion.answerIndex]){
			
			getNextQues(newScore, true);
		}
		else{

			getNextQues(newScore, false);
		}
	}

	const getNextQues=(diff,correct)=>{
		if (correct){
			if (diff===3) loadNextQues(0,true);
			else loadNextQues(1,true);
		}
		else{
			if (diff===1) loadNextQues(0,false);
			else loadNextQues(-1,false);
		}
	}

	const loadNextQues=(add, correct)=>{
		const tempDiff=controls.diff+add;
		const tempCount=controls.count+1;
		let tempVisited=controls.visited.slice();
		tempVisited.push(curQuestion.qid);
		let tempScore=controls.score;
		const tempIndex=checkVisited(tempDiff-1,tempVisited);
		if (correct===true)
			tempScore+=controls.diff;
		if (tempCount<6){
			setSeconds(5);
			setControls({
				score: tempScore,
				diff: tempDiff,
				internalIndex: tempIndex,
				count: tempCount,
				visited: tempVisited
			});
		}
		else {
			let pass=false;
			if (tempScore>6) pass=true;
			props.navigation.navigate('GameQuestionReport',
				{wid: params.wid,
				tid: params.tid, 
				score: tempScore,
				pass:pass
				}
			);
		}
	}

	const checkVisited=(target, visited)=>{
		const targetSeq=questionBase[target];
		for (var i=0; i<targetSeq.length;i++){
			if (visited.indexOf(targetSeq[i].qid)===-1){
				return i;
			}
		}
	}

	const chooseStyle=(id)=>{
		if (id===curQuestion.answerIndex){
			return correctStyle;
		}
		else return defaultStyle;
	}

	useInterval(()=>{
        if (seconds>0){
            setSeconds(seconds-1);
        }
        else {
			getNextQues(controls.diff,false);
			setSeconds(5);	
		}
	},1000);

	//render
	return(
		<View style={styles.questionContainer}>
			<Text style={styles.timer}>{seconds}</Text>
			<Text>Current score: {controls.score}</Text>
			<Text style={styles.questionHeader} numberOfLines={5}>{curQuestion.question}</Text>
			<View style={styles.questionBody}>
				{curQuestion.options.map(res=>(<Text key={curQuestion.options.indexOf(res)} onPress={e=> checkAnswer(e,res)} style={chooseStyle(curQuestion.options.indexOf(res))}>
				{res}</Text>))}
			</View>
		</View>
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