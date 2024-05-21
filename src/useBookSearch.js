import { useEffect, useState } from "react";
import "./App.css";
function UseBookSearch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const[page,setPage]=useState(1)

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?${page}`
      );
      const incomingData = await response.json();
      setData(prevItems => [...prevItems, ...incomingData]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.message);
    }
  };

const handleScroll=()=>{
    const {scrollTop,clientHeight ,scrollHeight} = document.documentElement

    if(scrollTop + clientHeight >= scrollHeight -10 && !loading){
   setLoading(true)
   setPage(prev=>prev +1 )
    }
}   

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <h1 className="App-header">Infinate Scrool</h1>
        {data &&
          data.map((item) => (
            <div key={item.id} className="App-title">
              <h1>Title : {item.title}</h1>
            </div>
          ))}
      {
        loading &&
            <p>Loading...</p>
      }
    </div>
  );
}

export default UseBookSearch;
