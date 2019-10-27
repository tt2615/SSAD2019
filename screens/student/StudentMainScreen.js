import React from 'react';
import {
	View,
	Text,
	StyleSheet,
    Button,
    Image,
    ImageBackground,
    ScrollView,
    Dimensions,
    SafeAreaView
} from 'react-native';

import * as authActions from '../../store/actions/authActions';

import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

const StudentMainScreen = props => {
    const userInfo = useSelector(state=>state.user)
    const dispatch = useDispatch();
    //nav function
    const nav=(target)=>{
        switch (target){
            case 'solo':
                props.navigation.navigate('GameMapSelection',{
                    wid:2
                });
                break;
            case 'logout':
                dispatch(authActions.logout());
                props.navigation.navigate('Auth');
                break;
            case 'profile':
                props.navigation.navigate('StudentProfile'); 
                break;
                // tbc params
            case 'challenge':
                props.navigation.navigate('ChallengeList');
                break;
            case 'scoreboard':
                props.navigation.navigate('LeaderBoard');
                break;
        }
    };

	return(
        <SafeAreaView>
            <ImageBackground source={require('../../assets/images/backgrounds/mainscreen.png')} style={styles.mainContainer}>
                <View style={styles.empty}></View>
                <View style={styles.infoContainer}>
                    <ImageBackground source={require('../../assets/images/icons/window.png')} style={styles.window}>  
                        <View>
                            <Text style = {styles.username}>
                                {userInfo.userName}{"\n"}
                            </Text>
                            <Text style = {styles.score}>
                            <Text>Total Score: {userInfo.userTotalScore}</Text>
                            </Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.empty}></View>
                <View style={styles.imageContainer}>
                    <TouchableOpacity activeOpacity={.5} onPress={e=>nav('solo')}>
                        <Image resizeMode='contain'
                            style ={{width: 180.36, height: 156.06}}
                            source={require("../../assets/images/icons/sologame.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.5} onPress={e=>nav('challenge')}>
                        <Image resizeMode='contain'
                            style ={{width: 180.36, height: 156.06}}
                            source={require("../../assets/images/icons/challenge.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.empty}></View>
                <View style = {styles.iconContainer}>
                    <TouchableOpacity activityOpacity={.5} onPress={e=>nav('scoreboard')}>
                        <Image resizeMode = 'contain'
                            style = {{width: 283, height:46}}
                            source={require("../../assets/images/icons/leaderboard.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity activityOpacity={.5} onPress={e=>nav('profile')}>
                        <Image resizeMode = 'contain'
                            style = {{width: 283, height:46}}
                            source={require("../../assets/images/icons/profile.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity activityOpacity={.5} onPress={e=>nav('logout')}>
                        <Image resizeMode = 'contain'
                            style = {{width: 283, height:46}}
                            source={require("../../assets/images/icons/logout.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.empty}></View>
            </ImageBackground>
        </SafeAreaView>
	);
};

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        height:'100%',
        alignItems: 'center',
    },
    infoContainer: {
        flex: 2,
        width: '100%',
        alignItems: 'center'
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
        color: '#DAA520',
        fontSize: 20,
        fontFamily: 'trajan-pro',
    },
    score: {
        width:'100%',
        marginTop:50,
        textAlign: 'center',
        position: 'absolute',
        color: '#DAA520',
        fontSize: 18,
        fontFamily: 'trajan-pro',
    },
    imageContainer: {
        flex: 2,
        flexDirection: 'row',
        padding: 20,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        flex:3,
        width: '100%',
        height: 400,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    empty:{
        flex: 1
    },
    navButton: {
    }
});

export default StudentMainScreen;