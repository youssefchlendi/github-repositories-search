import { useLocation } from "react-router-dom";




export const Repository = (props: RepositoryProps) => {
	return (
		<div className="">
			<div className="topPart">
				<h3 className="wb-break-all">
					<a className="repoLink" href={`https://www.github.com/${useLocation().pathname.split("/")[1]}/${props.name}`} >
						{props.name}</a>
					<span></span><span className="Label Label--secondary v-align-middle ml-1 mb-1">Public</span>
				</h3>
			</div>
			<div className="bottomPart">
				<span className="techName">
					<span style={{ backgroundColor: "#3178c6" }} className="repo-language-color" ></span>
					<span >{props.language}</span>
				</span>
				<a className="Link--muted mr-3" href="/youssefchlendi/github-repositories-search/stargazers">
					<svg aria-label="star" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-star">
						<path fill="#6c757d" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
					</svg>
					{props.stars}
				</a>
				<span>
					{props.lastUpdated}
				</span>
			</div>
			<div className="horizontalLine"></div>
		</div>
	);
}