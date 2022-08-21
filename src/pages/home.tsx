import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import LoadingSpinner from "../components/loading";
import Search from "../components/search";
import { fetchDataAsync } from "../store/dataSlice";

const DataDisplayer = () => {
	// redirection hook
	const redirect = useNavigate();
	// dispatch hook
	const dispatch = useAppDispatch();
	// get loading state
	const loading = useAppSelector(state => state.data.loading)
	// create search state
	const [search, setSearch] = useState("");
	// create search state
	const [searchResults, setSearchResults] = useState([]);
	// create itemList state
	const [itemList, setItemList] = useState((<></>));
	// create loading list state
	const [loadingList, setLoadingList] = useState(false);
	// create theme state saved in local storage
	const [theme, setTheme] = useLocalStorage('theme', 'dark');
	const switchTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
		document.documentElement.setAttribute("data-theme", theme);
	}
	useEffect(() => {
		if (search.length > 0) {
			// set loading list to true
			setLoadingList(true);
			// fetch users from api
			axios.get("https://api.github.com/search/users?q=" + search).then(res => {
				// store results in searchResults
				setSearchResults(res.data.items);
				// create list items from results
				const itdemList = (
					res.data.items.map((item: { login: string; }) => {
						return (
							<button className="itemListItem" key={item.login} onClick={() => {
								if (item.login) {
									fetchData(item.login)
								}
							}} >{item.login}</button>
						);
					}));
				// set itemList to list items
				setItemList(itdemList);
				// set loading list to false
				setLoadingList(false);

			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search])
	// fetch data will be runned when user clicks on item in list
	const fetchData = (loginName: string) => {
		// set loading to true
		setLoadingList(true);
		// dispatch fetch data action
		dispatch(fetchDataAsync({ search: loginName })).then((res) => {
			setLoadingList(false);
			redirect(loginName);
		});
	}

	return (
		<>
			<div className="home">

				{loadingList ? <LoadingSpinner /> : ''}
				<h1>Type a username to search</h1>

				<Search  onClick={(a, b) => { setSearch(b) }}
				></Search>

			{
				searchResults.length && search.length ? (
					<div className="itemList">
						{itemList}
					</div>) :
					<div className="">No data found</div>
			}
			<button className="themeSwitchButton" onClick={switchTheme}>Switch theme</button>
		</div>
		</>
	)

}
export default DataDisplayer;