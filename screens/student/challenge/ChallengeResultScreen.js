/**
 * @method
 * @desc create a screen to show the result (ie score) of the challenge 
 * @returns screen to see the result of the challenge 
 * @authors ziqing & wei min
 */
import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	Button
} from 'react-native';
import{ useDispatch } from 'react-redux';

import * as challengeActions from '../../../store/actions/challengeActions';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChallengeResultScreen = props => {
	const params = props.navigation.state.params;
	const dispatch = useDispatch();

	const resultConfirmHandler = async () => {
		dispatch(challengeActions.answerChallenge(params.challenge.id,params.challenge.bid,params.score));
		props.navigation.navigate('ChallengeList');
	} 

	return(
		<SafeAreaView>
			<View  style={styles.mainContainer}>
				<Text style={{ textAlign:'center',fontSize: 20, color: '#DAA520',fontFamily: 'trajan-pro'}}>Final score: {params.score} / {params.challenge.diffLvl*5}</Text>
				<TouchableOpacity
					onPress={resultConfirmHandler}
					style={styles.returnButton}>
						<Text style={{fontSize:20,color: '#DAA520',fontFamily: 'trajan-pro',}}>Return</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainContainer:{
        alignItems:'center',
        height:'100%',
        width:'100%',
        justifyContent:'center',
        backgroundColor:'#000'
	},
	returnButton:{
        paddingVertical:30,
        paddingHorizontal:20,
        borderWidth:5,
		borderColor:'#DAA520',
        backgroundColor: '#000000',
        alignItems:'center',
        marginVertical:20
    }
});

export default ChallengeResultScreen;