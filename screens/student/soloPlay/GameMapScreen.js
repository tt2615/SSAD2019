import React,{useState,useEffect} from 'react';
import bgDic from '../../../assets/images/backgrounds/bgDic.js';
import {
	View,
	Text,
	StyleSheet,
	Button,
	ImageBackground
} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import StageButton from '../../../components/UI/stageButton.js';
import * as mapActions from '../../../store/actions/mapActions';


const GameMapScreen = props => {
	const [worldInfo, setworldInfo]=useState(props.navigation.state.params.wid);
	const [stagePosition, setStagePosition]=useState([
		{
			x: 10,
			y:20
		},
		{
			x:300,
			y:400
		},
		{
			x:10,
			y:500
		}
		]
	);
	const dispatch=useDispatch();
	const stageInfo=useSelector(state=>state.map);

	// const updateStates =()=>{
	// 	const navInfo=props.navigation.state.params;
	// 	if (!(navInfo.tid===undefined)) {
	// 		const tempTargetTopic={
	// 			tid: navInfo.tid,
	// 			score: navInfo.score
	// 		};
	// 		changeTargetTopic(tempTargetTopic);
	// 	};
	// 	setworldInfo(navInfo.wid);
	// };

	// useEffect(()=>{

	// 	const refresh= props.navigation.addListener(
	// 		'didFocus',
	// 		updateStates
	// 	);

	// 	return (()=>{
	// 		refresh.remove();
	// 	})
	// },[updateStates]);
	return(
		<View>
			<ImageBackground source={bgDic(worldInfo)} style={styles.imageBackground}>
				<Text style={styles.returnButton} onPress={e=>{props.navigation.navigate('GameMapSelection'),{back:true}}}>Return</Text>
						{stageInfo.map(res=>
						<StageButton key={res.tid} 
									tid={res.tid} 
									name={res.name}
									wid={worldInfo} 
									score={res.score} 
									available={res.available}
									position={{x:stagePosition[res.tid-1].x,y:stagePosition[res.tid-1].y}} 
									targetNav={props.navigation}/>)}
			</ImageBackground>
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
	},
	returnButton: {
		marginTop: 30
	}
});

export default GameMapScreen;