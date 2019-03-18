import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';


class RuntimeNotRuntime extends Component {


    constructor(props) {
        super(props);
    }


    getOption = () => {
        return {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        }

    }

    render() {
        return (
            <React.Fragment>
                <ReactEcharts
                    ref={this.myRef}
                    option={this.getOption()}
                    style={{ height: '450px', width: '100%' }}
                />

            </React.Fragment >
        );
    }
}

const mapStateToProps = state => ({
    assets: state.assets.assets,
})

export default RuntimeNotRuntime;