import { useState } from "react";
import { Form, Row, Col, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./assets/app.scss";

function App() {
  const [form] = Form.useForm();
  const [billValue, setBillValue] = useState("");
  const [peopleNumber, setPeopleNumber] = useState("");
  const [customTipValue, setCustomTipValue] = useState("");
  const [selectedTipValue, setSelectedTipValue] = useState("");

  const showBottomLabel = () => (
    <div>
      <span className="label">Number of People {"  "}</span>
      <span className={peopleNumber === 0 ? "isZero" : "hide"}>
        Can't be zero
      </span>
    </div>
  );

  const countTipPerPerson = () => {
    const selectedPercentage =
      selectedTipValue !== "" ? selectedTipValue : customTipValue;
    if (peopleNumber !== 0 && peopleNumber !== "") {
      return ((billValue * selectedPercentage) / 100 / peopleNumber).toFixed(2);
    } else return (0).toFixed(2);
  };
  const countTotalTip = () => {
    const selectedPercentage =
      selectedTipValue !== "" ? selectedTipValue : customTipValue;
    if (peopleNumber !== 0 && peopleNumber !== "") {
      return ((billValue * selectedPercentage) / 100).toFixed(2);
    } else return (0).toFixed(2);
  };

  const reset = () => {
    setBillValue("");
    setPeopleNumber("");
    setSelectedTipValue("");
    setCustomTipValue("");
  };

  const tipPercentageArray = [
    { value: 5, text: "5%" },
    { value: 10, text: "10%" },
    { value: 15, text: "15%" },
    { value: 25, text: "25%" },
    { value: 50, text: "50%" },
  ];

  return (
    <div className="app">
      <div className="page-content">
        <div className="text">SPLITTER</div>
        <div className="calculator">
          <div className="left">
            <Form layout="vertical" form={form} onFinish={() => {}}>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label={<span className="label">Bill</span>}>
                    <Input
                      className="input"
                      suffix={"$"}
                      value={billValue}
                      onChange={(e) => setBillValue(parseInt(e.target.value))}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <span className="label">Select Tip %</span>
                </Col>
              </Row>
              <Row gutter={24} style={{ marginLeft: -5 }}>
                {tipPercentageArray?.map((percentage, i) => (
                  <Col
                    key={i}
                    onClick={() => setSelectedTipValue(percentage.value)}
                    className={`${
                      selectedTipValue === percentage.value
                        ? "tip-div-selected"
                        : "tip-div"
                    }`}
                  >
                    {percentage.text}
                  </Col>
                ))}
                <Col className="tip-div-custom">
                  <input
                    value={customTipValue}
                    onChange={(e) => {
                      setCustomTipValue(e.target.value);
                      setSelectedTipValue("");
                    }}
                    type="text"
                    className="custom-input"
                    placeholder="Custom"
                  />
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label={showBottomLabel()}>
                    <Input
                      value={peopleNumber}
                      style={{
                        border: `${
                          peopleNumber === 0 ? "2px solid #cb8e81" : "none"
                        }`,
                      }}
                      className="input"
                      suffix={<UserOutlined />}
                      onChange={(e) => {
                        if (e.target.value !== 0 && e.target.value !== "") {
                          setPeopleNumber(parseInt(e.target.value));
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="right">
            <div className="right-top">
              <Row gutter={24}>
                <Col span={12}>
                  <div className="right-label-top">Tip Amount</div>
                  <div className="right-label-bottom">/ person</div>
                </Col>
                <Col span={12} className="right-tip">
                  <span>$ </span> {countTipPerPerson()}
                </Col>
              </Row>
              <Row gutter={24} style={{ marginTop: 20 }}>
                <Col span={12}>
                  <div className="right-label-top">Total</div>
                  <div className="right-label-bottom">/ person</div>
                </Col>
                <Col span={12} className="right-tip">
                  <span>$ </span> {countTotalTip()}
                </Col>
              </Row>
            </div>
            <div className="right-bottom">
              <Row gutter={24} justify={"center"} style={{ marginBottom: 20 }}>
                <span onClick={reset} className="reset-button">
                  RESET
                </span>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
