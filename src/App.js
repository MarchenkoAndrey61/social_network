import React from 'react';
import { connect } from 'react-redux'
import './App.css';
import MainPage from './components/MainPage/MainPage';
import Header from './components/Header/Header';
import Post from './components/Post/Post';
import { Paper } from '@material-ui/core';
import { 
    addPost, 
    watchPost, 
    fetchEdit, 
    watchComment,
    addComment,
    currentPost,
    myProfile,
  } from './actions/actions';
import { BrowserRouter, Route } from 'react-router-dom'
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import { postReducer } from './reducers/posts';

class App extends React.Component {
  state = {
    'Access-Token': localStorage.getItem('Access-Token'),
    'Client': localStorage.getItem('Client'),
    'Uid': localStorage.getItem('Uid'),
  }

  componentDidMount() {
    this.props.watchPostAction()
    this.props.watchCommentAction()
    this.props.myProfileAction()
  }

  render() {
    const {
        post, 
        addPostAction, 
        watchPostAction, 
        fetchEditAction, 
        watchCommentAction,
        addCommentAction,
        currentPostAction,
        myProfileAction,
      } = this.props
    
    const wrapperPost = (props) => {
      return <Post { ...props } data={post}
                                currentPost={currentPostAction}
                                addComment={addCommentAction} 
                                fetchEdit={fetchEditAction}
                                watchComment={watchCommentAction} />
    }
    
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Paper className="paper">
            <Route path='/main' render={ () => 
              <MainPage watchPost={watchPostAction}
                        watchComment={watchCommentAction}
                        data={post} 
                        addPost={addPostAction}
                        myProfile={myProfileAction} />} />
            <Route path='/sign_up' render={ () => 
              <Registration />} />
            <Route path='/login' render={ () => 
              <Login />} />
            <Route path='/post/:post' component={wrapperPost} />
            <Route path='/profile' render={ () => 
              <Profile data={post} addPost={addPostAction} myProfile={myProfileAction}/>} />
          </Paper>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = store => {
  return {
    post: store
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPostAction: (title, description) => dispatch(addPost(title, description)),
    watchPostAction: () => dispatch(watchPost()),
    fetchEditAction: (data) => dispatch(fetchEdit(data)),
    watchCommentAction: () => dispatch(watchComment()),
    addCommentAction: (
                      message, 
                      commentable_id, 
                      commentable_type
                      ) => dispatch(addComment(
                                                message, 
                                                commentable_id, 
                                                commentable_type
                                                )),
    currentPostAction: (id) => dispatch(currentPost(id)),
    myProfileAction: () => dispatch(myProfile()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
