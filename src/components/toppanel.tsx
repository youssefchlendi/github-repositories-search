import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { useAppSelector } from "../app/hooks";
import {FaLightbulb,FaMoon,FaHome} from "react-icons/fa";

const TopPanel = () => {
	const Items = [
		{
			id: 1,
			link: "",
			text: "Overview",
			svg: ` 
			<path   d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z"></path>
		`
		},
		{
			id: 2,
			link: "repositories",
			text: "Repositories",
			svg: ` 
			<path   d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
		`
		}];
	const [item, setItem] = useState<{ id: number; text: string, svg: string, link: string }>(Items[0]);
	const currentLink = useLocation();
	const data = useAppSelector(state => state.data.data);

	useEffect(() => {
		const item = Items.find(i => i.link === currentLink.pathname.split("/")[2]);
		setItem(item ? item : Items[0]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentLink]);
	const [theme, setTheme] = useLocalStorage('theme', document.documentElement.getAttribute('data-theme')??'dark');
	const switchTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
		document.documentElement.setAttribute("data-theme", theme);

	}

	return (
		<>
			<div className="fixedMenu">

				<div className="containerTop">
					<div id="topLeftPart" className="leftPart ">
							<img alt="img" className="mini-avatar" width="32px" height="32px" src={data.bio.image}></img><span>{data.bio.title}</span>
					</div>
					<div className="navMenu">
						<div className="navMenuFirst">

							{Items.map((val, index) => (
								<Link to={val.link} key={index} className={`navItem navItemUnderline ${item.id === val.id ? "active" : ""} `} onClick={() => setItem(val)}>
									<svg fillRule="evenodd"
										aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="navItemIcon" dangerouslySetInnerHTML={{ __html: val.svg }}>
									</svg>
									{val.text}
								</Link>
							))}
						</div>
						<div className="navMenuSecond">
								<span className="btn" onClick={
									()=>switchTheme()
								}>{
									theme === "light" ? <FaLightbulb /> : <FaMoon />
								}</span>
						<Link to='/' className="homeButton absolutFab" style={{display:"none"}}>
							<span className="homeButtonText"  >
								 Home
								</span>
								<FaHome className="homeButtonIcon" />
						</Link>
						</div>
					</div>
				</div>
				</div>
			<div style={{ marginTop: "68px" }} className="horizontalLine"></div>
		</>
	)
}
export default TopPanel;