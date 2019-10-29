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
				isValid: action.isValid,
				error: action.error
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

	//update input to parents
	const { onInputChange, id } = props; //destruct props

	//register inputReducer and initialise inputState
	const [inputState, dispatch] = useReducer(inputReducer, {
		//initial State
		value: props.initialValue ? props.initialValue : '',
		isValid: props.initialValidity ? props.initialValidity : false,
		touched: false,//if user has ever entered anything
		error: validate({[id]:props.initialValue ? props.initialValue : ''}, Constrains)[id] ? validate({[id]:props.initialValue ? props.initialValue : ''}, Constrains)[id][0] : ''
	});
	
	useEffect(()=>{
		//inform parent whenever there is change in value
		onInputChange(id, inputState.value, inputState.isValid);
	}, [inputState, onInputChange, id]);

	//validate input legitimacy
	const textChangeHandler = text => {
		const validationResult = validate({[id]:text}, Constrains);
		const isValid = validationResult[id] ? false : true;
		const errorMessage = validationResult[id] ? validationResult[id][0] : '';
		dispatch({type:INPUT_CHANGE, value: text, isValid: isValid, error: errorMessage});
	}

	//mark input as touched when it lose focus
	const lostFocusHandler = () => {
		dispatch({type: INPUT_BLUR});
	};

	return (
		<View style={styles.inputControl}>
			<View 
			// style={{paddingTop: 20}}
			>
				{/* <Text style={styles.label}>
				{props.label}
				</Text> */}
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
						{inputState.error}
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
		width:'100%',
		textAlign:'center',
		marginTop:20,
		color: '#DAA520',
		fontFamily: 'trajan-pro',
		fontSize: 18,
	},
	input: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		color:'#ffffff',
		backgroundColor:'#00000088',
		width:'100%',
		textAlign:'center'
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

