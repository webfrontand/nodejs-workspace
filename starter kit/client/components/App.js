import React from 'react';
import styles from './App.css';

export default class App extends React.Component {
    componentDidMount(){
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
                    <a href="/auth/facebook/callback">페이스북 로그인</a>
                    <a href="/logout">로그아웃</a>
                </div>
            </div>
        );
    }
}
