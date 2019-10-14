//input criteria

export default {
	email: {
		presence: {
			allowEmpty: false
		},
		email: true
	},
	password: {
		presence: {
			allowEmpty: false
		},
		format:{
			//requirement: len>6, small and cap letter, digit
			pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
			message:"must conatin at least 6 numbers, with a mixtrue of digits, small letters and capital letters"
		}
	},
	username: {
		presence: {
			allowEmpty: false
		},
		length: {
			maximum: 30
		}
	}
}