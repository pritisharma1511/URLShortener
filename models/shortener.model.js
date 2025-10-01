import {readFile,writeFile} from "fs/promises";
import { createServer } from "http";
import crypto from "crypto";
import path from "path";

 export const DATA_FILE = path.join("data","links.json");
const loadLinks = async () => {
  try{
    const data = await readFile(DATA_FILE,"utf-8");
    return JSON.parse(data);
  }
  catch(error){
    if(error.code === "ENOENT"){
      await writeFile(DATA_FILE,JSON.stringify({}));
      return{};
    }
    throw error;
  }
}
const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links));
}