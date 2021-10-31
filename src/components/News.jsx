import {Select, Typography, Row, Col, Avatar,Card} from "antd"
import moment from "moment"

const News = ({news,simplified}) =>{
    let count = simplified ? 4 :30

    return(
        <div>
            
            {news.length === 0 ? <Typography.Title>No News Now</Typography.Title>:<Row gutter={[32,32]} className="crypto-card-container">
         {news.map((currency)=>{
             while(count > 0){
                 {count = count -1 }
                return(
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                      <Card title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl}/>}  hoverable>
                        
                      </Card>
                  </Col>
            )}
        })}
        </Row>}
            
        </div>
    )
}

export default News