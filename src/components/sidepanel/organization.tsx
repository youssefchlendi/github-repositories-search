import React from 'react';

export type OrganizationProps = Array<{
	image: string,
	alt: string
}>

export const Organization = (props: { organization: OrganizationProps }) => {
	const OrganizationList = props.organization.map((organization, index) => {
		return <img key={index} src={organization.image} alt={organization.alt} width="32" height="32" />
	});
	if (props.organization.length === 0) {
		return null;
	}
	return (
		<div>
			<div className="title">Organization</div>
			{OrganizationList}
			<div className="horizontalLine"></div>
		</div>
	);
}
