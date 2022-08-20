import React from "react";

import { Bio } from "./bio";
import { Organization} from "./organization";

const SidePanel = (
	props:{
		bio:BioProps,
		organization: OrganizationProps[]
	} 
) => {
	return (
		<div className="sidepanel-container">
			<Bio followers={props.bio.followers} following={props.bio.following} image={props.bio.image} name={props.bio.name} title={props.bio.title} bio={props.bio.bio} />
			<Organization organization={props.organization}></Organization>
		</div>
	);
}

export default SidePanel;