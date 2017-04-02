import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

class Myroom extends Component {
  componentDidMount(){
    if(!this.props.isLogin) browserHistory.push('/')
  }
  render(){
    return (
      <div>
        <h1>나의 정보</h1>
        <div>
          <h2>{this.props.type}</h2>
          <p>{this.props.profile.username}</p>
        </div>
        <a href="/auth/logout">로그아웃</a>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    profile: state.check.user.common_profile,
    type: state.check.user.type,
    isLogin: state.check.isLogin
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch);
}

Myroom.defaultProps = {
    profile: {}
}

export default connect(mapStateToProps)(Myroom);
