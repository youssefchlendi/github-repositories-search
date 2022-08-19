import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Search from "../components/search";
import { Bio } from "../components/sidepanel/bio";
import { DataInstance, InstanceData } from "../store/dataApi";
import { fetchDataAsync } from "../store/dataSlice";

const DataDisplayer = () => {
	const redirect = useNavigate();
	const dispatch = useAppDispatch();
	const data = useAppSelector(state => state.data.data);
	const [dataPeresent, setDataPeresent] = useState(false);
	const loading = useAppSelector(state=>state.data.loading)
	const [search, setSearch] = useState("");
	useEffect(() => {
		if(!dataPeresent){
			if(search.length>0){
				axios.get(`https://api.github.com/users/${search}`)
					.then(response => {
						dispatch(fetchDataAsync(search));
						// router history push
						redirect(search);
						setDataPeresent(true);
					})
					.catch(()=>{
						alert("user not found")
					});
			}
			console.log(data);
		}
	} , [search]);

	return (
		<>
		<Search onClick={(a,b) => {setSearch(b)}}
		></Search>
		{loading ? <div>Loading...</div> : <div>done</div>}
		</>
	)
	
}
export default DataDisplayer;