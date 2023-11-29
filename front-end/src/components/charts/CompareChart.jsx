import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

function CompareChart({ chartData }) {
  const computedStyle = getComputedStyle(document.documentElement);
  const paper_bgcolor_theme = computedStyle.getPropertyValue(`--background-color`).trim();
  const text_color_theme = computedStyle.getPropertyValue(`--text-color`).trim();

  // Process the percentage change data
  const percentageChangeData = Object.entries(chartData || {}).map(([date, data]) => {
    return [
      new Date(date).getTime(), // Date as timestamp
      data.percentage_change,   // Assuming each entry has a percentage_change field
    ];
  });

  const options = {
    chart: {
      type: 'line',
      height: 575,
      backgroundColor: paper_bgcolor_theme,
      style: {
        fontFamily: "Arial",
        color: text_color_theme,
      },
    },
    title: {
      text: "Daily Percentage Change Over Time",
      style: {
        color: text_color_theme,
      },
    },
    xAxis: {
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
        text: "Percentage Change",
        style: {
          color: text_color_theme,
        },
      },
      labels: {
        style: {
          color: text_color_theme,
        },
      },
    },
    series: [{
      name: "Percentage Change",
      data: percentageChangeData,
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          chart: {
            height: 600,
          },
          navigator: {
            enabled: false,
          },
        },
      }],
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

export default React.memo(CompareChart);
