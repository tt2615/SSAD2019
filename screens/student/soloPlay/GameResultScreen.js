import React,{useState,useEffect} from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';
import {useDispatch,useSelector} from 'react-redux';
import * as mapAction from '../../../store/actions/mapActions';

const GameResultScreen = props => {
    const [topicInfo,setTopicInfo]=useState(null);
    const userInfo=useSelector(state=>state.user);
    const dispatch=useDispatch();
    useEffect(()=>{
        const params=props.navigation.state.params;
        const tempInfo={
            score: params.score,
            wid: params.wid,
            tid: params.tid,
            pass: params.pass
        };
        setTopicInfo(tempInfo);
    },[]);

    const passView= (<Text>Congradulations!You have passed the topic!</Text>);
    const failView=<Text>You have failed the topic! Please try again!</Text>;
    const goback=async ()=>{
        //params are for tests only, not connected to db yet
        await dispatch(mapAction.getSections(userInfo.userId,topicInfo.wid));
        props.navigation.navigate(
            'GameMap',
            {
                wid: topicInfo.wid
            }
        );
    }
	return(
        <View style={styles.mainContainer}>
            {topicInfo===null?
            <Text>Loading.....</Text>:
            <View style={styles.subContainer}>
                <Text>Your score is：{topicInfo.score}</Text>
                {topicInfo.pass?passView:failView}
                <Text style={styles.returnButton} onPress={e=>goback()}>Return</Text>
            </View>}
        </View>
	);
};

const styles = StyleSheet.create({
    mainContainer:{},
    subContainer:{},
    returnButton:{
        width:100,
        height:100,
        backgroundColor:'red'
    }

});

export default GameResultScreen;