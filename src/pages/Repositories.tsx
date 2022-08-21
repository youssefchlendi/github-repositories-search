/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useAppSelector } from '../app/hooks';
import { Repositories } from "../components/repositories/repoList";
import SelectMenu from "../components/repositories/selectMenu";
function RepositoriesPage() {
	// get data from store
	const data = useAppSelector(state => state.data.data.repositories);
	// get loading state
	const loading = useAppSelector(state => state.data.loading);
	// create page state
	const [page, setPage] = React.useState(1);
	// create size state
	const [size, setSize] = React.useState(10);
	// create initial data state
	const [initialData, setInitialData] = React.useState(data);
	// create paginated data state
	const [paginatedData, setPaginatedData] = React.useState(data);
	// create filter data state
	const [filteredData, setFilteredData] = React.useState(data);
	// create search data state
	const [search, setSearch] = React.useState('');
	// create language state will contain the repositories languages
	const [language, setLanguage] = React.useState([''])
	// paginate method
	const paginate = () => {
		const pages = [];
		// loop through data and create pages array using size
		for (let i = 0; i < initialData.length; i += size) {
			pages.push(initialData.slice(i, i + size));
		}
		setFilteredData(pages[page - 1]);
		setPaginatedData(pages);
	}
	// get all repositories languages
	const recoverLanguage = () => {
		// recover language from initial data
		const languages: string[] = ["All"];
		data.forEach((repo: RepositoryProps) => {
			if (!languages.includes(repo.language) ) {
				languages.push(repo.language);
			}
		});
		setLanguage(languages);
	}
	//  previous page
	const previous = () => {
		if (page > 1) {

			setFilteredData(paginatedData[page - 2]);
			setPage(page - 1);
		}
	}
	// next page
	const next = () => {
		if (page < paginatedData.length) {
			setFilteredData(paginatedData[page]);
			setPage(page + 1);
		}
	}
	// change to page
	const onPageChange = (page: number) => {
		setFilteredData(paginatedData[page - 1]);
		setPage(page);
	}
	// filter data using search
	const searchFunc = (e: string) => {
		setInitialData(data.filter(item => item.name.toLowerCase().includes(e.toLowerCase())));
		onPageChange(1);
		setSearch(e);
	}
	// sort data using name, stars, lastUpadted
	const sortFunc = (e: string) => {
		const sortOrder = e === 'name' ? 'asc' : 'desc';
		let data = initialData.slice().sort((a, b) => {
			if (a[e] > b[e]) {
				return sortOrder === 'desc' ? -1 : 1;
			}
			if (a[e] < b[e]) {
				return sortOrder === 'desc' ? 1 : -1;
			}
			return 0;
		})
		onPageChange(1);
		setInitialData(data);
	}
	// filter data using language
	const filterLanguage = (e: string) => {
		setLanguage([e]);
		if (e !== "All") {
			setInitialData(filteredData.filter(item => item.language === e));
		} else {
			searchFunc(search);
		}
		onPageChange(1);
	}
	// set initial data
	useEffect(() => {
		// if completed loading set initial data to data
		if (!loading) {
			if (!initialData.length && !search.length) {
				setInitialData(data);
			}
			recoverLanguage()
			paginate();
		}
	}, [loading, initialData, search]);
	// on size change paginate and go to page 1
	useEffect(() => {
		setPage(1);
		paginate();

	}, [size]);
	
	return (
		<div className="App">
			<form id="filter-repo" >
				<label className="search-field">
					<input
						onChange={(e) => {
							searchFunc(e.target.value);
						}}
						className="input-field"
						type="text"
						id="input"
						placeholder="Find a repository..."
					/>
				</label>
				<div className="select">
					<SelectMenu position="left" button="Per page" items={[{name:"5",value:"5"},{name:"10",value:"10"},{name:"20",value:"20"},{name:"100",value:"100"}]}
					callBack={(e: string) => { setSize(parseInt(e)) }} />
					<SelectMenu position="center" button="Language" callBack={(a:string)=>{filterLanguage(a)}} 
					items={language.map((lang: string) => {
							return {name:lang,value:lang}
						})
					}
					/>
					<SelectMenu position="right" button="Sort"  items={[{name:"Last update",value:"lastUpdated"},{name:"name",value:"name"},{name:"stars",value:"stars"}]} callBack={(a:string)=>{
						sortFunc(a)
					}} />
				</div>
			</form>

			<div className="horizontalLine"></div>
			{loading ? "loading" : <Repositories repositories={
				filteredData ? filteredData : []
			} />}
			<ul
				className='pagination-container'
			>
				<li
					className={'pagination-item' + (page === 1 ? " pagination-item-disabled" : '')}
					onClick={() => onPageChange(1)}
				>
					<div className="arrow left" />
					<div className="arrow left" />
				</li>
				<li
					className={'pagination-item' + (page === 1 ? " pagination-item-disabled" : '')}
					onClick={previous}
				>
					<div className="arrow left" />
				</li>
				{
					paginatedData.map((s, index) => {
						// show only current page and previous and next page
						if (index + 2 === page || index === page || index + 1 === page)
							return (
								<li
									key={index + "d"}
									className={'pagination-item' + (page - 1 === index ? " pagination-item-selected" : '')}
									onClick={() => onPageChange(index + 1)}
								>
									{index + 1}
								</li>
							)
						return <></>;
					})
				}
				<li
					className={'pagination-item' + (page === paginatedData.length ? " pagination-item-disabled" : '')}
					onClick={next}
				>
					<div className="arrow right" />
				</li>
				<li
					className={'pagination-item' + (page === paginatedData.length ? " pagination-item-disabled" : '')}
					onClick={() => onPageChange(paginatedData.length)}
				>
					<div className="arrow right" />
					<div className="arrow right" />
				</li>
			</ul>
		</div>
	);
}

export default RepositoriesPage;
