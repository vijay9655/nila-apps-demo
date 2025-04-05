import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Table, Spin, Alert } from "antd";
import "./App.css"
import axios from "axios";
const TableComponent = () => {
  const data = [
    ["36", 239, 269, 307, 377, 450, 517, 594, 664, 735, 810, 877, 946, 1017, 1121, 1143],
    ["48", 272, 312, 357, 447, 536, 621, 711, 868, 883, 1055, 1060, 1230, 1326, 1365, 1393],
    ["60", 310, 359, 415, 514, 621, 732, 840, 1030, 1055, 1260, 1266, 1471, 1478, 1632, 1666],
    ["72", 344, 406, 467, 584, 701, 846, 967, 1184, 1216, 1451, 1461, 1695, 1703, 1886, 1923],
    ["84", 381, 450, 516, 662, 795, 954, 1095, 1347, 1388, 1660, 1669, 1948, 1956, 2169, 2219],
    ["96", 418, 496, 577, 735, 901, 1064, 1227, 1513, 1553, 1867, 1888, 2197, 2211, 2449, 2499],
    ["108", 455, 542, 626, 803, 987, 1163, 1344, 1658, 1704, 2049, 2070, 2413, 2428, 2694, 2748],
    ["120", 492, 586, 683, 887, 1083, 1276, 1484, 1830, 1876, 2277, 2288, 2673, 2683, 2981, 3031],
    ["132", 530, 674, 794, 1035, 1268, 1509, 1745, 1977, 2210, 2486, 2692, 2963, 3167, 3504, 3521],
    ["144", 562, 675, 795, 1038, 1272, 1513, 1750, 2162, 2218, 2686, 2701, 3167, 3177, 3520, 3526],
  ];

  const headers = ["Height To / Width To", "24", "30", "36", "48", "60", "72", "84", "96", "108", "120", "132", "144", "156", "168", "174"];

  return (
    <div className="p-4">
      <table className="border-collapse border border-gray-500 w-full text-sm text-center">
        <thead className="bg-gray-300">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-500 p-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white even:bg-gray-100">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-500 p-2">
                  {typeof cell === "number" ? `$${cell}` : cell + '"'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const PriceTable = () => {
  const [data, setData] = useState(
    [
    // { "heightTo": 50, "widthTo": 100, "price": 150 },
    // { "heightTo": 50, "widthTo": 120, "price": 180 },
    // { "heightTo": 50, "widthTo": 140, "price": 200 },
    // { "heightTo": 50, "widthTo": 240, "price": 200 },
    // { "heightTo": 60, "widthTo": 100, "price": 170 },
    // { "heightTo": 60, "widthTo": 120, "price": 190 },
    // { "heightTo": 60, "widthTo": 140, "price": 190 },
    // { "heightTo": 60, "widthTo": 240, "price": 200 },
    // { "heightTo": 70, "widthTo": 140, "price": 210 },
    // { "heightTo": 70, "widthTo": 120, "price": 210 },
    // { "heightTo": 70, "widthTo": 100, "price": 210 },
    // { "heightTo": 70, "widthTo": 240, "price": 200 },
    // { "heightTo": 80, "widthTo": 140, "price": 210 },
    // { "heightTo": 80, "widthTo": 120, "price": 210 },
    // { "heightTo": 80, "widthTo": 100, "price": 210 },
    // { "heightTo": 80, "widthTo": 240, "price": 200 },
    // { "heightTo": 90, "widthTo": 140, "price": 210 },
    // { "heightTo": 90, "widthTo": 120, "price": 210 },
    // { "heightTo": 90, "widthTo": 100, "price": 210 },
    // { "heightTo": 90, "widthTo": 240, "price": 200 },
    // { "heightTo": 100, "widthTo": 140, "price": 210 },
    // { "heightTo": 100, "widthTo": 120, "price": 210 },
    // { "heightTo": 100, "widthTo": 240, "price": 200 },
    // { "heightTo": 100, "widthTo": 100, "price": 210 },
    // { "heightTo": 110, "widthTo": 140, "price": 210 },
    // { "heightTo": 110, "widthTo": 120, "price": 210 },
    // { "heightTo": 110, "widthTo": 100, "price": 210 },
    // { "heightTo": 110, "widthTo": 240, "price": 200 },
    // { "heightTo": 130, "widthTo": 140, "price": 210 },
    // { "heightTo": 130, "widthTo": 120, "price": 210 },
    // { "heightTo": 130, "widthTo": 100, "price": 210 },
    // { "heightTo": 130, "widthTo": 240, "price": 200 },

  ]);

  const [loading, setLoading] = useState(false);
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
    {
      title: "WIDTH TO",
      dataIndex: "heightTo",
      key: "heightTo",
      fixed: "left",
      width: 100,
      className: "no-left-border", // Custom class to remove left border
      render: (text, record,index) => (
        <div
          style={{
            // alignItems:"center",
            width:"80%",
            textAlign:"start",
            fontWeight:"bold",
            float:"right",
            backgroundColor: index%2==0 ? "white" : " #e6f7ff", // Example condition
            padding: "10px",
          }}
        >
          {text}
        </div>
      ),
    },
    ...columnKeys.map((width) => ({
      title: `${width}"`,
      dataIndex: width,
      key: width,
      width: 150,
    })),
  ];
  
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" ,background:" #e6f7ff"}}>
     <p style={{ 
    // writingMode: "vertical-rl",
    padding: "0px",
    margin: 0, 
    fontWeight: "bold", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    height: "auto",
    transform: "rotate(270deg)",
    width: "90px",
    
    
}}>
    HEIGHT TO
</p>

      <div style={{ flexGrow: 1 }}>
        <Table
     
          dataSource={tableData}
          columns={columns}
          bordered
          rowKey={(record) => record.heightTo}
          pagination={false}
          scroll={{ x: "max-content" }}
          rowClassName={(record, index) => index % 2 === 0 ? "row-red" : "row-blue"}
        />
      </div>
    </div>
  );
};


// const PriceTable = () => {
//   const [data, setData] = useState([
//     { "heightTo": 50, "widthTo": 100, "price": 150 },
//     { "heightTo": 50, "widthTo": 120, "price": 180 },
//     { "heightTo": 50, "widthTo": 140, "price": 200 },
//     { "heightTo": 60, "widthTo": 100, "price": 170 },
//     { "heightTo": 60, "widthTo": 120, "price": 190 },
//     { "heightTo": 60, "widthTo": 140, "price": 210 }
//   ]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // useEffect(() => {
//   //   axios.get("http://localhost:9090/api/prices")
//   //     .then(response => {
//   //       if (response.status === 200 && response.data.status === 200 && Array.isArray(response.data.response)) {
//   //         setData(response.data.response);
//   //       } else {
//   //         setError("Invalid response format");
//   //       }
//   //     })
//   //     .catch(err => setError(err.message))
//   //     .finally(() => setLoading(false));
//   // }, []);

//   const formatData = (rawData) => {
//     const groupedData = {};
//     const columnKeys = new Set();

//     rawData.forEach(({ heightTo, widthTo, price }) => {
//       if (!groupedData[heightTo]) {
//         groupedData[heightTo] = { heightTo };
//       }
//       groupedData[heightTo][widthTo] = `$${price}`;
//       columnKeys.add(widthTo);
//     });

//     return {
//       tableData: Object.values(groupedData),
//       columnKeys: Array.from(columnKeys).sort((a, b) => a - b),
//     };
//   };

//   if (loading) return <Spin size="large" style={{ display: "block", margin: "20px auto" }} />;
//   if (error) return <Alert message="Error" description={error} type="error" showIcon />;

//   const { tableData, columnKeys } = formatData(data);

//   const columns = [
//     { title: "WIGHT TO", dataIndex: "heightTo", key: "heightTo", fixed: "left" },
//     ...columnKeys.map(width => ({
//       title: `${width}\"`,
//       dataIndex: width,
//       key: width,
//     }))
//   ];

//   return (
//     <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//     <p style={{ 
//         writingMode: "vertical-lr",
//         padding:"1%",
//         margin: 0, 
//         fontWeight: "bold", 
//         display: "flex", 
//         alignItems: "center", 
//         justifyContent: "center", 
//         height: "auto" 

//     }}>
//       HEIGHT TO
//     </p>
//     <div style={{ flexGrow: 1 }}>
//       <Table
//         dataSource={tableData}
//         columns={columns}
//         bordered
//         rowKey={(record) => record.heightTo}
//         pagination={false}
//         scroll={{ x: "max-content" }}
//       />
//     </div>
//   </div>
  

// //     <div style={{display:"flex"}}>
// //       {/* <div style={{margin:"auto"}}>
   
// //     </div> */}
// //      <p style={{height:"auto",writingMode:"vertical-lr",alignItems:""}}>
// // height
// //     </p>
// //     <Table
// //       dataSource={tableData}
// //       columns={columns}
// //       bordered
// //       rowKey={(record) => record.heightTo}
// //       pagination={false}
// //       scroll={{ x: "max-content" }}
// //     />
// //     </div>
//   );
// };



const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PriceTable />} />
    </Routes>
  </Router>
);

export default App;