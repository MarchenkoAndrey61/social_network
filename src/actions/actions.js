export const ADD_POST = 'ADD_POST'
export const ADD_USER = 'ADD_USER'
export const ADD_COMMENT = 'ADD_COMMENT'
export const FETCHED_POST = 'FETCHED_POST'



export const myProfile = () => {
  return { type: 'FETCHED_MY_PROFILE' }
}

export const addPost = (data) => {
  return { type: 'ADD_POST', data }
}

export const addComment = (data) => {
  return { type: 'ADD_COMMENT', data }
}

export const watchPost = () => {
  return { type: 'FETCHED_POST' }
};

export const currentPost = (id) => {
  return { type: 'CURRENT_POST', id }
};

export const watchComment = () => {
  return { type: 'FETCHED_COMMENT' }
};

export const fetchEdit = (data) => {
  return { type: 'FETCHED_EDIT_POST', data }
};

export function addUser(
  email, password, password_confirm, first_name = '', last_name = ''){
    return dispatch => {
      dispatch({
        type: ADD_USER,
        payload_1: email,
        payload_2: password,
        payload_3: password_confirm,
        payload_4: first_name,
        payload_5: last_name,
      })
    }
  }




