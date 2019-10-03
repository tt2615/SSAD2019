import React from 'react';
import {
	View,
	Text,
	Button,
	StyleSheet,
	ImageBackground
} from 'react-native';

//todo: preload image before navigation
//todo: fix logic of displaying when game is loaded
import backgrondImage from '../../assets/images/backgrounds/1.gif';

const GameMapScreen = props => {
	return (
		<View style={styles.screen}>
			<ImageBackground 
				source={backgrondImage}
				style={styles.background}
			>
				<Button
					title='manage account'
					onPress={()=>{
						props.navigation.navigate({
							routeName: 'Profile'
						})
					}}
				/>
				<Button
					title='manage challenge'
					onPress={()=>{
						props.navigation.navigate({
							routeName: 'ChallengeList'
						})
					}} 
				/>
				<Button
					title='view score board'
					onPress={()=>{
						props.navigation.navigate({
							routeName: 'LeaderBoard'
						})
					}} 
				/>
				<Button
					title='play section'
					onPress={()=>{
						props.navigation.navigate({
							routeName: 'Question'
						})
					}} 
				/>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex:1
	},
	background: {
		height: '100%',
		width: '100%'
	}
});

export default GameMapScreen;