import React, { Component } from 'react';
// import ResponsiveLayout from './components/responsiveLayout/ResponsiveLayout';
import ResponsiveLayout from './layout/ResponsiveLayout';
import RuntimeNotRuntime from './components/RuntimeNotRuntime';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }
  layoutConfig = {
    'a': {
      id: 3,
      expand: true,
      content: <RuntimeNotRuntime />,
      contentStyle: {
        backgroundColor: '#1b3c44',
        height: '400px'
      },
      titleConfig: {
        title: 'Assets',
        icons: [{
          icon: 'layout-c-maximize-expand',
          type: 'maximize',
          onClick: () => {
            alert(1);

          },
        }, {
          icon: 'layout-c-filterd',
          type: 'filter',
          onClick: () => {
            alert(1);

          },
        }]


      }
    },
    'b': {
      id: 4,
      expand: true,
      content: 'asd',
      contentStyle: {
        backgroundColor: '#1b3c44',
        height: '400px'

      },
      style: {
        width: '400px',
      },
      titleConfig: {
        title: 'Event Log',
        icons: [{
          icon: 'layout-c-toggle-left-expand',
          type: 'toggle',
          dir: 'right',
          onClick: () => {
            this.resizeCharts();

          }
        }, {
          icon: 'layout-c-filterd',
          type: 'filter',
          onClick: () => {
            alert(1);

          },
        }]
      }
    },
    'c': {
      id: 5,
      expand: true,
      content: 'asd',
      contentStyle: {
        backgroundColor: '#1b3c44',
        height: '400px'

      },
      titleConfig: {
        dropDownMenu: [
          {
            name: 'Runtime-Not-Runtime',
            onClick: () => {

            }
          },
          {
            name: 'Asset Utilization Chart',
            onClick: () => {

            }
          },
          {
            name: 'Cumulative Time by Status',
            onClick: () => {

            }
          }
        ],
        icons: [{
          icon: 'layout-c-maximize-expand',
          type: 'maximize',
          onClick: () => {
            alert(1);

          },
        }]


      }
    },
    'd': {
      id: 2,
      expand: true,
      content: 'asd',
      contentStyle: {
        backgroundColor: '#1b3c44',
        height: '400px'
      },
      titleConfig: {
        title: 'Effectives',
        icons: [{
          icon: 'layout-c-toggle-left-expand',
          type: 'toggle',
          dir: 'right',
          onClick: () => {

          }
        }]


      }
    }
  }

  state = {
    resize: true,
    layoutWrapWidth: 1376,
    structure: {
      rows: [
        {
          cols: [
            this.layoutConfig['a'],
            this.layoutConfig['b']
          ]
        },
        {
          cols: [
            this.layoutConfig['c'],
            this.layoutConfig['d']
          ]
        }

      ]
    }
  }


  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize.bind(this))
  }

  componentWillUnmount() {

    window.removeEventListener('resize', this.onWindowResize.bind(this));
    this.setState = (state, callback) => {
      return;
    };
  }

  breakpoints = {
    lg: { winW: 1376, wrapW: 1366 },
    md: { winW: 986, wrapW: 976 },
    sm: { winW: 676, wrapW: 666 },
    xs: { winW: 628, wrapW: 340 }
  }


  onWindowResize = () => {
    const winW = window.innerWidth;
    this.changeLayoutStructure(winW);
    this.resizeCharts();
  }


  changeLayoutStructure = (winW) => {
    if(winW > this.breakpoints.lg.winW){
      this.layoutConfig.b.style={width:'340px'};
      this.setState({
        structure:{
          rows: [
            {
              cols: [
                this.layoutConfig['a'],
                this.layoutConfig['b']
              ]
            },
            {
              cols: [
                this.layoutConfig['c'],
                this.layoutConfig['d']
              ]
            }
    
          ]
        },
        layoutWrapWidth:this.breakpoints.lg.wrapW
      })

    } else if (winW <= this.breakpoints.lg.winW && winW > this.breakpoints.md.winW) {
      this.layoutConfig.b.style={};
      this.setState({
        structure:{
          rows:[
            {
              cols:[
                this.layoutConfig['a'],
              ]
            },
            {
              cols:[
                this.layoutConfig['c'],
              ]
            },
            {
              cols:[
                this.layoutConfig['b'],
                this.layoutConfig['d'],

              ]
            }
          ]
        },
        layoutWrapWidth:this.breakpoints.md.wrapW
      })

    } else if(winW <= this.breakpoints.md.winW && winW > this.breakpoints.sm.winW){
      this.setState({
        structure:{
          rows:[
            {
              cols:[
                this.layoutConfig['a'],
              ]
            },
            {
              cols:[
                this.layoutConfig['c'],
              ]
            },
            {
              cols:[
                this.layoutConfig['b'],
                this.layoutConfig['d'],

              ]
            }
          ]
        },
        layoutWrapWidth:this.breakpoints.sm.wrapW
      })

    } else if(winW <= this.breakpoints.sm.winW ){
      this.setState({
        structure:{
          rows:[
            {
              cols:[
                this.layoutConfig['a'],
              ]
            },
            {
              cols:[
                this.layoutConfig['c'],
              ]
            },
            {
              cols:[
                this.layoutConfig['b'],
              ]
            },
            {
              cols:[
                this.layoutConfig['d'],
              ]
            }
          ]
        },
        layoutWrapWidth:this.breakpoints.xs.wrapW
      })

    }

  }


  resizeCharts = () => {
    this.setState({
      resize: false
    }, () => {
      this.setState({
        resize: true
      })
    })
  }


  render() {
    return (
      this.state.resize && <ResponsiveLayout structure={this.state.structure} width={this.state.layoutWrapWidth}></ResponsiveLayout>
    );
  }
}

export default App;
