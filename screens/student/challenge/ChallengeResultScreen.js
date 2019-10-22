import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button
} from 'react-native';

const ChallengeResultScreen = props => {
	const params=props.navigation.state.params;
	return(
		<View>
			<Text>Final score: {params.score} / {params.challenge.diffLvl*5}</Text>
			<Button 
				title='ok'
				onPress={()=>{
					props.navigation.navigate('ChallengeList');
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	
});

export default ChallengeResultScreen;