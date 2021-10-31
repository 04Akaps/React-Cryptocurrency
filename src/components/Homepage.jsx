import { Typography, Row, Col, Statistic, Button } from "antd"
import millify from "millify"
import { Link } from "react-router-dom"
import Cryptocurrencies from "./Cryptocurrencies"
import News from "./News"
const {Title} = Typography


const Homepage = ({coin,market,news}) =>{

    return(
    <>
     <Title className="heading">
     Global Crypto Stats
    </Title>
    {coin === 0 || market === 0? null : <div><Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={millify(coin.stats.total)}/></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={coin.exchanges.length} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(coin.stats.volume)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={Math.floor(market.stats.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={Math.floor(market.stats.totalMarkets)} /></Col>
        </Row>
        <div className="home-heading-container">
            <Title className="home-title">Top 12 Cryptocurrencies in the world</Title>
           <Link to="/cryptocurrencies"><Button>Show More</Button></Link>
        </div>
        <Cryptocurrencies market={market} simplified={true}/>
        <div className="home-heading-container">
            <Title className="home-title">Latest Crypto News</Title>
            <Link to="/news"><Button>Show More</Button></Link>
        </div>
        <News simplified={true} news={news}/>
        </div>
        }
        
    </>
    )
}

export default Homepage