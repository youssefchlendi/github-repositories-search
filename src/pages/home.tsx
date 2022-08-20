import axios from "axios";
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import LoadingSpinner from "../components/loading";
import Search from "../components/search";
import { fetchDataAsync } from "../store/dataSlice";

const DataDisplayer = () => {
	const redirect = useNavigate();
	const dispatch = useAppDispatch();
	const loading = useAppSelector(state=>state.data.loading)
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [itemList,setItemList] = useState((<></>));
	const  [loadingList,setLoadingList] = useState(false);
	useEffect(() => {
		if (search.length > 0) {
			setLoadingList(true);
		axios.get("https://api.github.com/search/users?q="+search).then(res => {
			setSearchResults(res.data.items);
			const itdemList= (
				res.data.items.map((item: { login: string ; }) => {
					return (
							<button className="itemListItem" key={item.login} onClick={()=>{if(item.login){
								fetchData(item.login)
							}
							}} >{item.login}</button>
					);
				}));
			setItemList(itdemList);
			setLoadingList(false);

		})
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search])
	const fetchData= (loginName:string)=>{
		setLoadingList(loading);
		dispatch(fetchDataAsync({search:loginName})).then((res)=>{
			setLoadingList(loading);
			redirect(loginName);
		});
	}

	return (
		<>
		{loadingList ? <LoadingSpinner/>:''}
		<Search onClick={(a,b) => {setSearch(b)}}
		></Search>
		
		<div className="itemList">
		{
			searchResults.length&&search.length?itemList:<div className="itemListItem">No data found</div>
		}
		</div>
		</>
	)
	
}
export default DataDisplayer;