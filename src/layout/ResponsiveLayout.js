import React, { Component } from 'react';
import ContainerItem from './ContainerItem';
import ResizeDom from './ResizeDom'



class ResponsiveLayout extends Component {
    state = {
        layoutChange: 0
    }

    ontoggle = (data) => {
        data.expand = !data.expand;

        this.reRenderLayout();
    }

    resizeItem = {};

    onmaximize = (data) => {
        data.isMaximize = !data.isMaximize;
        if (data.isMaximize) {
            this.maxmizeConfig = data;
        } else {
            this.maxmizeConfig = null;
        }

        this.reRenderLayout();
    }

    dragStart = (beforeItem, afterItem) => {
        const _this = this;
        return (event) => {
            _this.resizeDir = event.target.attributes['direction'].value;
            _this.resizeAfterEle = event.target.parentNode;
            _this.resizeAfterEleWidth = _this.resizeAfterEle.offsetWidth;
            _this.resizeBeforeEleWidth = _this.resizeAfterEle.previousSibling.offsetWidth;
            _this.resizeAfterEleHeight = _this.resizeAfterEle.offsetHeight - 8;
            _this.resizeBeforeEleHeight = _this.resizeAfterEle.previousSibling.offsetHeight -8;
            _this.resizeAfterItem = afterItem;
            _this.resizeBeforeItem = beforeItem;
        }
    }

    dragResize = (dix, disy, event) => {
        if (this.resizeDir === 'vertical') {
            const totalWidth = this.resizeAfterEleWidth + this.resizeBeforeEleWidth;
            this.resizeAfterItem['style'] = {
                ...this.resizeAfterItem['style'],
                width: `${this.resizeAfterEleWidth - dix}px`
            }
            this.resizeBeforeItem['style'] = {
                ...this.resizeBeforeItem['style'],
                width: `${totalWidth - this.resizeAfterEleWidth + dix}px`
            }
        }

        if (this.resizeDir === 'horizontal') {
            const totalHeight = this.resizeAfterEleHeight + this.resizeBeforeEleHeight;
            console.log(totalHeight);
            if (this.resizeAfterItem.cols) {
                this.resizeAfterItem.cols.forEach(element => {
                    element['style'] = {
                        ...element['style'],
                        height: `${this.resizeAfterEleHeight - disy}px`
                    }
                });
            }

            if (this.resizeBeforeItem.cols) {
                this.resizeBeforeItem.cols.forEach(element => {
                    element['style'] = {
                        ...element['style'],
                        height: `${totalHeight - this.resizeAfterEleHeight + disy}px`
                    }
                });
            }
        }

        this.reRenderLayout();
    }

    reRenderLayout = () => {
        this.setState({
            layoutChange: this.layoutChange + 1
        })

        this.props.onLayoutChange && this.props.onLayoutChange();
    }

    content = (structure) => {
        if (this.maxmizeConfig) {
            return (<div className='row-item'>
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
                        structure.rows.map((item, i) => {
                            if (!item.rows && !item.cols) {
                                return (<div className='row-item'>
                                    <div className='col-item' style={{ ...item.style, flex: 1 }}>
                                        <ContainerItem
                                            options={item}
                                        />
                                    </div>
                                    {i !== 0 && <ResizeDom dragStart={this.dragStart(structure.rows[i - 1], item)} dragResize={this.dragResize.bind(this)} direction={'horizontal'} />}
                                </div>);
                            }
                            else if (item.rows || item.cols) {
                                return (
                                    <div className='row-item' style={item.style}>
                                        {this.content(item)}
                                        {i !== 0 && <ResizeDom dragStart={this.dragStart(structure.rows[i - 1], item)} dragResize={this.dragResize.bind(this)} direction={'horizontal'} />}
                                    </div>
                                )
                            }
                            return null;
                        })
                    ) : (
                            structure.cols.map((item, i) => {
                                let style = {};
                                Object.assign(style, item.style);

                                if (((style && !style.width) || !style) && !!item.expand) {
                                    style.flex = 1;
                                }
                                if (item.expand === false) {
                                    style = { flexBasis: '30px' };
                                }

                                if (!item.rows && !item.cols) {
                                    return (<div className='col-item' style={style}>
                                        <ContainerItem
                                            onmaximize={this.onmaximize}
                                            ontoggle={this.ontoggle}
                                            options={item}
                                        />
                                        {i !== 0 && <ResizeDom dragStart={this.dragStart(structure.cols[i - 1], item)} dragResize={this.dragResize.bind(this)} direction={'vertical'} />}
                                    </div>

                                    );
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
            width: `${this.props.width}px`,
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