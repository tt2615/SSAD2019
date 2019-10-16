import React,{useState,useEffect} from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

const GameMapSelectionScreen = props => {

	// useEffect(()=>{
	// 	mapOverViewAction.loadMaps(1);
	// });
	
	const [maps,setMaps]=useState([
        {
            mapid: 1,
            name: 'world1',
            totalScore: 100,
        },
        {
            mapid: 2,
            name: 'world2',
            totalScore: 100,
        },
        {
            mapid: 3,
            name: 'world3',
            totalScore: 100,
        },
    ]);

	return(
		<View style={styles.mainContainer}>
			<Text style={styles.mapSelection}>Map Selection</Text>
			<View style={styles.mapContainer}>
				{maps.map(res=>(
					<Text key={res.mapid} 
						onPress={()=>{
							props.navigation.navigate(
								'GameMap',
								{wid: res.mapid}
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

