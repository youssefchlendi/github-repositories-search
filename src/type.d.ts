 type propsRepository = {
	name: string;
	language: string;
	stars: number;
	lastUpdated: string;
};

type AchievementsProps = Array<{
	image: string,
	alt: string
}>

type propsRepositories = {
	repositories: propsRepository[];
}

type OrganizationProps = Array<{
	image: string,
	alt: string
}>

interface BioProps {
	bio?: string;
	name?: string;
	title?: string;
	image?: string;
	followers?: number;
	following?: number;
}
