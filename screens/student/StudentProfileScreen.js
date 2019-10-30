import React, { useReducer, useState, useEffect, useCallback } from 'react';
import {
	ScrollView,
	View,
	Text,
	StyleSheet,
	Button,
	KeyboardAvoidingView,
	FlatList,
	Image,
	Alert,
	ActivityIndicator,
	ImageBackground,
	TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as authActions from '../../store/actions/authActions';
import * as userActions from '../../store/actions/userActions';
import Input from '../../components/UI/Input';
import { SafeAreaView } from 'react-navigation';
import CHARACTERS from '../../data/characters'

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

const StudentProfileScreen = props => {
	const userInfo = useSelector(state => state.user);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [isEditing, setIsEditing] = useState(false);
	const [characterId, setCharacterId] = useState(userInfo.character);
	const [characterIsLoading, setCharacterIsLoading] = useState(false);

	const dispatch = useDispatch();
	const images = {
		'0':require('../../assets/images/characters/biobo.png'),
		'1':require('../../assets/images/characters/thorin.png')
	};

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
					userActions.updateStudent(
						userInfo.userId,
						userInfo.userEmail,
						'student',
						formState.inputValues.username,
						characterId,
						userInfo.userTotalScore
					)
				);
			} catch(err) {
				setError(err.message);
			}
			setIsLoading(false);
		}
		setIsEditing(!isEditing);
	};

	const changeCharacterHandler = async (characterId) => {
		console.log('entering character change handler');
	 	setCharacterId(characterId);
	};

	//update database after change
  	useEffect(() => {
  		console.log('characterId changed')
  		const updateCharacter = async () => {
	  	   	setError(null);
			try{
				await dispatch(
					userActions.updateStudent(
						userInfo.userId,
						userInfo.userEmail,
						'student',
						formState.inputValues.username,
						characterId,
						userInfo.userTotalScore
					)
				);
			} catch(err) {
				setError(err.message);
			}
		};
		updateCharacter();
  	}, [characterId]);

	//show error
	useEffect(() => {
    	if (error) {
      		Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    	}
  	}, [error]);

	return(
	<SafeAreaView>
		<ImageBackground source={require('../../assets/images/icons/profilebg.png')} style={styles.mainContainer}>
			<ScrollView>
				<KeyboardAvoidingView
				behavior='padding'
				keyboardVerticalOffset={50}
				style={styles.screen}
				>
					<View style={styles.headerContainer}>
						<ImageBackground source={require('../../assets/images/icons/header.png')} style={styles.header}>  
							<View>
								<Text style = {styles.profile_text}>
									PROFILE
								</Text>
							</View>
						</ImageBackground>
					</View>
		
					<View style={styles.emailContainer}>
						<Text style ={styles.email_text}>EMAIL ADDRESS{"\n"}</Text>
						<Text style ={styles.email}>{userInfo.userEmail}</Text>
					</View>

					<View style={styles.scoreContainer}>
						<Text style={styles.score_text}>TOTAL SCORE{"\n"}</Text>
						<Text style={styles.score}>{userInfo.userTotalScore}</Text>
					</View>

					<View
							style={styles.inputContainer}
						>	
							<Text style ={styles.email_text}>USERNAME{"\n"}</Text>
							<View style={styles.editInput}>	
								<Input
									style={{flex:1, fontSize: 18}}
									id='username'
									//label='USERNAME'
									editable={isEditing}
									initialValue={formState.inputValues.username}
									initialValidity={true}
									onInputChange={inputChangeHandler}
								/>
								{isLoading ? (
									<ActivityIndicator size="small" />
								) : (
								<Button 
									title= {isEditing ? 'Save': 'Edit'}
									color = '#DAA520'
									onPress={()=>nameChangeSubmitHandler()}
								/>)
								}
							</View>
						</View>
					<View style={styles.characterList}>
						<Text style ={styles.email_text}>CHARACTER{"\n"}</Text>
						<FlatList
							numColumns={2}
							data={CHARACTERS}
							extraData={characterId}
							keyExtractor={item => item.id}
							renderItem={itemData => (
								<View>
									<TouchableOpacity
										onPress={()=>changeCharacterHandler(itemData.item.id)}
									>	
										{(characterIsLoading && itemData.item.id===characterId) ? (
											<ActivityIndicator size="small" />
										) : (
											<Image
												source={images[itemData.item.id]}
												borderWidth={itemData.item.id === characterId ? 5: 0}
												borderColor='#C8DAD3'
												alignItems='center'
											/>
										)}
									</TouchableOpacity>
									<Text style={{color:'#DAA520',fontSize: 10,	fontFamily: 'trajan-pro'}}>
										{itemData.item.name}
									</Text>
								</View>
							)}
						/>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		</ImageBackground>
	</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		width:'100%',
        height:'100%',
	},
	headerContainer: {
		marginTop:50,
		width: '100%',
        alignItems: 'center',
        textAlign: 'center',
	},
	
	header:{
		width: 316,
		height: 102,
		alignItems: 'center',
	},
	profile_text:{
		width: '100%',
        textTransform: 'uppercase',
		textAlign:'center',
		marginTop:35,
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
		backgroundColor:'#00000080',
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
	scoreContainer:{
		width:'100%',
		padding: 20,
		textAlign:'center',
	},
	score_text:{
		width:'100%',
		textAlign:'center',
		color: '#DAA520',
		fontFamily: 'trajan-pro',
		fontSize: 18,
		textAlignVertical:'center',
	},
	score:{
		width:'100%',
		textAlign:'center',
		color: '#ffffff',
		fontSize: 18,
		backgroundColor:'#00000080',
		height: 50,
		textAlignVertical:'center',
	},
	editInput: {
		flexDirection:'row',
		width: '80%',
		alignItems:'center',
		justifyContent:'center'
	},
	input:{
		width: '100%',
		padding: 20,
		fontSize: 18,
		color: '#DAA520',
		fontFamily: 'trajan-pro'
	},
	inputContainer:{
		alignItems:'center',
	},
	formState: {
		
	},
	textInput: {
		flex:8,
	},
	button: {
		flex:2,
		color:'#324755',
	},
	characterList:{
		alignItems: 'center',
		padding: 20,
	}
});

export default StudentProfileScreen;