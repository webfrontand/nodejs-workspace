import React, { Component } from 'react';
import styles from './App.css';
import { checkLoginRequest } from '../../actions/check';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class App extends Component {
    componentDidMount(){
      this.props.checkLoginRequest();
      console.log('componentDidMount');
    }
    componentWillMount() {
        document.body.style.margin = 0;
        document.body.style.padding = 0;
        console.log('componentWillMount');
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.testing}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
  return {
    status: state.user.user.status
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    checkLoginRequest
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
