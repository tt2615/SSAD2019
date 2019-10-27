import React, { useState,useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	SafeAreaView,
	Image,
	ScrollView
} from 'react-native';
import { useSelector } from 'react-redux';

import Card from '../../components/UI/Card';

const LeaderBoardScreen = props => {
	const [userList, setUserList] = useState([]); 
	const [err, setErr] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [ranking, setRanking] = useState();
	const [score, setScore] = useState();
	const userInfo = useSelector(state=>state.user);

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
  			    if (a.userTotalScore > b.userTotalScore) {
  			        return -1;
  			    }
  			    if (a.userTotalScore < b.userTotalScore) {
  			        return 1;
  			    }
  			    return 0;
			  });
			  setUserList(allUsers);
			
			//get user ranking and score
			for(let i=0;i<allUsers.length;i++){
				if(allUsers[i].userId===userInfo.userId){
					setRanking(i);
					setScore(allUsers[i].userTotalScore);
					break;
				}
			}
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
		<SafeAreaView>
			<View colors={[, '#1da2c6', '#1695b7']}
				style={{ backgroundColor: '#119abf', padding: 15, paddingTop: 35, alignItems: 'center' }}>
				<Text style={{ fontSize: 25, color: 'white', }}>Leaderboard</Text>
				<View style={{
                    flexDirection: 'row',
                    marginBottom: 20, marginTop: 20
                }}>
					<View  style={{ flex: 1,  alignItems: 'center' }}>
						<Text style={{ fontSize: 20, color: 'white'}}>
							Your Rank
						</Text>
						<Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
							{ranking}
						</Text>
					</View>
					<View  style={{ flex: 1,  alignItems: 'center' }}>
						<Text style={{ fontSize: 20, color: 'white'}}>
							Your Score
						</Text>
						<Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
							{score}
						</Text>
					</View>
				</View> 
			</View>
			<ScrollView>
				<FlatList
					data={userList}
					keyExtractor={item=>item.userId}
					renderItem={({item,index})=>{
						return(
							<View style={{
								backgroundColor: '#555555',borderColor: '#333333', borderWidth:0.5, flexDirection:'row',paddingBottom: 10, paddingTop: 10}}>
								<Text style={{ color: 'white', fontSize: 15, flex: 1, marginLeft: 10 }}>{index+1}</Text>
								<Text style={{ color: 'white', fontSize: 15, flex: 5, marginLeft: 0 }}>{item.userName}{"\n"}{item.userEmail}</Text>
								<Text style={{ color: 'white', fontSize: 17, flex: 1, textAlign: 'right', fontWeight: 'bold', marginRight: 40 }}>{item.userTotalScore}</Text>
							</View>
						);
					}}
				/>
			</ScrollView>
		</SafeAreaView>	
	);
};

const styles = StyleSheet.create({
	
});

export default LeaderBoardScreen;