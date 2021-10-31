import {Line} from "react-chartjs-2"
import {Col, Row, Typography} from "antd"

const { Title} = Typography
const LineChart = ({coinHistory, currentPrice, coinName}) =>{

    return(
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">
                    {coinName} Price Change
                </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">
                            {Math.round((coinHistory[coinHistory.length-2] - coinHistory[coinHistory.length-1])*10)/100} %
                    </Title>
                    <Title level={5} className="current-price">
                        Current {coinName} Price : $ {currentPrice}
                    </Title>
                </Col>
            </Row>
        </>
    )
}

export default LineChart