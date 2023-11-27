import React, { useState, useEffect, useRef } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import fetchRealTimeData from "../StockRealTimeService";

import Exporting from "highcharts/modules/exporting";
Exporting(Highcharts);

function RealtimeChart({ chartData, symbol }) {
  const [seriesData, setSeriesData] = useState([]);
  const chartRef = useRef(null);

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

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialData = await fetchRealTimeData(symbol);

        if (initialData) {
          const formattedData = Object.entries(initialData.data).map(
            ([date, data]) => {
              return {
                x: new Date(date).getTime(),
                y: data.close,
              };
            }
          );
          setSeriesData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchData();
  }, [symbol]);

  // Fetch real-time data
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        console.log("Fetching RealtimeChart data for", symbol);
        const newData = await fetchRealTimeData(symbol);
        if (
          newData &&
          chartRef.current &&
          chartRef.current.series &&
          chartRef.current.series.length > 0
        ) {
          const newPoint = {
            x: new Date(newData.timestamp).getTime(),
            y: newData.close,
          };
          chartRef.current.series[0].addPoint(newPoint, true, false);
        }
      } catch (error) {
        console.error("Error fetching real-time data:", error);
      }
    }, 20000); // Fetch every 10 seconds

    return () => clearInterval(interval);
  }, [symbol]);

  const options = {
    chart: {
      type: "line",
      events: {
        load: function () {
          chartRef.current = this;
        },
      },
      backgroundColor: paper_bgcolor_theme,
      style: {
        fontFamily: "Arial",
        color: text_color_theme,
      },
    },
    title: {
      text: "Real-time Stock Data",
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
    yAxis: {
      title: {
        text: "Close",
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
      gridLineColor: button_bgcolor,
    },
    series: [
      {
        name: symbol,
        data: seriesData,
      },
    ],
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
    <div>
      {seriesData.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType="stockChart"
          options={options}
          ref={chartRef}
        />
      ) : (
        <p>loading...</p> //loading screen test + add css
      )}
    </div>
  );
}

export default RealtimeChart;
