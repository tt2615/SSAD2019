import React,{useState,useEffect} from 'react';
import bgDic from '../../../assets/images/backgrounds/bgDic.js';
import {
	View,
	Text,
	StyleSheet,
	ImageBackground
} from 'react-native';
import StageButton from '../../../components/UI/stageButton.js';

const GameMapScreen = props => {
	const [worldInfo, setworldInfo]=useState(null);
	const [stageInfo, setStageInfo]=useState([
		{
			x: 10,
			y:20,
			topic:1,
			score: 100
		},
		{
			x:300,
			y:400,
			topic:2,
			score:200
		}
		]
	);

	// useEffect(()=>{
	// 	const navInfo=props.navigation.state.params;
	// 	console.log(navInfo);
		// if (!(navInfo.tid===undefined)) {
		// 	const tempTargetTopic={
		// 		tid: navInfo.tid,
		// 		score: navInfo.score
		// 	};
		// 	changeTargetTopic(tempTargetTopic);
		// };
		// setworldInfo(navInfo.wid);
	// },[]);

	const updateStates =()=>{
		const navInfo=props.navigation.state.params;
		if (!(navInfo.tid===undefined)) {
			const tempTargetTopic={
				tid: navInfo.tid,
				score: navInfo.score
			};
			changeTargetTopic(tempTargetTopic);
		};
		setworldInfo(navInfo.wid);
	};

	useEffect(()=>{

		const refresh= props.navigation.addListener(
			'didFocus',
			updateStates
		);

		return (()=>{
			refresh.remove();
		})
	},[updateStates]);

	useEffect(()=>{
		setworldInfo(props.navigation.state.params.wid);
	},[]);

	const changeTargetTopic=(tempTargetTopic)=>{
		let tempStages=stageInfo.slice();
		for (let i=0; i<tempStages.length;i++){
			if (tempStages[i].topic===tempTargetTopic.tid){
				tempStages[i].score=tempTargetTopic.score;
				break;
			}
		}
		console.log(tempStages);
		setStageInfo(tempStages);
	};

	return(
		<View>
			{worldInfo===null?(<Text style={styles.loadingView}>Loading...</Text>):
			(<ImageBackground source={bgDic(worldInfo)}style={styles.imageBackground}>
						{stageInfo.map(res=><StageButton key={res.topic} tid={res.topic} wid={worldInfo} score={res.score} position={{x:res.x,y:res.y}} targetNav={props.navigation}/>)}
					</ImageBackground>)}
		</View>
	);
};

const styles = StyleSheet.create({
	imageBackground:{
		width: '100%',
		height: '100%',
		position: 'relative'
	},
	loadingView:{
		marginHorizontal:'auto',
		marginVertical: 200
	}
});

export default GameMapScreen;