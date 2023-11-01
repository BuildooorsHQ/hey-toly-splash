import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

  async function getMint(id: string) {
    const res = await fetch(`/api/${id}`)
    return res.json()
  }

export default async function Page({params: { id } }) {
  const idData = getMint(id)

  const [data] = await idData;
  const [error, setError] = useState('');

  return (
    <>
      <div className="center text-center p-5">
        <h1 className="text-green-600 font-bold text-2xl ">Hey Toly</h1>
        <h2 className="text-white italic">Discover Solana with your very own Toly!</h2>
        {data.imageId && <div className="flex items-center justify-center"> 
        <p>{data.imageId}</p>
          <Image alt="HeyToly POAT" width="600" height="600" src="https://"  data.imageId & ".ipfs.nftstorage.link/" />
          <Image alt="HeyToly POAT" width="600" height="600" src="https://bafybeicakrgpr4vmywrti4hlgsh4nmez6yptqo4okec4md43zxsr5krl5q.ipfs.nftstorage.link/" />
        </div>}
        {error && <div className="text-red-800">{error}</div>}
        <div className="text-white font-bold">Question</div>
        <div className="text-white">{data.question? data.question : 'N/A'}</div>
        <p className="text-white font-bold">Answer</p>
        <div className="text-white">{data.answer? data.answer : 'N/A'}</div>
        <p className="text-white font-bold">Minted</p>
        <div className="text-white">{data.created_at? data.created_at : 'N/A'}</div>
        <p className="text-white font-bold">Voice</p>
        <div className="text-white">{data.voice? data.voice : 'N/A'}</div>
        <p className="text-white font-bold">Hash</p>
        <div className="text-white">{data.hash? data.hash : 'N/A'}</div>
        <p className="text-white"></p>
        {data.hash && <a href={'https://tiplink.io'+ data.hash} target="_blank" className="text-white bg-purple-600 pl-10 pr-10 p-2 cursor-pointer " type="button">CLAIM</a>}
        <p className="text-red-600">Please make sure you CLAIM to your wallet.</p>
        <footer className="text-white text-xs">Copyright 2023 |
          <Link href="www.buildooors.com" target="_blank" className="hover:text-green" > buildooors.com</Link>
        </footer>
      </div>
    </>
  );
}