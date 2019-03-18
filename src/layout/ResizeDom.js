import React, { Component } from 'react';


class ResizeDom extends Component {
    constructor(props) {
        super(props);

        this._timeout = null

        /**
        * The delay after which to start the drag in milliseconds
        */
        this._nDelay = 200;

        this.beginDragResize = false;

        this._nDistance = 10;

        this._nX = 0;
        this._nY = 0;

        this._nOriginalX = 0;
        this._nOriginalY = 0;
    }

    onMouseDown = (event) => {
        event.preventDefault();
        const coorDinates = this._getCoordinates(event);
        this._nOriginalX = coorDinates.x;
        this._nOriginalY = coorDinates.y;
        this.props.dragStart && this.props.dragStart( event);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);

        this._timeout = setTimeout(() => {
            this.startDragResize();
        }, this._nDelay);


    }
    onMouseMove = (event) => {
        const coorDinates = this._getCoordinates(event);

        // move distance
        this._nX = coorDinates.x - this._nOriginalX;
        this._nY = coorDinates.y - this._nOriginalY;

        if (!this.beginDragResize) {
            if (
                Math.abs(this._nX) > this._nDistance ||
                Math.abs(this._nY) > this._nDistance
            ) {
                clearTimeout(this._timeout);
                this.startDragResize();
            }

        }

        if (this.beginDragResize) {
            // console.log('resize', this._nX, this._nY, event);
            this.props.dragResize && this.props.dragResize(this._nX, this._nY, event);
        }
    }

    startDragResize = () => {
        this.beginDragResize = true;
      

    }

    onMouseUp = (oEvent) => {
        if (this._timeout != null) {
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseUp);
            clearTimeout(this._timeout);
            if (this.beginDragResize) {
                this.beginDragResize = false;
                this.props.dragStop && this.props.dragStop(oEvent, this._nOriginalX + this._nX);
            }
        }
    }

    _getCoordinates = (event) => {
        event = event.originalEvent && event.originalEvent.touches ? event.originalEvent.touches[0] : event;
        return {
            x: event.pageX,
            y: event.pageY
        }

    }

    render() {
        let html;
        if (this.props.direction === 'horizontal') {
            html = (<div className="lc-splitter-horizontal" direction={'horizontal'} onMouseDown={this.onMouseDown}></div>)
        } else {
            html = (<div className="lc-splitter-vertical" direction={'vertical'} onMouseDown={this.onMouseDown}></div>)
        }
        return (
            <React.Fragment>
                {html}
            </React.Fragment>
        )

    }
}
export default ResizeDom;