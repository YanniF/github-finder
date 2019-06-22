import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';
import './App.css';

class App extends Component {
	state = {
		users: [],
		user: {},
		loading: false,
		alert: null,
	};

	searchUsers = async (text) => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
		);

		this.setState({ users: res.data.items, loading: false });
	};

	// get a single Github user
	getUser = async (username) => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
		);

		this.setState({ user: res.data, loading: false });
	};

	clearUsers = () => {
		this.setState({ users: [], loading: false });
	};

	setAlert = (message, type) => {
		this.setState({ alert: { message, type } });
		setTimeout(() => this.setState({ alert: null }), 5000);
	};

	hideAlert = () => this.setState({ alert: null });

	render() {
		const { users, loading, alert, user } = this.state;

		return (
			<Router>
				<div className="App">
					<Navbar />
					<div className="container">
						<Alert alert={alert} hideAlert={this.hideAlert} />
						<Switch>
							<Route
								path="/"
								exact
								render={() => (
									<Fragment>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={users.length > 0}
											setAlert={this.setAlert}
										/>
										<Users loading={loading} users={users} />
									</Fragment>
								)}
							/>
							<Route path="/about" exact component={About} />
							<Route
								path="/user/:login"
								exact
								render={(props) => (
									<User {...props} getUser={this.getUser} user={user} loading={loading} />
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
