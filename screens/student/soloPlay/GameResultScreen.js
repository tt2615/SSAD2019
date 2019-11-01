import React,{useState,useEffect} from 'react';
import {
	View,
	Text,
    StyleSheet,
    SafeAreaView
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
            pass: params.pass,
            curPosition: params.curPosition
        };
        setTopicInfo(tempInfo);
    },[]);

    const passView= (<Text  style={{color: '#DAA520',}}>Congradulations! You have passed the topic!</Text>);
    const failView=<Text  style={{color: '#DAA520',}}>You have failed the topic! Please try again!</Text>;
    const goback=async ()=>{
        //params are for tests only, not connected to db yet
        await dispatch(mapAction.getSections(userInfo.userId,topicInfo.wid));
        props.navigation.navigate(
            'GameMap',
            {
                wid: topicInfo.wid,
                pastPosition: topicInfo.curPosition

            }
        );
    }
	return(
        <SafeAreaView>
            <View style={styles.mainContainer}>
                {topicInfo===null?
                <Text>Loading.....</Text>:
                <View style={styles.subContainer}>
                    <Text style={{ textAlign:'center',fontSize: 20, color: '#DAA520',fontFamily: 'trajan-pro'}}>
                        Your score is：{topicInfo.score}
                    </Text>
                    {topicInfo.pass?passView:failView}
                    <Text style={styles.returnButton} onPress={e=>goback()}>Return</Text>
                </View>}
            </View>
        </SafeAreaView>
	);
};

const styles = StyleSheet.create({
    mainContainer:{
        alignItems:'center',
        height:'100%',
        width:'100%',
        justifyContent:'center',
        backgroundColor:'#000'
    },
    subContainer:{},
    returnButton:{
        paddingVertical:30,
        paddingHorizontal:20,
        fontSize:20,
        color: '#DAA520',
        fontFamily: 'trajan-pro',
        borderWidth:5,
		borderColor:'#DAA520',
        backgroundColor: '#000000',
        textAlign:'center',
        marginVertical:20
    }


});

export default GameResultScreen;