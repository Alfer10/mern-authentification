import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { attemptGetUser } from "./store/thunks/user";
import R from "./utils/ramda";

import ConfirmPage from "./components/pages/ConfirmPage/ConfirmPage.jsx";
import Home from "./components/pages/Home/Home.jsx";
import Profile from "./components/pages/Profile/Profile.jsx";
import NavBar from "./components/pages/NavBar/NavBar.jsx";
import Login from "./components/pages/Login/Login.jsx";
import LoginForgot from "./components/pages/LoginForgot/LoginForgot.jsx";
import LoginResetPassword from "./components/pages/LoginResetPassword/LoginResetPassword.jsx";
import Logout from "./components/pages/Logout/Logout.jsx";
import Register from "./components/pages/Register/Register.jsx";
import ProtectedRoute from "./components/common/protectedRoute";

import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.props
      .attemptGetUser()
      .then(() => this.setState({ loading: false }))
      .catch(() => this.setState({ loading: false }));
  }
  render() {
    const { store, history } = this.props;
    return (
      !this.state.loading && (
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <React.Fragment>
              <ToastContainer position="top-right" autoClose={2500} />
              <NavBar />
              <Switch>
                <Route path="/home" exact component={Home} />
                <ProtectedRoute path="/my-profile" exact component={Profile} />
                <Route
                  path="/account/confirm/:token"
                  exact
                  component={ConfirmPage}
                />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/login/forgot" exact component={LoginForgot} />
                <Route
                  path="/login/reset/:token"
                  component={LoginResetPassword}
                />
                <ProtectedRoute path="/logout" exact component={Logout} />
                <Redirect from="/" exact to="/home" />
                <Redirect to="/home" />
              </Switch>
            </React.Fragment>
          </ConnectedRouter>
        </Provider>
      )
    );
  }
}

const mapDispatchToProps = dispatch => ({
  attemptGetUser: () => dispatch(attemptGetUser())
});

const mapStateToProps = R.pick([]);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
