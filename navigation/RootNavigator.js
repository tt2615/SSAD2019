import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/player/LoginScreen';
import GameMapScreen from '../screens/game/GameMapScreen';
import QuestionScreen from '../screens/game/QuestionScreen';
import ProfileScreen from '../screens/player/ProfileScreen';
import LeaderBoardScreen from '../screens/game/LeaderBoardScreen';
import ChallengeList from '../screens/player/ChallengeListScreen';

const RootNavigator = createStackNavigator({
	Login: LoginScreen,
	GameMap: GameMapScreen,
	Question: QuestionScreen,
	Profile: ProfileScreen,
	ChallengeList: ChallengeList,
	LeaderBoard: LeaderBoardScreen
},{
	initialRouteName: "Login",
	headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export default createAppContainer(RootNavigator);