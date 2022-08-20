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

export function fetchApi(accountName:string,sortBy:string="updated_at"){
	return new Promise(
		async (resolve:(result : Data)=>void)=>{
				let Bio:BioProps = {};
				let Repos:RepositoryProps[]=[]	;
				let Organizations:OrganizationProps[] =[];
				let vBio = await getData(`https://api.github.com/users/${accountName}`);
				let totalRepos = vBio.public_repos;
				const pages = Math.ceil(totalRepos/30)
				let vRepos : any[] = [];
				for(let i=1;i<=pages;i++){

					vRepos[i-1] = await getData(`https://api.github.com/users/${accountName}/repos?page=${i}&sort=${sortBy}`);
					
				}
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
					Repos =  [];
					  values[1].map(repo => {
						return (repo.map((rep:{name:string,language:string,stargazers_count:number,updated_at:string}) => {return Repos.push({
							name: rep.name,
							language: rep.language,
							stars: rep.stargazers_count,
							lastUpdated: rep.updated_at
						})}))
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
