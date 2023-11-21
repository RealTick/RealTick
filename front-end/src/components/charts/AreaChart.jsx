import React, { useContext } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

function AreaChart({ chartData }) {
  const computedStyle = getComputedStyle(document.documentElement);
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

  const dates = Object.keys(chartData || {});

  const ohlc_data = dates.map((date) => [
    new Date(date).getTime(), // convert date -> timestamp
    chartData[date].open,
    chartData[date].high,
    chartData[date].low,
    chartData[date].close,
  ]);

  const volumeData = dates.map((date) => [
    new Date(date).getTime(), // convert date -> timestamp
    chartData[date].volume,
  ]);

  const options = {
    chart: {
      backgroundColor: paper_bgcolor_theme,
      style: {
        fontFamily: "Arial",
        color: text_color_theme,
      },
    },
    plotOptions: {
      candlestick: {
        // color: "pink",
        // lineColor: "red",
        // upColor: "lightgreen",
        // upLineColor: "green",
      },
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: [
            "viewFullscreen",
            "fullscreen",
            "printChart",
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
          ],
        },
      },
    },
    rangeSelector: {
      selected: 2,
      buttonTheme: {
        fill: button_bgcolor,
        style: {
          color: text_color_theme,
        },
        states: {
          hover: {
            fill: button_activecolor,
          },
          select: {
            fill: button_activecolor,
          },
        },
      },
    },
    title: {
      text: "Asset Price and Volume over Time",
      style: {
        color: text_color_theme,
      },
    },
    xAxis: {
      title: {
        style: {
          color: text_color_theme,
        },
      },
      type: "datetime",
      lineColor: text_color_theme,
      lineWidth: 1,
      labels: {
        style: {
          color: text_color_theme,
        },
      },
    },
    yAxis: [
      {
        title: {
          text: "Open Price",
          style: {
            color: text_color_theme,
          },
        },
        labels: {
          align: "right",
          x: -3,
          style: {
            color: text_color_theme,
          },
        },
        height: "60%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
        gridLineColor: button_bgcolor,
      },
      {
        labels: {
          align: "right",
          x: -3,
          style: {
            color: text_color_theme,
          },
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2,
        gridLineColor: button_bgcolor,
      },
    ],
    series: [
      {
        type: "area",
        name: "Stock Price",
        data: ohlc_data,
      },
      {
        type: "column",
        name: "Volume",
        data: volumeData,
        yAxis: 1,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            chart: {
              height: 600,
            },
            subtitle: {
              text: null,
            },
            navigator: {
              enabled: false,
            },
          },
        },
      ],
    },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  );
}

export default React.memo(AreaChart);
