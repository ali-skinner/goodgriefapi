import { useState } from "react";
import useSearch from "./SearchHook_useSearch";


export default function SearchComponent() {
    const [query, setQuery] = useState('');
    const { results, loading, error, searchGiphy } = useSearch();
    
const handleSubmit = (e) => {
e.preventDefault();
if (query.trim())

}

    return (
       <>
       

       </>
        
    );
    
}

// Before the return:
    // call useSearch() by creating a new variable and destructure - useSearch should return error, results, loading, and searchGiphy? 
    // set query state
    // handleSubmit function for form onSubmit={handleSubmit}

        // function ResultsComponent(data) {
        //     return (data.map((result) => {
        //         return (<>
        //          <div>{result.name}</div>
        //          <div>{result.description}</div>
        //         </>)
        //     }))
        // }
        
// in the return stmnt:
    // return the the form/submit button; 
     //setQuery onChange in  form text input
     //map results from useSearch
     // {loading === true && (<div>loading...</div>)}
     // {loading === false && <ResultComponent  data={data}/>}