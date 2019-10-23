import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Button,
	ImageBackground
} from 'react-native';

const state=[{
		wid:1,
		name: "world 1",
		picurl: "",
		currentres: "1"
	},
	{
		wid:2,
		name:"world 2",
		picurl: "",
		curres: "2"
	},
	{
		wid:3,
		name:"world 2",
		picurl: "",
		curres: "2"
	},
	{
		wid:4,
		name:"world 2",
		picurl: "",
		curres: "2"
	},
	{
		wid:5,
		name:"world 2",
		picurl: "",
		curres: "2"
	},
	{
		wid:6,
		name:"world 2",
		picurl: "",
		curres: "2"
	}
];

const GameMapSelectionScreen = props => {
	return(
		<ImageBackground source={require('../../../assets/images/backgrounds/map_selection.png')} style={styles.background}>
			<View style={styles.mainContainer}>
				{/* <Text style={styles.mapSelection}>Map Selection</Text> */}
				<View style={styles.mapContainer}>
					{state.map(res=>(
						<Text key={res.wid}
							onPress={()=>{
								props.navigation.navigate(
									'GameMap',
									{wid: res.wid}
								)
							}}
							style={styles.mapBlock}>{res.name}</Text>
						
						))}
				</View>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background:{
		flex:1,
		width: null,
		height: null,
		justifyContent: 'center',
		alignItems: 'center',
	},
	mainContainer: {
		marginTop:50,
		marginHorizontal:20
	},

	mapContainer:{
		flex:1,
		flexDirection:'row',
		flexWrap:'wrap',
		marginVertical: 30
	},

	mapBlock:{
		width:85,
		height:29,
		margin:10,
		textTransform: 'uppercase',
		textAlign: 'center',
		backgroundColor:'#63707E'
	}
});

export default GameMapSelectionScreen;

