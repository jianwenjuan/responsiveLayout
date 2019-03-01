import React, { Component } from 'react';
import ContainerTitle from './ContainerTitle';
import itemTileConfig from './ContainerItemTitileConfig';

class ContainerItem extends Component {
    render() {
        const titleConfig = itemTileConfig(this.props.options);

        return (
            <div className='lc-contaner-item' style={this.props.style}>

                <ContainerTitle
                    ontoggle={this.props.ontoggle}
                    config={this.props.options}
                    {...titleConfig}
                >
                </ContainerTitle>

                <div style={this.props.options.contentStyle}>
                    {
                        !!this.props.options.expand && this.props.options.content
                    }

                </div>
            </div>
        )
    }
}
export default ContainerItem;