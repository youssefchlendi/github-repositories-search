import  { Repository } from "./repo";

export function Repositories(props: { repositories: RepositoryProps[] }) {

	return (
		<div className="repo-list">
			<ul>
				<li className="repoItem">
					{
						props.repositories.map((repo: RepositoryProps, index) => {
							return <Repository key={index} {...repo} />
						})
					}
				</li>
			</ul>
		</div>
	);

}