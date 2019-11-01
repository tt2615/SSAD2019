import React,{ useState, useEffect } from 'react';
import {
    Image,
    StyleSheet,
    Animated
} from 'react-native';

const CharImage= props=> {
    const { source, startPos, endPos }=props;
    const [xPos]=useState(new Animated.Value(startPos.x));
    const [yPos]=useState(new Animated.Value(startPos.y));
    useEffect(()=>{
        Animated.timing(
            xPos, {
                toValue: endPos.x,
                duration: 2000,
            }
        ).start();
        Animated.timing(
            yPos, {
                toValue: endPos.y,
                duration: 2000,
            }
        ).start();
    });

    return (
        <Animated.Image source={source} style={{
            position: 'absolute',
            top: yPos,
            left: xPos
        }}>
        </Animated.Image>
    );



}

export default CharImage;