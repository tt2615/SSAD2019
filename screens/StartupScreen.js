import React, { useEffect } from 'react';
import {
	View,
	ActivityIndicator,
	StyleSheet,
	AsyncStorage
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as authActions from '../store/actions/authActions';
import * as userActions from '../store/actions/userActions';

const StartupScreen = props => {
	const dispatch = useDispatch();

	useEffect(() => {
		const tryLogin = async() => {
			const userData = await AsyncStorage.getItem('userData');
			//if have not logged in, login
			if(!userData) {
				props.navigation.navigate('Auth');
				return;
			}
			//else, get user login info
			const transformedData = JSON.parse(userData);
			const { token, userId, expiryDate, userEmail, userType } = transformedData; //destructData
			const expirationDate = new Date(expiryDate);
			//if info not valid, login again
			if(expirationDate <= new Date()||!token||!userId) {
				props.navigation.navigate('Auth');
				return;
			}
			//else, auto login 
			const expirationTime = expirationDate.getTime() - new Date().getTime(); //expiration remains the same

			//place loginInfo to store
			await dispatch(authActions.authenticate(userId, token, expirationTime));

			//place userInfo to store
			await dispatch(userActions.getUser(userEmail));

			//load diffenrent navigators for student and teacher
			if(userType==='student'){
				props.navigation.navigate('Student');
			} else {
				props.navigation.navigate('Teacher');
			}
		};

		tryLogin();
	},[dispatch]);

	return (
		<View style={styles.screen}>
			<ActivityIndicator size='large'/>
		</View>
	);
};	
	
const styles = StyleSheet.create({
  	screen: {
    	flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center'
  	}
});	
	
export default StartupScreen;