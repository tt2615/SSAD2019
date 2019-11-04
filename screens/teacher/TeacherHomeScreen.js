import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	SafeAreaView,
	ImageBackground,
	Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const TeacherHomeScreen = props => {
	const fbInfo=useSelector(state=> state.fb);
	return(
		<SafeAreaView>
			<ImageBackground source={require('../../assets/images/backgrounds/teacherbg.png')} style={styles.mainContainer}>
				<View style={{ flex: 0.5}}></View>
				<View style={{flex: 2, width: '100%', alignItems: 'center'}}>
					<ImageBackground source={require('../../assets/images/icons/window.png')} style={styles.window}>  
						<View style={{alignItems:'center',justifyContent:'center'}}>
							<Text style = {styles.username}>
								WELCOME BACK
							</Text>
							<Text style = {styles.username}>
								PROFESSOR
							</Text>
						</View>
					</ImageBackground>
				</View>
				<View style={styles.iconContainer}>
					<TouchableOpacity style={{paddingBottom:20}} activityOpacity={.5} onPress = { () => {props.navigation.navigate('TeacherProfile');}}>
                        <Image resizeMode = 'contain'
                            style = {{width: 283, height:46}}
                            source={require("../../assets/images/icons/profile.png")}/>
                    </TouchableOpacity>
					<TouchableOpacity style={{paddingBottom:20}} activityOpacity={.5} onPress = { () => {props.navigation.navigate('Report');}}>
                        <Image resizeMode = 'contain'
                            style = {{width: 283, height:46}}
                            source={require("../../assets/images/icons/report.png")}/>
                    </TouchableOpacity>
					{fbInfo.token!==null?
                    <TouchableOpacity style={{paddingBottom:20}} activityOpacity={.5} onPress = { () => {props.navigation.navigate('SocialMedia');}}>
                        <Image resizeMode = 'contain'
                            style = {{width: 283, height:46}}
                            source={require("../../assets/images/icons/postassignment.png")}/>
                    </TouchableOpacity>
					:null
					}
					<TouchableOpacity activityOpacity={.5} onPress={()=>{
									props.navigation.navigate('Auth');
								}}>
                        <Image resizeMode = 'contain'
                            style = {{width: 283, height:46}}
                            source={require("../../assets/images/icons/logout.png")}/>
                    </TouchableOpacity>
				</View>
				<View style={{ flex: 0.5}}></View>
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainContainer:{
        width:'100%',
		height:'100%',
		alignItems:'center',
    },
    window:{
        width: 306,
        height: 131,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    username: {
        width: '100%',
        textTransform: 'uppercase',
        textAlign:'center',
		fontSize: 20,
		color: '#DAA520',
        fontFamily: 'trajan-pro',
	},
	iconContainer: {
        flex:3,
        width: '100%',
        height: 200,
        flexDirection: 'column',
        alignItems: 'center',
    },
});

export default TeacherHomeScreen;