import React, { Component, Fragment } from "react";
import Plot from "react-plotly.js";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class App extends Component {
  constructor() {
    super();

    const tickers = ['ETHM19', 'TRXM19', 'TRXU19', 'ADAM19', 'BCHU19', 'XBTU19', 'LTCM19', 'LTCU19','ADAU19', 'XRPU19', 'XRPM19', 'BCHM19', 'EOSU19', 'ETHUSD', 'XBT7D_D95', 'XBTZ19','ETHU19', 'XBTUSD', 'EOSM19', 'XBTM19', 'XBT7D_U105'];
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
    const XBTB = "XBT7D_D95";
    const XBTC = "XBT7D_U105";
    const XBTD = "XBTM19";
    const XBTE = "XBTZ19";
    const XBTF = "XBTU19";
    const ETHA = "ETHUSD";
    const ETHB = "ETHM19";
    const ETHC = "ETHU19";
    const XRPA = "XRPM19";
    const XRPB = "XRPU19";
    const LTCA = "LTCM19";
    const LTCB = "LTCU19";
    const TRXA = "TRXM19";
    const TRXB = "TRXU19";
    const ADAA = "ADAM19";
    const ADAB = "ADAU19";
    const BCHA = "BCHM19";
    const BCHB = "BCHU19";
    const EOSA = "EOSM19";
    const EOSB = "EOSU19";




    return (
        <Fragment>
        <Tabs center style={{color: 'cyan', font:300, textAlign: 'center'}}>
          <TabList>
            <Tab>XBT</Tab>
            <Tab>ETH</Tab>
            <Tab>LTC</Tab>
            <Tab>XRP</Tab>
            <Tab>BCH</Tab>
            <Tab>TRX</Tab>
            <Tab>ADA</Tab>
            <Tab>EOS</Tab>
          </TabList>

          <TabPanel>
            <h2>XBT Live OrderBooks</h2>
            <tr>
              <td>
                <Plot
                  data = {[
                    {z: plotter[XBTA],
                     colorscale: 'Jet',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: true,
                          title: {
                            text: XBTA,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
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
              <td>
                <Plot
                  data = {[
                    {z: plotter[XBTB],
                     colorscale: 'Electric',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: XBTB,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[XBTB],
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
              <td>
                <Plot
                  data = {[
                    {z: plotter[XBTC],
                     colorscale: 'YIGnBu',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: XBTC,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[XBTC],
                              ticktext: xticks[XBTC],
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
            </tr>
            <tr>
              <td>
                <Plot
                  data = {[
                    {z: plotter[XBTD],
                     colorscale: 'RdBu',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: XBTD,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[XBTD],
                              ticktext: xticks[XBTD],
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
              <td>
                <Plot
                  data = {[
                    {z: plotter[XBTE],
                     colorscale: 'Portland',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: XBTE,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[XBTE],
                              ticktext: xticks[XBTE],
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
              <td>
                <Plot
                  data = {[
                    {z: plotter[XBTF],
                     colorscale: 'Picnic',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: XBTF,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[XBTF],
                              ticktext: xticks[XBTF],
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
            </tr>
          </TabPanel>

          <TabPanel>
            <h2>ETH Live Orderbooks</h2>
            <tr>
              <td>
                <Plot
                  data = {[
                    {z: plotter[ETHA],
                     colorscale: 'Hot',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: ETHA,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[ETHA],
                              ticktext: xticks[ETHA],
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
              <td>
                <Plot
                  data = {[
                    {z: plotter[ETHB],
                     colorscale: 'RuBu',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: ETHB,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[ETHB],
                              ticktext: xticks[ETHB],
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
              <td>
                <Plot
                  data = {[
                    {z: plotter[ETHC],
                     colorscale: 'Electric',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: ETHC,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[ETHC],
                              ticktext: xticks[ETHC],
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
            </tr>
          </TabPanel>

          <TabPanel>
            <h2>LTC Live Orderbooks</h2>
            <tr>
              <td>
                <Plot
                  data = {[
                    {z: plotter[LTCA],
                     colorscale: 'RuBu',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: LTCA,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[LTCA],
                              ticktext: xticks[LTCA],
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
              <td>
                <Plot
                  data = {[
                    {z: plotter[LTCB],
                     colorscale: 'Blackbody',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: LTCB,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[LTCB],
                              ticktext: xticks[LTCB],
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
            </tr>
          </TabPanel>

          <TabPanel>
            <h2>XRP Live Orderbooks</h2>
            <tr>
              <td>
                <Plot
                  data = {[
                    {z: plotter[XRPA],
                     colorscale: 'RuBu',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: XRPA,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[XRPA],
                              ticktext: xticks[XRPA],
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
              <td>
                <Plot
                  data = {[
                    {z: plotter[XRPB],
                     colorscale: 'Blackbody',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: XRPB,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[XRPB],
                              ticktext: xticks[XRPB],
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
            </tr>
          </TabPanel>

          <TabPanel>
            <h2>BCH Live Orderbooks</h2>
            <tr>
              <td>
                <Plot
                  data = {[
                    {z: plotter[BCHA],
                     colorscale: 'RuBu',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: BCHA,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[BCHA],
                              ticktext: xticks[BCHA],
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
              <td>
                <Plot
                  data = {[
                    {z: plotter[BCHB],
                     colorscale: 'Blackbody',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: BCHB,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[BCHB],
                              ticktext: xticks[BCHB],
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
            </tr>
          </TabPanel>

          <TabPanel>
            <h2>TRX Live Orderbooks</h2>
            <tr>
              <td>
                <Plot
                  data = {[
                    {z: plotter[TRXA],
                     colorscale: 'RuBu',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: TRXA,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[TRXA],
                              ticktext: xticks[TRXA],
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
              <td>
                <Plot
                  data = {[
                    {z: plotter[TRXB],
                     colorscale: 'Blackbody',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: TRXB,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[TRXB],
                              ticktext: xticks[TRXB],
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
            </tr>
          </TabPanel>

          <TabPanel>
            <h2>ADA Live Orderbooks</h2>
            <tr>
              <td>
                <Plot
                  data = {[
                    {z: plotter[ADAA],
                     colorscale: 'RuBu',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: ADAA,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[ADAA],
                              ticktext: xticks[ADAA],
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
              <td>
                <Plot
                  data = {[
                    {z: plotter[ADAB],
                     colorscale: 'Blackbody',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: ADAB,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[ADAB],
                              ticktext: xticks[ADAB],
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
            </tr>
          </TabPanel>

          <TabPanel>
            <h2>EOS Live Orderbooks</h2>
            <tr>
              <td>
                <Plot
                  data = {[
                    {z: plotter[EOSA],
                     colorscale: 'RuBu',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: EOSA,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[EOSA],
                              ticktext: xticks[EOSA],
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
              <td>
                <Plot
                  data = {[
                    {z: plotter[EOSB],
                     colorscale: 'Blackbody',
                     type: 'surface'}
                  ]}
                  layout={{width: 700,
                          height: 600,
                          autosize: false,
                          title: {
                            text: EOSB,
                            font: {
                              color: 'cyan'
                            }
                          },
                          margin: {
                                    l: 65,
                                    r: 50,
                                    b: 65,
                                    t: 90,
                          },
                          paper_bgcolor: 'black',
                          scene: {
                            bgcolor: 'black',
                            xaxis: {
                              tickvals: tickvl[EOSB],
                              ticktext: xticks[EOSB],
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
            </tr>
          </TabPanel>

        </Tabs>


        </Fragment>
    );
  }
}
export default App;
