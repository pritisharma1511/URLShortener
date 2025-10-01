import crypto from "crypto";
 export const postURLShortener = (loadLinks,saveLinks)=> async(req,res) =>{
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

