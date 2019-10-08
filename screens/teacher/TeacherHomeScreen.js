import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button
} from 'react-native';

const TeacherHomeScreen = props => {

	return(
		<View>
			<Text>Teacher Home Screen</Text>
			<Button 
				title='Teacher Profile'
				onPress = { () => {
					props.navigation.navigate('TeacherProfile');
					}
				}
			/>
			<Button 
				title='View Report'
				onPress = { () => {
					props.navigation.navigate('Report');
					}
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	
});

export default TeacherHomeScreen;