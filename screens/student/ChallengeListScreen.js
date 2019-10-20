import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button
} from 'react-native';

const ChallengeListScreen = props => {

	return(
		<View>
			<Button 
				title='create new challenge' 
				onPress={()=>{
					props.navigation.navigate('ChallengeCreation');
				}}
			/>			
		</View>
	);
};

const styles = StyleSheet.create({
	
});

export default ChallengeListScreen;