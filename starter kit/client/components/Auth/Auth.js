import React, { Component } from 'react';

class Auth extends Component {
  render(){
    return (
      <div>
        <a href="/auth/facebook/callback">페이스북 로그인</a>
        <a href="#">회원가입</a>
      </div>
    )
  }
}

export default Auth;
