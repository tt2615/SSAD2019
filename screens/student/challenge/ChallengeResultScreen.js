import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button
} from 'react-native';
import{ useDispatch } from 'react-redux';

import * as challengeActions from '../../../store/actions/challengeActions';

const ChallengeResultScreen = props => {
	const params = props.navigation.state.params;
	const dispatch = useDispatch();

	const resultConfirmHandler = async () => {
		dispatch(challengeActions.answerChallenge(params.challenge.id,params.challenge.bid,params.score));
		props.navigation.navigate('ChallengeList');
	} 

	return(
		<View>
			<Text>Final score: {params.score} / {params.challenge.diffLvl*5}</Text>
			<Button 
				title='ok'
				onPress={resultConfirmHandler}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	
});

export default ChallengeResultScreen;