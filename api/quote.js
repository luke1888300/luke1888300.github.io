// Vercel Serverless Function
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const { chainId, fromTokenAddress, toTokenAddress, amount } = req.query;

    if (!chainId || !fromTokenAddress || !toTokenAddress || !amount) {
      return res.status(400).json({ error: "缺少必要参数" });
    }

    const url = `https://api.1inch.io/v5.0/${chainId}/quote?fromTokenAddress=${fromTokenAddress}&toTokenAddress=${toTokenAddress}&amount=${amount}`;

    const response = await fetch(url);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*"); // 允许跨域
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
