import React from 'react';
import {Text,
        View,
        StyleSheet,
        Button} from 'react-native';

import { useDispatch } from 'react-redux';

import * as questionActions from '../../store/actions/questionActions';

const StageButton= props=>{
    const {tid, name, wid, available,score,position, targetNav}=props;
    const dispatch=useDispatch();
    const styles = StyleSheet.create({
        stageButton:{
            position: 'absolute',
            top: position.y,
            left: position.x,
            width:100,
            height:50,
            backgroundColor: 'white'
        },
        stageButtonLocked: {
            position: 'absolute',
            top: position.y,
            left: position.x,
            width:100,
            height:50,
            backgroundColor: 'pink'
        }
    });

    return(
        <View>
            {available===true?
            <View style={styles.stageButton}>
                <Button title={name} 
                        style={styles.stagePic} 
                        onPress={async ()=>{
                            await dispatch(questionActions.getQuestions(wid,tid));
                            targetNav.navigate('GameQuestion',
                                                        {sid: tid, 
                                                        wid:wid,
                                                        prevScore: score});
                                }}></Button>
                <Text>Total score: {score}</Text>
            </View>:
            <View style={styles.stageButtonLocked}>
                <Button title={name} 
                        style={styles.stagePic} 
                        onPress={e=>{alert('Section Locked!')}}></Button>
                <Text>Total score: {score}</Text>
            </View>
            }
        </View>
        );
}

export default StageButton;