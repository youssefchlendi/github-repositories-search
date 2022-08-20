import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import SidePanel from '../components/sidepanel/sidepanel';
import TopPanel from '../components/toppanel';
import Search from '../components/search';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchDataAsync } from '../store/dataSlice';
import LoadingSpinner from './loading';

function Layout() {
	
	const {userName}  = useParams<{
		userName: string;
	}>();
	const dispatch = useAppDispatch();
	const data = useAppSelector(state => state.data.data);
	const [dataPeresent, setDataPeresent] = useState(false);
	const loading = useAppSelector(state=>state.data.loading)
	useEffect(() => {
		if(!data.bio.name&&!loading){
			if(userName){
				dispatch(fetchDataAsync(userName));
			}
			console.log(data);
		}
	} , [userName]);

	return (
		<div className="">
			{loading ? <LoadingSpinner/>:<></>}
		<div className="App">
			<TopPanel />
			<div className="container">

				<SidePanel
					bio={data.bio}
					organization={data.organizations}
				/>
				<Outlet></Outlet>
			</div>
		</div>
		</div>
	);
}

export default Layout;
