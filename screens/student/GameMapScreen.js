import React from 'react';
import {
	View,
	Text,
	StyleSheet, 
	Button
} from 'react-native';

const GameMapScreen = props => {

	return(
		<View>
			<Text>GameMapScreen Screen</Text>
			{//todo: reduce the buttons with after merge
			}
			<Button 
				title='User Profile'
				onPress={()=>{
					props.navigation.navigate('StudentProfile');
				}}
			/>
			<Button 
				title='Challenge List'
				onPress={()=>{
					props.navigation.navigate('ChallengeList');
				}}
			/>
			<Button 
				title='LeaderBoard'
				onPress={()=>{
					props.navigation.navigate('LeaderBoard');
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	
});

export default GameMapScreen;