import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useState,useEffect } from 'react'

const Cryptocurrencies = ({market, simplified}) =>{

    let count = simplified ? 12 :100
    const [coin, SetCoin] = useState(market.coins)
    const [search, SetSearch] = useState("")

    useEffect(()=>{
        const coinData = coin.filter((a)=>{
            if(a.name.toLowerCase().includes(search.toLowerCase()) ){
                return true
            } 
        })
        SetCoin(coinData)
        if(search.length === 0){SetCoin(market.coins)}
    },[search])

    const setSearchTerm = (e) =>{
        SetSearch(e.target.value)
    }
    

    return(
        <>
        {simplified ? null : <div className="search-crypto">
            <Input  placeholder="Search Cryptocurrency" onChange={setSearchTerm} value={search}/>
        </div>}
        <Row gutter={[32,32]} className="crypto-card-container">
         {coin.map((currency)=>{
             while(count > 0){
                 {count = count -1 }
                return(
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                    <Link key={currency.id} to={`/crypto/${currency.id}`}>
                      <Card title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl}/>}  hoverable>
                        <p>Price: {millify(currency.price)}</p>
                        <p>Market Cap: {millify(currency.marketCap)}</p>
                        <p>Daily Change: {currency.change}%</p>
                      </Card>
                    </Link>
                  </Col>
            )}
        })}
        </Row>
        </>
    )
}
export default Cryptocurrencies