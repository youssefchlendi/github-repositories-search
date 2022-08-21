import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import SidePanel from '../components/sidepanel/sidepanel';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchDataAsync } from '../store/dataSlice';
import LoadingSpinner from './loading';

function Layout() {
	let initialDistance = 0;
	const loading = useAppSelector(state => state.data.loading)
	
	useEffect(() => {
		window.addEventListener("scroll", listenToScroll);
		return () =>
			window.removeEventListener("scroll", listenToScroll);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading])
	const listenToScroll = () => {
		const winScroll = document.body.scrollTop ||
			document.documentElement.scrollTop;
		const top = document.getElementById("topLeftPart");
		const bottom = document.getElementById("bottomImage");
		const topContainer = document.getElementsByClassName("fixedMenu")[0] as HTMLElement;
		const navMenu = document.getElementsByClassName("navMenu")[0] as HTMLElement;
		const homeButton = document.getElementsByClassName("homeButton")[0] as HTMLElement;
		if (top && bottom && topContainer) {
			if (!(winScroll > bottom.offsetHeight)) {
				top.style.opacity = "0";
				bottom.style.opacity = "1";
			} else {
				top.style.opacity = "1";
				bottom.style.opacity = "0";
			}
			if(!initialDistance) {
				initialDistance = topContainer.offsetTop-topContainer.offsetHeight;
			}
			if (initialDistance-8 < winScroll) {
				console.log("scrolled");
				homeButton.style.display = "block";
				topContainer.style.position = "fixed";
				topContainer.style.top = "0";
				topContainer.style.marginTop = "0";
				navMenu.style.marginTop="0";
			} else { 
				homeButton.style.display = "none";
				topContainer.style.position = "relative";
				topContainer.style.top = "0";
				topContainer.style.marginTop = "8px";
				navMenu.style.marginTop="8px";
			}
		}
	};

	const { userName } = useParams<{
		userName: string;
	}>();
	const dispatch = useAppDispatch();
	const data = useAppSelector(state => state.data.data);
	const [dataloaded, setDataloaded] = useState(false);
	useEffect(() => {
		if (!dataloaded) {
			if (userName) {
				dispatch(fetchDataAsync({ search: userName }));
				setDataloaded(true);
			}
		}
	}, [dataloaded, dispatch, loading, userName]);

	return (
		<div className="">
			{loading ? <LoadingSpinner /> : <></>}
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
