// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const fetcher = async () => {
    const { id } = req.query
    const response = await fetch(`https://heytolybe.vercel.app/api/get/${id}`)
    const data = await response.json()
    res.status(200).json(data)
  }
  fetcher()
}
