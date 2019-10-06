import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//import screens
import LoginScreen from '../screens/Login/LoginScreen';

import StudentProfileScreen from '../screens/student/StudentProfileScreen';
import GameMapSelectionScreen from '../screens/student/soloPlay/GameMapScreenSelection';
import GameQuestionScreen from '../screens/student/soloPlay/GameQuestionScreen';
import GameMapScreen from '../screens/student/soloPlay/GameMapScreen';
import GameResultScreen from '../screens/student/soloPlay/GameResultScreen';
import ChallengeListScreen from '../screens/student/ChallengeListScreen';
import ChallengeCreationScreen from '../screens/student/ChallengeCreationScreen';
import ChallengeQuestionScreen from '../screens/student/ChallengeQuestionScreen';
import ChallengeResultScreen from '../screens/student/ChallengeResultScreen';
import LeaderBoardScreen from '../screens/student/LeaderBoardScreen';

import TeacherProfileScreen from '../screens/teacher/TeacherProfileScreen';
import SocialMediaScreen from '../screens/teacher/SocialMediaScreen';
import ReportScreen from '../screens/teacher/ReportScreen';

const RootNavigator = createStackNavigator({
	Login: LoginScreen,
	StudentProfile: StudentProfileScreen,
	GameMap: GameMapScreen,
	GameMapSelection: GameMapSelectionScreen,
	GameQuestion: GameQuestionScreen,
	GameResult: GameResultScreen,
	ChallengeList: ChallengeListScreen,
	ChallengeCreation: ChallengeCreationScreen,
	ChallengeQuestion: ChallengeQuestionScreen,
	ChallengeResult: ChallengeResultScreen,
	LeaderBoard: LeaderBoardScreen,
	TeacherProfile: TeacherProfileScreen,
	SocialMedia: SocialMediaScreen,
	Report: ReportScreen
},{
	initialRouteName: "Login",
	headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export default createAppContainer(RootNavigator);