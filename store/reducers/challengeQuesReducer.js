import {LOAD_QUESTIONS} from '../actions/challengeQuesActions';

const initialState=[];

export default (state=initialState, action) => {
    switch (action.type) {
        case LOAD_QUESTIONS:
            state=[];
            for (let i=0;i<action.payload.length;i++){
                state.push(action.payload[i]);
            }
            return state;
        default:
            return state;
        }
}