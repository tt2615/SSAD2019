import React, { useState,useEffect,useCallback } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	FlatList,
	SafeAreaView,
	ActivityIndicator,
	ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ChallengeCard from '../../../components/Student/ChallengeCard';
import * as challengeActions from '../../../store/actions/challengeActions';

const ChallengeListScreen = props => {
	const userInfo = useSelector( state=> state.user );
	const challengeList = useSelector( state => state.challenge );
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	const [rerender, setRerender] = useState(false);
	
	const loadChallenges = useCallback(async () => {
	  setError(null);
	  setIsRefreshing(true);
	  try {
	    await dispatch(challengeActions.loadChallenge(userInfo.userId));
	  } catch (err) {
	    setError(err.message);
	  }
	  setIsRefreshing(false);
	}, [dispatch, setIsLoading, setError]);

	useEffect(()=>{
		// console.log('challengeList changes:');
		// console.log(challengeList);
		props.navigation.navigate(
			'ChallengeList',
			{test:1}
		);
	},[challengeList])

	//whenever enetering challenge list, load challenge
	useEffect(() => {
	  const willFocusSub = props.navigation.addListener(
	    'willFocus',
	    loadChallenges
	  );

	  return () => {
	    willFocusSub.remove();
	  };
	}, [loadChallenges]);

	useEffect(() => {
 	  setIsLoading(true);
 	  loadChallenges().then(() => {
 	    setIsLoading(false);
 	  });
 	}, [dispatch, loadChallenges]);
	
	//render screen
	if (isLoading) {
    return (
      	<View style={styles.centered}>
        	<ActivityIndicator size="large"/>
     	 </View>
    	);
 	}

 	if (error) {
 	  return (
 	    <View style={styles.centered}>
 	      <Text>An error occurred!</Text>
 	      <Button
 	        title="Try again"
 	        onPress={loadChallenges}
 	      />
 	    </View>
 	  );
 	}

 	if (isLoading) {
 	  return (
 	    <View style={styles.centered}>
 	      <ActivityIndicator size="large" />
 	    </View>
 	  );
 	}

 	if (!isLoading && challengeList.unreadChallenges.length === 0 && challengeList.readChallenges.length === 0) {
 	  return (
 	    <View style={styles.centered}>
 	    	<Button
 	    		title='create new challenge'
 	    		onPress={()=>{
 	    			props.navigation.navigate('ChallengeCreation');
 	    		}}
 	    	/>
 	      <Text>No Challenges found. Start creating one!</Text>
 	    </View>
 	  );
 	}

	return(
		<SafeAreaView>
			<View>
				<View>
					<Button
						title='create new challenge'
						onPress={()=>{
							props.navigation.navigate('ChallengeCreation');
						}}
				/>
			</View>
			<ScrollView>
				<Text>Ongoing challenge:</Text>
				{challengeList.unreadChallenges.map((value, index) => {
				return(
					<ChallengeCard
						props={props}
						key={value.id}
						challenge={value}
						userId={userInfo.userEmail}
					/>
				);
			})}
					<Text>History:</Text>
					{challengeList.readChallenges.map((value, index) => {
				return(
					<ChallengeCard
						props={props}
						key={value.id}
						challenge={value}
						userId={userInfo.userEmail}
					/>
				);
			})}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	centered:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default ChallengeListScreen;