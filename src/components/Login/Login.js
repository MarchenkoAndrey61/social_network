import React from 'react';
import Log from'./Login.module.css'
import { TextField, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom'


class Login extends React.Component {
  state = { 
    email: '',
    password: '',
    redirect: false,
  }

  onInputChange = (e) => {
    const { name } = e.currentTarget
    this.setState({ [name]: e.currentTarget.value })
  }

  onBtnClick = () => {  
    fetch('https://postify-api.herokuapp.com/auth/sign_in', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      localStorage.setItem( 'Access-Token', response.headers.get('Access-Token'));
      localStorage.setItem('Client', response.headers.get('Client'));
      localStorage.setItem('Uid', response.headers.get('Uid'));
      this.setState({ redirect: true })
      window.location.reload();
    })
  }

  render () {
    const { redirect } = this.state

    if (redirect || localStorage.getItem('Uid')) {
      return <div><Redirect to={'/main'} /></div> 
    } 
    return (
      <form className={Log.root} noValidate autoComplete="off">
      <div className = {Log.forma}>
        <TextField id="standard-basic" 
                   label="E-mail" 
                   type = "text" 
                   name = "email" 
                   required 
                   onChange={this.onInputChange}
                   maxlength= "15"
        />
        <TextField id="standard-basic" 
                   label="Password" 
                   type = "password" 
                   name = "password"
                   autoComplete="current-password" 
                   onChange={this.onInputChange}
                   maxlength= "15"
        />
        <div className = {Log.btn}> 
          <Button onClick={this.onBtnClick} variant="contained" >Enter</Button>
        </div>
      </div>
    </form>
    );
  }
}

export default Login;



const f = {
  "email": "example@mail.com", 
  "password": "11111111" 
}
//   const r = {
//      "email": "example@mail.com", 
//      "password": "11111111", 
//      "passwrod_confirmation": "11111111", 
//      "first_name": "", 
//      "last_name": ""
//   }
// fetch('https://postify-api.herokuapp.com/auth', {
//     method: 'POST',
//     body: JSON.stringify(r),
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })

  // fetch('https://postify-api.herokuapp.com/auth/sign_in', {
  //     method: 'POST',
  //     body: JSON.stringify(f),
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  // })