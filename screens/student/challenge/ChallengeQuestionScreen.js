import React, {useEffect, useState} from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Button
} from 'react-native';

const ChallengeQuestionScreen = props => {

	return(
		<View>
			<Button 
				title='correct'
				onPress={()=>{
					props.navigation.navigate('ChallengeResult');
				}}
			/>
			<Button
				title='wrong'
				onPress={()=>{
					props.navigation.navigate('ChallengeResult');
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	
});

export default ChallengeQuestionScreen;