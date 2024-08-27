
import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import axios from "axios";
const cors = require('cors');
const corsOptions ={
	origin:["http://localhost:5173"],
  };
  
  app.use(cors(corsOptions));
  
let data;

const fetchAPI = async () =>{
	const response = await axios.get("https://express-hello-world-1-o7v2.onrender.com/api");
	data = response.data.fruits;
	console.log(data);
}

fetchAPI();

data = {fruits: [ "coconut", "pear", "peach"]};

app.get("/api", (req, res) => {
	res.json(data);
});


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let currentCam = camera;

let controls = new PointerLockControls( camera, document.body );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

let xRotation = 0;
let yRotation = 0;

scene.add( cube );
scene.add( controls.getObject() );

camera.position.z = 5;
camera1.position.z = -5;

addEventListener( 'click', function () {
	controls.lock();
} )

addEventListener('keydown', function(event) {
    const key = event.key; // "a", "1", "Shift", etc.
	if(key === "a"){
		xRotation += -0.025;
	}
	if(key === "d"){
		xRotation += 0.025;
	}

	if(key === "w"){
		yRotation += -0.025;
	}
	if(key === "s"){
		yRotation += 0.025;
	}

	if(key === "r"){

		console.log("r");

		if(currentCam === camera){
			console.log("r cam ");

			currentCam = camera1;
		}
		if(currentCam === camera1){
			console.log("r cam 1");

			currentCam = camera1;
		}

		controls = new PointerLockControls( currentCam, document.body );
	}
});

function animate() {
	controls.moveRight(xRotation);
	controls.moveForward(yRotation);

	if(xRotation !== 0){
		if(xRotation === 0)
			return;

		if(xRotation < 0){
			xRotation += 0.005;
		}
		if(xRotation > 0){
			xRotation -= 0.005;
		}

		if(xRotation > -0.1 || xRotation < 0.1)
			xRotation = 0;
	}

	if(yRotation !== 0){
		if(yRotation < 0){
			yRotation += 0.005;
		}
		if(yRotation > 0){
			yRotation -= 0.005;
		}
		if(yRotation > -0.1 || yRotation < 0.1)
			yRotation = 0;
	}
	renderer.render( scene, currentCam );
}