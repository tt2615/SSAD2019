import React, {useReducer, useCallback} from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	ImageBackground,
	KeyboardAvoidingView,
	TouchableOpacity,
	Image,
	Input
} from 'react-native';
import { useSelector } from 'react-redux';
const LOGIN_INPUT_UPDATE = 'LOGIN_INPUT_UPDATE';

// const formReducer = (state, action) => {

// 	if (action.type === LOGIN_INPUT_UPDATE) {
// 	  const updatedValues = {
// 		...state.inputValues,
// 		[action.input]: action.value
// 	  };
// 	  const updatedValidities = {
// 		...state.inputValidities,
// 		[action.input]: action.isValid
// 	  };
// 	  let updatedFormIsValid = true;
// 	  for (const key in updatedValidities) {
// 		updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
// 	  }
// 	  return {
// 		formIsValid: updatedFormIsValid,
// 		inputValidities: updatedValidities,
// 		inputValues: updatedValues
// 	  };
// 	}
// 	return state;
//   };

const SocialMediaScreen = props => {

	const fbInfo=useSelector(state=> state.fb);
	
// 	const [formState, dispatchFormState] = useReducer(formReducer, {
// 		inputValues: {
// 		  content: ''
// 		},
// 		inputValidities: {
// 		  content: true
// 		},
// 		formIsValid: true
//   });
	// const inputChangeHandler = useCallback(
	// 	(inputIdentifier, inputValue, inputValidity) => {
	// 		dispatchFormState({
	// 			type: LOGIN_INPUT_UPDATE,
	// 			value: inputValue,
	// 			isValid: inputValidity,
	// 			input: inputIdentifier
	// 		});
	// 	},
	// 	[dispatchFormState]
	// );

	return(
		<SafeAreaView>
			<ImageBackground source={require('../../assets/images/backgrounds/teacherbg.png')} style={styles.mainContainer}>
				<View style={styles.headerContainer}>
					<ImageBackground source={require('../../assets/images/icons/header.png')} style={styles.header}>  
						<View>
							<Text style = {styles.assignmentText}>
								POST ASSIGNMENT
							</Text>
						</View>
					</ImageBackground>
				</View>
				<View style={styles.fbInfoDisplayer}>
					<Text>Account: {fbInfo.email}</Text>
					<Text>Name: {fbInfo.name}</Text>
				</View>
				<View style={styles.postContent}>
					{/* <Input id='post content' 
					// onInputChangeHandler={inputChangeHandler}
					/> */}
				</View>
				<KeyboardAvoidingView
				behavior='padding'
				keyboardVerticalOffset={50}
				style={styles.screen}
				>
					<TouchableOpacity activeOpacity={.5}>
						<Image resizeMode='contain'
						style ={{width: 241, height: 41, marginTop: 20}}
						source={require("../../assets/images/icons/post.png")}/>
					</TouchableOpacity>

				</KeyboardAvoidingView>

			</ImageBackground>
		</SafeAreaView>

	);
};

const styles = StyleSheet.create({
	mainContainer: {
		width:'100%',
		height:'100%',
		alignItems:'center'
	},
	headerContainer: {
		marginTop:50,
        width: '100%',
		alignItems: 'center',
		textAlignVertical:'center',
	},
	header:{
		width: 316,
		height: 102,
		alignItems: 'center',
		textAlignVertical:'center'
	},
	assignmentText:{
		width: '100%',
        textTransform: 'uppercase',
		textAlign:'center',
		marginTop: 35,
        color: '#DAA520',
        fontSize: 20,
        fontFamily: 'trajan-pro',
	},

	
});

export default SocialMediaScreen;