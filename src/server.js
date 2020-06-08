const express = require("express");
const server  = express();

//configurar pasta publica
server.use(express.static("public"));

//utlizando templates engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});



//configurar caminho da aplicação
//pg inicial
//caminho /views/ jah add via nunjunks
server.get("/", (req, res)=>{
    return res.render("index.html", {title:"Um título"});
})



server.get("/create-point", (req, res)=>{
    return res.render("create-point.html");
})

server.get("/search-results", (req, res)=>{
    return res.render("search-results.html");
})

//starta o servidor
server.listen(3000);
