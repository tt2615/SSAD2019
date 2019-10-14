import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button
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
		<View style={styles.mainContainer}>
			<Text style={styles.mapSelection}>Map Selection</Text>
			<Button 
				title='user profile' 
				onPress={()=>{
					props.navigation.navigate('StudentProfile');
				}}
			/>
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
	}
});

export default GameMapSelectionScreen;

