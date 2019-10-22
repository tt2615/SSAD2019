import React from 'react';
import {
	View,
	Text,
	StyleSheet,
    Button,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';

import * as authActions from '../../store/actions/authActions';

import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

const StudentMainScreen = props => {
    //state: userInfo
    const userInfo=useSelector(state=>state.user)
    const dispatch = useDispatch();
    //nav function
    const nav=(target)=>{
        switch (target){
            case 'solo':
                props.navigation.navigate('GameMapSelection',{
                    userId: userInfo.userId
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
		<ScrollView style={styles.mainContainer}>
			<View style={styles.infoContainer}>
                <Text style = {styles.username}>
                    <Text>{userInfo.userName}</Text>
                </Text>
                <Text style = {styles.score}>
                    <Text>Total score: {userInfo.userTotalScore}</Text>
                </Text>
            </View>
            <View style={styles.imageContainer}>
                <TouchableOpacity activeOpacity={.5} onPress={e=>nav('solo')}>
                    <Image resizeMode='contain'
                        style ={{width: 147, height: 147}}
                        source={require("../../assets/images/icons/sologame3.png")}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.5} onPress={e=>nav('challenge')}>
                    <Image resizeMode='contain'
                        style ={{width: 147, height: 147}}
                        source={require("../../assets/images/icons/challenge3.png")}/>
                </TouchableOpacity>
            </View>
            <View style = {styles.iconContainer}>
                <TouchableOpacity activityOpacity={.5} onPress={e=>nav('scoreboard')}>
                    <Image resizeMode = 'contain'
                        style = {{width: 82, height:82}}
                        source={require("../../assets/images/icons/trophy_icon.png")}/>
                </TouchableOpacity>
                <TouchableOpacity activityOpacity={.5} onPress={e=>nav('profile')}>
                    <Image resizeMode = 'contain'
                        style = {{width: 82, height:82}}
                        source={require("../../assets/images/icons/profile_icon.png")}/>
                </TouchableOpacity>
                <TouchableOpacity activityOpacity={.5} onPress={e=>nav('logout')}>
                    <Image resizeMode = 'contain'
                        style = {{width: 82, height:82}}
                        source={require("../../assets/images/icons/logout_icon.png")}/>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.buttonGroup}>
                <Button title='Start Solo Game' style={styles.navButton} onPress={e=>nav('solo')}></Button>
                <Button title='View Challenge List' style={styles.navButton} onPress={e=>nav('challenge')}></Button>
                <Button title='View Scoreboard' style={styles.navButton} onPress={e=>nav('scoreboard')}></Button>
                <Button title='View Profile' style={styles.navButton} onPress={e=>nav('profile')}></Button>
                <Button title='Logout' style={styles.navButton} onPress={e=>nav('logout')}></Button>
            </View> */}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        height:'100%',
        backgroundColor: '#87BCBF',
    },
    infoContainer: {
        width: '100%',
        padding: 20,
        textAlign: 'center',
        backgroundColor: '#C8DAD3',
    },
    username: {
        width: '100%',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginTop: 20,
        color: '#324755',
        fontSize: 24,
    },
    score: {
        width:'100%',
        textAlign: 'center',
        color: '#324755',
        fontSize: 18,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        marginTop: 70,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        flex:1,
        flexDirection: 'row',
        padding: 20,
        marginTop: 90,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonGroup: {
        width:'100%',
        padding: 20,
        backgroundColor: 'red'
    },
    // buttonGroup: {
    //     width:'100%',
    //     padding: 20,
    //     backgroundColor: 'red'
    // },
    navButton: {
    }

});

export default StudentMainScreen;