import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { watchFetchPost, addFetchPost } from '../sagas/saga'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import { rootReducer } from '../reducers/index'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(watchFetchPost);

