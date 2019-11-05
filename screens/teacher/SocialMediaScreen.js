 /**
 * @method
 * @desc create a screen for the teacher to post assignment to social media.
 * at least 2 social media should be connected.
 * @returns screen for the teacher to post assignment 
 * @authors ziqing & qian yi & wan ting
 */ 
import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	ImageBackground,
	KeyboardAvoidingView,
	TouchableOpacity,
	Image
} from 'react-native';

const SocialMediaScreen = props => {

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