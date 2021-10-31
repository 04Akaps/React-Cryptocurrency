import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Exchanges from "./components/Exchanges";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
import News from "./components/News";
import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [coin, SetCoin] = useState(0);
  const [market, SetMarket] = useState(0);
  const [news, SetNews] = useState([]);
  const getData = async () => {
    await axios
      .get("https://coinranking1.p.rapidapi.com/coins", {
        headers: {
          "x-rapidapi-host": "coinranking1.p.rapidapi.com",
          "x-rapidapi-key":
            "bf4e2abd1emsh95c84a25d1cac11p150d26jsnbc1a2b0c71c9",
        },
      })
      .then((a) => {
        SetMarket(a.data.data);
      });

    await axios
      .get("https://coinranking1.p.rapidapi.com/exchanges", {
        headers: {
          "x-rapidapi-host": "coinranking1.p.rapidapi.com",
          "x-rapidapi-key":
            "bf4e2abd1emsh95c84a25d1cac11p150d26jsnbc1a2b0c71c9",
        },
      })
      .then((a) => {
        SetCoin(a.data.data);
      });

    await axios
      .get("https://bing-news-search1.p.rapidapi.com/news/trendingtopics", {
        headers: {
          "x-bingapis-sdk": "true",
          "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
          "x-rapidapi-key":
            "bf4e2abd1emsh95c84a25d1cac11p150d26jsnbc1a2b0c71c9",
        },
      })
      .then((a) => {
        SetNews(a.data.value);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Homepage coin={coin} market={market} news={news} />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies
                  market={market}
                  simplified={false}
                  news={news}
                />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails market={market} />
              </Route>
              <Route exact path="/news">
                <News simplified={false} news={news} />
              </Route>
            </Switch>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title style={{ color: "white", textAlign: "cneter" }}>
            Cryptoverse <br />
            All rights reserverd
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
