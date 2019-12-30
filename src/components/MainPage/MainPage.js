import React from 'react';
import classmypost from './MainPage.module.css'
import {Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import {NavLink} from "react-router-dom"
import {Form} from 'react-bootstrap';

class MainPage extends React.Component {
  state = {
    title: '',
    description: '',
  }

  onBtnClick = () => {
    this.props.addPost(this.state)
    this.setState({
      title: '',
      description: '',
    })
    this.props.watchPost()
  }

  changeNewPost = (e) => {
    const { id } = e.currentTarget
    this.setState({ [id]: e.currentTarget.value })
  }

  render () {
    if (!localStorage.getItem('Uid')) {
      return <div><Redirect to={'/login'} /></div> 
    } 
    const comments = this.props.data.comment

    let allPosts
    if (this.props.data.post[0]) {
      allPosts = this.props.data.post.sort(function (a, b) {
        if (a.created_at > b.created_at) {
          return -1;
        }
        if (a.created_at < b.created_at) {
          return 1;
        }
        return 0;
      });
    }

    if (this.props.data.post.length) {
      allPosts = this.props.data.post.map(function (item) {
        let comCount = []
        if(comments[0]) {
          comments.forEach(i => {
            if (i.commentable_id == item.id) {
              comCount.push(i)
            }
          });
        }
        return (
          <div key={item.id} className={classmypost. main}>
          <div className = {classmypost.topContent}>
            <div className = {classmypost.title}> 
            
            </div>
            <div className = {classmypost.postContent}>
              <h1 > {item.title} </h1>
              <h4 >{item.description}</h4>
            </div>
          </div>
            <div>
              
            </div>
            <NavLink to={`/post/${item.id}`} className = {classmypost.NavLink}>Check Post</NavLink>
            <div>
               Comments:{comCount.length}
            </div>
        </div>
        )
      })
    } else if (this.props.data.post.loading) {
      allPosts = <p>Load...</p>
    } else {
      allPosts = <p>No posts :(</p>
    }
    return (
      <div >  
        <Form className = {classmypost.forma}>
            <h1>Add New Post</h1>
            <Form.Group controlId="exampleForm.ControlInput1">
              <div className = {classmypost.titl}>
                <Form.Label> <h2> Title </h2> </Form.Label> 
                <Form.Control className = {classmypost.inp} name='title' id='title' onChange={this.changeNewPost}  placeholder="Add Title" value ={this.state.title} /> 
              </div>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <div className = {classmypost.desc}>
                <Form.Label rows="10" cols="20" > <h2>Textarea</h2></Form.Label>
                <Form.Control className = {classmypost.inp} name='description' id ='description' 
                                                onChange={this.changeNewPost} 
                                                placeholder="Add Description"  
                                                as="textarea" 
                                                rows="3" 
                                                value ={this.state.description} 
                />
              </div>
              
            </Form.Group>
            <Button className= {classmypost.addbtn} onClick={this.onBtnClick} variant="dark">Add post</Button>
          </Form>  
          <div clas>
            <p>post count: {this.props.data.post.length}</p>
          </div>     
        <div >
          {allPosts}
        </div>
      </div>
    );
  }
}

export default MainPage;