import React, { Component } from 'react';
import ContainerTitle from './ContainerTitle';
import itemTileConfig from './ContainerItemTitileConfig';

class ContainerItem extends Component {
    render() {
        const titleConfig = itemTileConfig(this.props.options);

        return (
            <div className='lc-contaner-item' style={this.props.style}>

                <ContainerTitle
                    onmaximize={this.props.onmaximize}
                    ontoggle={this.props.ontoggle}
                    config={this.props.options}
                    {...titleConfig}
                >
                </ContainerTitle>

                <div className={this.props.options.expand ? 'lc-contaner-item-content' : 'lc-contaner-item-content-collapse'} style={this.props.options.contentStyle}>
                    {this.props.options && this.props.options.expand ? this.props.options.content :
                        (<div className='lc-item-collapse-title'>
                            {this.props.options.titleConfig && this.props.options.titleConfig.title}
                        </div>)
                    }

                </div>
            </div>
        )
    }
}
export default ContainerItem;