import React, { useEffect } from 'react';
import { marked } from 'marked';
function Overview() {
	const [markdown, setMarkdown] = React.useState('');
	useEffect(() => {
		const markdown = ('https://raw.githubusercontent.com/youssefchlendi/youssefchlendi/main/README.md');
		fetch(markdown)
			.then(response => {
				return response.text()
			})
			.then(text => {
				setMarkdown(marked(text));
			}
			);
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
