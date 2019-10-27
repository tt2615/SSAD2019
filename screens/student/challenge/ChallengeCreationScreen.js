import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Picker,
	Button,
	Alert,
	ActivityIndicator,
	ScrollView,
	SafeAreaView,
	ImageBackground,
	Image,
	TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NumericInput from 'react-native-numeric-input' //https://www.npmjs.com/package/react-native-numeric-input

import * as challengeActions from '../../../store/actions/challengeActions';
import * as userActions from '../../../store/actions/userActions';

const ChallengeCreationScreen = props => {
	const userInfo = useSelector(state=>state.user);
	const userId = userInfo.userId;
	const dispatch = useDispatch();

	const [diffLvl, setDiffLvl] = useState('1');
	const [opponent, setOpponent] = useState();
	const [bid, setBid] = useState(0);
	const [totalPoint, setTotalPoint] = useState(userInfo.userTotalScore);
	const [err, setErr] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [otherUsers, setOtherUsers] = useState([]);
	const [maxBid, setMaxBid] = useState(0);
	const [bidWarning, setBidWarning] = useState();

	//load other users
	useEffect(()=>{
  		getOtherUsers = async () => {
  			const response = await fetch(
  			  `https://ssad2019-1cc69.firebaseio.com/users.json?`
  			);
  			if (!response.ok) {
  			    throw new Error('Something went wrong when get user list!');
  			}
  			const resData = await response.json();
  			let otherUsers=[];
  			for (const key in resData){
  				if(key!==userId&&resData[key].userType==='student'){
  					otherUsers.push({
  						'userId':key,
  						'userEmail':resData[key].userEmail,
  						'userTotalScore':resData[key].totalScore
  					});
  				}
  			}
  			setOtherUsers(otherUsers);
			if(otherUsers){
				setOpponent(otherUsers[0].userEmail);
			}
  		};
  		try{
  			setIsLoading(true);
  			getOtherUsers();
  			setIsLoading(false);
  		}catch(err){
  			setErr(err);
  		}
  	},[]);

	//update totalScore
  	useEffect(()=>{
  		setTotalPoint(userInfo.userTotalScore-bid);
  	},[bid]);

  	useEffect(()=>{
  		if (bid<maxBid) {
  			setBidWarning(null);
  		}
  		else if (totalPoint===0) {
  			setBidWarning('You have spent all your points!');
  		} else {
  			setBidWarning('The bid has reach opponents\' maximum point!');
  		}
  	},[totalPoint])

	//set maximum bid when switch opponent
  	useEffect(()=>{
  		let otherMaxBid = 0;
  		let opponentUser = otherUsers.filter((user)=>{
  			return user.userEmail===opponent;
  		});
  		if(opponentUser[0]) {
  			setMaxBid(Math.min(userInfo.userTotalScore,opponentUser[0].userTotalScore));
  		}
  		if(maxBid<=bid){
  			setBid(maxBid);
  		}
  	},[opponent,maxBid]);

	//create opponent list
	let otherUsersList = otherUsers.map((s, i) => {
        return <Picker.Item key={s.userId} value={s.userEmail} label={s.userEmail} />
    });

	//create new challenge upon submit
	const challengeSubmitHandler = async () => {
		Alert.alert('Confirm Challenge', 'Do you want to create a challenge with ' + bid + ' points?',
			 [
			 	{ text: 'Okay', onPress: async ()=>{
	 				setIsLoading(true);
	 				try{
	 					await dispatch(
	 						userActions.updateStudent(
	 							userInfo.userId, 
	 							userInfo.userEmail, 
	 							'student',
	 							userInfo.userName, 
	 							userInfo.character,
	 							totalPoint
	 						)
	 					);
	 		    		await dispatch(
	 		    			challengeActions.addChallenge(
	 			    			diffLvl,
	 			    			userInfo.userEmail,
	 			    			opponent,
	 			    			bid
	 			    		)
	 			    	);
	 				} catch(err){
	 					setErr(err.message);
	 				}
	 				setIsLoading(false);
	 				props.navigation.navigate('ChallengeList');
			 	}},
			 	{ text: 'Cancel' }
			 ]
		);
	};

  	//show error
	useEffect(() => {
    	if (err) {
      		Alert.alert('An Error Occurred!', err, [{ text: 'Okay' }]);
    	}
  	}, [err]);

	return(
		<SafeAreaView>
			<ImageBackground source={require('../../../assets/images/backgrounds/challengebg.png')} style={styles.mainContainer}>
				<ScrollView style={styles.screen}>	
					<View style={styles.headerContainer}>
						<ImageBackground source={require('../../../assets/images/icons/header.png')} style={styles.header}>  
							<View>
								<Text style = {styles.creationText}>
									CHALLENGE CREATION
								</Text>
							</View>
						</ImageBackground>
					</View>

					<View style={styles.diffContainer}>
						<Text style={styles.diff}>Difficulty Level</Text>
						<Picker
							selectedValue={diffLvl}
							style={styles.diffcultyLvl}
							itemStyle={styles.pickerDiffStyle}
							onValueChange={(itemValue, itemIndex) => {setDiffLvl(itemValue);}
							
							}>
							<Picker.Item key="1" label="Easy" value="1" />
							<Picker.Item key="2" label="Medium" value="2"/>
							<Picker.Item key="3" label="Hard" value="3" />
						</Picker>
					</View>

					<View style={styles.oppContainer}>
						<Text style={styles.oppText}>Choose Opponent</Text>
						<Picker
							selectedValue={opponent}
							style={styles.opponentPicker}
							itemStyle={styles.pickerOppStyle}
							onValueChange={(itemValue, itemIndex) =>
								{setOpponent(itemValue);}
							}>
							{otherUsersList}
						</Picker>
					</View>
					
					<View style={styles.setBidContainer}>
						<Text style={styles.setText}>Set Bid</Text>
						<Text style={styles.totalPoint}>Total Points: {totalPoint}</Text>
						<NumericInput
							totalWidth={240}
							totalHeight={50}
							iconSize={25}
							textColor='#DAA520'
							rounded
							rightButtonBackgroundColor='#00000088'
							leftButtonBackgroundColor='#00000088'
							iconStyle={{color:'#DAA520'}}
							borderColor='white'
							style={styles.numericInput}
							value={bid} 
							onChange={value => {
								setBid(value);
							}}
							valueType='integer'
							minValue={0}
							maxValue={maxBid}
							onLimitReached={(isMax,msg) => {
								
							}}
						/>
						<Text style={styles.bidWarning}>{bidWarning}</Text>
					</View>
					<View style={styles.buttonContainer}>
						{isLoading ? (
							<ActivityIndicator size="small" />
						):(
							<TouchableOpacity activeOpacity={.5} onPress={challengeSubmitHandler}>
								<Image resizeMode='contain'
								style ={{width: 283, height: 41}}
								source={require("../../../assets/images/icons/challengeBut.png")}/>
							</TouchableOpacity>
						)}
					</View>
				</ScrollView>
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
	screen: {

	},
	headerContainer: {
		flex:2,
		marginTop:50,
        width: '100%',
		alignItems: 'center',
		textAlignVertical:'center',
	},
	header:{
		width: 316,
		height: 102,
		alignItems: 'center',
	},
	creationText:{
		width: '100%',
		textAlign:'center',
		marginTop: 35,
        color: '#DAA520',
        fontSize: 20,
        fontFamily: 'trajan-pro',
	},
	diffContainer:{
		width:'100%',
	},
	diff:{
		padding: 20,
		textAlign: 'center',
		fontSize: 18,
		fontFamily: 'trajan-pro-bold',
		color: '#DAA520'
	},
	diffcultyLvl:{
		width:'100%',
		fontFamily:'trajan-pro',
		color:'#DAA520'
	},
	pickerDiffStyle:{
		width: '100%',
		height: 100,
		textAlign: 'center',
		fontFamily:'trajan-pro',
		color: '#DAA520',
		backgroundColor: '#00000088',
		borderColor:'white'
	},
	oppContainer:{
		width:'100%',
		alignItems: 'center'
	},
	oppText:{
		padding: 20,
		textAlign: 'center',
		fontSize: 18,
		fontFamily: 'trajan-pro-bold',
		color: '#DAA520'
	},
	pickerOppStyle:{
		width: '100%',
		height: 150,
		textAlign: 'center',
		fontFamily:'trajan-pro',
		color: '#DAA520',
		backgroundColor: '#00000088'
	},
	opponentPicker:{
		width:'100%',
		fontFamily:'trajan-pro',
		color:'#DAA520',
	},
	setBidContainer:{
		width:'100%',
		alignItems:'center',
		fontFamily:'trajan-pro',
		color:'#DAA520'
	},
	setText:{
		padding: 20,
		height:30,
		textAlign: 'center',
		fontSize: 18,
		fontFamily: 'trajan-pro-bold',
		color: '#DAA520'
	},
	totalPoint:{
		padding: 20,
		textAlign: 'center',
		fontSize: 16,
		fontFamily: 'trajan-pro',
		color: '#DAA520',
	},
	bidWarning:{
		padding: 20,
		textAlign: 'center',
		fontSize: 12,
		fontFamily: 'trajan-pro',
		color: '#D97D54'
	},
	numericInput:{
		width:'100%',
		fontFamily:'trajan-pro',
		color:'#DAA520'
	},
	buttonContainer:{
		alignItems:'center'
	}

});

export default ChallengeCreationScreen;