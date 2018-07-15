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
        _x1: null,
        _y1: null,
        isFlipped: false,
        isSwiped: false,
        shouldFlip: false,
        defaultFlipDirection: null,
        flipDirectionSet: false,
        frontRotate: null,
        backRotate: null,
        duration: null,
        di: null,
        df: null,
        ti: null,
        tf: null
    }

    unify = (e) => {
        // taken from https://codepen.io/thebabydino/pen/wybaGK?editors=0010
        return e.changedTouches ? e.changedTouches[0] : e 
    }

    speed = (dist, time) => {
        return dist / time;
    }

    swipeStart = (event) => {
        this.swipeFlags = {
            locked: false,
            x1: null,
            y1: null,
            _x1: null,
            _y1: null,
            isFlipped: false,
            isSwiped: false,
            shouldFlip: false,
            defaultFlipDirection: null,
            flipDirectionSet: false,
            frontRotate: null,
            backRotate: null,
            duration: null,
            di: null,
            df: null,
            ti: null,
            tf: null
        };

        if (!event.target.getAttribute('data-noflip')) {
            event.preventDefault();
            event.stopPropagation();
            this.swipeFlags.x1 = this.unify(event).screenX;
            this.swipeFlags._x1 = this.unify(event).screenX;
            this.swipeFlags.y1 = this.unify(event).screenY;
            this.swipeFlags._y1 = this.unify(event).screenY;
            this.swipeFlags.di = 
                this.state.flipOrientation === 'horizontal' ? 
                    this.unify(event).screenX : this.unify(event).screenY;

            this.swipeFlags.frontRotate = this.state.frontRotate;
            this.swipeFlags.backRotate = this.state.backRotate;
            this.swipeFlags.duration = this.state.duration;

            this.swipeFlags.locked = true;

            document.addEventListener('touchmove', this.swipeMove);
            document.addEventListener('mousemove', this.swipeMove);
            document.addEventListener('touchend', this.swipeEnd);
            document.addEventListener('mouseup', this.swipeEnd);
        }
    }
    
    swipeMove = (event) => {
        if (this.swipeFlags.locked) {            
            event.preventDefault();
            event.stopPropagation();

            this.swipeFlags.isSwiped = true;

            const x2 = this.unify(event).screenX;
            const y2 = this.unify(event).screenY;

            if (this.state.flipOrientation === 'horizontal') {
                if (x2 - this.swipeFlags.x1 > 0 
                        && !this.swipeFlags.isFlipped) {
                    this.setState({
                        duration: 0,
                        defaultFlipDirection: true,
                        frontRotate: this.state.frontRotate + parseInt((x2 - this.swipeFlags.x1), 10) / 2,
                        backRotate: this.state.backRotate + parseInt((x2 - this.swipeFlags.x1), 10) / 2,
                    });
                }
                else if (x2 - this.swipeFlags.x1 < 0 
                        && !this.swipeFlags.isFlipped) {
                    this.setState({
                        duration: 0,
                        defaultFlipDirection: false,
                        frontRotate: this.state.frontRotate + parseInt((x2 - this.swipeFlags.x1), 10) / 2,
                        backRotate: this.state.backRotate + parseInt((x2 - this.swipeFlags.x1), 10) / 2,
                    });
                }

                this.swipeFlags.shouldFlip = 
                    this.swipeFlags.flipDirectionSet 
                    && this.swipeFlags.defaultFlipDirection === this.state.defaultFlipDirection 
                    && Math.abs(y2 - this.swipeFlags._y1) < 80 ?
                        true : false;
            }
            else if (this.state.flipOrientation === 'vertical') {
                if (y2 - this.swipeFlags.y1 > 0 
                        && !this.swipeFlags.isFlipped) {
                    this.setState({
                        duration: 0,
                        defaultFlipDirection: false,
                        frontRotate: this.state.frontRotate - parseInt((y2 - this.swipeFlags.y1), 10) / 2,
                        backRotate: this.state.backRotate - parseInt((y2 - this.swipeFlags.y1), 10) / 2,
                    });
                }
                else if (y2 - this.swipeFlags.y1 < 0 
                        && !this.swipeFlags.isFlipped) {
                    this.setState({
                        duration: 0,
                        defaultFlipDirection: true,
                        frontRotate: this.state.frontRotate - parseInt((y2 - this.swipeFlags.y1), 10) / 2,
                        backRotate: this.state.backRotate - parseInt((y2 - this.swipeFlags.y1), 10) / 2,
                    });
                }

                this.swipeFlags.shouldFlip = 
                    this.swipeFlags.flipDirectionSet 
                    && this.swipeFlags.defaultFlipDirection === this.state.defaultFlipDirection 
                    && Math.abs(x2 - this.swipeFlags._x1) < 80 ?
                        true : false;
            }

            if (!this.swipeFlags.flipDirectionSet) {
                this.swipeFlags.defaultFlipDirection = this.state.defaultFlipDirection;
                this.swipeFlags.flipDirectionSet = true;
            }
            
            this.swipeFlags.x1 = x2;
            this.swipeFlags.y1 = y2;
        }
    }

    swipeEnd = (event) => {
        event.preventDefault();
        event.stopPropagation();
    
        this.setState({
            duration: this.swipeFlags.duration,
            frontRotate: this.swipeFlags.frontRotate,
            backRotate: this.swipeFlags.backRotate,
        }, () => {
            this.swipeFlags.shouldFlip ? this.flip() : null;
        })
        
        if (!this.swipeFlags.isSwiped) {
            this.flip()
        }

        this.swipeFlags = {
            locked: false,
            x1: null,
            y1: null,
            _x1: null,
            _y1: null,
            isFlipped: false,
            isSwiped: false,
            shouldFlip: false,
            defaultFlipDirection: null,
            flipDirectionSet: false,
            frontRotate: null,
            backRotate: null,
            duration: null,
            di: null,
            df: null,
            ti: null,
            tf: null
        };
        
        document.removeEventListener('touchmove', this.swipeMove);
        document.removeEventListener('mousemove', this.swipeMove);
        document.removeEventListener('touchend', this.swipeEnd);
        document.removeEventListener('mouseup', this.swipeEnd);
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

                onTouchStart={this.state.isFlippable ? this.swipeStart : null}
                onMouseDown={this.state.isFlippable ? this.swipeStart : null}
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
