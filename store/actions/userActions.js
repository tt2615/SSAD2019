export const LOAD_USER = 'LOAD_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const addStudent = (email, type, name, character, totalScore) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `https://ssad2019-1cc69.firebaseio.com/users.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: email,
          userType: type,
          userName: name,
          character: character,
          totalScore: totalScore
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong when add user!');
    }
  };
};

//add new teacher to database 
export const addTeacher = (email, type, name, fbAccount, fbPassword, TtAccount, TtPassword) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `https://ssad2019-1cc69.firebaseio.com/users.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userEmail: email,
            userType: type,
            userName: name,
            userFbAccount: fbAccount,
            userFbPassword: fbPassword,
            userTtAccount: TtAccount,
            userTtPassword: TtPassword
          })
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong when add teacher!');
      }
  };
};

export const getUser = (email) => {
  return async (dispatch,getState) => {
    // const token = getState().auth.token;
    const response = await fetch(
      `https://ssad2019-1cc69.firebaseio.com/users/.json?`
    );

    if (!response.ok) {
        throw new Error('Something went wrong when get user!');
    }

    const resData = await response.json();
    for (const key in resData) {
      console.log(resData[key]);
      if (resData[key].userEmail===email){
        console.log(resData[key]);
        if(resData[key].userType==='student'){ 
          //load student Info to store
          await dispatch({
            type: LOAD_USER,
            userId: key,
            userEmail: resData[key].userEmail,
            userType: resData[key].userType,
            userName: resData[key].userName,
            character: resData[key].character,
            totalScore: resData[key].totalScore
          });
          return;
        } else {
          await dispatch({
            //load teacher Info to store
            type: LOAD_USER,
            userId: key,
            userEmail: resData[key].userEmail,
            userType: resData[key].userType,
            userName: resData[key].userName,
            userFbAccount: resData[key].userFbAccount,
            userFbPassword: resData[key].userFbPassword,
            userTtAccount: resData[key].userTtAccount,
            userTtPassword: resData[key].userTtPassword
          })
          return;
        }
      }
    }
  };
};