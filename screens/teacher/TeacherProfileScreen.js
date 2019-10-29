import React, { useReducer, useState, useEffect, useCallback } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Button,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
	ImageBackground,
	KeyboardAvoidingView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Facebook from 'expo-facebook';

import * as authActions from '../../store/actions/authActions';
import * as userActions from '../../store/actions/userActions';
import * as questionActions from '../../store/actions/questionActions';
import Input from '../../components/UI/Input';
import { SafeAreaView } from 'react-navigation';

const fbId = '445535162733845';
const LOGIN_INPUT_UPDATE = 'LOGIN_INPUT_UPDATE';

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

const TeacherProfileScreen = props => {
	const userInfo = useSelector(state => state.user);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [isEditing, setIsEditing] = useState(false);

	const dispatch = useDispatch();
	const userId = useSelector(state => state.auth.userId);

	//initialise local formState
	const [formState, dispatchFormState] = useReducer(formReducer, {
	  	inputValues: {
	    	username: userInfo.userName
	  	},
	  	inputValidities: {
	    	username: true
	  	},
	  	formIsValid: true
	});

	//input change: update local reducer
	const inputChangeHandler = useCallback(
	   (inputIdentifier, inputValue, inputValidity) => {
	   		console.log('entering input change handler');
	    	dispatchFormState({
		       type: LOGIN_INPUT_UPDATE,
		       value: inputValue,
		       isValid: inputValidity,
		       input: inputIdentifier
	     	});
	   },
	   [dispatchFormState]
	);

	//submit local reducer to database and global reducer
	const nameChangeSubmitHandler = async () => {
		console.log('entering name change submit handler');
		if( isEditing ){
			if(!formState.formIsValid) {
				Alert.alert('Wrong input!', 'Please check the input value.', [
				  { text: 'Okay' }
				]);
				return;
			}
			setError(null);
			setIsLoading(true);
			try{
				await dispatch(
					userActions.updateTeacher(
						userInfo.userId,
						userInfo.userEmail,
						'teacher',
						formState.inputValues.username,
						'',
						'',
						'', 
						''
					)
				);
			} catch(err) {
				setError(err.message);
			}
			setIsLoading(false);
		}
		setIsEditing(!isEditing);
	};

	const fbLogin = async () => {
		const { type, token } = await Facebook.logInWithReadPermissionsAsync(fbId, {
		    	permissions: ['public_profile', 'email', 'user_friends'],
		    });
			console.log(type);
			console.log('token: '+ token);

		    if (type === 'success') {
		    	console.log('entered');
		    	const response = await fetch(
		    	`https://graph.facebook.com/me?fields=id,name,email,about,picture&access_token=${token}`);
		    	const userInfo = await response.json();
		    	console.log(JSON.stringify(userInfo));

	   			//  const test = await fetch(
				// 	`https://graph.facebook.com/${userId.id}/permissions`,
				// 	{
				// 		method : 'DELETE',
				// 		body: token
				// 	}
				// );
	      	    // console.log(JSON.stringify(await test.json()));
		    } else {
		      	setError(type);
		    }
	};


	//show error
	useEffect(() => {
    	if (error) {
      		Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    	}
  	}, [error]);

	return(
		<SafeAreaView>
			<ImageBackground source={require('../../assets/images/backgrounds/teacherbg.png')} style={styles.screen}>
				<ScrollView>
					<View style={styles.headerContainer}>
						<ImageBackground source={require('../../assets/images/icons/header.png')} style={styles.header}>  
							<View>
								<Text style = {styles.profileText}>
									TEACHER PROFILE
								</Text>
							</View>
						</ImageBackground>
					</View>
					{/* <View
						style={styles.title}
					>
						<Text>Teacher Profile</Text>
					</View> */}
					<KeyboardAvoidingView
					behavior='padding'
					keyboardVerticalOffset={50}
					style={styles.screen}
					>
						<View style={styles.emailContainer}>
							<Text style ={styles.email_text}>EMAIL ADDRESS{"\n"}</Text>
							<Text style ={styles.email}>{userInfo.userEmail}</Text>
						</View>
						{/* <View
							style={styles.profileInfo}
						>
							<Text>Email: </Text>
							<Text>{userInfo.userEmail}</Text>
						</View> */}

						<View
							style={styles.inputContainer}
						>	
							<Text style ={styles.email_text}>USERNAME{"\n"}</Text>
							<View style={styles.editInput}>
								<Input 
									id='username'
									// label='User Name'
									editable={isEditing}
									initialValue={formState.inputValues.username}
									initialValidity={true}
									onInputChange={inputChangeHandler}
								/>
								{isLoading ? (
									<ActivityIndicator size="small" />
								) : (
								<Button 
									color= '#DAA520'
									title= {isEditing ? 'Save': 'Edit'}
									onPress={()=>nameChangeSubmitHandler()}
								/>)
								}
							</View>
						</View>
						
						<View style={styles.fbContainer}>
							<Text style ={styles.email_text}>CONNECT TO FACEBOOK{"\n"}</Text>
							<TouchableOpacity onPress={() => fbLogin()}>
								<View style={styles.fbButton}>
									<Text style={{ color: 'white', fontWeight: 'bold' }}>
											Login to Facebook
									</Text>
								</View>
							</TouchableOpacity>
						</View>

						<View>
							<Button
								title='Log out'
								onPress={()=>{
									dispatch(authActions.logout());
									props.navigation.navigate('Auth');
								}}
							/>
						</View>
						<Button 
							title='add questions'
							onPress={()=>{dispatch(questionActions.addQuestions())}}
						/>
					</KeyboardAvoidingView>
				</ScrollView>
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
  	screen: {
		width:'100%',
		height:'100%',
		alignItems:'center'
	},
	
	headerContainer: {
		flex:2,
		marginTop:50,
        width: '100%',
		alignItems: 'center',
		textAlignVertical:'center',
	},
	header:{
		width: 316,
		height: 102,
		alignItems: 'center',
	},
	profileText:{
		width: '100%',
        textTransform: 'uppercase',
		textAlign:'center',
		marginTop: 35,
        color: '#DAA520',
        fontSize: 20,
        fontFamily: 'trajan-pro',
	},
	emailContainer:{
		width:'100%',
		padding: 20,
		textAlign:'center',
	},
	email:{
		width:'100%',
		textAlign:'center',
		color: '#ffffff',
		fontSize: 18,
		backgroundColor:'#00000088',
		height: 50,
		textAlignVertical:'center',
	},
	email_text:{
		width:'100%',
		textAlign:'center',
		marginTop:20,
		color: '#DAA520',
		fontFamily: 'trajan-pro',
		fontSize: 18,
	},
  	label: {
	    fontSize: 18,
	    fontWeight: 'normal',
	    marginBottom: 48
  	},
  	editInput: {
		flexDirection:'row',
		width: '80%',
	},
	inputContainer:{
		alignItems:'center',
		justifyContent:'center',
	},
	fbContainer:{
		width:'100%',
		padding: 20,
		textAlign:'center',
	},
  	fbButton: {
        width: '50%',
		alignSelf: 'center',
		textAlign:'center',
        borderRadius: 4,
        padding: 24,
        backgroundColor: '#3B5998',
    }
});

export default TeacherProfileScreen;