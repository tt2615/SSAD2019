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
	TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as authActions from '../../store/actions/authActions';
import * as userActions from '../../store/actions/userActions';
import Input from '../../components/UI/Input';
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

  	useEffect(()=>{
  		console.log(userInfo);
  	},[userInfo]);

	//show error
	useEffect(() => {
    	if (error) {
      		Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    	}
  	}, [error]);

	return(
		<KeyboardAvoidingView
		  behavior='padding'
		  keyboardVerticalOffset={50}
		  style={styles.screen}
		>
			<ScrollView>
				<View
					style={styles.title}
				>
					<Text>Student Profile</Text>
				</View>
				<View
					style={styles.profileInfo}
				>
					<Text>Email: </Text>
					<Text>{userInfo.userEmail}</Text>
				</View>

				<View
					style={styles.profileInfo}
				>
					<Text>Total Score: </Text>
					<Text>{userInfo.userTotalScore}</Text>
				</View>

				<View
					style={styles.editInput}
				>	
					<Input 
						id='username'
						label='User Name'
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
						onPress={()=>nameChangeSubmitHandler()}
					/>)
					}
				</View>
				<View
					style={styles.characterList}
				>
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
											borderColor='black'
										/>
									)}
								</TouchableOpacity>
								<Text>
									{itemData.item.name}
								</Text>
							</View>
						)}
					/>
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
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 20
	},
	profileInfo: {
		flexDirection: 'row'
	},
	editInput: {
		flexDirection: 'row',
		width: '80%',
		marginVertical: 100
	},
	formState: {

	},
	textInput: {
		flex:8
	},
	buttonInput: {
		flex:2
	},
	characterList:{

	}
});

export default StudentProfileScreen;