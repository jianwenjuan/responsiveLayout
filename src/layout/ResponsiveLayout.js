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
            console.log(event.target.offsetX);
            _this.resizeDir = event.target.attributes['direction'].value;
            _this.resizeAfterEle = event.target.parentNode;
            _this.resizeAfterItem = afterItem;
            _this.resizeBeforeEle = _this.resizeAfterEle.previousSibling; 
            _this.resizeBeforeItem = beforeItem;
        }


    }

    dragResize = (dix, disy, event)=> {
        console.log(dix, disy);

        if(this.resizeDir === 'vertical'){
            const totalWidth = this.resizeAfterEle.offsetWidth  + this.resizeBeforeEle.offsetWidth;
            this.resizeAfterItem['style'] = {
                ... this.resizeAfterItem['style'],
                width:`${this.resizeAfterEle.offsetWidth - dix}px`
            }
            this.resizeBeforeItem['style'] = {
                ...this.resizeBeforeItem['style'],
                width:`${totalWidth - this.resizeAfterEle.offsetWidth + dix}px`
            }
 
            this.reRenderLayout();

        }


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
                                    <ContainerItem
                                        style={{ ...item.style, flex: 1 }}
                                        options={item}
                                    />
                                </div>);
                            }
                            else if (item.rows || item.cols) {
                                return (
                                    <div className='row-item' style={item.style}>
                                        {this.content(item)}
                                        {i !== 0 && <ResizeDom dragStart={this.dragStart} dragResize={this.dragResize} direction={'horizontal'} />}
                                    </div>
                                )
                            }
                            return null;
                        })
                    ) : (
                            structure.cols.map((item, i) => {
                                console.log(i)

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