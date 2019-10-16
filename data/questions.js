import Question from '../models/question';

const QUESTIONS = [
	new Question(
		1,
		1,
		1,
		'world1 section1 diff1',
		'correct',
		'wrong',
		'wrong',
		null,
		1,
		1
	),
	new Question(
		2,
		1,
		1,
		'world1 section1 diff2.1',
		'correct',
		'wrong',
		'wrong',
		null,
		1,
		2
	),
	new Question(
		2,
		1,
		1,
		'world1 section1 diff2.2',
		'correct',
		'wrong',
		'wrong',
		null,
		1,
		2
	),
	new Question(
		3,
		1,
		1,
		'world1 section1 diff3.1',
		'correct',
		'wrong',
		'wrong',
		null,
		1,
		3
	),
	new Question(
		3,
		1,
		1,
		'world1 section1 diff3.2',
		'wrong',
		'correct',
		'wrong',
		null,
		2,
		3
	)
];

export default QUESTIONS;