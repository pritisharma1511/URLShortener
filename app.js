import {readFile} from "fs/promises";
import { createServer } from "http";
import path from "path";
import crypto from "crypto";
import {json} from "stream/consumers";
import { writeFile } from "fs";
import express from "express";

const app = express();

const PORT = 3002;
const DATA_FILE = path.join("data","links.json");

app.use(express.static("public"));

const serverFile = async (res,filePath,contentType) => {
  try{
        const data = await readFile(filePath);
        res.writeHead(200,{"Content-Type" : contentType});
        res.end(data);
      }catch (error){
        res.writeHead(404,{"Content-Type":"text/plain"});
        res.end("404 page not found")
      }
};

const loadLinks = async () => {
  try{
    const data = await readFile(DATA_FILE,"utf-8");
    return JSON.parse(data);
  }
  catch(error){
    if(error.code === "ENOENT"){
      await writeFile(url,JSON.stringify({}));
      return{};
    }
    throw error;
  }
}
const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links));
}

app.get("/",async(req,res) => {
  try{
    const file = await fs.readFile(path.join("views","index.html"));
    const links = await loadLinks();
    
    const content = file.toString().replaceAll("{{shortened_urls}}",)
}catch (error){
  console.log(err);
  return res.status(500).send("Internal server error");
}
});

app.post ("/",async(req,res) => {
  try {
    const {url, shortCode} = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
    const links = await loadLinks();
  
    if(links[finalShortCode]){
        return res
        .status(400)
        .send("short code already exists");     
             }
              links[finalShortCode] = url;
             await saveLinks(links);

       }
      catch (error){

      }
    } ) ; 



const server = createServer(async ( req,res) => {
   console.log(req.url);
    if(req.method ==="GET") {
        if (req.url === "/"){
            return serverFile(res, path.join("public","index.html"),"text/html");
        }else if(req.url === "/style.css"){
          return serverFile(res, path.join("public","style.css"),"text/css");
        }else if(req.url ==="/links"){
           const links = await loadLinks();

           res.writeHead(200,{"Content-Type":"application/json"});
           return res.end(JSON.stringify(links));
        }
        else{
          const links = await loadLinks();
          const shortCode = req.url.slice(1);
          console.log("links red." , req.url);
          if (links[shortCode]) {
  res.writeHead(302, { Location: links[shortCode] });
  return res.end();
} else {
  res.writeHead(404, { "Content-Type": "text/plain" });
  return res.end("404: Short URL not found");
}
        }
       }
        if(req.method === "POST" && req.url === "/shorten") {

          const links = await loadLinks();
          let body = "";
          req.on("data",(chunk) => (body += chunk) );
          req.on("end",async () => {
             console.log(body);
             const {url, shortCode} = JSON.parse(body);

             if(!url){
              res.writeHead(400,{"Content-Type":"text/plain"});
              return res.end("url is required")
             }
             const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

             if(links[finalShortCode]){
               res.writeHead(400,{"Content-Type":"text/plain"});
              return res.end("short codfe already exists");
             }
             links[finalShortCode] = url;
             await saveLinks(links);

             res.writeHead(200,{"Content-type":"application/json"});
             res.end(JSON.stringify({ success:true , shortCode : finalShortCode}));
          });
        }
       });
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}
  `);
});
