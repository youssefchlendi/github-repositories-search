import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { DataInstance, InstanceData } from "./dataApi";
import { fetchDataAsync } from "./dataSlice";

const DataDisplayer = () => {
	const dispatch = useAppDispatch();
	const data = useAppSelector(state => state.data.data);
	const [dataPeresent, setDataPeresent] = useState(false);
	const loading = useAppSelector(state=>state.data.loading)
	useEffect(() => {
		if(!dataPeresent){
			dispatch(fetchDataAsync("youssefchlendi"));
			setDataPeresent(true);
		}
	} , []);

	// const renderedData = data.length!=0?data.map((item :DataInstance)=> {
	// 	const children = item.data.map((child:InstanceData,index)=><p>{child.header}{child.length}</p>);
	// 	return (
	// 		<>
	//  		<h1>{item.header}</h1>
	//  		<div>
	//  			{children}
	//  		</div>
	//  		</>
	//  	)
	//  }):loading?<p>Loading...</p>:<p>No data</p>;
	// //  (<p>empty</p>);

	 return (
	 	<div>
			
	 		{/* {renderedData} */}
	 	</div>
	 )
}
export default DataDisplayer;