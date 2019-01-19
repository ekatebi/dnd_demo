import React, { Component } from 'react';
import Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d'
highcharts3d(Highcharts);

export default class DonutChart extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this._drawChart();
    }

    componentDidUpdate(prevProps) {
        this._drawChart();
    }

    render() {
        return (
            <div id={'container'+this.props.id} style={{ height: '99%', width: '99%' }} />
            );
    }

    _drawChart() {
        Highcharts.chart('container'+this.props.id, {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45
                }
            },
            title: {
                text: 'Contents of Highsoft\'s weekly fruit delivery'
            },
            subtitle: {
                text: '3D donut in Highcharts'
            },
            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45
                }
            },
            series: [{
                name: 'Delivered amount',
                data: [
                    ['Bananas', 8],
                    ['Kiwi', 3],
                    ['Mixed nuts', 1],
                    ['Oranges', 6],
                    ['Apples', 8],
                    ['Pears', 4],
                    ['Clementines', 4],
                    ['Reddish (bag)', 1],
                    ['Grapes (bunch)', 1]
                ]
            }]
        });
    }

}