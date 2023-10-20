import React from 'react';
import Plot from 'react-plotly.js';

function CandlestickChart({ data }) {
    const trace = {
        x: data.map(d => d.time),
        close: data.map(d => d.close),
        high: data.map(d => d.high),
        low: data.map(d => d.low),
        open: data.map(d => d.open),

        increasing: {line: {color: 'green'}},
        decreasing: {line: {color: 'red'}},

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };

    const layout = {
        dragmode: 'zoom',
        margin: {
            r: 10,
            t: 25,
            b: 40,
            l: 60
        },
        showlegend: false,
        xaxis: {
            autorange: true,
            domain: [0, 1],
            range: [data[0].time, data[data.length - 1].time],
            rangeslider: {range: [data[0].time, data[data.length - 1].time]},
            type: 'date'
        },
        yaxis: {
            autorange: true,
            type: 'linear'
        }
    };

    return <Plot data={[trace]} layout={layout} />;
}

export default CandlestickChart;
