
import React from 'react';
import './assets/style/app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Overview from './pages/Overview';
import Layout from './components/layout';
import Repositories from './pages/Repositories';
import Home from './pages/home';
export interface IApplicationPageProps { };

const ApplicationPage: React.FC<IApplicationPageProps> = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/:userName" element={<Layout />}>
					<Route index element={<Overview />} />
					<Route path="repositories" element={<Repositories />} />
				</Route>
			</Routes>

		</BrowserRouter>
	);
}

export default ApplicationPage;