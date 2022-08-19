 interface RepositoryProps  {
	name: string;
	language: string;
	stars: number;
	lastUpdated: string;
};


interface OrganizationProps {
	image: string,
	alt: string
}

interface BioProps {
	bio?: string;
	name?: string;
	title?: string;
	image?: string;
	followers?: number;
	following?: number;
}

interface Data {
	repositories: RepositoryProps[];
	organizations: OrganizationProps[];
	bio: BioProps;
}
