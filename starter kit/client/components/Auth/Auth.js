import React, { Component } from 'react';
import { Modal } from '../';
import { localRegisterRequest } from '../../actions/register';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Auth extends Component {

  constructor(props){
    super(props);

    this.state = {
      isOpen: false,
      username:'',
      password:''
    }
    this.ModalOpen = this.ModalOpen.bind(this);
    this.ModalClose = this.ModalClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
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

  handleChange(e){
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    console.log(nextState);
  }

  handleRegister(){
    const { username, password } = this.state
    const data = {
      username,
      password
    }
    this.props.localRegisterRequest(data);
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
              <input
                type="text"
                name="username"
                placeholder="username"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div>
            <a href="#" onClick={this.handleRegister}>
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

function mapStateToProps(state){
  return {
    status: state.check.status
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    localRegisterRequest
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
