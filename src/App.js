import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Table, Spin, Alert } from "antd";
import axios from "axios";

const PriceTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:9090/api/prices")
      .then(response => {
        if (response.status === 200 && response.data.status === 200 && Array.isArray(response.data.response)) {
          setData(response.data.response);
        } else {
          setError("Invalid response format");
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const formatData = (rawData) => {
    const groupedData = {};
    const columnKeys = new Set();

    rawData.forEach(({ heightTo, widthTo, price }) => {
      if (!groupedData[heightTo]) {
        groupedData[heightTo] = { heightTo };
      }
      groupedData[heightTo][widthTo] = `$${price}`;
      columnKeys.add(widthTo);
    });

    return {
      tableData: Object.values(groupedData),
      columnKeys: Array.from(columnKeys).sort((a, b) => a - b),
    };
  };

  if (loading) return <Spin size="large" style={{ display: "block", margin: "20px auto" }} />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  const { tableData, columnKeys } = formatData(data);

  const columns = [
    { title: "Wight To", dataIndex: "heightTo", key: "heightTo", fixed: "left" },
    ...columnKeys.map(width => ({
      title: `${width}\"`,
      dataIndex: width,
      key: width,
    }))
  ];

  return (
    <Table
      dataSource={tableData}
      columns={columns}
      bordered
      rowKey={(record) => record.heightTo}
      pagination={false}
      scroll={{ x: "max-content" }}
    />
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PriceTable />} />
    </Routes>
  </Router>
);

export default App;