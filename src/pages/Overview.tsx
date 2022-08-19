import React, { useEffect } from 'react';
import { marked } from 'marked';
import { useParams } from 'react-router-dom';
function Overview() {
	const [markdown, setMarkdown] = React.useState('');
	const {userName}  = useParams<{
		userName: string;
	}>();
	useEffect(() => {
		const markdown = (`https://raw.githubusercontent.com/${userName}/${userName}/main/README.md`);
		fetch(markdown)
			.then(response => {
				return response.text()
			})
			.then(text => {
				console.log(text);
				if(!text.includes("404"))
				setMarkdown(marked(text));
				else
				setMarkdown("<div><h1>User has no README</h1></div>");
			}
			)
	}, []);

	return (
		<div className="">
			<section className="mdBody">
				<div dangerouslySetInnerHTML={{ __html: markdown }}></div>
			</section>
		</div>
	);
}

export default Overview;
