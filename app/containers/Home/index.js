/**
 *
 * Home
 *
 */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { Helmet } from "react-helmet";
import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectHome from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import { fetchDetail } from "./actions";
import { Row, Col, Select, Divider, Card, Typography, Tag } from "antd";
import "antd/dist/antd.css";
import { CarOutlined } from "@ant-design/icons";
import { convertCurrency } from "utils/price";
import { uniq } from "lodash";

const { Title, Text } = Typography;
const { Option } = Select;

export function Home({ dispatch, home }) {
  useInjectReducer({ key: "home", reducer });
  useInjectSaga({ key: "home", saga });

  const { styles, products } = home;
  const [productsData, setProductsData] = useState(products);
  const [deliveryTime, setDeliveryTime] = useState([]);

  useEffect(() => {
    dispatch(fetchDetail());
  }, []);

  useEffect(() => {
    setProductsData(products);
    getDeliveryTime();
  }, [products]);

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  function handleChange(value) {
    let res = [];
    if (!isEmpty(value)) {
      const filtered = products.filter(function(element) {
        return (
          element.furniture_style.filter(function(cat) {
            return value.indexOf(cat) > -1;
          }).length === value.length
        );
      });
      res = filtered;
    } else {
      return setProductsData(products);
    }
    return setProductsData(res);
  }

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  function sortingNumber(a, b) {
    return a - b;
  }

  function getDeliveryTime() {
    let days = [];
    products.map(el => {
      days.push(Number(el.delivery_time));
    });

    const uniqDays = uniq(days);
    const sortedDays = uniqDays.sort(sortingNumber);

    setDeliveryTime(sortedDays);
  }

  function handleDeliveryChange(value) {
    if (value) {
      const filteredDays = products.filter(el => {
        return el.delivery_time.toString() === value.toString();
      });
      return setProductsData(filteredDays);
    } else {
      return setProductsData(products);
    }
  }
  return (
    <article>
      <Helmet>
        <title>Search Furniture</title>
        <meta name="description" content="Search Furniture" />
      </Helmet>
      <div>
        {/* search */}
        <div className="bg-blue">
          <Row gutter={16}>
            <Col span={24}>
              <Title level={2} className="margin-remove title">
                <FormattedMessage {...messages.searchFurniture} />
              </Title>
            </Col>
            <Col span={24}>
              <Divider
                orientation="left"
                style={{ color: "#333", fontWeight: "normal" }}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Classic, Midcentury"
                onChange={handleChange}
              >
                {styles &&
                  styles.map(item => (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  ))}
              </Select>
            </Col>
            <Col span={12}>
              <Select
                placeholder="2 Hari"
                style={{ width: "100%" }}
                onChange={handleDeliveryChange}
                allowClear
              >
                {products &&
                  deliveryTime.map(d => (
                    <Option value={d.toString()} key={d}>
                      {d} Hari
                    </Option>
                  ))}
              </Select>
            </Col>
          </Row>
        </div>
        {/* end of search */}
        {/* card */}
        <div className="site-card-wrapper">
          <Row gutter={16}>
            {productsData &&
              productsData.map((item, key) => (
                <Col span={8} key={key}>
                  <Card
                    title={
                      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        {truncateString(item.name, 12)}
                      </Text>
                    }
                    bordered={false}
                    type="inner"
                    extra={
                      <Text style={{ color: "#FEA31C" }}>
                        {convertCurrency(item.price)}
                      </Text>
                    }
                  >
                    <div className="description">
                      {truncateString(item.description, 70)}
                    </div>
                    <div className="product-style">
                      {item.furniture_style &&
                        item.furniture_style.map((s, k) => (
                          <Tag color="gold" key={k}>
                            {s}
                          </Tag>
                        ))}
                    </div>
                    <div className="time">
                      <CarOutlined />
                      {item.delivery_time} Hari pengiriman
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
        {/* end of card */}
        {/* <ReposList {...reposListProps} /> */}
      </div>
    </article>
  );
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Home);
