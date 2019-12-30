import { combineReducers } from 'redux'
import { postReducer } from './posts'
import { userReducer } from './users'
import { reducerPost, reducerComment, reducerCurrentPost, reducerMyProfile } from '../sagas/saga'

export const rootReducer = combineReducers({
  post: reducerPost,
  comment: reducerComment,
  current_post: reducerCurrentPost,
  profile: reducerMyProfile,
})
