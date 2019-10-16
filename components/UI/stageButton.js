import React from 'react';
import {Text,
        View,
        StyleSheet,

        Button} from 'react-native';

const StageButton= props=>{
    const {tid, wid, position, targetNav}=props;
    const styles = StyleSheet.create({
        stageButton:{
            position: 'absolute',
            top: position.y,
            left: position.x,
            width:100,
            height:50,
            backgroundColor: 'white'
        }
    });
    return(
        <View style={styles.stageButton}>
            <Button title={'Topic'+tid} style={styles.stagePic} onPress={()=>{targetNav.navigate('GameQuestion',{tid: tid, wid:wid})}}></Button>
        </View>
        );
}

export default StageButton;