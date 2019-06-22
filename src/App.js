import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';
import './App.css';

const App = () => {
	const [ users, setUsers ] = useState([]);
	const [ user, setUser ] = useState({});
	const [ repos, setRepos ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ alert, setAlert ] = useState(null);

	const githubInfo = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env
		.REACT_APP_GITHUB_CLIENT_SECRET}`;

	const searchUsers = async (text) => {
		setLoading(true);

		const res = await axios.get(`https://api.github.com/search/users?q=${text}&${githubInfo}`);

		setUsers(res.data.items);
		setLoading(false);
	};

	// get a single Github user
	const getUser = async (username) => {
		setLoading(true);

		const res = await axios.get(`https://api.github.com/users/${username}?${githubInfo}`);

		setUser(res.data);
		setLoading(false);
	};

	const getUserRepos = async (username) => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${githubInfo}`,
		);

		setRepos(res.data);
		setLoading(false);
	};

	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	const showAlert = (message, type) => {
		setAlert({ message, type });
		setTimeout(() => setAlert(null), 5000);
	};

	const hideAlert = () => setAlert(null);

	return (
		<Router>
			<div className="App">
				<Navbar />
				<div className="container">
					<Alert alert={alert} hideAlert={hideAlert} />
					<Switch>
						<Route
							path="/"
							exact
							render={() => (
								<Fragment>
									<Search
										searchUsers={searchUsers}
										clearUsers={clearUsers}
										showClear={users.length > 0}
										showAlert={showAlert}
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
								<User
									{...props}
									getUser={getUser}
									getUserRepos={getUserRepos}
									user={user}
									repos={repos}
									loading={loading}
								/>
							)}
						/>
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;
