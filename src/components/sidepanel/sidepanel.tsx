import React from "react";

import Highlights from "./highlights";
import { Bio } from "./bio";
import { Organization} from "./organization";
import { Achievements} from "./achievements";

const SidePanel = (
	props:{
		bio:BioProps,
		achievements: AchievementsProps,
		organization: OrganizationProps
	} 
) => {
	return (
		<div className="sidepanel-container">
			<Bio followers={props.bio.followers} following={props.bio.following} image={props.bio.image} name={props.bio.name} title={props.bio.title} bio={props.bio.bio} />
			<Highlights /> 
			<Organization organization={props.organization}></Organization>
			<Achievements achievements={props.achievements}/>
		</div>
	);
}

export default SidePanel;