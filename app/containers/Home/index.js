/**
 *
 * Home
 *
 */

import React, { useEffect } from "react";
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

const { Title, Text } = Typography;
const { Option } = Select;

export function Home({ dispatch, home }) {
  useInjectReducer({ key: "home", reducer });
  useInjectSaga({ key: "home", saga });

  const { styles, products } = home;

  useEffect(() => {
    dispatch(fetchDetail());
  }, []);

  console.log(home);

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
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
                placeholder="Please select"
                defaultValue={["a10", "c12"]}
                onChange={handleChange}
              >
                {children}
              </Select>
            </Col>
            <Col span={12}>
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Col>
          </Row>
        </div>
        {/* end of search */}
        {/* card */}
        <div className="site-card-wrapper">
          <Row gutter={16}>
            {products &&
              products.map((item, key) => (
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
                      {item.furniture_style.map((s, k) => (
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
