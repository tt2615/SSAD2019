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
      `https://ssad2019-1cc69.firebaseio.com/users.json?`
    );

    if (!response.ok) {
        throw new Error('Something went wrong when get user!');
    }

    const resData = await response.json();
    for (const key in resData) {
      if (resData[key].userEmail===email){
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

export const updateStudent = (id, userEmail, userType, userName, character, totalScore) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    //update database
    const response = await fetch(
      `https://ssad2019-1cc69.firebaseio.com/users/${id}.json?auth=${token}`,
        {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          character,
          totalScore,
          userEmail,
          userName,
          userType
        })
      } 
    );

    if (!response.ok) {
      throw new Error('Something went wrong when update user information!');
    }

    //update store
    dispatch({
      type: UPDATE_USER,
      userType: 'student',
      userName: userName,
      character: character,
      totalScore: totalScore
    });
  };
};

export const updateTeacher = (id, userEmail, userType, userName, userFbAccount, userFbPassword, userTtAccount, userTtPassword) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    //update database
    const response = await fetch(
      `https://ssad2019-1cc69.firebaseio.com/users/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail,
          userFbAccount,
          userFbPassword,
          userName,
          userTtAccount,
          userTtPassword,
          userType
        })
      } 
    );

    if (!response.ok) {
      throw new Error('Something went wrong when update user information!');
    }

    //update store
    dispatch({
      type: UPDATE_USER,
      userType: 'teacher',
      userName: userName,
      userFbAccount: userFbAccount,
      userFbPassword: userFbPassword,
      userTtAccount: userTtAccount,
      userTtPassword: userTtPassword
    });    
  };
};