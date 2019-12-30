import React from 'react';
import classes from './Comment.module.css'
import { Card, Paper } from '@material-ui/core';



class Comment extends React.Component {
  state = {
    message: '',
    visible: false,
    visible_form: false
  }
  render () {
    const onBtnClick = () => {
      this.props.addComment({
        message: this.state.message, 
        commentable_id: post_id, 
        commentable_type: 'Post'
      })
      this.setState({
        message: ''
      })
      this.props.watchComment()
    }

    const onBtnShowComments = () => {
      this.setState({ visible: true })
    }

    const onBtnHideComments = () => {
      this.setState({ visible: false })
    }

    const showFormComment = () => {
      this.setState({ visible_form: true })
    }

    const changeNewComment = (e) => {
      this.setState({ message: e.currentTarget.value })
    }

    let comments
    const post_id = this.props.thisPost.id
    if (this.props.data.comment.length) {
      comments = this.props.data.comment.map(function (item) {
        return (
          <div className={classes.card}>
            { item.commentable_id == post_id &&
              <div className={classes.comment_card} key={item.id}>
                <div className={classes.flex}>
                  <p className={classes.date}>Created at: {item.created_at}</p>
                  <p className={classes.user_id}>User ID:{item.user_id}</p>
                </div>
             
                <p className={classes.comment}>{item.message}</p>
              </div>
            }
          </div>
        )
      })
    } else if (this.props.data.comment.loading) {
      comments = <p>Load</p>
    } else {
      comments = <p>No Comments :(</p>
    }
    return(
      <div>
        {
          this.state.visible ? 
          <button className={classes.addbtn} onClick={onBtnHideComments}>Hide comments</button> 
          : 
          <button className={classes.addbtn} onClick={onBtnShowComments}>Show comments</button>
        }
        <button className={classes.addbtn} onClick={showFormComment}>Add comments</button>
        {
          this.state.visible_form &&
          <form>
            <textarea className={classes.comment_input} value={this.state.message} onChange={changeNewComment}></textarea><br/>
            <button className={classes.addbtn} onClick={onBtnClick}>Add and Close comments</button>
          </form>
        }
        { this.state.visible && <div>{comments}</div> }
      </div>
    )
  }
}

export default Comment;
