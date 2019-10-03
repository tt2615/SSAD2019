import React from 'react';
import { 
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
	Button
} from 'react-native';
import { useDispatch } from 'react-redux';

import loginImage from '../../assets/images/login/title.png';
import * as accountActions from '../../store/actions/accountActions';
import Credential from '../../models/credential';

//todo: validate user Input
//todo: authenticate on server
//todo: update 

const LoginScreen = props =>{

	const dispatch = useDispatch();

	return (
		<View style={styles.screen}>
			<Image 
				source={loginImage}
				style={styles.loginImage}
			/>
			<Text>
				User Name:
			</Text>
			<TextInput 
				style={styles.textBox}
			/>
			<Text>Password:</Text>
			<TextInput 
				style={styles.textBox}
			/>
			<Button style={styles.loginBtn}
				title='Login'
				onPress={()=>{
					dispatch(accountActions.logIn(new Credential('ziqing',123456)));
					props.navigation.navigate({
						routeName: 'GameMap'
					})
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 10
	},
	loginImage: {
		width: '100%',
		resizeMode: 'contain'
	},
	textBox: {
		width: '70%',
		borderColor: 'black',
		borderWidth: 1
	},
	loginBtn: {
		marginTop: 20
	}
});

export default LoginScreen;