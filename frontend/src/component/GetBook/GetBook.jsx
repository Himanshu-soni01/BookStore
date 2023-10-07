import React, { useEffect, useState } from "react";
import axios from "axios";

const GetBook = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      await axios.get("http://localhost:8080/getData").then((req, res) => {
        setData(req.data.result);
        // console.log(req);
      });
    }
    getData();
  }, []);
  
  return (
    <div>
      <div className="books">
        {data.map(book => (
          <div className="book">
            {book.book_name}
            {book.category}
            {book.book_price}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetBook;
