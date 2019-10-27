import React from 'react';
import {
	ScrollView,
	View,
	KeyboardAvoidingView,
	Text,
	StyleSheet,
<<<<<<< Updated upstream
	Button
=======
	ImageBackground,
	Button,
	ActivityIndicator,
	Image,
	Alert,
	AsyncStorage
>>>>>>> Stashed changes
} from 'react-native';

import Input from '../../components/UI/Input';

const LoginScreen = props => {

	return(
<<<<<<< Updated upstream
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
=======
		<ImageBackground source={require('../../assets/images/backgrounds/login.jpg')} style={{width: '100%', height: '100%'}}>
			<KeyboardAvoidingView
			behavior='padding'
			keyboardVerticalOffset={50}
			style={styles.screen}
			>
				<Image 
					source={require('../../assets/images/login/title.png')}
					style={styles.loginImage}
				/>
				<Card style={styles.authContainer}>
					<ScrollView>
						<Input 
							label='Email'
							id='email'
							onInputChange={inputChangeHandler}
						/>
						<Input 
							label='Password'
							id='password'
							onInputChange={inputChangeHandler}
							secureTextEntry={true}
						/>
						<View style={styles.buttonContainer}>
						{//show signup/login loading
						isLoading ? (
							<ActivityIndicator size="small" />
						) : (
							<Button
								title={isSignup ? 'Sign Up' : 'Login'}
								onPress={authHandler}
							/>
						)}
						</View>
						<View style={styles.buttonContainer}>
							<Button 
								title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
								onPress={() => {
								setIsSignup(prevState => !prevState);
								}}
							/>						
						</View>				
					</ScrollView>
				</Card>
			</KeyboardAvoidingView>
		</ImageBackground>
>>>>>>> Stashed changes
	);
};

const styles = StyleSheet.create({
<<<<<<< Updated upstream
	
=======
	loginImage: {
		width: '90%',
		marginBottom: 20,
		resizeMode: 'contain'
	},
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	authContainer: {
		width: '80%',
		maxWidth: 400,
		maxHeight: 400,
		padding: 20,
		backgroundColor:'#ffffff66'
	},
	buttonContainer: {
		marginTop: 10
	},
>>>>>>> Stashed changes
});

export default LoginScreen;