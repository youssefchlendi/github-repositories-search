import axios from "axios";

export type InstanceData = {
	header : string;
	length : number;
}

export type DataInstance = {
	header : string;
	data : Array<InstanceData>;
}

const getData = async (url : string) => {
	const response = await axios.get(url);
	return response.data;
}

export function fetchApi(accountName:string){
	return new Promise(
		(resolve:(result : Data)=>void)=>{
				let Bio:BioProps = {};
				let Repos:RepositoryProps[]=[]	;
				let Organizations:OrganizationProps[] =[];
				let vBio = getData(`https://api.github.com/users/${accountName}`);
				let vRepos = getData(`https://api.github.com/users/${accountName}/repos`);
				let vOrganizations = getData(`https://api.github.com/users/${accountName}/orgs`);
				Promise.all([vBio,vRepos,vOrganizations]).then(values => {
					Bio = {
						bio: values[0].bio,
						name: values[0].name,
						title: values[0].name,
						image: values[0].avatar_url,
						followers: values[0].followers,
						following: values[0].following
					}
					Repos = values[1].map((repo:{name:string,language:string,stargazers_count:number,updated_at:string}) => {
						return {
							name: repo.name,
							language: repo.language,
							stars: repo.stargazers_count,
							lastUpdated: repo.updated_at
						}
					});
					Organizations = values[2].map((org:{avatar_url:string,description:string}) => {
						return {
							image: org.avatar_url,
							alt: org.description
						}
					});
					const result = {
						bio: Bio,
						repositories: Repos,
						organizations: Organizations
					}
					resolve(result);
				}).catch(error => {
					const result = {
						bio: {},
						repositories: [],
						organizations: []
					}
					resolve(
						result
					);
				}
			);

		})
}
