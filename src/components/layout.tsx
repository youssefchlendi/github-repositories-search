import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import SidePanel from '../components/sidepanel/sidepanel';
import TopPanel from '../components/toppanel';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchDataAsync } from '../store/dataSlice';
import LoadingSpinner from './loading';

function Layout() {
	useEffect(() => {   
		window.addEventListener("scroll", listenToScroll);
		return () => 
		   window.removeEventListener("scroll", listenToScroll); 
	  }, [])
	const listenToScroll = () => {
	const winScroll = document.body.scrollTop || 
		document.documentElement.scrollTop;
	const top = document.getElementById("topLeftPart");
	const bottom = document.getElementById("bottomImage");
	if(top&&bottom){
		if (!(winScroll > bottom.offsetHeight) ) { 
			top.style.opacity = "0";
			bottom.style.opacity = "1";
		} else {
			top.style.opacity = "1";
			bottom.style.opacity = "0";
		}  
	}
	};
	
	const {userName}  = useParams<{
		userName: string;
	}>();
	const dispatch = useAppDispatch();
	const data = useAppSelector(state => state.data.data);
	const loading = useAppSelector(state=>state.data.loading)
	const [dataloaded, setDataloaded] = useState(false);
	useEffect(() => {
		if(!dataloaded){
			if(userName){
				dispatch(fetchDataAsync({search:userName}));
				setDataloaded(true);
			}
		}
	} , [dataloaded, dispatch, loading, userName]);

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
