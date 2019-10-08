import React, { useReducer, useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Button
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/authActions';



const TeacherProfileScreen = props => {
	const [isLoading, setIdLoading] = useState(false);
	const [error, setError] = useState();
	const [isRefreshing, setIsRefreshing] = useState(false);

	const dispatch = useDispatch();
	const userId = useSelector(state => state.auth.userId);

	//load user's information
	// const loadUserInfo = useCallback(async userId => {
	// 	setError(null);
	// 	try{
	// 		await dispatch(st.fetchUserInfo());
	// 	} catch (err) {
	// 		setError(err.message);
	// 	}
	// },[dispatch, setIsLoading, setError]);

	// //
	// useEffect(()=>{
	// 	const willFocusSub = props.navigation.addListener(
	// 		'willFocus',
	// 		loadUserInfo
	// 	);

	// 	return() => {
	// 		willFocusSub.remove();
	// 	};
	// }, [loadUserInfo]);

	// //
	// useEffect(()=>{
	// 	setIsLoading(true);
	// 	loadProducts().then(()=>{
	// 		setIsLoading(false);
	// 	});
	// },[dispatch,loadProducts]);

	// const [formState, dispatchFormState] = useReducer(formReducer, {
	// 	inputValues: {
	// 		userId: userId,
	// 		userName: 
	// 	}
	// });



	return(
		<ScrollView>
			<View>
				<Button
					title='Log out'
					onPress={()=>{
						dispatch(authActions.logout());
						props.navigation.navigate('Auth');
					}}
				/>
			</View>
			<View>
			</View>
			<View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	
});

export default TeacherProfileScreen;