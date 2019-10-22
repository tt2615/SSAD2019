import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button
} from 'react-native';

const ChallengeResultScreen = props => {

	return(
		<View>
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