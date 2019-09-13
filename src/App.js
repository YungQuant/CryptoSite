import React, { Component, Fragment } from "react";
import Plot from "react-plotly.js";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class App extends Component {
  constructor() {
    super();

    const tickers = ['XBTUSD'];
    var plots = {}
    var ticks = {}
    var tvals = {}

    for(var i = 0; i < tickers.length; i++){
      plots[tickers[i]] = [];
      ticks[tickers[i]] = [];
      tvals[tickers[i]] = [];
    }

    this.state = {
      response: false,
      endpoint: "ws://localhost:5678",
      plotter: plots,
      xticks: ticks,
      tickvl: tvals,
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;

    const socket = new WebSocket(endpoint);

    socket.onmessage = evt => {
      this.setState({ response: evt.data });
    }

  }
  render() {
    const { response, plotter, xticks, tickvl } = this.state;
    const data = JSON.parse(response);
    const symbol = data['Symbol']

    plotter[symbol] = data['Data']
    xticks[symbol] = data['X']
    tickvl[symbol] = data['TV']


    const XBTA = "XBTUSD";


    return (
        <Fragment>
            <h2>XBT Live OrderBooks</h2>
            <div align="center">
              <td>
                <Plot
                  data = {[
                    {z: plotter[XBTA],
                     colorscale: 'Jet',
                     type: 'surface'}
                  ]}
                  layout={{
                          autosize: true,
                          responsive: true,
                          title: {
                            text: XBTA,
                            font: {
                              color: 'cyan'
                            }
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[XBTA],
                              ticktext: xticks[XBTA],
                              title: '',
                              titlefont:{
                                color: 'black'
                              },
                              tickfont: {
                                color: 'cyan'
                              }
                            },
                            yaxis: {
                              title: '',
                              titlefont:{
                                color: 'black'
                              },
                              tickfont: {
                                color: 'cyan'
                              }
                            },
                            zaxis: {
                              title: '',
                              titlefont:{
                                color: 'black'
                              },
                              tickfont: {
                                color: 'cyan'
                              }
                            },
                          }}}
                />
              </td>
            </div>
        </Fragment>
    );
  }
}
export default App;
