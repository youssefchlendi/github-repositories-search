import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDebounce } from 'use-debounce';

interface ClickProps {
	onClick: (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>|null,search:string) => void;
}
const Search = (props:ClickProps) => {
	// search state
	const [search, setSearch] = useState("");
	// add latency to search
	const [debouncedSearch] = useDebounce(search, 1000);

	useEffect(() => {
		props.onClick(null,debouncedSearch);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	} , [debouncedSearch]);

	  return (
	<div className="search-container">
		<div className="search">
	  <input id="search" type="text" placeholder="Search" 
	          onChange={(e)=>{setSearch(e.target.value)}}
			  value={search}
	  
	  />
	  <button onClick={(e)=>{
		props.onClick(e,search);
		}}>
	  <FaSearch /></button>
		</div>
	</div>
  );
}

export default Search;