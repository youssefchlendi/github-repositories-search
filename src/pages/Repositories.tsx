import React from 'react';
import { propsRepositories, Repositories } from "../components/repositories/repoList";
function RepositoriesPage() {
	return (
		<div className="App">
			<form id="filter-repo" >
				<label className="search-field">
					<input
						className="input-field"
						type="text"
						id="input"
						placeholder="Find a repository..."
					/>
				</label>
				<div className="select">
					<label htmlFor="language" className="language-type">
						Language:
						<select name="" id="language">
							{/* {languageOptions} */}
							<option value="All">All</option>
						</select>
					</label>
					<label className="select-type">
						Type:
						<select name="" id="type">
							{/* {typeOptions} */}
						</select>
					</label>
					<label className="select-type">
						Sort:
						<select name="" id="type">
							{/* {typeOptions} */}
						</select>
					</label>
					<button className="btn" onClick={e => e.preventDefault()}>
						New
					</button>
				</div>
			</form>
			<div className="horizontalLine"></div>
			<Repositories repositories={{
				repositories: [
					{
						language: 'typescript',
						lastUpdated: 'yesterday',
						name: 'github-repositories-search',
						stars: 1
					},
					{
						language: 'typescript',
						lastUpdated: 'yesterday',
						name: 'GithubCommiter ',
						stars: 0
					}
				]
			}} />
			{/* <div className="repo-list">
				<ul>
					<li className="repoItem">
						<Repository language='typescript' lastUpdated='yesterday' name='github-repositories-search' stars={1}  ></Repository>
					</li>
				</ul>
			</div> */}
		</div>
	);
}

export default RepositoriesPage;
