import React from 'react';
import { Outlet } from 'react-router-dom';

import SidePanel from '../components/sidepanel/sidepanel';
import TopPanel from '../components/toppanel';
function Layout() {
	return (
		<div className="App">
			<TopPanel />
			<div className="container">

				<SidePanel
					bio={
						{
							image: "https://avatars.githubusercontent.com/u/74258856?v=4",
							name: "Mohamed Youssef CHLENDI",
							title: "youssefchlendi",
							bio: "Hi! My name is Youssef. I was originally born in Zarzis, Tunisia, and now I’m a Bachelor-IT student at the Higher Institute of Technological Studies of Bizerte.",
							followers: 25,
							following: 25,

						}
					}
					achievements={[{ alt: "yolo", image: "https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png" }, { alt: "pull shark", image: "https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" }]}
					organization={[{ alt: "neoledge", image: "https://avatars.githubusercontent.com/u/108524338?s=64&amp;v=4" }, { alt: "smurfsDev", image: "https://avatars.githubusercontent.com/u/107652380?s=64&amp;v=4" }]}
				/>

				<Outlet></Outlet>

			</div>
		</div>
	);
}

export default Layout;
