import React from 'react';
import profstyle from './Profile.module.css';
import {Redirect} from 'react-router-dom'
import classmypost from '../MainPage/MainPage.module.css'
import classes from '../Post/Post.module.css'
import {NavLink} from "react-router-dom"
class Profile extends React.Component {
  render () { 
    if (!localStorage.getItem('Uid')) {
      return <div><Redirect to={'/login'} /></div> 
    } 
    let myPosts = []
    if (this.props.data.post[0] && this.props.data.profile.id) {
      if (this.props.data.post && this.props.data.profile.id) {
          this.props.data.post.forEach(item => {
            if (item.user_id == this.props.data.profile.id) {
              myPosts.push(item)
            }
          })
      }
    }
    
    const showMyPost = myPosts.map(function (item) {
      return (
        <div key={item.id} className={classmypost. main}>

        <div className={classes.post}>
          <div className = {classmypost.topContent}>
          
            <div className = {classmypost.postContent}>
              <h1 > {item.title} </h1>
              <h4 >{item.description}</h4>
            </div>
          </div>
      </div>
      <NavLink to={`/post/${item.id}`} className = {classmypost.NavLink}>Check Post</NavLink>
    </div>
       
      )
    })
    return ( 
      <div>
        <div className = {profstyle.mainContent}>
          <div className = {profstyle.logo}>
            <img src = "https://cq.ru/wp-content/uploads/2019/08/avatarka-58.jpg"
                alt = "avataka"
            /> 
            <div className = {profstyle.desc}>
              <div>
                <h4>E-mail</h4>
                <p>{this.props.data.profile.email}</p>
              </div>
              <div>
                <h4>First name:</h4>
                <p>{this.props.data.profile.firs_name}</p>
              </div>
              <div>
                <h4>Last name:</h4>
                <p>{this.props.data.profile.second_name}</p>
              </div>
              
            </div>

          </div>
        </div>
        <h1>Your Post:</h1>
        {showMyPost}
      </div>
        )
      
  }
}      

export default Profile;
