import React, { useContext } from "react";
import Plot from "react-plotly.js";
import styles from "./component_css/CandlestickChart.module.css";
import { ThemeContext } from "../contexts/ThemeContext";

function CandlestickChart({ chartData }) {
  const dates = Object.keys(chartData || {});

  //theming system
  const { theme } = useContext(ThemeContext); //import theme (i.e. 'dark')
  const computedStyle = getComputedStyle(document.documentElement); //import stylesheet

  const paper_bgcolor_theme = computedStyle
    .getPropertyValue(`--background-color`)
    .trim();
  const text_color_theme = computedStyle
    .getPropertyValue(`--text-color`)
    .trim();
  const button_bgcolor = computedStyle
    .getPropertyValue(`--button-background`)
    .trim();
  const plot_bgcolor_theme = paper_bgcolor_theme; //temp, can change to w/e

  const openPrices = dates.map((date) => chartData[date].open);
  const highPrices = dates.map((date) => chartData[date].high);
  const lowPrices = dates.map((date) => chartData[date].low);
  const closePrices = dates.map((date) => chartData[date].close);

  const data = [
    {
      type: "candlestick",
      x: dates,
      open: openPrices,
      high: highPrices,
      low: lowPrices,
      close: closePrices,
    },
  ];

  const layout = {
    title: {
      text: "Stock Price",
      font: {
        size: 30,
      },
    },
    paper_bgcolor: paper_bgcolor_theme,
    plot_bgcolor: plot_bgcolor_theme,
    font: {
      color: text_color_theme,
      family: "Arial",
      size: 14,
    },
    xaxis: {
      title: {
        text: "Date",
        font: {
          size: 20,
        },
      },
      tickmode: "auto",
      showgrid: true,
      gridcolor: button_bgcolor,
      griddash: "solid",
      tickcolor: text_color_theme,
      rangeselector: {
        x: 0,
        y: 1.2,
        xanchor: "left",
        font: { size: 8 },
        buttons: [
          {
            step: "day",
            stepmode: "backward",
            count: 5,
            label: "5D",
            bgcolor: "red",
          },
          {
            step: "month",
            stepmode: "backward",
            count: 1,
            label: "1 month",
            bgcolor: "red",
          },
          {
            step: "month",
            stepmode: "backward",
            count: 6,
            label: "6 months",
            fill: "#FFFFFF",
          },
          {
            step: "year",
            stepmode: "todate",
            count: 1,
            label: "YTD",
            fill: "#FFFFFF",
          },

          {
            step: "year",
            stepmode: "backward",
            count: 1,
            label: "1Y",
            fill: "#FFFFFF",
          },
          {
            step: "year",
            stepmode: "backward",
            count: 5,
            label: "5Y",
            fill: "#FFFFFF",
          },

          {
            step: "all",
            label: "MAX",
            bgcolor: button_bgcolor,
          },
        ],
      },
    },
    yaxis: {
      title: {
        text: "Price",
        font: {
          size: 20,
        },
      },
      tickmode: "auto",
      showgrid: true,
      gridcolor: button_bgcolor,
      griddash: "solid",
      tickcolor: text_color_theme,
    },
  };

  return (
    <div className={styles.candlestickChartContainer}>
      <Plot data={data} layout={layout} />
    </div>
  );
}

export default CandlestickChart;
