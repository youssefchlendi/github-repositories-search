import React, { useEffect } from 'react';
// markdown to html converter
import { marked } from 'marked';
import { useParams } from 'react-router-dom';
function Overview() {
	// markdown content state
	const [markdown, setMarkdown] = React.useState('');
	// get params from url
	const {userName}  = useParams<{
		userName: string;
	}>();
	useEffect(() => {
		// markdown link
		const markdown = (`https://raw.githubusercontent.com/${userName}/${userName}/main/README.md`);
		// fetch markdown
		fetch(markdown)
			.then(response => {
				// return response as text
				return response.text()
			})
			.then(text => {
				// check if text isnot  empty
				if(!text.includes("404"))
				// set markdown content
				setMarkdown(marked(text));
				else
				// set markdown default content
				setMarkdown("<div><h1>User has no README</h1></div>");
			}
			).catch(()=>{
				// set markdown default content
				setMarkdown("<div><h1>User has no README</h1></div>")
			})
	}, [userName]);

	return (
		<div className="">
			<section className="mdBody">
				<div dangerouslySetInnerHTML={{ __html: markdown }}></div>
			</section>
		</div>
	);
}

export default Overview;
