import React, { Component } from 'react';
import ContainerItem from './ContainerItem';



class ResponsiveLayout extends Component {
    state = {
        layoutChange: 0
    }

    ontoggle = (data) => {
        data.expand = !data.expand;

        this.reRenderLayout();
    }

    onmaximize = (data) => {
        data.isMaximize = !data.isMaximize;
        if (data.isMaximize) {
            this.maxmizeConfig = data;
        } else {
            this.maxmizeConfig = null;
        }

        this.reRenderLayout();
    }

    reRenderLayout = () => {
        this.setState({
            layoutChange: this.layoutChange + 1
        })
    }

    content = (structure) => {
        if (this.maxmizeConfig) {
            return (<div className='row'>
                <ContainerItem
                    style={{ ...this.maxmizeConfig.style, flex: 1 }}
                    onmaximize={this.onmaximize}
                    options={this.maxmizeConfig}
                />
            </div>)
        }
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
                                        {this.content(item)}
                                    </div>
                                )
                            }
                            return null;
                        })
                    ) : (
                            structure.cols.map(item => {

                                let style = {};
                                Object.assign(style, item.style);

                                if (((style && !style.width) || !style) && !!item.expand) {
                                    style.flex = 1;
                                }
                                if (item.expand === false) {
                                    style.width = '30px';
                                }

                                if (!item.rows && !item.cols) {
                                    return (<ContainerItem
                                        style={style}
                                        onmaximize={this.onmaximize}
                                        ontoggle={this.ontoggle}
                                        options={item}
                                    />);
                                }
                                else if (item.row || item.cols) {
                                    return (
                                        <div className='col' style={item.style}>
                                            {this.content(item)}
                                        </div>
                                    )
                                }
                                return null;
                            }))
                }</React.Fragment>
        )

    }

    render() {
        let containerStyle = {
            display: 'flex',
            flexDirection: 'column',
            width: '1200px',
            margin: '0 auto'
        }
        return (
            <div className='container1' style={containerStyle} >
                {this.content(this.props.structure)}
            </div>
        )
    }
}

export default ResponsiveLayout;