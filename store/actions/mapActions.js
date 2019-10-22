import Section from '../../models/section';
import SECTIONS from '../../data/sections';
import { onSessionInterruptionEnded } from 'expo/build/AR';

export const LOAD_SECTIONS= 'LOAD_SECTIONS';
export const UPDATE_SECTION= 'UPDATE_SECTION';

export const addSections=(uid)=>{
    return async (dispatch, getState) => {
        for (const key in SECTIONS){
            const response = await fetch(
                `https://ssad2019-1cc69.firebaseio.com/sections/${uid}/${SECTIONS[key].wid}.json`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sid: SECTIONS[key].sid,
                        wid: SECTIONS[key].wid,
                        name: SECTIONS[key].name,
                        score: SECTIONS[key].score,
                        available: SECTIONS[key].available
                    })
                });
            if (!response.ok) {
                throw new Error('Something went wrong when create sections!');
            }
        }
    };
};

export const getSections = (uid,wid)=>{
    return async (dispatch,getState)=>{
        const response = await fetch(
            `https://ssad2019-1cc69.firebaseio.com/sections/${uid}/${wid}.json?`
        );
        
        if (!response.ok){
            throw new Error('Something went wrong when get Sections!');
        }
        let tempSectionArray=[];
        const resData = await response.json();
        for (const key in resData){
            tempSectionArray.push(
                {
                    wid: resData[key].wid,
                    sid: resData[key].sid,
                    name: resData[key].name,
                    score: resData[key].score,
                    available: resData[key].available
                }
            );
        };
        await dispatch({
            type: LOAD_SECTIONS,
            payload: tempSectionArray
        });
        return;
    }
};


export const updateSection = (uid,wid,sid,score)=>{
    return async(dispatch, getState)=>{
        const response=await fetch(
            `https://ssad2019-1cc69.firebaseio.com/sections/${uid}/${wid}.json?`
        )
        
        const resData= await response.json();
        
        let curkey,curscore,curname;
        let nextkey=0;
        let refreshNext=false;
        let nextsid,nextscore,nextavailable,nextname;
        for (const key in resData){
            if (resData[key].sid===sid){
                curkey=key;
                curname=resData[key].name;
                curscore=resData[key].score;
            };
        };

        const tscore=score;


        if (tscore>=6){
            for (const key in resData){
                if (resData[key].sid===sid+1) {
                    nextkey=key;
                    nextavailable=true,
                    nextname=resData[key].name;
                    nextscore=resData[key].score;
                    nextsid=sid+1;
                };
            };

            if (nextkey!=0){
                refreshNext=true;
            }
        };
        
        const token= getState().auth.token;
        const patchResponse= await fetch(
            `https://ssad2019-1cc69.firebaseio.com/sections/${uid}/${wid}/${curkey}.json?auth=${token}`,
            {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:curname,
                score: tscore,
                wid: wid,
                sid: sid,
                available: true
            })
            } 
        );

        if (!patchResponse.ok){
            throw new Error('Something went wrong when update world info!');
        };

        if (refreshNext){
            const patchNextResponse= await fetch(
                `https://ssad2019-1cc69.firebaseio.com/sections/${uid}/${wid}/${nextkey}.json?auth=${token}`,
                {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name:nextname,
                    score: nextscore,
                    wid: wid,
                    sid:nextsid,
                    available: nextavailable
                })
                } 
            );
    
            if (!patchNextResponse.ok){
                throw new Error('Something went wrong when update the next world info!');
            };
        };
        
        dispatch({
            type: UPDATE_SECTION,
            tid:sid,
            score:score
        });
    }
}