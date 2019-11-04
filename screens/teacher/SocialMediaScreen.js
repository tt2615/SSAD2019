import React, {useReducer, useState, useCallback} from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	ImageBackground,
	KeyboardAvoidingView,
	TouchableOpacity,
	Image,
	TextInput
} from 'react-native';
import Input from '../../components/UI/Input';
import { useSelector } from 'react-redux';
const LOGIN_INPUT_UPDATE = 'LOGIN_INPUT_UPDATE';

const SocialMediaScreen = props => {

	const fbInfo=useSelector(state=> state.fb);
	const [postContent,setPostContent]=useState('Please input your post content here!');

	const postAssignment=async ()=>{
		const response=await fetch(`https://graph.facebook.com/546349135390552/feed?message=${postContent}&access_token=${fbInfo.token}`,{method: 'POST'});
		console.log(response);
	}

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
				<View style={styles.fbInfoDisplayer}>
					<Text>Account: {fbInfo.email}</Text>
					<Text>Name: {fbInfo.name}</Text>
				</View>
				<View style={styles.postContent}>
					<TextInput 
						onChangeText={(text)=>setPostContent(text)}
						value={postContent}
					/>
				</View>
				<KeyboardAvoidingView
				behavior='padding'
				keyboardVerticalOffset={50}
				style={styles.screen}
				>
					<TouchableOpacity activeOpacity={.5} onPress={()=>{postAssignment}}>
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