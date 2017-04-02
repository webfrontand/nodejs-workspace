import React, { Component } from 'react';
import styles from './App.css';
import { checkLoginRequest } from '../../actions/checking';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class App extends Component {
    componentDidMount(){
      this.props.checkLoginRequest();
    }
    componentWillMount() {
        document.body.style.margin = 0;
        document.body.style.padding = 0;

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
    status: state.check.status
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    checkLoginRequest
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
