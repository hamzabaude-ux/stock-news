module.exports = async (req, res) => {
  const ticker = (req.query.ticker || "").trim();

  if (!ticker) {
    return res.status(400).json({ error: "Ticker is required" });
  }

  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(ticker)}&hl=en-US&gl=US&ceid=US:en`;

  try {
    const response = await fetch(rssUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const xml = await response.text();

    return res.status(200).json({ xml });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch news" });
  }
};
