export const LOAD_WORLDS= 'LOAD_WORLDS';
export const UPDATE_WORLDS= 'UPDATE_SCORE';

export const getWorlds = ()=>{
    return (dispatch,getState)=>{
        dispatch({
            type: LOAD_WORLDS
        });
    }
};

export const updateWorlds= (wid,score)=>{
    return (dispatch,getState)=>{
        dispatch({
            type: UPDATE_WORLDS,
            wid: wid,
            score: score
        });
    }
}