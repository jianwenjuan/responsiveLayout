import React, { Component } from 'react';
import ContainerItem from './ContainerItem';



class ResponsiveLayout extends Component {


    render() {
        let structure = this.props.structure;
        let containerStyle = {
            display: 'flex',
            flexDirection: 'column',
            width: '1200px',
            margin: '0 auto'
        }
        return (
            <div className='container1' style={containerStyle} >
                <Content structure={structure}></Content>
            </div>
        )
    }
}

class Content extends Component {
    state = {
        layoutChange: 0
    }
    ontoggle = (data) => {
        console.log(data);
        data.expand = !data.expand;
        this.setState({
            layoutChange: this.layoutChange + 1
        })
    }

    render() {
        let structure = this.props.structure;
        return (
            <React.Fragment>
                {
                    structure.rows ? (
                        structure.rows.map(item => {
                            if (!item.rows && !item.cols) {
                                return (<div className='row'>
                                    <ContainerItem
                                        style={{ ...item.style, flex: 1 }}
                                        options={item}
                                    />
                                </div>);
                            }
                            else if (item.rows || item.cols) {
                                return (
                                    <div className='row' style={item.style}>
                                        <Content structure={item}></Content>
                                    </div>
                                )
                            }
                            return null;
                        })
                    ) : (
                            structure.cols.map(item => {

                                const style = item.style || {};

                                if (((style && !style.width) || !style) && !!item.expand) {
                                    style.flex = 1;
                                }

                                if (item.expand === false) {
                                    style.width = '30px';
                                }


                                if (!item.rows && !item.cols) {
                                    return (<ContainerItem
                                        style={style}
                                        ontoggle={this.ontoggle}
                                        options={item}
                                    />);
                                }
                                else if (item.row || item.cols) {
                                    return (
                                        <div className='col' style={item.style}>
                                            <Content structure={item}></Content>
                                        </div>
                                    )
                                }
                                return null;
                            }))
                }</React.Fragment>
        )
    }
}


export default ResponsiveLayout;