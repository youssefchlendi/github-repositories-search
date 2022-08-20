import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Repositories } from "../components/repositories/repoList";
import { fetchDataAsync } from '../store/dataSlice';
function RepositoriesPage() {
	const userName = useParams().userName;
	const dispatch = useAppDispatch();
	const data = useAppSelector(state => state.data.data.repositories);
	const loading = useAppSelector(state => state.data.loading);
	const [page, setPage] = React.useState(1);
	const [size, setSize] = React.useState(10);
	const [initialData, setInitialData] = React.useState(data);
	const [paginatedData, setPaginatedData] = React.useState(data);
	const [filteredData, setFilteredData] = React.useState(data);
	const [search, setSearch] = React.useState('');
	const [sort,setSort] = React.useState('lastUpdated')
	const [language,setLanguage] = React.useState([''])
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
			if (!initialData.length && !search.length) {
				setInitialData(data);
			}
			recoverLanguage()
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
	const recoverLanguage = () => {
		// recover language from initial data
		const languages:string[] = [];
		data.forEach((repo:RepositoryProps) => {
			if (!languages.includes(repo.language)&&repo.language) {
				languages.push(repo.language);
			}
		});
		setLanguage(languages);
	}
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

	const sortFunc= (e:string)=>{
		setSort(e);
		const sortOrder = e=='name'?'asc':'desc';
		let data = initialData.slice().sort((a,b)=>{
			if(a[e]>b[e]){
				return sortOrder=='desc'?-1:1;
			}
			if(a[e]<b[e]){
				return sortOrder=='desc'?1:-1;
			}
			return 0;
		})	
		setInitialData(data);
	}

	const filterLanguage = (e:string)=>{
		setLanguage([e]);
		if(e!=="All"){
			setInitialData(filteredData.filter(item => item.language == e));
		}else{
		 searchFunc(search);
		}
	}

	return (
		<div className="App">
			{sort}
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
						<select name="" id="language" onChange={e=>{
							filterLanguage(e.target.value)
						}}>
							<option value="All">All</option>
							{language.map((lang:string)=>{
								return <option value={lang} key={lang}>{lang}</option>
							})}
						</select>
					</label>
					<label className="select-type">
						Sort:
						<select name="" id="type" onChange={
							(e)=>{
								sortFunc(e.target.value)
							}
						}>
							<option value="lastUpdated" selected>Last updated</option>
							<option value="name">name</option>
							<option value="stars">stars</option>
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
