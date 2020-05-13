import React, { Component } from 'react';
import '../App.css';
import { AuthContext } from '../contexts/AuthContext';
import PublicView from '../components/PublicView/';
import PrivateView from '../components/PrivateView';
import UserGraph from "../components/UserGraph";
import ActiveUserDisplay from "../components/ActiveUserDisplay";
import TopUser from "../components/TopUser";
import UserFavorites from "../components/UserFavorites";
import Wrapper from "../components/Wrapper";
import Badges from "../components/Badges";

class Home extends Component {
  render() {
    return (
      <div>
          <AuthContext.Consumer>{(context) => {
            const { authenticated } = context;
            return (
              authenticated ? 
              <div className="container">
              <div>
                <Wrapper />
                <UserGraph />
                <Badges />
                <PrivateView />
                
              </div>
              </div>
              : <PublicView />
            )
          }}
          </AuthContext.Consumer>
      </div>
    );
  }
}
export default Home;