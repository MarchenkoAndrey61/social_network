import React from 'react';
import classes from './Post.module.css'
import { Typography, Card,CardContent, Button } from '@material-ui/core';
import Comment from './Comment/Comment';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import classmypost from '../MainPage/MainPage.module.css'

class Post extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      id: null,
      title: '',
      description: '',
      visible: false,
      visible_form: false,
      redact: false,
    }
  }

  render() {
    if (!localStorage.getItem('Uid')) {
      return <div><Redirect to={'/login'} /></div> 
    } 
    let showPost
    const post = this.props.data.post
    const number_post = this.props.match.params.post

    if (post[0]) {
      post.forEach(item => {
        if (item.id == Number(number_post)) {
          showPost = item
        }
      });
    }
    

    const onRedactClick = () => {
      this.setState({ id: showPost.id, title: showPost.title, 
        description: showPost.description, 
        redact: true })
    }

    const onCancel = () => {
      this.setState({ redact: false })
    }

    const onEditChange = (e) => {
      const { id } = e.currentTarget
      this.setState({ [id]: e.currentTarget.value })
    }

    const onEdit = () => {
      this.props.fetchEdit({ id:this.state.id, title: this.state.title, description: this.state.description})
      this.setState({ redact: false })
    }

    if (showPost) {
      return (
          <Card className={classes.card}>
            <div className={classes.info} >
            <div className={classes.flex}>
              <p className={classes.date} >
                  Created at:{' ' + showPost.created_at}
                </p>
                <p className={classes.user_id}>
                  User ID:{' ' + showPost.user_id}
                </p>
            </div>
              
            </div>
              <CardContent>
                {
                  this.state.redact ? 
                  <div>
                    {console.log (this.state)}
                    <div className={classes.post}>
                      <input id='title' className={classes.title_input} onChange={onEditChange} defaultValue={this.state.title} /><br/>
                      <textarea className={classes.description_input}
                      id='description' onChange={onEditChange} defaultValue={this.state.description}/><br/>
                    
                  </div>
                  <div className = {classmypost.postContent}>
                    <div onClick={onRedactClick}>

                      <h1 > {showPost.title} </h1>
                    </div>
                  
                    <h4 >{showPost.description}</h4>
                  </div>
                  <Button className={classes.addbtn} onClick={onEdit} variant="contained" color="primary">
                        Edit
                      </Button>{' '}
                      <Button className={classes.addbtn} onClick={onCancel} variant="contained" color="primary">
                        Cancel
                      </Button>
              </div>
               
                  : 
                    <div className={classes.post}>
                      <div className = {classmypost.topContent}>
                    <div className = {classmypost.title}> 
                      
                    </div>
                    <div className = {classmypost.postContent}>
                    <div onClick={onRedactClick}>
                      <div className = {classmypost.postPointer}> 
                             <h1 > {showPost.title} </h1>
                      </div>
                      </div>
                      <h4 >{showPost.description}</h4>
                    </div>
                  </div>
                    </div>
                    
                }
              <div>
                <div>
                <Link to="#" className={classes.link} dissable>
                  <Comment thisPost={showPost}
                           data={this.props.data} 
                           watchComment={this.props.watchComment}
                           addComment={this.props.addComment} />
                </Link>
                </div>
              </div>
              </CardContent>
          </Card>
      )
    } else if(post.loading) {
      return (
        <p>Load</p>
      )
    } else {
      return (
        <p>This post is undefined :(</p>
      )  
    }
  }
}

export default Post;