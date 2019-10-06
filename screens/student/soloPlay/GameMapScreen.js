import React from 'react';
import bgDic from '../../../assets/images/backgrounds/bgDic.js';
import {
	View,
	Text,
	StyleSheet,
	ImageBackground
} from 'react-native';
import {useEffect,useState} from 'react';


const GameMapScreen = props => {
	const [worldInfo, setworldInfo]=useState(
		{
			wid: 2
		}
	);
	// useEffect(()=>{
	// 	setworldInfo(props.navigation.state.params.wid);
	// },[]);


	return(
		<ImageBackground source={bgDic(worldInfo.wid)}style={styles.imageBackground}>
			<Text>WID: {worldInfo.wid}</Text>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	imageBackground:{
		width: '100%',
		height: '100%'
	}
});

export default GameMapScreen;