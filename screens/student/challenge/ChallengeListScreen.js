import React, { useState,useEffect,useCallback } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Button,
	SafeAreaView,
	ActivityIndicator,
	ScrollView,
	ImageBackground,
	Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ChallengeCard from '../../../components/Student/ChallengeCard';
import * as challengeActions from '../../../store/actions/challengeActions';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
		console.log('challengeList changes:');
		console.log(challengeList);
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
			<ImageBackground source={require('../../../assets/images/backgrounds/challengebg.png')} style={styles.mainContainer}>
				<View style={styles.headerContainer}>
                    <ImageBackground source={require('../../../assets/images/icons/header.png')} style={styles.header}>  
                        <View>
                            <Text style = {styles.challengeText}>
                                CHALLENGE LIST
                            </Text>
                        </View>
                    </ImageBackground>
                </View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity activeOpacity={.5} onPress={()=>{props.navigation.navigate('ChallengeCreation');}}>
						<Image resizeMode='contain'
                            style ={{width: 360, height: 41}}
                            source={require("../../../assets/images/icons/createChallenge.png")}/>
					</TouchableOpacity>
				</View>
				<View style={styles.listContainer}>
					<Text style ={styles.ongoingText}>ONGOING CHALLENGE</Text>
					<FlatList
						onRefresh={loadChallenges}
						refreshing={isRefreshing}
						data={challengeList.unreadChallenges}
						keyExtractor={(item,index) => index.toString()}
						renderItem={itemData => (
							<ChallengeCard
								props={props}
								challenge={itemData.item}
								userId={userInfo.userEmail}
							/>
						)}
					/>
				</View>
				<View style={styles.listContainer}>
					<Text style={styles.historyText}>HISTORY</Text>
					<FlatList
						data={challengeList.readChallenges}
						keyExtractor={(item,index) => index.toString()}
						renderItem={itemData => (
							<ChallengeCard
								props={props}
								challenge={itemData.item}
								userId={userInfo.userEmail}
							/>
						)}
					/>
				</View>
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
	challengeText:{
		width: '100%',
        textTransform: 'uppercase',
		textAlign:'center',
		marginTop:35,
        color: '#DAA520',
        fontSize: 20,
        fontFamily: 'trajan-pro',
	},
	buttonContainer:{
		flex: 1,
		width: '100%',
		alignItems: 'center'
	},
	listContainer:{
		flex: 5,
		width: '100%'
	},
	ongoingContainer:{
		width:'100%',
	},
	ongoingText:{
		padding: 20,
		textAlign: 'center',
		fontSize: 18,
		fontFamily: 'trajan-pro',
		color: '#DAA520'
	},
	historyText:{
		padding: 20,
		textAlign: 'center',
		fontSize: 18,
		fontFamily: 'trajan-pro',
		color: '#DAA520'
	},
	centered:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	empty:{
		flex:1
	}
});

export default ChallengeListScreen;