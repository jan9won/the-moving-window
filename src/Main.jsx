import React, {useState,useEffect,Suspense,useRef} from 'react'
import MainCanvas from "./MainCanvas";
import "../public/homepage/main.sass";
import {images, video} from "../public/homepage/index.js";
import Spinner from "./spinner.gif"

const Main = (props) => {

	const mainRef = useRef();
	const bgRef = useRef();
	
	const [isLoaded, setIsLoaded] = useState(false);
	const [mainOpacity, setMainOpacity] = useState(false);
	const [scrollValue, setScrollValue] = useState(0);

	useEffect(()=>{
		let retryTimer = setTimeout(()=>{
			if(!isLoaded) {
				// window.location.href = window.location.pathname
				window.alert(isLoaded)
			}
		},5000);
	    return () => clearTimeout(retryTimer);
	},[isLoaded])

	console.log(mainRef)

	console.log(scrollValue)	
  const onScrollCallback = (evt) => {
    setScrollValue(bgRef.current.clientHeight - mainRef.current.getBoundingClientRect().top)
		if(scrollValue < 720) {setMainOpacity(false)}
		else {setMainOpacity(true)}
  }

	return (
		<div id="bg"
			ref={bgRef}
			onScroll={onScrollCallback}
		>
		<img
			src={Spinner}
			id="spinner" 
			className={isLoaded ? "opacity-0" : "opacity-100"}
		/>
    <h1
				className={mainOpacity ? "opacity-0" : "opacity-100"}
		>THE<br/>MOVING<br/>WINDOW</h1>
		
    <div 
			id="scroll"
			className={mainOpacity ? "opacity-0" : "opacity-100"}
		> scroll down | 스크롤하세요 </div>
		
    <MainCanvas
			setIsLoaded = {setIsLoaded}
			scrollValue={scrollValue}
			mainOpacity={mainOpacity}
		/>
   	
		<main
			ref={mainRef}
	 		style={{
				height: isLoaded ? "auto" : "0"
			}}	
			className={mainOpacity ? "opacity-100" : "opacity-0"}
			>
			<div id="media">
				<h2> Video </h2>
				<video src={video} poster={images[0]} controls></video>
				<blockquote>
					<em>EN</em> 
					<br/>
					A sense of depth and perspective is provided with viewer's movement. A spirit animal over the sceen follows the viewer and transforms by the perspective.
					<br/>
					<em>KR</em>
					<br/>
					관객의 움직임에 따라 깊이감이 느껴지는 화면, 화면 너머의 영적 동물이 관객의 시점에 따라 변화한다.
				</blockquote>
			</div>
      <div id="about">
        <h2>About</h2>
        <p>
				  <em>Artist</em> <br/>
					Jangwon Suh (서장원) <br/> <br/>
					<em>Exhibition</em> <br/>
					Feb 2021, Seoul <br/> <br/>
					<em>Material</em> <br/>
					- Aluminum Profiles <br/>
					- 3D Printed Joints and Frames <br/>
					- Arduino Uno with Stepper Motors <br/>
					- Arduino Mega with Various Sensors <br/>
					- Ipad Air 2 with an LED Light <br/><br/>
        </p>
      </div>
			<div id="design">
				<h2>Design</h2>
				<p>Actuator was carefully designed with audience interaction and durability in mind</p>
				{
					images.slice(4,7).map((image,idx)=><img key={idx} src={image}></img>)
				}
				<p>Models and Animations were exported with GLTF and mixed with ThreeJS's animation mixer</p>
				<img src={images[7]}></img>
			</div>
      <div id="tech">
        <h2>Open Sourced Software Used in This Project</h2>
        <p>
          <em>Networks</em>
          <br /> - Nodejs with Express and WebSocket
					<br /> - Nginx
          <br /> <br />
          <em>Drawing on Canvas</em>
          <br /> - JeelizFaceFilter
					<br /> - Three.js
          <br /> <br />
          <em>This Webpage</em>
          <br /> - React with react-three-fiber
					<br /> - Webpack with SCSS and other asset loaders
          <br /> <br />
          <em>Modeling and Design</em>
					<br /> - Tinkercad for Actuator Design
					<br /> - Blender for Contents Modeling
          <br /> <br />
					<em>Micro Controller</em>
          <br /> - Arduino Runtime
					<br /> - Motor Drivers and AccelStepper Library
        </p>
      </div>
    </main>

		</div>
  )
};

export default Main;
