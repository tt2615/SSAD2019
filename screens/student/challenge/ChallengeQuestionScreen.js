/**
 * @method
 * @desc create a screen for user to answer the challenge questions, 
 * score will be displayed and time left to answer the question will be displayed.
 *  
 * @returns screen to see the answer challenge questions.
 * @authors ziqing & wei min
 */
import React,{useState,useEffect} from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	FlatList,
	Button
} from 'react-native';
import useInterval from '../../../components/UI/intervalHook';
import * as userActions from '../../../store/actions/userActions';
import * as challengeQuesActions from '../../../store/actions/challengeQuesActions';
import { useDispatch, useSelector } from 'react-redux';


const ChallengeQuestionScreen = props => {
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
	const [seconds, setSeconds]=useState(30);
		//styles for question options
	const [correctStyle, setCorrectStyle]=useState(
		{
			flex:1,
			backgroundColor: 'green',
			fontSize: 15,
			paddingTop:5,
			borderWidth:10,
			borderColor:'#DAA520',
			textAlign: 'center',
			width: 'auto',
			color: '#DAA520',
			justifyContent:'center'
		}
	);

	const defaultStyle={
		flex:1,
		backgroundColor: '#000',
		borderWidth:2,
		borderColor:'#DAA520',
		fontSize: 15,
		paddingTop:5,
		paddingBottom:5,
		marginVertical: 5,
		textAlign: 'center',
		width: 'auto',
		color: '#DAA520',
		justifyContent:'center'
	}

	//functions
	const checkAnswer = (e,res) =>{
		if (res===curQuestion.options[curQuestion.correctOption-1]){
			getNextQues(0,true);
		}
		else{
			getNextQues(0,false);
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
			setSeconds(30);
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
				getNextQues(0,false);
				setSeconds(30);
			}

	},1000);

	//render
	return(
		<SafeAreaView>
			<View style={styles.questionContainer}>
				<View style={{flex:0.5}}></View>
				<View style={{flex:1}}>
					<View style={{flexDirection: 'row',paddingBottom: 5, paddingTop: 0}}>
						<View  style={{ flex: 1,  alignItems: 'center'}}>
							<Text style={{ fontSize: 20, color: '#DAA520',fontFamily: 'trajan-pro'}}>
								Time Left
							</Text>
							<Text style={{ fontSize: 20, color: '#DAA520',fontFamily: 'trajan-pro'}}>
								{seconds}
							</Text>
						</View>
						<View  style={{ flex: 1,  alignItems: 'center'}}>
							<Text style={{ fontSize: 20 , color: '#DAA520',fontFamily: 'trajan-pro' }}>
								Score 
							</Text>
							<Text style={{ fontSize: 20 , color: '#DAA520',fontFamily: 'trajan-pro' }}>
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
			</View>
			<View style={{flex:1}}></View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	questionContainer:{
		width:'100%',
		height:'100%',
		backgroundColor:'#000000',
	},
	questionHeader:{
		flex:3,
		justifyContent:'center',
		alignItems:'center',
		borderWidth:5,
		borderColor:'#DAA520',
		backgroundColor: '#000000',
		width: 'auto',
		paddingTop: 20,
		paddingBottom: 20,
		paddingHorizontal: 10,
	},
	questionBody:{
		flex:5,
		backgroundColor: '#000',
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

export default ChallengeQuestionScreen;