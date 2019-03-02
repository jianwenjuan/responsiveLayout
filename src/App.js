import React, { Component } from 'react';
// import ResponsiveLayout from './components/responsiveLayout/ResponsiveLayout';
import ResponsiveLayout from './layout/ResponsiveLayout';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.layoutConfig = {
      'a': {
        id: 3,
        expand: true,
        content: 'asd',
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

    this.structure = {
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


  render() {
    return (
      <ResponsiveLayout structure={this.structure}></ResponsiveLayout>
    );
  }
}

export default App;
