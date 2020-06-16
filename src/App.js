import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SigninAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import {auth, createUserProfileDocument} from './firebase/firebase.utils'

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      currentUser:null
    }
  }

  unsubscibeFromAuth = null;

  componentDidMount(){
    this.unsubscibeFromAuth=auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
          const userRef = await createUserProfileDocument(userAuth);
          userRef.onSnapshot(snapshot => {
            this.setState({
              currentUser:{
                id:snapshot.id,
                ...snapshot.data()
              }
            })
          })
          
      }
      else{
        this.setState({currentUser:userAuth})
      }
    })
  }

  componentWillUnmount(){
    this.unsubscibeFromAuth();
  }
  render(){
  return (
    <div>
      <Header currentUser = {this.state.currentUser} />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/signin' component={SigninAndSignUpPage} />
        
      </Switch>
      
      
    </div>
  );
}
}
export default App;
