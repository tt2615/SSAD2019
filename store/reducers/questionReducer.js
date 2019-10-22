import {LOAD_QUESTIONS} from '../actions/questionActions';

const initialState={
    easy:[],
    medium:[],
    difficult:[]
};

export default (state=initialState, action) => {
    switch (action.type) {
        case LOAD_QUESTIONS:
            state={easy:[], medium:[],difficult:[]};
            const payload=action.payload;
            for (let i=0;i<payload.easy.length;i++){
                state.easy.push(payload.easy[i]);
            };
            for (let i=0;i<payload.medium.length;i++){
                state.medium.push(payload.medium[i]);
            };
            for (let i=0;i<payload.difficult.length;i++){
                state.difficult.push(payload.difficult[i]);
            };
            return state;
        default:
            return state;
        }
}