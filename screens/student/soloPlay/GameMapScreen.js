import React,{useState,useEffect, useCallback} from 'react';
import bgDic from '../../../assets/images/backgrounds/bgDic.js';
import {
	View,
	Text,
	StyleSheet,
	Button,
	Image,
	ImageBackground,
	SafeAreaView,
	Platform
} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import StageButton from '../../../components/UI/stageButton.js';
import * as mapActions from '../../../store/actions/mapActions';
import * as userActions from '../../../store/actions/userActions';
import * as worldsActions from '../../../store/actions/worldsActions';
import charPic from '../../../assets/images/characters/charPic';
import CharImage from '../../../components/UI/CharImage';

const GameMapScreen = props => {
	const dispatch=useDispatch();
	const sectionInfo=useSelector(state=>state.map);
	const userInfo=useSelector(state=>state.user);
	const findCharPos=()=> {
		let curSection=0;
		if (sectionInfo!==null){
			for (let i=0; i<sectionInfo.length; i++){
				if (sectionInfo[i].available===false) {
					curSection=i-1;
					break;
				}
				if (i===2&&sectionInfo[i].available===true) curSection=i;
			}
		}
		return curSection;
	}
	
	const [worldInfo, setworldInfo]=useState(props.navigation.state.params.wid);
	const pastPosition=props.navigation.state.params.pastPosition===undefined?findCharPos():props.navigation.state.params.pastPosition;
	const curPosition=findCharPos();
	const [sectionPosition, setSectionPosition]=useState(
		Platform.OS === 'android'? [
		{
			x:50,
			y:60
		},
		{
			x:105,
			y:220
		},
		{
			x:160,
			y:410
		}
		]:
		[{
			x:70,
			y:110
		},
		{
			x:130,
			y:320
		},
		{
			x:210,
			y:560
		}]
	);

	return(
		<SafeAreaView>
				<ImageBackground source={bgDic(worldInfo)} style={styles.imageBackground}>
					<CharImage source={charPic(userInfo.character)} 
								startPos={{x: sectionPosition[pastPosition].x, y: sectionPosition[pastPosition].y}}
								endPos={{x: sectionPosition[curPosition].x, y: sectionPosition[curPosition].y}}
								/>
					<Text style={styles.returnButton} 
						onPress={async ()=>{
							await dispatch(worldsActions.getWorlds(userInfo.userId));
							props.navigation.navigate('GameMapSelection',{wid:worldInfo})}
							}></Text>
							
							{sectionInfo.map(res=>
							<StageButton key={res.sid} 
										tid={res.sid} 
										name={res.name}
										wid={worldInfo} 
										score={res.score} 
										available={res.available}
										curPosition={curPosition}
										position={{x:sectionPosition[res.sid-1].x,y:sectionPosition[res.sid-1].y}} 
										targetNav={props.navigation}/>)}
				</ImageBackground>
		</SafeAreaView>
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
		marginTop: 30,
		color: '#88888888'
	}
});

export default GameMapScreen;