import React from 'react';
import profstyle from './Profile.module.css';
import {Redirect} from 'react-router-dom'
import classmypost from '../MainPage/MainPage.module.css'
import classes from '../Post/Post.module.css'
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
            <div className = {classmypost.title}> 
              <div>
                <img src = "https://s.yimg.com/ny/api/res/1.2/7bbMUDnuJ0DeybIOk_CVzQ--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/http://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/68ead40c4b63a59b3c33c2e01a647f19" 
                    alt = "avatar"
                />
              </div>  
            </div>
            <div className = {classmypost.postContent}>
              <h1 > {item.title} </h1>
              <h4 >{item.description}</h4>
            </div>
          </div>
      </div>
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
