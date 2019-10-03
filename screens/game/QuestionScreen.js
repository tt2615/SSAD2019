import React from 'react';
import {
	View,
	Text,
	Button,
	FlatList,
	StyleSheet
} from 'react-native';

const QuestionScreen = props =>{

	return (
		<View style={styles.screen}>
			<Text>Question Text</Text>
			<Button 
				title='Option 1'
				onPress={()=>{}}
			/>
			<Button 
				title='Option 2'
				onPress={()=>{}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	
});

export default QuestionScreen;