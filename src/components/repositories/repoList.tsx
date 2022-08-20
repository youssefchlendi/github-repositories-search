import  { Repository } from "./repo";

export function Repositories(props: { repositories: RepositoryProps[] }) {
	return (
		<div className="repo-list">
				<div className="repoItem">
					{
						props.repositories.length?props.repositories.map((repo: RepositoryProps, index) => {
							return <Repository key={index} {...repo} />
						}):(<div><h1 style={{width:"100%",textAlign:"center"}}>No repositories found</h1></div>)
					}
				</div>
		</div>
	);

}