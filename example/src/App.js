import React, { Component } from 'react';
import './App.css';

import TouchFlip from 'touchflip-react';

class App extends Component {

	render() { return (
		<div className="App">
			<br />
			<br />
			<h1 className="page-heading">TouchFlip React</h1>
			<br />
			<p className="heading-desc">
				<strong>A Reusable Flipping Component For ReactJS</strong>
				<br/>
				<br/>
				<span>[Demo] Swipe or Tap the Card.</span>
			</p>
			<br className="hide-sm"/>
			<br className="hide-sm"/>

			<TouchFlip // Usage Example
				isFlippable={true} // set false to stop flipping
				showBackSide={false} // false: front shown. true: back shown
				// ^ use showBackSide to manually trigger flipping

				duration={500} // or whatever fits you better. p.s. it is in milli-seconds
				perspective={700} // or whatever number of pixels fits you better
				timingFunction={'linear'} // 'ease-in' 'ease-in-out' etc.
				flipOrientation={'horizontal'} // can be either 'horizontal' or 'vertical'
				defaultFlipDirection={true}
				// ^ if true, rotates left to right horizontally and down to up vertically
				// ^ if false, rotates right to left horizontally and up to down vertically

				onBackSideShown={() => {}} // callback after flipping to back side
				onFrontSideShown={() => {}} // callback after flipping to front side

				style={{ // you can use custom styles here
					// width, height etc.
					// do not override the position attribute
				}}
				className="touchflip-main-ctr" // or you can use classes instead

				front={ // markup/jsx for the front side
					<div className="side front-side-ctr">
						<div className="chip"></div>
						<div className="brand-name"></div>
						<div className="card-number"></div>
						<div className="dates start"></div>
						<div className="dates end"></div>
					</div>
				}
				
				back={ // markup/jsx for the back side
					<div className="side back-side-ctr">
						<input data-noflip type="text" className="input" placeholder="Blah"/>
						{/* ^ use data-noflip on each element 
							you want to prevent flipping while 
							swiping or tapping on that element */}
						<input data-noflip type="text" className="input" placeholder="Blah Blah Blah"/>
						<div data-noflip className="form-grp">
							<input data-noflip type="text" className="input" placeholder="Blah"/>
							<input data-noflip type="text" className="input" placeholder="Blah"/>
							<input data-noflip type="text" className="input" placeholder="Blah"/>
						</div>
						<div data-noflip className="form-grp btn-grp">
							<input type="button" className="input btn danger" value="X BLEH!"/>
							{/* ^ see this one does not have data-noflip, 
								hence the flipping occurs when you swipe or tap it */}
							<input data-noflip type="button" className="input btn success" value="> BLAH?"/>
						</div>
					</div>
				}
			/>

			<br className="hide-sm"/>
			<br className="hide-sm"/>
			<p className="footer-text">
				Read Documentation on <strong><a href="https://github.com/ahmednooor/">Github</a></strong>
			</p>
			<br />
			<br />
		</div>
	); }
}

export default App;
