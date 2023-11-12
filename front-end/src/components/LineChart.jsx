import React from "react";
import Plot from "react-plotly.js";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Exporting from "highcharts/modules/exporting";

Exporting(Highcharts);

// function LineChart({ chartData, layout }) {
//   const dates = Object.keys(chartData || {});
//   const openPrices = dates.map((date) => chartData[date].open);

//   const data = [
//     {
//       type: "scatter",
//       mode: "lines",
//       x: dates,
//       y: openPrices,
//     },
//   ];

//   const lineLayout = {
//     ...layout,
//     xaxis: {
//       ...layout.xaxis,
//       rangeslider: { visible: true },
//     },
//   };

//   return <Plot data={data} layout={lineLayout} />;
// }

// export default React.memo(LineChart);

function LineChart({ chartData }) {
  const dates = Object.keys(chartData || {});
  const openPrices = dates.map((date) => [
    new Date(date).getTime(),
    chartData[date].open,
  ]);

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

  const options = {
    chart: {
      backgroundColor: paper_bgcolor_theme,
      style: {
        fontFamily: "Arial",
        color: text_color_theme,
      },
    },
    title: {
      text: "Asset Prices over Time",
      style: {
        color: text_color_theme,
      },
    },
    rangeSelector: {
      selected: 3,
      inputEnabled: true,
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
      buttons: [
        {
          type: "day",
          count: 1,
          text: "1d",
        },
        {
          type: "week",
          count: 1,
          text: "1w",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "month",
          count: 6,
          text: "6m",
        },
        {
          type: "year",
          count: 1,
          text: "1y",
        },
        {
          type: "all",
          text: "All",
        },
      ],
    },
    navigator: {
      enabled: true,
    },
    xAxis: {
      title: {
        text: "Time",
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
    yAxis: {
      title: {
        text: "Open Price",
        style: {
          color: text_color_theme,
        },
      },
      lineColor: text_color_theme,
      lineWidth: 1,
      labels: {
        style: {
          color: text_color_theme,
        },
      },
    },
    series: [
      {
        name: "Open Price",
        data: openPrices,
        type: "line",
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
              height: 300,
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
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  );
}

export default LineChart;
