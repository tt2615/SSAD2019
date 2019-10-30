import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
	ScrollView,
	View,
	KeyboardAvoidingView,
	StyleSheet,
	ImageBackground,
	Button,
	ActivityIndicator,
	Image,
	Alert,
	AsyncStorage
} from 'react-native';
import { useDispatch } from 'react-redux';
import 'react-native-console-time-polyfill';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import * as authActions from '../../store/actions/authActions';

const LOGIN_INPUT_UPDATE = 'LOGIN_INPUT_UPDATE';

//manage local states
const formReducer = (state, action) => {
  if (action.type === LOGIN_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const LoginScreen = props => {
	console.time('1');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [isSignup, setIsSignup] = useState(false);

	const dispatch = useDispatch();

	//initialise local formState
	const [formState, dispatchFormState] = useReducer(formReducer, {
	  inputValues: {
	    email: '',
	    password: ''
	  },
	  inputValidities: {
	    email: false,
	    password: false
	  },
	  formIsValid: false
	});

	//whenever input changes, update local state
	const inputChangeHandler = useCallback(
	   (inputIdentifier, inputValue, inputValidity) => {
	     dispatchFormState({
	       type: LOGIN_INPUT_UPDATE,
	       value: inputValue,
	       isValid: inputValidity,
	       input: inputIdentifier
	     });
	   },
	   [dispatchFormState]
	 );
	   
	// handle signup/login request
	const authHandler = async () => {
		let action;
		if (isSignup&&formState.formIsValid){
			action = authActions.signup(
				formState.inputValues.email.toLowerCase(),
				formState.inputValues.password
			);
		} else if(!isSignup&&formState.formIsValid) {
			action = authActions.login(
				formState.inputValues.email.toLowerCase(),
				formState.inputValues.password
			);
		} else{
			return Alert.alert('Invalid Input', 'Please check your inputs', [{ text: 'Okay' }]);
		}
		//dispatch login/signup action
		setError(null);
		setIsLoading(true);
		try {
			await dispatch(action);
			const userData = await AsyncStorage.getItem('userData');
			const transformedData = JSON.parse(userData);
			const { userType } = transformedData; //destructData
			if(userType==='student'){
				props.navigation.navigate('Student');
			} else {
				props.navigation.navigate('Teacher');
			}
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
		}
	};

	//show authentication error
	useEffect(() => {
    	if (error) {
    		//todo: empty password field
      		Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    	}
	  }, [error]);
	
	console.timeEnd('1');
	//return main page
	return(
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
				<Image 
					source={require('../../assets/images/login/title2.png')}
					style={styles.loginImage2}
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
	);
};

const styles = StyleSheet.create({
	loginImage: {
		width: '90%',
		resizeMode: 'contain'
	},
	loginImage2: {
		width: '90%',
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
		backgroundColor:'#00000066'
	},
	buttonContainer: {
		marginTop: 10
	},
});

export default LoginScreen;