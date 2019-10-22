  
import React,{useState,useEffect} from 'react';
import {
	View,
	Text,
	Button,
	StyleSheet
} from 'react-native';
import useInterval from '../../../components/UI/intervalHook.js';
import * as mapActions from '../../../store/actions/mapActions';
import * as worldsActions from '../../../store/actions/worldsActions';
import { useDispatch, useSelector } from 'react-redux';


const GameQuestionScreen = props => {
	const dispatch=useDispatch();
	const params=props.navigation.state.params;
	const questionBase=useSelector(state=>state.questions);
	//current question states
		//cursors to the next question retrieved and curScore
	const [controls,setControls]=useState(
		{
			score: 0,
			diffLvl:1,
			internalIndex: 0,
			count:1,
			visited:[]
		}
	);
		//location of current question
	const curQuestionBaseMatch=(diffLvl)=>{
		if (diffLvl===1) return questionBase.easy;
		else if (diffLvl===2) return questionBase.medium;
		else return questionBase.difficult;
	};

	const curQuestionBase=curQuestionBaseMatch(controls.diffLvl);
	const curQuestion=curQuestionBase[controls.internalIndex];
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
		const diff=curQuestion.diffLvl;
		if (res===curQuestion.options[curQuestion.correctOption-1]){
			getNextQues(diff,true);
		}
		else{

			getNextQues(diff,false);
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

	const loadNextQues=(diffChange,correct)=>{
		const tempDiff=controls.diffLvl+diffChange;
		const tempCount=controls.count+1;
		let tempVisited=controls.visited.slice();
		tempVisited.push(curQuestion.qid);
		let tempScore=controls.score;
		const tempIndex=checkVisited(curQuestionBaseMatch(tempDiff),tempVisited);
		if (correct===true)
			tempScore+=curQuestion.score;
		if (tempCount<6){
			setSeconds(5);
			setControls({
				score: tempScore,
				diffLvl: tempDiff,
				internalIndex: tempIndex,
				count: tempCount,
				visited: tempVisited
			});
		}
		else {
			let pass=false;
			if (tempScore>=6) {
				pass=true;
				if (tempScore>params.prevScore){
					dispatch(mapActions.updateSection(params.tid,tempScore));
					dispatch(worldsActions.updateWorlds(params.wid,tempScore-params.prevScore));
				}
			}
			props.navigation.navigate('GameResult',
				{wid: params.wid,
				tid: params.tid, 
				score: tempScore,
				pass:pass
				}
			);
		}
	}

	const checkVisited=(target, visited)=>{
		for (var i=0; i<target.length;i++){
			if (visited.indexOf(target[i].qid)===-1){
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
			<Text style={styles.questionHeader} numberOfLines={5}>{curQuestion.questionText}</Text>
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