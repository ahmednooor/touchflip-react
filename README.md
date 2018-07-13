# touchflip-react

> A Reusable Flipping Component For ReactJS

[![NPM](https://img.shields.io/npm/v/touchflip-react.svg)](https://www.npmjs.com/package/touchflip-react)

## Demo

> https://ahmednooor.github.io/touchflip-react

## Install

```bash
npm install --save touchflip-react
```

## Usage

```jsx
import React, { Component } from 'react'

import TouchFlip from 'touchflip-react'

class Example extends Component { render () { return (
    <TouchFlip // Usage Example
        
        isFlippable={true} 
        // ^ set false to stop flipping

        showBackSide={false} 
        // ^ false: front shown. true: back shown
        // use showBackSide to manually trigger flipping

        duration={500} 
        // ^ duration of flipping animation in milli-seconds

        perspective={700} 
        // ^ 3d perspective in pixels

        timingFunction={'linear'} 
        // ^ 'ease-in' 'ease-in-out' etc.

        flipOrientation={'horizontal'} 
        // ^ can be either 'horizontal' or 'vertical'

        defaultFlipDirection={true}
        // ^ if true, rotates left to right horizontally and down to up vertically
        // ^ if false, rotates right to left horizontally and up to down vertically

        onBackSideShown={() => {}} 
        // ^ callback after flipping to back side

        onFrontSideShown={() => {}} 
        // ^ callback after flipping to front side

        style={{ // you can use custom styles here
            // width, height etc.
            // do not override the position attribute
        }}

        className="touchflip-main-ctr" 
        // ^ or you can use classes instead

        front={ // markup/jsx for the front side
            <div 
            style={{background: 'royalblue', width: '100%', height: '100%'}} 
            className="your-class">
                <h1>Front Side</h1>
            </div>
        }

        back={ // markup/jsx for the back side
            <div 
            style={{background: 'springgreen', width: '100%', height: '100%'}} 
            className="your-class">
                <input data-noflip type="text" /> <br />
                <input data-noflip type="range" /> <br />
                    {/* ^ use data-noflip on each element 
                        you want to prevent flipping when 
                        swiping or tapping that element */}
                <input type="button" value="Button"/> <br />
                    {/* ^ see this one does not have data-noflip, hence 
                        the flipping occurs when you swipe or tap it */}
            </div>
        }
    />
); } }
```
> see `example/src/App.js` to check the code for demo app.

## Development Guide

- This component is packaged by `create-react-library` (https://www.npmjs.com/package/create-react-library).
- Refer to their latest documentation.
- The gist is, two npm starts, one in `/` and the other in `example/` dir.

## License

MIT © [ahmednooor](https://github.com/ahmednooor)
