import {LOAD_WORLDS,UPDATE_WORLDS} from '../actions/worldsActions';

const initialState=[
    // {
    //     wid: 1,
    //     name: 'World 1',
    //     score: 0,
    //     available: true
    //     },
    // {
    //     wid: 2,
    //     name: 'World 2',
    //     score: 0,
    //     available: false
    // }
];

export default (state=initialState, action) => {
    switch (action.type) {
        case LOAD_WORLDS:
            state=[];
            for (let i=0; i<action.payload.length; i++){
                state.push(action.payload[i]);
            }
            return state;
        case UPDATE_WORLDS:
            for (let i=0; i<state.length; i++){
                if (state[i].wid===action.wid){
                    state[i].score+=action.score
                    if ((i!=state.length-1)&& (state[i].score>=30))
                        state[i+1].available=true;
                    break;
                }
            };
            return state;
        default:
            return state;
        }

}