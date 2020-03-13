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
import { fetchDetail, fetchSearchQuery, fetchSearchQueryData } from "./actions";
import { Row, Col, Select, Divider, Card, Typography, Tag, Input } from "antd";
import "antd/dist/antd.css";
import { CarOutlined } from "@ant-design/icons";
import { convertCurrency } from "utils/price";
import { uniqBy, includes } from "lodash";

const { Text } = Typography;
const { Option } = Select;
const { Search } = Input;

export function Home({ dispatch, home }) {
  useInjectReducer({ key: "home", reducer });
  useInjectSaga({ key: "home", saga });

  const { styles, products } = home;
  const [productsData, setProductsData] = useState(products);
  const [deliveryTime, setDeliveryTime] = useState([]);
  const [searchStyle, setSearchStyle] = useState([]);
  const [searchDeliveryTime, setsearchDeliveryTime] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchDetail());
  }, []);

  useEffect(() => {
    setProductsData(products);
    getDeliveryTime();
  }, [products]);

  useEffect(() => {
    // if (searchStyle.length && searchDeliveryTime !== "") {
    // dispatch(fetchSearchQueryData(products));
    // multipleSearch();
    // }
    if (searchDeliveryTime) {
      handleDeliveryChange(searchDeliveryTime);
    }
    if (searchStyle) {
      handleChange(searchStyle);
    }
    if (search) {
      handleSearch(search);
    }
  }, [searchStyle, searchDeliveryTime, search]);

  function multipleSearch() {
    console.log("multi");

    const findLastData = productsData.filter(function(element) {
      return (
        element.furniture_style.filter(function(cat) {
          return searchStyle.indexOf(cat) > -1;
        }).length === searchStyle.length
      );
    });

    console.log(findLastData, "findLastData");
    const filteredDays = findLastData.filter(el => {
      return el.delivery_time.toString() === searchDeliveryTime.toString();
    });

    console.log(filteredDays, "filteredDays");
    // if (searchStyle.length) {
    //   handleDeliveryChange(searchDeliveryTime);
    // }
  }

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  function handleChange(value) {
    if (!isEmpty(value)) {
      const filtered = products.filter(function(element) {
        return (
          element.furniture_style.filter(function(cat) {
            return value.indexOf(cat) > -1;
          }).length === value.length
        );
      });
      dispatch(fetchSearchQuery(value, searchDeliveryTime, filtered));
      return setProductsData(filtered);
    } else {
      return setProductsData(products);
    }
  }

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  function sortingNumber(a, b) {
    return a.id - b.id;
  }

  function getDeliveryTime() {
    let days = [];
    products.map(el => {
      const numDeli = Number(el.delivery_time);
      if (numDeli <= 7) {
        days.push({ id: 1, label: "1 Week" });
      } else if (numDeli >= 8 && numDeli <= 14) {
        days.push({ id: 2, label: "2 Weeks" });
      } else if (numDeli >= 28 && numDeli <= 31) {
        days.push({ id: 3, label: "1 Month" });
      }
    });

    const uniqDays = uniqBy(days, "id");
    const sortedDays = uniqDays.sort(sortingNumber);

    setDeliveryTime(sortedDays);
  }

  function handleDeliveryChange(value) {
    if (value) {
      const filteredDays = products.filter(el => {
        const numDeli = Number(el.delivery_time);
        if (value == 1) {
          return numDeli <= 7;
        }
        if (value == 2) {
          return numDeli >= 8 && numDeli <= 14;
        }
        if (value == 3) {
          return numDeli >= 28 && numDeli <= 31;
        }
      });
      dispatch(fetchSearchQuery(searchStyle, value, filteredDays));
      return setProductsData(filteredDays);
    } else {
      return setProductsData(products);
    }
  }

  function handleSearch(value) {
    let res = [];
    if (value) {
      products.map(el => {
        if (includes(el.name.toLowerCase(), value.toLowerCase())) {
          return res.push(el);
        }
      });
      return setProductsData(res);
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
              {/* <Title level={2} className="margin-remove title">
                <FormattedMessage {...messages.searchFurniture} />
              </Title> */}
              <Search
                placeholder="Search Furniture"
                enterButton="Search"
                onSearch={val => setSearch(val)}
              />
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
                onChange={val => setSearchStyle(val)}
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
                placeholder="2 Hari pengiriman"
                style={{ width: "100%" }}
                onChange={val => setsearchDeliveryTime(val)}
                allowClear
              >
                {products &&
                  deliveryTime.map(d => (
                    <Option value={d.id.toString()} key={d.id}>
                      {d.label}
                    </Option>
                  ))}
                <Option value="0">More</Option>
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
                    style={{
                      marginBottom: "20px",
                      boxShadow: "0px 5px 5px #ccc"
                    }}
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
                      {truncateString(item.description, 114)}
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
                      <CarOutlined style={{ marginRight: "8px" }} />
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
