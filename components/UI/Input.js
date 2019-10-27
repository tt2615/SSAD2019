/*Input Component
	param required: 
		label, 
		id (input type which matchs Constrains), 
		onInputChange (function pointer)
*/
import React, { useReducer, useEffect } from 'react';
import { 
	View, 
	Text, 
	TextInput, 
	StyleSheet 
} from 'react-native';
import validate from 'validate.js';

import Constrains from '../../constants/Constrains';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

//input Reducer: manage states of the input: value, isValid, 
const inputReducer = (state,action) => {
	switch (action.type) {
		case INPUT_CHANGE:
			return {
				...state,
				value: action.value,
				isValid: action.isValid
			};
		case INPUT_BLUR:
			return {
				...state,
				touched: true
			};
		default:
			return state;
	}	
};

const Input = props => {

	//register inputReducer and initialise inputState
	const [inputState, dispatch] = useReducer(inputReducer, {
		//initial State
		value: props.initialValue ? props.initialValue : '',
		isValid: props.initialValidity,
		touched: false //if user has ever entered anything
	});

	//update input to parents
	const { onInputChange, id } = props; //destruct props
	
	useEffect(()=>{
		//inform parent whenever there is change in value
		onInputChange(id, inputState.value, inputState.isValid);
	}, [inputState, onInputChange, id]);

	//validate input legitimacy
	const errorMessage = '';
	const textChangeHandler = text => {
		const validationResult = validate({id:text}, Constrains);
		let isValid = validationResult ? false : true;
		errorMessage = validationResult.id[0];
		dispatch({type:INPUT_CHANGE, value: text, isValid: isValid});
	}

	//mark input as touched when it lose focus
	const lostFocusHandler = () => {
		dispatch({type: INPUT_BLUR});
	};

	return (
<<<<<<< Updated upstream
		<View style={sytles.inputControl}>
			<Text style={styles.label}>
=======
		<View style={styles.inputControl}>
			<View style={{paddingTop: 20}}>
				<Text style={styles.label}>
>>>>>>> Stashed changes
				{props.label}
				</Text>
			</View>
			<TextInput
				{...props}
				style={styles.input}
				value={inputState.value}
				onChangeText={textChangeHandler}
				onBlur={lostFocusHandler}
			/>
			{//show error msg for invalid input (after touched)
				!inputState.isValid && inputState.touched && (
					<View style={styles.errorContainer}>
						<Text style={styles.errorText}>
							{errorMessage}
						</Text>
					</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	inputControl: {
		width: '100%'
	},
	label: {

	},
	input: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1
	},
	errorContainer: {
		marginVertical: 5
	},
	errorText: {
		color: '#e74c3c',
		fontSize: 11
	}
});

export default Input; 

