import React, { useEffect } from 'react';
import { useAppSelector } from '../app/hooks';
import { Repositories } from "../components/repositories/repoList";
function RepositoriesPage() {
	const data = useAppSelector(state => state.data.data.repositories);
	const loading = useAppSelector(state => state.data.loading);

	const [page, setPage] = React.useState(1);
	const [size, setSize] = React.useState(10);
	const [initialData, setInitialData] = React.useState(data);
	const [paginatedData, setPaginatedData] = React.useState(data);
	const [filteredData, setFilteredData] = React.useState(data);
	const [search, setSearch] = React.useState('');
	const paginate = () => {
		const pages = [];
		for (let i = 0; i < initialData.length; i += size) {
			pages.push(initialData.slice(i, i + size));
		}
		setFilteredData(pages[page - 1]);
		setPaginatedData(pages);
	}
	useEffect(() => {
		if (!loading) {
			console.log(initialData);
			if (!initialData.length && !search.length) {
				setInitialData(data);
			}
			paginate();
		}
	}, [loading, initialData, search]);
	useEffect(() => {
		setPage(1);
		paginate();
	}, [size]);

	useEffect(() => {
		// setFilteredData(paginatedData[page - 1]);
	}, [page]);
	const previous = () => {
		if (page > 1) {

			setFilteredData(paginatedData[page - 2]);
			setPage(page - 1);
		}
	}
	const next = () => {
		if (page < paginatedData.length) {
			setFilteredData(paginatedData[page]);
			setPage(page + 1);
		}
	}
	const onPageChange = (page: number) => {
		setFilteredData(paginatedData[page - 1]);
		setPage(page);
	}

	const searchFunc = (e: string) => {
		setInitialData(data.filter(item => item.name.includes(e)));
		setSearch(e);
	}

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
					<label htmlFor="per-page" className="language-type">
						Per Page
					<select id="per-page" onChange={e => { setSize(parseInt(e.target.value)) }}>
						<option value={5}>
							5
						</option>
						<option value={10} selected>
							10
						</option>
						<option value={20}>
							20
						</option>
						<option value={100}>
							100
						</option>

					</select>
					</label>
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
			{loading ? "loading" : <Repositories repositories={
				filteredData ? filteredData : []
			} />}
			{/* <div className="repo-list">
				<ul>
					<li className="repoItem">
						<Repository language='typescript' lastUpdated='yesterday' name='github-repositories-search' stars={1}  ></Repository>
					</li>
				</ul>
			</div> */}
			<ul
				className='pagination-container'
			>
				<li
					className={'pagination-item' + (page === 1 ? " pagination-item-disabled" : '')}
					onClick={()=>onPageChange(1)}
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
						if(index+2===page|| index === page ||index+1==page)
						return (
							<li
								key={index + "d"}
								className={'pagination-item' + (page - 1 === index ? " pagination-item-selected" : '')}
								onClick={() => onPageChange(index + 1)}
							>
								{index + 1}
							</li>
						)
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
					onClick={()=>onPageChange(paginatedData.length)}
				>
					<div className="arrow right" />
					<div className="arrow right" />
				</li>
			</ul>
		</div>
	);
}

export default RepositoriesPage;
