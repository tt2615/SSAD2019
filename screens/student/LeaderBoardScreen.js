import React, { useState,useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList
} from 'react-native';

import Card from '../../components/UI/Card';

const LeaderBoardScreen = props => {
	const [userList, setUserList] = useState([]); 
	const [err, setErr] = useState();
	const [isLoading, setIsLoading] = useState(false);

	//load all users
	useEffect(()=>{
  		getAllUsers = async () => {
  			const response = await fetch(
  			  `https://ssad2019-1cc69.firebaseio.com/users.json?`
  			);
  			if (!response.ok) {
  			    throw new Error('Something went wrong when get user list!');
  			}
  			const resData = await response.json();
  			console.log(resData);
  			let allUsers=[];
  			for (const key in resData){
  				if(resData[key].userType==='student'){
  					allUsers.push({
  						'userId':key,
  						'userEmail':resData[key].userEmail,
  						'userName':resData[key].userName,
  						'userTotalScore':resData[key].totalScore
  					});
  				}
  			}
  			allUsers.sort((a, b)=>{
  			    if (a.totalScore > b.totalScore) {
  			        return -1;
  			    }
  			    if (a.totalScore < b.totalScore) {
  			        return 1;
  			    }
  			    return 0;
  			});
  			setUserList(allUsers);
  		};
  		try{
  			setIsLoading(true);
  			getAllUsers();
  			setIsLoading(false);
  		}catch(err){
  			setErr(err);
  		}
  	},[]);


	return(
		<View>
			<FlatList
				data={userList}
				keyExtractor={item=>item.userId}
				renderItem={({item,index})=>{
					return(
						<Card>
							<Text>Rank: {index+1}</Text>
							<Text>{item.userName}</Text>
							<Text>{item.userEmail}</Text>
							<Text>{item.userTotalScore}</Text>
						</Card>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	
});

export default LeaderBoardScreen;