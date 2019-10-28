  
import React,{useState,useEffect} from 'react';
import {
	View,
	Text,
	Button,
	StyleSheet,
	ScrollView,
	SafeAreaView
} from 'react-native';
import useInterval from '../../../components/UI/intervalHook.js';
import * as mapActions from '../../../store/actions/mapActions';
import * as worldsActions from '../../../store/actions/worldsActions';
import * as userActions from '../../../store/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';


const GameQuestionScreen = props => {
	const dispatch=useDispatch();
	const params=props.navigation.state.params;
	const questionBase=useSelector(state=>state.questions);
	const userInfo=useSelector(state=>state.user);
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

	const initControls={
		score: 0,
		diffLvl:1,
		internalIndex: 0,
		count:99999999999,
		visited:[]
	};
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
			fontSize: 20,
			paddingTop:5,
			textAlign: 'center',
			width: 'auto'
		}
	);

	const defaultStyle={
		backgroundColor: '#76de9155',
		fontSize: 20,
		paddingTop:5,
		paddingBottom:5,
		marginVertical: 5,
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
		else if (tempCount===6){
			let pass=false;
			if (tempScore>=6) {
				pass=true;
				if (tempScore>params.prevScore){
					updateScore(tempScore);
					setControls(initControls);
				}
			}
			props.navigation.navigate('GameResult',
				{wid: params.wid,
				sid: params.sid, 
				score: tempScore,
				pass:pass
				}
			);
		}
	}
	
	const updateScore=async (score)=>{
		console.log('updateScore');
		await dispatch(mapActions.updateSection(userInfo.userId,params.wid,params.sid,score));
		await dispatch(worldsActions.updateWorlds(userInfo.userId,params.wid,score-params.prevScore));
		await dispatch(userActions.updateStudent(userInfo.userId,userInfo.userEmail,userInfo.userType,userInfo.userName,userInfo.character,userInfo.totalScore));
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
		<SafeAreaView>
			<ScrollView style={styles.questionContainer}>
				<View style={{flex:1}}>
					<View style={{flexDirection: 'row',paddingBottom: 5, paddingTop: 5}}>
						<View  style={{ flex: 1,  alignItems: 'center' }}>
							<Text style={{ fontSize: 15, color: '#DAA520',fontFamily: 'trajan-pro'}}>
								Time Left
							</Text>
							<Text style={{ fontSize: 15, color: '#DAA520',fontFamily: 'trajan-pro'}}>
								{seconds}
							</Text>
						</View>
						<View  style={{ flex: 1,  alignItems: 'center'}}>
							<Text style={{ fontSize: 15 , color: '#DAA520',fontFamily: 'trajan-pro' }}>
								Score 
							</Text>
							<Text style={{ fontSize: 15 , color: '#DAA520',fontFamily: 'trajan-pro' }}>
								{controls.score}
							</Text>
						</View>
					</View> 
				</View>
				<View style={styles.questionHeader}>
					<Text style={{color: '#DAA520',textAlign:'left',fontSize: 20}}>{curQuestion.questionText}</Text>
				</View>
				<View style={styles.questionBody}>
					{curQuestion.options.map(res=>(<Text key={curQuestion.options.indexOf(res)} onPress={e=> checkAnswer(e,res)} style={chooseStyle(curQuestion.options.indexOf(res))}>
					{res}</Text>))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	questionContainer:{
		paddingTop: 20,
		paddingHorizontal: 20,
	},
	questionHeader:{
		flex:3,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor: '#000000',
		width: 'auto',
		paddingTop: 30,
		paddingBottom: 30,
		paddingHorizontal: 8
	},
	questionBody:{
		flex:5,
		backgroundColor: '#ffffff',
		paddingHorizontal: 10,
		height: 'auto'
	},
	questionOptions:{
		backgroundColor: '#76de9155',
		fontSize: 20,
		paddingTop:5,
		marginVertical: 5,
		textAlign: 'center',
		width: 'auto'
	},
	timer:{}

});

export default GameQuestionScreen;