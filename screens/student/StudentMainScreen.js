import React from 'react';
import {
	View,
	Text,
	StyleSheet,
    Button,
    Image,
    ScrollView
} from 'react-native';

import * as authActions from '../../store/actions/authActions';

import { useSelector, useDispatch } from 'react-redux';

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
                <Text>Total score: {userInfo.userTotalScore}</Text>
            </View>
            <Image style={styles.soloImage} source={require("../../assets/images/icons/sologame3.png")} />
            <Image style={styles.challengeImage} source={require("../../assets/images/icons/challenge3.png")} />
            <View style={styles.buttonGroup}>
                <Button title='Start Solo Game' style={styles.navButton} onPress={e=>nav('solo')}></Button>
                <Button title='View Challenge List' style={styles.navButton} onPress={e=>nav('challenge')}></Button>
                <Button title='View Scoreboard' style={styles.navButton} onPress={e=>nav('scoreboard')}></Button>
                <Button title='View Profile' style={styles.navButton} onPress={e=>nav('profile')}></Button>
                <Button title='Logout' style={styles.navButton} onPress={e=>nav('logout')}></Button>
            </View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        height:'100%',
        padding: 30,
        backgroundColor: '#C8DAD3',
    },
    infoContainer: {
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#C8DAD3',
    },
    username: {
        width: '100%',
        textAlign: 'center',
        marginTop: 20,
        color: '#324755',
        fontSize: 28,
    },
    soloImage: {
        marginLeft: 5,
        marginTop: 60,
        height: 147,
        width: 147,
    },
    challengeImage: {
        marginLeft: 200,
        marginTop: 0,
        height: 147,
        width: 147,
    },
    buttonGroup: {
        width:'100%',
        padding: 20,
        backgroundColor: 'red'
    },
    navButton: {
    }

});

export default StudentMainScreen;