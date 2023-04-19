import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const { CMS_URL } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(404).json("invalid request");
    return;
  }
  try {
    const response = await axios.get(`${CMS_URL}/api/requests`, {
      headers: {
        Authorization: `Bearer b3d8df10f846e20c083eda0ba0122ade859c8d4639643de754d21eb919a83e2d968b27f3d1e844896515e1c6f0cecfd292dce42bfbed722ca3b34fcf025fc4e75ae714cf1838566ca886d990a036ed0c880bb99dd77dd288b68f99d8302d659ae980275ec0562392fe895f8ee3f0e20e292fab5172e0230e06376fffca5a0447`,
      },
    });
    console.log("response", response);
    res.status(200).send(response);
  } catch (err: any) {
    res.status(400).send(`error, ${err.message}`);
  }
}
