import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Picker,
	Button,
	Alert,
	ActivityIndicator,
	ScrollView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NumericInput from 'react-native-numeric-input' //https://www.npmjs.com/package/react-native-numeric-input

import * as challengeActions from '../../store/actions/challengeActions';
import * as userActions from '../../store/actions/userActions';

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
	const [maxBid, setMaxBid] = useState();
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
  		if (bid<maxBid||maxBid) {
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
  			return user.userId===opponent;
  		});
  		if(opponentUser[0]) {
  			setMaxBid(Math.min(userInfo.userTotalScore,opponentUser[0].userTotalScore));
  		}
  		if(maxBid<=bid){
  			setBid(0);
  			console.log(bid);
  		}
  	},[opponent,maxBid,bid]);

	//create opponent list
	let otherUsersList = otherUsers.map( (s, i) => {
        return <Picker.Item key={s.userId} value={s.userId} label={s.userEmail} />
    });

	//create new challenge upon submit
	const challengeSubmitHandler = async () => {
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
	    			userInfo.userId,
	    			opponent,
	    			bid
	    		)
	    	);
		} catch(err){
			setErr(err.message);
		}
		setIsLoading(false);
	};

  	//show error
	useEffect(() => {
    	if (err) {
      		Alert.alert('An Error Occurred!', err, [{ text: 'Okay' }]);
    	}
  	}, [err]);

	return(
		<ScrollView style={styles.screen}>
			<Text>Difficulty Level</Text>
			<Picker
				selectedValue={diffLvl}
				style={styles.diffcultyLvl}
				onValueChange={(itemValue, itemIndex) => {setDiffLvl(itemValue);}
				}>
				<Picker.Item key="1" label="Easy" value="1" />
				<Picker.Item key="2" label="Medium" value="2" />
				<Picker.Item key="3" label="Hard" value="3" />
			</Picker>

			<Text>Choose Opponent</Text>
			<Picker
				selectedValue={opponent}
				style={styles.opponentPicker}
				onValueChange={(itemValue, itemIndex) =>
				    {setOpponent(itemValue);}
				}>
				{otherUsersList}
				
			</Picker>

			<Text>Set Bid</Text>
			<Text>Total Points: {totalPoint}</Text>
			<NumericInput 
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
			<Text>{bidWarning}</Text>

			{isLoading ? (
				 <ActivityIndicator size="small" />
			):(
				<Button
					title='Challenge!'
					onPress={challengeSubmitHandler}
				/>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {

	},
	diffcultyLvl:{

	},
	opponentPicker:{

	}

});

export default ChallengeCreationScreen;