import crypto from "crypto";
import { loadLinks,saveLinks } from "../models/shortener.model.js";

export const getShortenerPage = async(req,res) => {
  try{
    // const file = await readFile(path.join("views","index.html"));
    const links = await loadLinks();
     
    return res.render ("index" ,{links,host:req.host})


}catch (error){
  console.log(error);
  return res.status(500).send("Internal server error");
}
};
 export const postURLShortener =  async(req,res) =>{
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
      catch (error){}
    }; 
   export const getURLShortener = async (req,res) => {
      try{
        const {shortCode} = req.params;
        const links = await loadLinks();

        if(!links[shortCode]) return res.setMaxListeners(404).send("404 error occured");

        return res.redirect(links[shortCode]);
      } catch (err){
        console.error(err);
        return res.status(500).send("internal server error");
      }
    };

