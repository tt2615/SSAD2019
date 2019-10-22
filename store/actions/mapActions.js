export const LOAD_SECTIONS= 'LOAD_SECTIONS';
export const UPDATE_SECTION= 'UPDATE_SECTION';

export const getSections = ()=>{
    return (dispatch,getState)=>{
        dispatch({
            type: LOAD_SECTIONS
        });
    }
};


export const updateSection = (tid, score)=>{
    return (dispatch, getState)=>{
        dispatch({
            type: UPDATE_SECTION,
            tid:tid,
            score:score
        });
    }
}