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
			topic:1
		},
		{
			x:300,
			y:400,
			topic:2
		}
		]
	);
	useEffect(()=>{
		setworldInfo(props.navigation.state.params.wid);
	},[]);
	return(
		<View>
			{worldInfo===null?(<Text style={styles.loadingView}>Loading...</Text>):
			(<ImageBackground source={bgDic(worldInfo)}style={styles.imageBackground}>
						{stageInfo.map(res=><StageButton key={res.topic} tid={res.topic} wid={worldInfo} position={{x:res.x,y:res.y}} targetNav={props.navigation}/>)}
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