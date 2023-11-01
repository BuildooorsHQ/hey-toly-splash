import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Page(){

const [image, setImage] = useState();

return (<div className="center text-center">
<h1 className="text-green-600 font-bold text-2xl ">Hey Toly</h1>
<h2 className={"text-white italic"}>Slogan</h2>
<Image className="" alt={"HeyToly POAT"} width={600} height={300} src={`https://bafybeicakrgpr4vmywrti4hlgsh4nmez6yptqo4okec4md43zxsr5krl5q.ipfs.nftstorage.link/`} />
<p className="text-white font-bold">Question</p>
<p className="text-white font-bold">Answer</p>
<p className="text-white font-bold">Minted</p>
<p className="text-white font-bold">Voice</p>
<p className="text-white font-bold">Hash</p>
<input className="text-white bg-purple-600 pl-10 pr-10 p-2 cursor-pointer " type="button" value={'CLAIM'} />
<p className="text-red-600">Please make sure you CLAIM to your wallet.</p>
<footer className="text-white text-xs">Copyright 2023 |
 <Link href={"www.buildooors.com"} target="_blank" className="hover:text-green" > buildooors.com</Link>
</footer>
</div>
)
}