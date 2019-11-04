import { LOAD_FB } from '../actions/fbActions';

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
            console.log(action);
            return {
                id: action.id,
                name: action.name,
                email: action.email,
                pictureUrl: action.pictureUrl,
                token: action.token           
            }

        default:
            return state;
    }
}