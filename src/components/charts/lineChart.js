import React, { Component } from 'react';
import Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d'
highcharts3d(Highcharts);

export default class DonutChart extends Component {

    constructor(props) {
        super(props);
        this.state = { data: null };
        this.url = 'https://cdn.rawgit.com/highcharts/highcharts/057b672172ccc6c08fe7dbb27fc17ebca3f5b770/samples/data/usdeur.json';
    }

    componentDidMount() {
        fetch(this.url)
          .then(response => response.json())
          .then(data => this.setState({ data },() => {
            this._drawChart();
          } ));
    }

    componentDidUpdate(prevProps) {
        // if (!!this.props.height && prevProps.height !== this.props.height) {
        //     this._drawChart();
        // }

        this._drawChart();
    }

    render() {

//      console.log('chart height', height);

        return (
            <div id={'container'+this.props.id} style={{ height: '100%', width: '100%' }} />
        );
    }

    _drawChart() {

        const { data } = this.state;

        Highcharts.chart('container'+this.props.id, {
          chart: {
            zoomType: 'x'
          },
          title: {
            text: 'USD to EUR exchange rate over time'
          },
          subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
          },
          xAxis: {
            type: 'datetime'
          },
          yAxis: {
            title: {
              text: 'Exchange rate'
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            area: {
              fillColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
                },
                stops: [
                  [0, Highcharts.getOptions().colors[0]],
                  [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
              },
              marker: {
                radius: 2
              },
              lineWidth: 1,
              states: {
                hover: {
                  lineWidth: 1
                }
              },
              threshold: null
            }
          },

          series: [{
            type: 'area',
            name: 'USD to EUR',
            data: data
          }]
        });
      }
    }
