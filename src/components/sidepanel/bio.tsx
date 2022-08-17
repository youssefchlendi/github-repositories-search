import React from "react";

export interface BioProps {
	bio?: string;
	name?: string;
	title?: string;
	image?: string;
	followers?: number;
	following?: number;
}

export const Bio = (props: BioProps) => {
	return (
		<div>
			<div className="avatar-container">
				<img className="avatar" src={props.image} alt={props.name} />
			</div>
			<h2 className="name">{props.name}</h2>
			<h2 className="userName">{props.title}</h2>
			<p>{props.bio}</p>
			<div className="followContainer">
				<p className="follow">
					<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="bioIcon">
						<path fill="#6a5757" fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path>
					</svg>
					<span>
						<span className="stat">
							{props.followers}
						</span>
						Followers
					</span>
				</p>
				<p className="follow">
					<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="bioIcon">
						<path fill="#6a5757" fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path>
					</svg>
					<span>
						<span className="stat">
							{props.following}
						</span>
						Following
					</span>
				</p>
			</div>
			<div className="horizontalLine"></div>
		</div>
	)
}
