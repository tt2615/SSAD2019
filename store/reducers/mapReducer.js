import {LOAD_SECTIONS, UPDATE_SECTION} from '../actions/mapActions';

const initialState=[];

export default (state=initialState, action) => {
    switch (action.type) {
        case LOAD_SECTIONS:
            state=[];
            for (let i=0; i<action.payload.length;i++){
                state.push(action.payload[i]);
            };
            return state;
        case UPDATE_SECTION:
            for (let i=0; i<state.length; i++){
                if (state[i].tid===action.tid){
                    state[i].score=action.score;
                    if (i!=state.length-1&&state[i+1].available===false) state[i+1].available=true;
                    break;
                }
            };
            return state;
        default:
            return state;
        }

}