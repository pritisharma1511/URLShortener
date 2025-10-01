import crypto from "crypto";
// import {loadlinks ,saveLinks} from "/models/shortener.model.js"

export const getShortenerPage = async(req,res) => {
  try{
    const file = await readFile(path.join("views","index.html"));
    const links = await loadLinks();
    
    const content = file.toString().replaceAll("{{shortened_urls}}",
      Object.entries(links)
      .map(
        ([shortCode,url]) =>
          `<li><a href="/${shortCode}" target= "_blank">${req.host}
        /${shortCode} </a> - ${url}</li>`
      )
      .join("")
    );
  return res.send(content)


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

