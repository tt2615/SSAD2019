import React, { useEffect,useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	ImageBackground,
	Button,
	FlatList
} from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import * as worldsActions from '../../../store/actions/worldsActions';
import * as mapActions from '../../../store/actions/mapActions';
import * as userActions from '../../../store/actions/userActions';
import Carousel from 'react-native-snap-carousel';

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
		<SafeAreaView>
			<ImageBackground source={require('../../../assets/images/backgrounds/worldselection.jpg')} style={styles.mainContainer}>
				<View style={{ flex: 0.5}}></View>
				<View style={{flex: 2, width: '100%', alignItems: 'center'}}>
                    <ImageBackground source={require('../../../assets/images/icons/window.png')} style={styles.window}>  
                        <View>
                            <Text style = {styles.username}>
                                LEADERBOARD
                            </Text>
                        </View>
                    </ImageBackground>
                </View>
				<View style={{ flex: 0.5}}></View>
				<View style={{flex: 5, width: '100%', alignItems: 'center'}}>
					<FlatList
						data={worlds}
						keyExtractor={item=>item.wid.toString()}
						renderItem={({item,index})=>{
							return(
								<View>
									{item.map(res=>{
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
							);
						}}
					/>
					<View>
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
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#131420',
		alignItems: 'center',
		justifyContent: 'center',
	},

	mainContainer:{
        width:'100%',
        height:'100%',
	},
	
	mapSelection:{
		fontSize: 50
	},
	window:{
        width: 306,
        height: 131,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
	},
	username: {
        width: '100%',
        textTransform: 'uppercase',
        textAlign:'center',
		fontSize: 20,
		color: '#DAA520',
        fontFamily: 'trajan-pro',
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

