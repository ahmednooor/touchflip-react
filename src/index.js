/* 
 * TocuhFlip React (touchflip-react)
 * ~ A Reusable Flipping Component For ReactJS
 * Author: Ahmed Noor (https://github.com/ahmednooor)
 * License: MIT
 * Source: https://github.com/ahmednooor/touchflip-react
*/

import React, { Component } from 'react';


const TouchFlipSide = (props) => {
    const style = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        transform: 
            'perspective(' + props.perspective.toString() + 'px)'
            + ' rotate' + props.flipOrientation + '(' + props.rotate.toString() + 'deg)',
        backfaceVisibility: 'hidden',
        transition: 'transform ' + props.duration.toString() + 'ms ' + props.timingFunction.toString(),
        ...props.style
    };

    return (
        <div style={style} className="__touchflip__side__">
            {props.children}
        </div>
    );
};


class TouchFlip extends Component {

    state = {
        isFlippable: 
            this.props.isFlippable !== undefined ? 
                this.props.isFlippable : true,

        showBackSide: 
            this.props.showBackSide !== undefined ? 
                this.props.showBackSide : false,

        frontRotate: 
            !this.showBackSide ? 0 : 180,

        backRotate: 
            !this.showBackSide ? -180 : 0,

        duration: 
            this.props.duration !== undefined ? 
                this.props.duration : 500,

        perspective: 
            this.props.perspective !== undefined ? 
                this.props.perspective : 800,
            
        timingFunction:
            this.props.timingFunction !== undefined ? 
                this.props.timingFunction : 'linear',
                // ^ 'ease-in' 'ease-in-out' etc.

        flipOrientation: 
            this.props.flipOrientation !== undefined ? 
                this.props.flipOrientation : 'horizontal', // or 'vertical'

        defaultFlipDirection: 
            this.props.defaultFlipDirection !== undefined ? 
                this.props.defaultFlipDirection : true,
                // ^ if true, rotates left to right horizontally and down to up vertically
                // ^ if false, rotates right to left horizontally and up to down vertically

        onFrontSideShown: 
            this.props.onFrontSideShown !== undefined ? 
                this.props.onFrontSideShown : () => {},

        onBackSideShown: 
            this.props.onBackSideShown !== undefined ? 
                this.props.onBackSideShown : () => {},
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isFlippable: 
                nextProps.isFlippable !== undefined ? 
                    nextProps.isFlippable : this.state.isFlippable,

            showBackSide: 
                nextProps.isFlippable && nextProps.showBackSide !== undefined ? 
                    nextProps.showBackSide : this.state.showBackSide,

            onFrontSideShown: 
                nextProps.onFrontSideShown !== undefined ? 
                    nextProps.onFrontSideShown : () => {},

            onBackSideShown: 
                nextProps.onBackSideShown !== undefined ? 
                    nextProps.onBackSideShown : () => {},
        }, this.flip);
    }

    showFront = () => {
        if (this.state.defaultFlipDirection) {
            this.setState({
                frontRotate: this.state.frontRotate + 180,
                backRotate: this.state.backRotate + 180,
                showBackSide: false
            });
        }
        else {
            this.setState({
                frontRotate: this.state.frontRotate - 180,
                backRotate: this.state.backRotate - 180,
                showBackSide: false
            });
        }
    }
    
    showBack = () => {
        if (this.state.defaultFlipDirection) {
            this.setState({
                frontRotate: this.state.frontRotate + 180,
                backRotate: this.state.backRotate + 180,
                showBackSide: true
            });
        }
        else {
            this.setState({
                frontRotate: this.state.frontRotate - 180,
                backRotate: this.state.backRotate - 180,
                showBackSide: true
            });
        }
    }

    flip = () => {
        if (!this.state.showBackSide && this.state.isFlippable) {
            this.showBack();
            this.state.onBackSideShown();
        }
        else if (this.state.showBackSide && this.state.isFlippable) {
            this.showFront();
            this.state.onFrontSideShown();
        }
    }

    swipeFlags = {
        locked: false,
        x1: null,
        y1: null,
        isFlipped: false,
        isSwiped: false
    }

    unify = (e) => {
        // taken from https://codepen.io/thebabydino/pen/wybaGK?editors=0010
        return e.changedTouches ? e.changedTouches[0] : e 
    }

    swipeStart = (event) => {
        this.swipeFlags = {
            locked: false,
            x1: null,
            y1: null,
            isFlipped: false,
            isSwiped: false
        };

        if (!event.target.getAttribute('data-noflip')) {
            event.preventDefault();
            event.stopPropagation();
            this.swipeFlags.x1 = this.unify(event).screenX;
            this.swipeFlags.y1 = this.unify(event).screenY;
            this.swipeFlags.locked = true;
        }
    }
    
    swipeMove = (event) => {
        if (this.swipeFlags.locked) {
            this.swipeFlags.isSwiped = true;
        }
        if (this.swipeFlags.locked && !event.target.getAttribute('data-noflip')) {
            event.preventDefault();
            event.stopPropagation();
            const x2 = this.unify(event).screenX;
            const y2 = this.unify(event).screenY;

            if (this.state.flipOrientation === 'horizontal') {
                if (x2 - this.swipeFlags.x1 > 40 
                        && !this.swipeFlags.isFlipped) {
                    this.swipeFlags.isFlipped = true;
                    this.setState({
                        defaultFlipDirection: true
                    }, this.flip);
                }

                if (x2 - this.swipeFlags.x1 < -40 
                        && !this.swipeFlags.isFlipped) {
                    this.swipeFlags.isFlipped = true;
                    this.setState({
                        defaultFlipDirection: false
                    }, this.flip);
                }
            }
            else if (this.state.flipOrientation === 'vertical') {
                if (y2 - this.swipeFlags.y1 > 40 
                        && !this.swipeFlags.isFlipped) {
                    this.swipeFlags.isFlipped = true;
                    this.setState({
                        defaultFlipDirection: false
                    }, this.flip);
                }

                if (y2 - this.swipeFlags.y1 < -40 
                        && !this.swipeFlags.isFlipped) {
                    this.swipeFlags.isFlipped = true;
                    this.setState({
                        defaultFlipDirection: true
                    }, this.flip);
                }
            }
        }
    }

    swipeEnd = (event) => {
        if (!event.target.getAttribute('data-noflip')) {
            event.preventDefault();
            event.stopPropagation();
            
            if (!this.swipeFlags.isFlipped
                    && !this.swipeFlags.isSwiped) {
                this.flip()
            }

            this.swipeFlags = {
                locked: false,
                x1: null,
                y1: null,
                isFlipped: false,
                isSwiped: false
            };
        }
    }

    render() {
        const style = {
            position: 'relative',
            touchAction: 'none',
            ...this.props.style
        };

        return (
            <div 
                id={this.props.id ? this.props.id : ''}
                className={this.props.className ? this.props.className : ''}
                style={style} 

                onTouchStart={this.swipeStart}
                onTouchMove={this.swipeMove}
                onTouchEnd={this.swipeEnd}

                onMouseDown={this.swipeStart}
                onMouseMove={this.swipeMove}
                onMouseUp={this.swipeEnd}
            >
                <TouchFlipSide 
                    perspective={this.state.perspective}
                    rotate={this.state.frontRotate}
                    duration={this.state.duration}
                    timingFunction={this.state.timingFunction}
                    flipOrientation={this.state.flipOrientation === 'vertical' ? 'X' : 'Y'}
                >
                    {this.props.front}
                </TouchFlipSide>
                <TouchFlipSide 
                    perspective={this.state.perspective}
                    rotate={this.state.backRotate}
                    duration={this.state.duration}
                    timingFunction={this.state.timingFunction}
                    flipOrientation={this.state.flipOrientation === 'vertical' ? 'X' : 'Y'}
                >
                    {this.props.back}
                </TouchFlipSide>
            </div>
        );
    }
}

export default TouchFlip;
