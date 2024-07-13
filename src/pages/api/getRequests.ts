import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const { CMS_URL } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json("invalid request");
    return;
  }
  try {
    const response = await axios.get(`${CMS_URL}/api/requests`, {
      headers: {
        Authorization: `Bearer sk-proj-vBej6GT8u6VN9ORmmmp4T3BlbkFJR8HTSMtFZ2j7iw4rrare`,
      },
    });
    res.status(200).send(response);
  } catch (err: any) {
    res.status(400).send(`error, ${err.message}`);
  }
}
