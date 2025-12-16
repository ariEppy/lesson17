import { useEffect, useState, useRef } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [category, setCategory] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const selectRef = useRef(null);

  const fetchData = async () => {
    const response = await fetch(`https://dummyjson.com/products`);
    const result = await response.json();
    setData(result.products);
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    selectRef.current.focus();
  }, []);

  useEffect(() => {
    if (category == "beauty")
      setSelectedData(data.filter((item) => item.category === category));
    else if (category == "fragrances")
      setSelectedData(data.filter((item) => item.category === category));
    else if (category == "furniture")
      setSelectedData(data.filter((item) => item.category === category));
    else if (category == "groceries")
      setSelectedData(data.filter((item) => item.category === category));
    else if (category === "all") setSelectedData(data);
    else setSelectedData(null);
  }, [category]);

  return (
    <div>
      <div>
        <select
          ref={selectRef}
          name="category"
          id="cat"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=""></option>
          <option value="all">All</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="furniture">Furniture</option>
          <option value="groceries">Groceries</option>
        </select>
      </div>
      <div>
        {/* show items uploaded */}
        {selectedData !== null &&
          selectedData.map((element, i) => {
            return (
              <div key={i} className="product">
                <h4>{element.title}</h4>
                <p>{element.price}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
