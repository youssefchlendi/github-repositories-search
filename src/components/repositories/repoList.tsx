import { propsRepository, Repository } from "./repo";

export type propsRepositories = {
	repositories: propsRepository[];
}

export function Repositories(props: { repositories: propsRepositories }) {

	return (
		<div className="repo-list">
			<ul>
				<li className="repoItem">
					{
						props.repositories.repositories.map((repo: propsRepository, index) => {
							return <Repository key={index} {...repo} />
						})
					}
				</li>
			</ul>
		</div>
	);

}