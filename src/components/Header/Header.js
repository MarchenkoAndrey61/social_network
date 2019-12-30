import React from 'react';
import classhead from './Header.module.css';
import { Redirect} from 'react-router-dom'
import {NavLink} from "react-router-dom";
class Header extends React.Component {
  state ={
    redirect: false
  }

  logOut = () => {
    localStorage.clear()
    this.setState({ redirect: true })
    window.location.reload();
  }
  render () {
    if (this.state.redirect)
      return <div><Redirect to={'/main'} /></div> 
    return (       
      <header className= {classhead.header}>
      <div className = {classhead.flexstyle}>
        <img src="https://retohercules.com/images/dell-logo-transparent-11.png"  alt = "logo"/>
        <h5>Social Network</h5>
      </div>
      <div className = {classhead.reg}>
          <NavLink to= "/main" activeClassName = {classhead.NavLink}>Main</NavLink >
          <NavLink to= "/profile" activeClassName = {classhead.NavLink}>Profile</NavLink> 
          { !localStorage.getItem('Uid') ?
          <div>
            <NavLink to= "/login" className = {classhead.NavLink}>Log In</NavLink> 
            <NavLink to= "/sign_up" className = {classhead.NavLink} >Sing Up</NavLink>  
          </div>
          :
          <div>
            <NavLink to= "/sign_in" className = {classhead.NavLink} onClick={this.logOut} >Log Out</NavLink>
          </div>
          }
         
      </div>
    </header>
    )
  }
}         

export default Header;
