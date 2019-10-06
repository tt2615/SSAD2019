//input criteria

export default {
	userID: {
		presence: {
			allowEmpty: false
		},
		format:{
			pattern: /[A-Z][0-9]{7}[A-Z]/,
			message: "must be a valid matriculation No."
		}
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
	}
}