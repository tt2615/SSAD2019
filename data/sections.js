import Section from '../models/section';

const SECTIONS = [
    new Section(
        1,
        1,
        'OverView',
        0,
        true
    ),
    new Section(
        2,
        1,
        'Requirement Elicitaion-What',
        0,
        false
    ),
    new Section(
        3,
        1,
        'Requirement Elicitation-How',
        0,
        false
    ),
    new Section(
        4,
        2,
        'Requirement Elicitation Techniques',
        0,
        true
    ),
    new Section(
        5,
        2,
        'Requirement Analysis',
        0,
        false
    ),
    new Section(
        6,
        2,
        'Context Diagram',
        0,
        false
    )
];

export default SECTIONS;