import React, { Component } from 'react';
import { Modal } from '../';

class Auth extends Component {

  constructor(props){
    super(props);

    this.state = {
      isOpen: false
    }
    this.ModalOpen = this.ModalOpen.bind(this);
    this.ModalClose = this.ModalClose.bind(this);
  }

  ModalOpen(){
      this.setState({
        isOpen: true
      });
  }

  ModalClose(){
      this.setState({
        isOpen: false
      });
  }

  render(){
    return (
      <div>
        <a href="/auth/facebook/callback">페이스북 로그인</a>
        <a href="#" onClick={() => this.ModalOpen()}>회원가입</a>
        <Modal isOpen={this.state.isOpen} onClose={() => this.ModalClose()}>
          <h1>회원가입</h1>
          <p>
            hello world
          </p>
          <div>
            <div>
              <input type="text" name="username" placeholder="username"/>
            </div>
            <div>
              <input type="password" name="password" placeholder="password"/>
            </div>
            <div>
              <input type="text" name="displayname" placeholder="displayname"/>
            </div>
          </div>
          <div>
            <a href="#">
              회원가입
            </a>
          </div>
          <span onClick={() => this.ModalClose()}>
            x
          </span>
        </Modal>
      </div>
    )
  }
}

export default Auth;
