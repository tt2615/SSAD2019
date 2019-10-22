import React from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

const ReportScreen = props => {
	// const [worldInfo,setWorldInfo]=useState(null);

	// const getAveWorldScore= async () => {
	// 	let world1=[];
	// 	let world2=[];
	// 	let worldName=[];

	// 	const response = await fetch(
    //         `https://ssad2019-1cc69.firebaseio.com/worlds.json?`
	// 	);
	// 	const resData = await response.json();
	// 	for (const key in resData){
	// 		for (const subkey in resData[key]){
	// 			if (resData[key][subkey].wid===1){
	// 				world1.push(resData[key][subkey].score);
	// 			}
	// 			else world2.push(resData[key][subkey].score);
	// 			if (checkPush(worldName,resData[key][subkey].name)) worldName.push(resData[key][subkey].name);
	// 		}
	// 	}

	// 	const worldObj=[{
	// 		name: worldName[0],
	// 		aveScore:eval(world1.join("+"))/world1.length
	// 	},
	// 	{
	// 		name: worldName[1],
	// 		aveScore: eval(world2.join("+"))/world2.length
	// 	}
	// ];
	// 	setWorldAve(worldObj);
	// };

	// const getAveSection= async() => {
	// 	let scoreforWorld1Array=[];
	// 	let scoreforWorld2Array=[];
	// 	let sectionNameArray=[];
	// 	const response = await fetch(
    //         `https://ssad2019-1cc69.firebaseio.com/sections.json?`
	// 	);
	// 	const resData = await response.json();
		
	// 	for (const key in resData[key]){
	// 		for (const subkey in resData[key][1]){
	// 			scoreforWorld1Array.push(resData[key][1][subkey].score);
	// 			if (checkPush(sectionNameArray,resData[key][1][subkey])) sectionNameArray.push(resData[key][1][subkey].name);
	// 		}
	// 		for (const subkey in resData[key][2]){
	// 			scoreforWorld2Array.push(resData[key][2][subkey].score);
	// 			if (checkPush(sectionNameArray,resData[key][2][subkey])) sectionNameArray.push(resData[key][2][subkey].name);
	// 		}
	// 	};
	// }

	const checkPush= (targetArray, targetContent)=>{
		if (targetContent in targetArray) return false;
		else return true;
	}

	return(
		<View>
			{/* {
				worldAve===null?<Text>Loading</Text>:
				worldInfo.map(res=>
					{
					<View>
						<View>
							<Text>{res.Name}</Text>
							<Text>{res.aveScore}</Text>
						</View>
						<View>
							
						</View>
					</View>
					})
			} */}
		</View>
	);
};

const styles = StyleSheet.create({
	
});

export default ReportScreen;