
import HTMLReactParser from "html-react-parser"
import { Link, useParams } from "react-router-dom"
import millify from "millify"
import {Col, Row, Typography, Select} from "antd"
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useEffect } from "react";
import LineChart from "./LineChart"
const {Title, Text} = Typography
const {Option} = Select

const CryptoDetails = ({market}) =>{
    const {coinId} = useParams()
    const [timePeriod, SetTimePeriod] = useState('7d')
    const [data, SetData] = useState([])
    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const  stats = [
        { title: 'Price to USD', value: `$ ${data.price && millify(data.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: data.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${data.volume && millify(data.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${data.marketCap && millify(data.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(data.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
      ];
    const   genericStats = [
        { title: 'Number Of Markets', value: data.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: data.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: data.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(data.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(data.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
      ];

    function search(){
        for(let x of market.coins){
            if(x.id === Number(coinId)) {
                SetData(x)
            }
        }
    }
    

    useEffect(()=>{
        search()
    },[])

    return(
        <>

        <Col className="coin-detail-container">

            <Col className="coin-heading-container">
                <Title className="coin-name">
                    {data.name} ({data.slug}) Price
                </Title>
                <p>
                    {data.name} live price in Us dollars.
                    View value status, market cap and supply.
                </p>
            </Col>
            <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Time preiod" onChange={(value)=> SetTimePeriod(value)}>
                {time.map((a)=> <Option key={a}>{a}</Option>)}
            </Select>
            <LineChart coinHistory={data.history} currentPrice={millify(data.price)} coinName={data.name}/>
            <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{data.name} Value Statistics</Title>
            <p>An overview showing the statistics of {data.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
            <p>An overview showing the statistics of {data.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
            <Col className="coin-desc-link">
                <Row className="coin-desc">
                    <Title level={3} className="coin-details-heading">
                What is {data.name}
                {HTMLReactParser(data.description)}
                    </Title>
                </Row>
                <Col className="coin-links">
                    <Title level={3} className="coin-details-heading">
                        {data.name} LInks
                    </Title>
                    {data.links.map((link)=>{
                        return(
                        <Row className="coin-link" key={link.name}>
                            <Title level={5} className="link-name">
                                {link.type}
                            </Title>
                            <a href={link.url} target="_blank">
                                {link.name}
                            </a>
                        </Row>
                        )
                    })}
                </Col>
            </Col>

        </Col >
        
        </>


    )
}

export default CryptoDetails