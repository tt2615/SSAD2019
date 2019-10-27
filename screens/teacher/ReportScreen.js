import React, {useState,useEffect} from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

const ReportScreen = props => {
	const [worldAveScore,setWorldAveScore]=useState(null);
	const [sectionAveScore,setSectionAveScore]=useState(null);

	const getAveWorldScore= async () => {
		let wid=[];
		let wname=[];
		let worldScores=[];
		let worldAveScore=[];
		let worldObj=[];
		let count=0;
		let first=true;

		const response = await fetch(
            `https://ssad2019-1cc69.firebaseio.com/worlds.json?`
		);
		const resData = await response.json();
		for (const key in resData){
			for (const subkey in resData[key]){
				if (first){
					if (wid.indexOf(resData[key][subkey].wid)===-1){
						wid.push(resData[key][subkey].wid);
						wname.push(resData[key][subkey].name);
						worldScores.push([]);
					}
				}
				worldScores[resData[key][subkey].wid-1].push(resData[key][subkey].score);
			}
			first=false;
			count+=1;
		};
		for (let i=0;i<worldScores.length;i++){
			worldAveScore.push(eval(worldScores[i].join("+"))/count);
		};
		for (let i=0;i<wid.length;i++){
			worldObj.push({
				wid: wid[i],
				wname: wname[i],
				aveScore: worldAveScore[i].toFixed(2)
			})
		};

		setWorldAveScore(worldObj);
	};

	const getAveSectionScore= async() => {
		let first=true;
		let sectionScore=[];
		let sectionAveScore=[];
		let sectionName=[];
		let sectionId=[];
		let sectionObj=[];
		let count=0;

		const response = await fetch(
            `https://ssad2019-1cc69.firebaseio.com/sections.json?`
		);
		const resData = await response.json();

		for (const user in resData){
			for (const world in resData[user]){
				if (world!=0){
					if (first){
						sectionScore.push([]);
						sectionName.push([]);
						sectionId.push([]);
						sectionAveScore.push([]);
						sectionObj.push([]);
					};
					for (const section in resData[user][world]){
						if (first){
							sectionName[world-1].push(resData[user][world][section].name);
							sectionId[world-1].push(resData[user][world][section].sid);
							sectionScore[world-1].push([]);
						}
						let tempIndex=resData[user][world][section].sid%3-1;
						if (tempIndex===-1) tempIndex=2;
						sectionScore[world-1][tempIndex].push(resData[user][world][section].score);
					}
				}
			}
			count+=1;
			first=false;	
		}
		for (let i=0; i<sectionScore.length;i++){
			for (let j=0; j<sectionScore[i].length;j++){
				sectionAveScore[i].push(eval(sectionScore[i][j].join('+'))/count);
			}
		}

		for (let i=0; i<sectionId.length;i++){
			for (let j=0;j<sectionId[i].length;j++){
				sectionObj[i].push({
					sid: sectionId[i][j],
					sname: sectionName[i][j],
					aveScore: sectionAveScore[i][j].toFixed(2)
				})
			}
		};
	
		setSectionAveScore(sectionObj);


	}

	useEffect(()=>{
		getAveSectionScore();
		getAveWorldScore();

	},[])

	return(
		<View>
			{
				worldAveScore===null?<Text>Loading</Text>:
				<View>
				{
					worldAveScore.map(res=>
							<View style={styles.worldStat} key={res.wid}>
								<Text>{res.wname}</Text>
								<Text>{res.aveScore}</Text>
								<View style={styles.sectionContainer}>
								{sectionAveScore[worldAveScore.indexOf(res)].map(subres=>
									<View style={styles.sectionStat} key={subres.sid}>
										<Text>{subres.sname}</Text>
										<Text>{subres.aveScore}</Text>
									</View>
								)}
								</View>
							</View>
						)
				}
				</View>
			}
		</View>
	);
};

const styles = StyleSheet.create({
	worldStat: {},
	sectionContainer: {},
	sectionStat: {}
});

export default ReportScreen;