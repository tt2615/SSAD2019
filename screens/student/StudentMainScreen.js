import React from 'react';
import {
	View,
	Text,
	StyleSheet
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
                props.navigation.navigate('ChallengeCreation');
                break;
            case 'scoreboard':
                props.navigation.navigate('LeaderBoard');
                break;
        }
    };

	return(
		<View style={styles.mainContainer}>
			<View style={styles.infoContainer}>
                <Text>Username: {userInfo.userName}</Text>
                <Text>Total score: {userInfo.userTotalScore}</Text>
            </View>
            <View style={styles.buttonGroup}>
                <Button title='Start Solo Game' style={styles.navButton} onPress={e=>nav('solo')}></Button>
                <Button title='Challenge a friend' style={styles.navButton} onPress={e=>nav('challenge')}></Button>
                <Button title='View Scoreboard' style={styles.navButton} onPress={e=>nav('scoreboard')}></Button>
                <Button title='View Profile' style={styles.navButton} onPress={e=>nav('profile')}></Button>
                <Button title='Logout' style={styles.navButton} onPress={e=>nav('logout')}></Button>
            </View>
		</View>
	);
};

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        height:'100%',
        padding: 30,
        backgroundColor: 'pink'
    },
    infoContainer: {
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'blue',
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