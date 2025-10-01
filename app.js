import express from "express";
import {shortenedRoutes} from "./routers/shortener.routes.js"

const app = express();

const PORT = 3002;


app.use(express.static("public"));
app.use(express.urlencoded({extened:true}))

app.set ("view engine","ejs");


app.use(shortenedRoutes);

// const serverFile = async (res,filePath,contentType) => {
//   try{
//         const data = await readFile(filePath);
//         res.writeHead(200,{"Content-Type" : contentType});
//         res.end(data);
//       }catch (error){
//         res.writeHead(404,{"Content-Type":"text/plain"});
//         res.end("404 page not found")
//       }
// };

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}
  `);
});
