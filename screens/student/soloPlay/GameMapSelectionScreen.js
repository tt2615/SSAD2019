import React, { useEffect,useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button
} from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import * as worldsActions from '../../../store/actions/worldsActions';
import * as mapActions from '../../../store/actions/mapActions';
import * as userActions from '../../../store/actions/userActions';

const GameMapSelectionScreen = props => {
	// const [fresh,setFresh]=useState(props.navigation.state.params.back);
	// console.log(fresh);
	const dispatch=useDispatch();
	const worlds = useSelector(state=>state.worlds);
	const userInfo=useSelector(state=>state.user);
	// const reloadWorlds=()=>{
	// };

	// useEffect(()=>{

	// const refresh= props.navigation.addListener(
	// 	'willFocus',
	// 	reloadWorlds
	// );

	// return (()=>{
	// 	refresh.remove();
	// 	})
	// },[reloadWorlds]);

	return(
		<View style={styles.mainContainer}>
			<Text style={styles.mapSelection}>Map Selection</Text>
			<View style={styles.mapContainer}>
				<Button title='Return' onPress={async ()=>{
					await dispatch(userActions.getUser(userInfo.userEmail));
					props.navigation.navigate(
						'StudentMain',
						{ uid: userInfo.userId }
					);
				}}></Button>
				{worlds.map(res=>{
					if (res.available===true)
						return (
						<Text key={res.wid} 
							onPress={async ()=>{
								await dispatch(mapActions.getSections(userInfo.userId,res.wid));
								props.navigation.navigate(
									'GameMap',
									{wid: res.wid}
								);
							}}
							style={styles.mapBlock}>
							{res.name}
							<Text>
								Score: {res.score}
							</Text>
						</Text>);
					else return (
						<Text key={res.wid}
							onPress={e=>alert('Not unlocked!')}
							style={styles.mapBlockLocked}>
							{res.name}
							<Text>
								Score: {res.score}
							</Text>
						</Text>);
					}
					)
					}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		marginTop:50,
		marginHorizontal:20
	},

	mapSelection:{
		fontSize: 50
	},

	mapContainer:{
		flex:1,
		flexDirection:'row',
		flexWrap:'wrap',
		marginVertical: 30
	},

	mapBlock:{
		width:150,
		height:150,
		margin:10,
		backgroundColor:'red'
	},

	mapBlockLocked:{
		width:150,
		height:150,
		margin:10,
		backgroundColor:'green'
	}
});

export default GameMapSelectionScreen;

