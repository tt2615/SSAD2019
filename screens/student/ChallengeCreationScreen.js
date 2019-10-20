import React, {useState} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Picker,
	Button,

} from 'react-native';

const ChallengeCreationScreen = props => {
	const [diffLvl, setDiffLvl] = useState('Easy');
	const [opponent, setOpponent] = useState();
	const [err, setErr] = useState();
	const [isLoading, setIsLoading] = useState(false);

	return(
		<View style={styles.screen}>
			<Text>Difficulty Level</Text>
			<Picker
				selectedValue={diffLvl}
				style={styles.diffcultyLvl}
				onValueChange={(itemValue, itemIndex) =>
				    {setDiffLvl(itemValue)}
				}>
				<Picker.Item label="Easy" value="1" />
				<Picker.Item label="Medium" value="2" />
				<Picker.Item label="Hard" value="3" />
			</Picker>
			<Text>Choose Component</Text>
			<Picker
				selectedValue={diffLvl}
				style={styles.diffcultyLvl}
				onValueChange={(itemValue, itemIndex) =>
				    {}
				}>
				<Picker.Item label="a" value="1" />
			</Picker>
			<Button
				title='Challenge!'
				onPress={()=>{}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {

	},
	diffcultyLvl:{
	}

});

export default ChallengeCreationScreen;