import React from 'react';

export const Organization = (props: { organization: OrganizationProps[] }) => {
	const OrganizationList = props.organization.map((organization, index) => {
		return <img className="orgImage" key={index} src={organization.image} alt={organization.alt} width="32" height="32" />
	});
	if (props.organization.length === 0) {
		return null;
	}
	return (
		<>
			<div className="title">Organization</div>
			<div className="orgsContainer">
			{OrganizationList}
			</div>
			<div className="horizontalLine"></div>
		</>
	);
}
