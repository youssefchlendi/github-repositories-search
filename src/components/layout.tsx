import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import SidePanel from '../components/sidepanel/sidepanel';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchDataAsync } from '../store/dataSlice';
import LoadingSpinner from './loading';

function Layout() {
	// will be used in fixing topMenu position
	let initialDistance = 0;
	// get loading state
	const loading = useAppSelector(state => state.data.loading)
	// size changing state
	const [sizeChanged, setSizeChanged] = useState(false);
	// listening to resize and scroll events
	useEffect(() => {
		window.addEventListener("resize", () => { listenToScroll(); setSizeChanged(true) });
		window.addEventListener("scroll", listenToScroll);
		return () => {
			window.removeEventListener("resize", () => { listenToScroll(); setSizeChanged(true) });
			window.removeEventListener("scroll", listenToScroll);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading,])
	// listen to scroll function
	const listenToScroll = () => {
		// get scroll position
		const winScroll = document.body.scrollTop ||
			document.documentElement.scrollTop;
		// get top element ( left part of top menu)
		const top = document.getElementById("topLeftPart");
		//  get bio image
		const bottom = document.getElementById("bottomImage");
		//get fixedmenu
		const fixedMenu = document.getElementsByClassName("fixedMenu")[0] as HTMLElement;
		// get navMenu
		const navMenu = document.getElementsByClassName("navMenu")[0] as HTMLElement;
		// get homeButton
		const homeButton = document.getElementsByClassName("homeButton")[0] as HTMLElement;
		// if mobile
		if (window.innerWidth < 768) {
			// if initial distance is 0 or size changed get the distance from top of the page to the top of the fixedMenu
			if (!initialDistance || sizeChanged) {
				fixedMenu.setAttribute('style', '');
				window.scrollTo(0, 0);
				initialDistance = fixedMenu.offsetTop;
				setSizeChanged(false);
			}
			if (fixedMenu) {
				// if scrolled over fixedMenu
				if (initialDistance - 8 < winScroll) {
					// show hmoeButton
					homeButton.style.display = "flex";
					// set fixedMenu position to fixed
					fixedMenu.style.position = "fixed";
					fixedMenu.style.top = "0";
					fixedMenu.style.marginTop = "0";
					navMenu.style.marginTop = "0";
				} else {
					// hide homeButton
					homeButton.style.display = "none";
					// set fixedMenu position to relative
					fixedMenu.style.position = "relative";
					fixedMenu.style.top = "0";
					fixedMenu.style.marginTop = "8px";
					navMenu.style.marginTop = "8px";
				}
			}
		}
		// if desktop
		else {
			if (top && bottom) {
				// if didn't over top element
				if (!(winScroll > bottom.offsetHeight)) {
					// hide top image
					top.style.opacity = "0";
					// show bottom image
					bottom.style.opacity = "1";
				} else {
					// show top image
					top.style.opacity = "1";
					// hide bottom image
					bottom.style.opacity = "0";
				}
			}
			fixedMenu.style.position = "fixed";
			fixedMenu.style.top = "0";
			homeButton.style.display = "flex";
			fixedMenu.style.marginTop = "0";
		}
	};
	// get username from route
	const { userName } = useParams<{
		userName: string;
	}>();
	// get dispatch
	const dispatch = useAppDispatch();
	// get current state
	const data = useAppSelector(state => state.data.data);
	// data is loaded state
	const [dataloaded, setDataloaded] = useState(false);
	useEffect(() => {
		// if data not loaded
		if (!dataloaded) {
			if (userName) {
				// load data
				dispatch(fetchDataAsync({ search: userName }));
				// then set data loaded to true
				setDataloaded(true);
			}
		}
	}, [dataloaded, dispatch, loading, userName]);

	return (
		<div className="">
			{loading ? <LoadingSpinner /> : <></>}
			<div className="App" id="mainApp">
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
