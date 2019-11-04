import { LOAD_FB, DELETE_FB } from '../actions/fbActions';

const initialState= {
    id: '',
    name: '',
    email: '',
    token: null,
    pictureUrl: null
};

export default (state=initialState, action)=> {
    switch (action.type){
        case LOAD_FB:
            return {
                id: action.id,
                name: action.name,
                email: action.email,
                pictureUrl: action.pictureUrl,
                token: action.token           
            }
        case DELETE_FB:
            return initialState;

        default:
            return state;
    }
}