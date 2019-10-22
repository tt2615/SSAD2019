import {LOAD_QUESTIONS} from '../actions/questionActions';

const initialState={
    easy:[{
        qid: 1,
        diffLvl: 1,
        questionText: 'Are you idiot?',
        options:['Yes','No'],
        correctOption: 1,
        score: 1,
    },
    {
        qid: 2,
        diffLvl: 1,
        questionText: 'Are you idiot2?',
        options:['Yes','No'],
        correctOption: 1,
        score: 1,
    },
    {
        qid: 3,
        diffLvl: 1,
        questionText: 'Are you idiot3?',
        options:['Yes','No'],
        correctOption: 1,
        score: 1,
    },
    {
        qid: 4,
        diffLvl: 1,
        questionText: 'Are you idiot4?',
        options:['Yes','No'],
        correctOption: 1,
        score: 1,
    },
    {
        qid: 5,
        diffLvl: 1,
        questionText: 'Are you idiot5?',
        options:['Yes','No'],
        correctOption: 1,
        score: 1,
    }],
    medium:[{
        qid: 6,
        diffLvl: 2,
        questionText: 'Are you a fool?',
        options:['Yes','No'],
        correctOption: 1,
        score: 2,
    },
    {
        qid: 7,
        diffLvl: 2,
        questionText: 'Are you a fool2?',
        options:['Yes','No'],
        correctOption: 1,
        score: 2,
    }],
    difficult:[{
        qid: 8,
        diffLvl: 3,
        questionText: 'Are you happy?',
        options:['Yes','No'],
        correctOption: 1,
        score: 3,
    },
    {
        qid: 9,
        diffLvl: 3,
        questionText: 'Are you happy2?',
        options:['Yes','No'],
        correctOption: 1,
        score: 3,
    },
    {
        qid: 10,
        diffLvl: 3,
        questionText: 'Are you happy3?',
        options:['Yes','No'],
        correctOption: 1,
        score: 3,
    }]
};

export default (state=initialState, action) => {
    switch (action.type) {
        case LOAD_QUESTIONS:
            return state;
        default:
            return state;
        }

}