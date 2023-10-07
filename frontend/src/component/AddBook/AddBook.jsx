import React, { useState } from 'react'
import axios from 'axios'

const AddBook = () => {
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")

    const data = {
        book_name:name,
        category: desc,
        book_price:price
    }
    
    async function handleAddbook(e){
        e.preventDefault()
        try{
            await axios.post('http://localhost:8080/addbook',data).then(()=>{
                console.log("REQUEST SENT SUCCESSFULLY")
            })
        }catch(error){
            console.log(error);
        }
    }

  return (
    <>
    <form action="POST">
        {console.log(name)}
        <div className="box">
            <div className="name">
                <input type="text" name='name' placeholder='Enter Book Name' onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="cat">
                <input type="text" name='cat' placeholder='Enter Category' onChange={(e)=>setDesc(e.target.value)}/>
            </div>
            <div className="price">
                <input type="number" name="price" id="" placeholder='Enter Price' onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            <button onClick={handleAddbook}>Submit</button>
        </div>
    </form>
    </>
  )
}

export default AddBook

