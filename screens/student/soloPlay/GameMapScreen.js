import React,{useState,useEffect, useCallback} from 'react';
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
import * as userActions from '../../../store/actions/userActions';
import * as worldsActions from '../../../store/actions/worldsActions';


const GameMapScreen = props => {
	const [worldInfo, setworldInfo]=useState(props.navigation.state.params.wid);
	const [sectionPosition, setSectionPosition]=useState([
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
	const sectionInfo=useSelector(state=>state.map);
	const userInfo=useSelector(state=>state.user);
	// const userInfo=useSelector(state=>state.user);

	// const getSections =useCallback(async () => {
	// 	try {
	// 	  await dispatch(mapActions.getSections(userInfo.userId,worldInfo));
	// 	} catch (err) {
	// 	  setError(err.message);
	// 	}
	//   }, [dispatch]);

	// useEffect(()=>{

	// 	const refresh= props.navigation.addListener(
	// 		'willFocus',
	// 		getSections
	// 	);

	// 	return (()=>{
	// 		refresh.remove();
	// 	})
	// },[getSections]);

	return(
		<View>
			{sectionInfo.length===0?<Text>Loading...</Text>:
				<ImageBackground source={bgDic(worldInfo)} style={styles.imageBackground}>
					<Text style={styles.returnButton} 
						onPress={async ()=>{
							await dispatch(worldsActions.getWorlds(userInfo.userId));
							props.navigation.navigate('GameMapSelection',{wid:worldInfo})}
							}>Return</Text>
							
							{sectionInfo.map(res=>
							<StageButton key={res.sid} 
										tid={res.sid} 
										name={res.name}
										wid={worldInfo} 
										score={res.score} 
										available={res.available}
										position={{x:sectionPosition[res.sid-1].x,y:sectionPosition[res.sid-1].y}} 
										targetNav={props.navigation}/>)}
				</ImageBackground>
			}
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