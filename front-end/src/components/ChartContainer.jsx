import React, { useContext, useState } from "react";
import Plot from "react-plotly.js";
import ChartSelector from "./ChartSelector";
import CandlestickChart from "./CandlestickChart";
import LineChart from "./LineChart";
import styles from "./component_css/ChartContainer.module.css";
// import { ThemeContext } from "../contexts/ThemeContext";

function ChartContainer({ chartData }) {
  const [chartType, setChartType] = useState("line");
  // const { theme } = useContext(ThemeContext);

  // const computedStyle = getComputedStyle(document.documentElement);
  // const paper_bgcolor_theme = computedStyle
  //   .getPropertyValue(`--background-color`)
  //   .trim();
  // const text_color_theme = computedStyle
  //   .getPropertyValue(`--text-color`)
  //   .trim();
  // const button_bgcolor = computedStyle
  //   .getPropertyValue(`--button-background`)
  //   .trim();
  // const button_activecolor = computedStyle
  //   .getPropertyValue(`--button-hover-background`)
  //   .trim();
  // const plot_bgcolor_theme = paper_bgcolor_theme;

  ///////////////////PLOTLY
  // const layout = {
  //   paper_bgcolor: paper_bgcolor_theme,
  //   plot_bgcolor: plot_bgcolor_theme,
  //   autosize: true,
  //   responsive: true,
  //   height: 500,
  //   font: {
  //     color: text_color_theme,
  //     family: "Arial",
  //     size: 14,
  //   },
  //   scrollZoom: true,
  //   xaxis: {
  //     title: {
  //       text: "Date",
  //       font: {
  //         size: 20,
  //       },
  //     },
  //     tickmode: "auto",
  //     showgrid: true,
  //     gridcolor: button_bgcolor,
  //     griddash: "solid",
  //     tickcolor: text_color_theme,
  //     rangeselector: {
  //       bgcolor: button_bgcolor,
  //       activecolor: button_activecolor,
  //       x: 1,
  //       y: 1.2,
  //       xanchor: "right",
  //       font: { size: 8 },
  //       buttons: [
  //         { step: "day", stepmode: "backward", count: 5, label: "5D" },
  //         { step: "month", stepmode: "backward", count: 1, label: "1 month" },
  //         { step: "month", stepmode: "backward", count: 6, label: "6 months" },
  //         { step: "year", stepmode: "todate", count: 1, label: "YTD" },
  //         { step: "year", stepmode: "backward", count: 1, label: "1Y" },
  //         { step: "year", stepmode: "backward", count: 5, label: "5Y" },
  //         { step: "all", label: "MAX" },
  //       ],
  //     },
  //   },
  //   yaxis: {
  //     title: {
  //       text: "Price",
  //       font: {
  //         size: 20,
  //       },
  //     },
  //     tickmode: "auto",
  //     showgrid: true,
  //     gridcolor: button_bgcolor,
  //     griddash: "solid",
  //     tickcolor: text_color_theme,
  //   },
  // };

  ///////////////////HIGHCHARTS

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return <LineChart chartData={chartData} />;
      case "candlestick":
        return <CandlestickChart chartData={chartData} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <ChartSelector onChartTypeChange={setChartType} />
      </div>
      {renderChart()}
    </div>
  );
}

export default ChartContainer;
