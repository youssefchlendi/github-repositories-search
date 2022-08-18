
import React from 'react';
import logo from './logo.svg';
import './assets/style/app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Overview from './pages/Overview';
import Layout from './components/layout';
import Repositories from './pages/Repositories';
import Projects from './pages/Projects';
import Packages from './pages/Packages';
import Stars from './pages/Stars';

export interface IApplicationPageProps { };

const ApplicationPage: React.FC<IApplicationPageProps> = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/:userName" element={<Layout />}>
					<Route index element={<Overview />} />
					<Route path="repositories" element={<Repositories />} />
					<Route path="projects" element={<Projects />} />
					<Route path="packages" element={<Packages />} />
					<Route path="stars" element={<Stars />} />
				</Route>
			</Routes>

		</BrowserRouter>
	);
}

export default ApplicationPage;