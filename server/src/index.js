const express=require("express");
const App=express();
const port=process.env.PORT||5000;
require("../connection/connection.js");

const cors=require("cors");
const corsOptions = {
    origin: true, 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,get,head,put,patch,post,delete',
  credentials: true,
    

}
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");

App.use(cors(corsOptions));
App.use(express.json());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended:false}));
App.use(cookieParser());

App.use(require("../router/router"));
App.get("/",(request,response)=>{
    response.send("home page")
})

App.listen(port,()=>{
    console.log(`server start at the port of ${port}`)
})

