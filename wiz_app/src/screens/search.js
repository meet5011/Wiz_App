import { useState } from "react";

function Search() {

    let data = [
        {_id:1,"name":"Meet"},
        {_id:1,"name":"Meeta"},
        {_id:1,"name":"Mike"},
        {_id:1,"name":"Joe"},
    ]
    const [filtered,setFiltered] = useState([]);
    const handleClick = () =>{
    setFiltered(data.filter((item)=>{
        return  item.name.toLowerCase().includes(search.toLowerCase());
      })) ;
        
    }


    const [search,setSearch]=useState("");

    const handleChange = (e) =>{
        setSearch(e.target.value);
    }

    return ( <>
    
    <input placeholder="search" onChange={handleChange} onKeyDown={handleClick} />
    {filtered.map((intem)=>{
      return  <h2>{intem.name}</h2>
    })}
     
    </> );
}

export default Search;