import axios from "axios";
// fetch data from api url
const getData = async (url : string) => {
	const response = await axios.get(url);
	return response.data;
}
/* Here is the explanation for the code above:
2. We create an array of promises that will return the data when they are resolved.
3. We use Promise.all to wait for all the promises to be resolved.
4. We then use .then to get the data from the promises and assign it to the variables.
5. We then use .catch to handle any errors that may occur.
6. We then create a result object and assign the data to it.
7. We then resolve the promise with the result. */
export function fetchApi(accountName:string,sortBy:string="updated_at"){
	// We create a promise that will return the data when it is resolved
	return new Promise(
		async (resolve:(result : Data)=>void)=>{
				let Bio:BioProps = {};
				let Repos:RepositoryProps[]=[]	;
				let Organizations:OrganizationProps[] =[];
				// fetch bio data
				let vBio = await getData(`https://api.github.com/users/${accountName}`);
				// repos link
				let totalRepos = vBio.public_repos;
				// get total pages count ( github return only 30 repo per page by default )
				const pages = Math.ceil(totalRepos/30)
				let vRepos : any[] = [];
				for(let i=1;i<=pages;i++){
					// fetch repos page data
					vRepos[i-1] = await getData(`https://api.github.com/users/${accountName}/repos?page=${i}&sort=${sortBy}`);
					
				}
				// fetch organizations data
				let vOrganizations = getData(`https://api.github.com/users/${accountName}/orgs`);
				// wait for all the promises to be resolved
				Promise.all([vBio,vRepos,vOrganizations]).then(values => {
					// get data from the promises and assign it to the variables
					Bio = {
						bio: values[0].bio,
						name: values[0].name,
						title: values[0].login,
						image: values[0].avatar_url,
						followers: values[0].followers,
						following: values[0].following
					}
					Repos =  [];
					// loop through all the repos pages and assign them to the Repos array
					  values[1].map(repo => {
						return (repo.map((rep:{name:string,language:string,stargazers_count:number,updated_at:string}) => {return Repos.push({
							name: rep.name,
							language: rep.language,
							stars: rep.stargazers_count,
							lastUpdated: rep.updated_at
						})}))
						});
						// loop through all the organizations and assign them to the Organizations array
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
					// resolve the promise with the result
					resolve(result);
				})
				// catch any errors that may occur
				.catch(error => {
					// resolve the promise with empty result
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
