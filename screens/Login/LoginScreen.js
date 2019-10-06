import React from 'react';
import {
	ScrollView,
	View,
	KeyboardAvoidingView,
	Text,
	StyleSheet,
	Button
} from 'react-native';

import Input from '../../components/UI/Input';

const LoginScreen = props => {

	return(
		<View style={styles.screen}>
			<Text>Login Screen</Text>
			<Button 
				title='Login'
				onPress={()=>{
					props.navigation.navigate({
						routeName: 'GameMap'
					})
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	
});

export default LoginScreen;