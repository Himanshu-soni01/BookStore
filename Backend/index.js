// import express from "express"
// import mssql from "mssql"

const cors = require("cors")
const express = require("express")

const app = express()
const port = 8080 | process.env.PORT

app.use(cors())
app.use(express.json())

const mssql = require("mssql");
const config = {
    user: 'soni-232',
    password:'Hims@2010',
    server:"hs01server.database.windows.net",
    database :'soni-232',
    Option:{
        encrypt:true // Use this if you're on Windows Azure
    }
}

const pool = new mssql.ConnectionPool(config)

// pool.connect().then(()=>{
//     const query = "select * from Customer";
//     return pool.request().query(query)
// }).then(data=>{
//     console.log(data.recordset);
// })

class bookmodel{
    async tableExist(tablename){
        try{
            // await pool.connect().then(()=>{
            //     const q = `select count(*) as tablecount from '${tablename}'`;
            //     // return pool.request().query(q).recordset[0].tablecount > 0;                
            // })

            await pool.connect();
            // const q = `select * from ${tablename}`;
            const q = `select count(*) as tablecount from sys.tables where name = '${tablename}'`;
            const result = await pool.request().query(q);
            return result.recordset[0].tablecount>0;
            // console.log(result.recordset);
            // const rtn = result.recordset[0].tablecount>0;
            // return rtn
        }catch(error){
            throw error;
        }finally{
            pool.close();
        }
    }

    async createTable(data){   
        try{
            const table = await this.tableExist('Books');
            console.log(table);
            console.log(data.book_name);
            if(table==true){
                await pool.connect()
                var insertData = `Insert into Books(book_name, category, book_price) values('${data.book_name}','${data.category}','${data.book_price}')`
                await pool.request().query(insertData);
                console.log("Insert query written");                
            }else{
                await pool.connect()
                let newTable = 'Create table Books(id int identity(1,1), book_name varchar(255), category varchar(255), book_price int)';
                await pool.request().query(newTable)
                this.createTable(data)
            }
            console.log("Data inserted successfully");

        }catch (error){
            console.log("ERROR")
        }
    }

    async getBook(){
        try {
            await pool.connect()
            let q = 'select * from books'
            let books_data = pool.request().query(q)
            // console.log((await books_data).recordset);
            return (await books_data).recordset
        } catch (error) {
            console.log(error);
        }
    }
}

const v = new bookmodel();
// v.createTable({id:1,book_name:'RDPR',category:'Rich',book_price:100})

app.post('/addbook', (req,res)=>{
    let data = req.body;
    v.createTable(data)
    console.log(data);
})

app.get('/getData',async (req,res)=>{
    try {
        let data3 = await v.getBook()
        return res.json({result:data3})
    } catch (error) {
        console.log(error);
    }
}) 

app.listen(port,()=>{
    console.log(`Server initiated on http://localhost:${port}`);
})