import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import SidePanel from '../components/sidepanel/sidepanel';
import TopPanel from '../components/toppanel';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchDataAsync } from '../store/dataSlice';
import LoadingSpinner from './loading';

function Layout() {
	
	const {userName}  = useParams<{
		userName: string;
	}>();
	const dispatch = useAppDispatch();
	const data = useAppSelector(state => state.data.data);
	const loading = useAppSelector(state=>state.data.loading)
	useEffect(() => {
		if(!data.bio.name&&!loading){
			if(userName){
				dispatch(fetchDataAsync({search:userName}));
			}
		}
	} , [data.bio.name, dispatch, loading, userName]);

	return (
		<div className="">
			{loading ? <LoadingSpinner/>:<></>}
			<TopPanel />
		<div className="App">
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
