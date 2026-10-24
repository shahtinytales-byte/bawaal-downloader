import express from 'express';
import ytdlp from 'yt-dlp-exec';
import {randomUUID} from 'node:crypto';
import {mkdir,rm,stat} from 'node:fs/promises';
import path from 'node:path';
const app=express();const PORT=process.env.PORT||3000;
app.use(express.static('.'));;app.use(express.json({limit:'8kb'}));
const base='/tmp/bawaal-downloads';
function valid(raw){try{const u=new URL(raw);return u.protocol==='https:' && ['www.instagram.com','instagram.com'].includes(u.hostname) && /^\/(reel|reels|p|tv)\/[A-Za-z0-9_-]+\/?$/.test(u.pathname) && !u.username && !u.password;}catch{return false;}}
app.post('/api/download',async(req,res)=>{const url=req.body?.url;if(typeof url!=='string'||!valid(url))return res.status(400).json({error:'Valid public Instagram Reel/Post link paste karein.'});const id=randomUUID();const dir=path.join(base,id);try{await mkdir(dir,{recursive:true});const output=path.join(dir,'video.mp4');await ytdlp(url,{output,format:'best[ext=mp4]/best',noPlaylist:true,noWarnings:true,noCheckCertificates:false,maxFilesize:'150m',socketTimeout:15,retries:1,extractorRetries:1});await stat(output);res.download(output,'bawaal-video.mp4',()=>rm(dir,{recursive:true,force:true}).catch(()=>{}));}catch(e){console.error('DOWNLOAD ERROR:',e);await rm(dir,{recursive:true,force:true}).catch(()=>{});if(!res.headersSent)res.status(422).json({error:'Video download nahi ho saka. Public link try karein; Instagram restrictions bhi ho sakti hain.'});}});
app.listen(PORT,()=>console.log(`BAWAAL Downloader on ${PORT}`));
