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
  const button_activecolor = computedStyle
    .getPropertyValue(`--button-hover-background`)
    .trim();
  const plot_bgcolor_theme = paper_bgcolor_theme; //temp, can change to w/e

  const openPrices = dates.map((date) => chartData[date].open);
  const highPrices = dates.map((date) => chartData[date].high);
  const lowPrices = dates.map((date) => chartData[date].low);
  const closePrices = dates.map((date) => chartData[date].close);

  const data = React.useMemo(() => [
    {
      type: "candlestick",
      x: dates,
      open: openPrices,
      high: highPrices,
      low: lowPrices,
      close: closePrices,
    },
  ], [dates, openPrices, highPrices, lowPrices, closePrices]);

  const layout = React.useMemo(() => ({
    paper_bgcolor: paper_bgcolor_theme,
    plot_bgcolor: plot_bgcolor_theme,
    responsive: true,
    autosize: true,
    height: 500,
    font: {
      color: text_color_theme,
      family: "Arial",
      size: 14,
    },
    scrollZoom: true,
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
        bgcolor: button_bgcolor,
        activecolor: button_activecolor,
        x: 1,
        y: 1.2,
        xanchor: "right",
        font: { size: 8 },
        buttons: [
          {
            step: "day",
            stepmode: "backward",
            count: 5,
            label: "5D",
          },
          {
            step: "month",
            stepmode: "backward",
            count: 1,
            label: "1 month",
          },
          {
            step: "month",
            stepmode: "backward",
            count: 6,
            label: "6 months",
          },
          {
            step: "year",
            stepmode: "todate",
            count: 1,
            label: "YTD",
          },
          {
            step: "year",
            stepmode: "backward",
            count: 1,
            label: "1Y",
          },
          {
            step: "year",
            stepmode: "backward",
            count: 5,
            label: "5Y",
          },
          {
            step: "all",
            label: "MAX",
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
  }), [paper_bgcolor_theme, text_color_theme, button_bgcolor, button_activecolor]);

  return (
    <div className={styles.candlestickChartContainer}>
      <Plot data={data} layout={layout} />
    </div>
  );
}

export default React.memo(CandlestickChart);
