import React from 'react';
import {Text,
        View,
        StyleSheet,
        Button} from 'react-native';

import { useDispatch } from 'react-redux';

import * as questionActions from '../../store/actions/questionActions';
import { TouchableOpacity } from 'react-native-gesture-handler';

const StageButton= props=>{
    const {tid, name, wid, available,curPosition, score,position, targetNav}=props;
    const dispatch=useDispatch();
    const styles = StyleSheet.create({
        stageButton:{
            position: 'absolute',
            top: position.y,
            left: position.x,
            width:150,
            height:150,
            // backgroundColor: 'white'
        },
        stageButtonLocked: {
            position: 'absolute',
            top: position.y,
            left: position.x,
            width:150,
            height:50,
            // backgroundColor: 'pink'
        },
        name:{
            fontFamily:'trajan-pro-bold',
            fontSize: 14,
            textAlign:'center',
            color: '#DAA520',
            borderWidth: 0.5,
            borderTopLeftRadius:10,
            borderTopRightRadius:10,
            borderColor:'#DAA520',
        },
        score:{
            fontFamily:'trajan-pro-bold',
            fontSize: 14,
            textAlign:'center',
            color:'#DAA520',
            borderWidth: 0.5,
            borderBottomLeftRadius:10,
            borderBottomRightRadius:10,
            borderColor:'#DAA520',
        },
        nameLock:{
            fontFamily:'trajan-pro-bold',
            fontSize: 14,
            textAlign:'center',
            color: '#868686',
            borderWidth: 0.5,
            borderTopLeftRadius:10,
            borderTopRightRadius:10,
            borderColor:'#868686',
        },
        scoreLock:{
            fontFamily:'trajan-pro-bold',
            fontSize: 14,
            textAlign:'center',
            color:'#868686',
            borderWidth: 0.5,
            borderBottomLeftRadius:10,
            borderBottomRightRadius:10,
            borderColor:'#868686',
        }
    });

    return(
        <View>
            {available===true?
            <View style={styles.stageButton}>
                <TouchableOpacity activeOpacity={.5}
                onPress={async ()=>{
                    await dispatch(questionActions.getQuestions(wid,tid));
                    targetNav.navigate('GameQuestion',
                                                {sid: tid, 
                                                wid:wid,
                                                curPosition: curPosition,
                                                prevScore: score});
                        }} >
                    <Text style={styles.name}>{name}</Text>
                </TouchableOpacity>
                <Text style={styles.score}>Best Score: {score}</Text>
            </View>:
            <View style={styles.stageButtonLocked}>
                <TouchableOpacity activeOpacity={.5} onPress={e=>{alert('Section Locked!')}}>
                    <Text style={styles.nameLock}>{name}</Text>
                </TouchableOpacity>
                <Text style={styles.scoreLock}>Total Score: {score}</Text>
            </View>
            }
        </View>
        );
}

export default StageButton;