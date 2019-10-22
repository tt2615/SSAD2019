import {LOAD_SECTIONS, UPDATE_SECTION} from '../actions/mapActions';

const initialState=[
    {
        tid: 1,
        name: 'Topic 1',
        score: 0,
        available: true
        },
    {
        tid:2,
        name: 'Topic 2',
        score: 0,
        available: false
    },
    {
        tid: 3,
        name: 'Topic 3',
        score: 0,
        available: false
    }
];

export default (state=initialState, action) => {
    switch (action.type) {
        case LOAD_SECTIONS:
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