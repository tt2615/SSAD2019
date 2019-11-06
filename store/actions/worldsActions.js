import World from '../../models/world';
import WORLDS from '../../data/worlds';

export const LOAD_WORLDS= 'LOAD_WORLDS';
export const UPDATE_WORLDS= 'UPDATE_SCORE';

/**
 * @method
 * @desc Add default worlds information into database after signup as students.
 * @param {*} uid
 * 
 */
export const addWorlds= (uid)=>{
    return async (dispatch, getState) => {
        for (const key in WORLDS){
            const response = await fetch(
                `https://ssad2019-1cc69.firebaseio.com/worlds/${uid}.json`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        wid: WORLDS[key].wid,
                        name: WORLDS[key].name,
                        available: WORLDS[key].available,
                        score: WORLDS[key].score
                    })
                });
            if (!response.ok) {
                throw new Error('Something went wrong when create World!');
            }
        }
    };
};


/**
 * @method
 * @desc Load worldsInformation from database to reducer after login as students.
 * @param {*} uid
 * 
 */
export const getWorlds =(uid)=>{
    return async (dispatch,getState)=>{
        const response = await fetch(
            `https://ssad2019-1cc69.firebaseio.com/worlds/${uid}.json?`
        );
        
        if (!response.ok){
            throw new Error('Something went wrong when get Worlds!');
        }
        let tempWorldArray=[];
        const resData = await response.json();
        for (const key in resData){
            tempWorldArray.push(
                {
                    wid: resData[key].wid,
                    name: resData[key].name,
                    score: resData[key].score,
                    available: resData[key].available
                }
            );
        };
        await dispatch({
            type: LOAD_WORLDS,
            payload: tempWorldArray
        });
        return;
    }
};

/**
 * @method
 * @desc Update worlds information in both database and reducer if the score changes.
 * @param {*} uid
 * @param {*} wid
 * @param {*} score
 * 
 */
export const updateWorlds= (uid,wid,score)=>{
    return async(dispatch,getState)=>{
        const token= getState().auth.token;
        
        const response= await fetch(
            `https://ssad2019-1cc69.firebaseio.com/worlds/${uid}.json` 
        );
        if (!response.ok){
            throw new Error('Something went wrong when get Worlds before patch!');
        }
        const resData = await response.json();
        let curkey, curscore, curname;
        let refreshNext=false;
        let nextkey=0;
        let nextwid,nextscore,nextavailable,nextname;
        for (const key in resData){
            if (resData[key].wid===wid) {
                curkey=key;
                curname=resData[key].name;
                curscore=resData[key].score;
            };
        };

        const tscore=score+curscore;

        if (tscore>18){
            for (const key in resData){
                if (resData[key].wid===wid+1) {
                    nextkey=key;
                    nextavailable=true,
                    nextname=resData[key].name;
                    nextscore=resData[key].score;
                    nextwid=wid+1;
                };
            };

            if (nextkey!=0){
                refreshNext=true;
            };
        };



        const patchResponse= await fetch(
            `https://ssad2019-1cc69.firebaseio.com/worlds/${uid}/${curkey}.json?auth=${token}`,
            {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:curname,
                score: tscore,
                wid: wid,
                available: true
            })
            } 
        );

        if (!patchResponse.ok){
            throw new Error('Something went wrong when update world info!');
        };
        
        if (refreshNext){
            const patchNextResponse= await fetch(
                `https://ssad2019-1cc69.firebaseio.com/worlds/${uid}/${nextkey}.json?auth=${token}`,
                {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name:nextname,
                    score: nextscore,
                    wid: nextwid,
                    available: nextavailable
                })
                } 
            );
    
            if (!patchNextResponse.ok){
                throw new Error('Something went wrong when update the next world info!');
            }
        };

        dispatch({
            type: UPDATE_WORLDS,
            wid: wid,
            score: score
        });
    }
}