import React from "react";
export type AchievementsProps = Array<{
			image: string,
			alt: string
		}>
export const Achievements = (Props:{achievements: AchievementsProps}) => {
	const AchievmentsList = Props.achievements.map((achievement, index) => {
		return (
			<img key={index} src={achievement.image} alt={achievement.alt} width="64" />
		);
	});

	if (Props.achievements.length === 0) {
		return null;
	}
	
	return (
		<div >
			<div className="title">Achievements</div>
			{AchievmentsList}
			<div className="horizontalLine"></div>
		</div>
	);
}
