
import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import axios from "axios";

let dataStore = {};

const fetchAPI = async () =>{
	const response = await axios.get("http://localhost:8080/api");

	dataStore = response.data.fruits;

	dataStore.push("pear");

	console.log(response.data.fruits);

	sendData();
}

fetchAPI();

const sendData = async () => {
	try {
	  //const data = { firstName: 'Fred', lastName: 'Flintstone' };
	  const response = await axios.post('http://localhost:8080/api/endpoint', dataStore, {
		headers: {
		  'Content-Type': 'application/json'
		}
	  });
	  console.log('Response:', response.data);
	} catch (error) {
	  console.error('Error:', error.response ? error.response.data : error.message);
	}
  };
  
  //sendData();

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