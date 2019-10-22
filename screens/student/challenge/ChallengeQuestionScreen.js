import React, {useEffect, useState} from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	FlatList,
	Button
} from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import * as challengeQuesActions from '../../../store/actions/challengeQuesActions';

const ChallengeQuestionScreen = props => {
	const curChallenge=props.navigation.state.params.challenge;
	const dispatch=useDispatch();
	const questionBase=useSelector(state=>state.challengeQues);

	console.log(questionBase);
	return(
		<SafeAreaView>
			<View>
				<Button 
					title='correct'
					onPress={()=>{
						props.navigation.navigate('ChallengeResult');
					}}
				/>
				<Button
					title='wrong'
					onPress={()=>{
						props.navigation.navigate('ChallengeResult');
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	
});

export default ChallengeQuestionScreen;