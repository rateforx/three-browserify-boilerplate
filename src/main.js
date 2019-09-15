import * as THREE from 'three/build/three.module';
import { GUI } from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

window.three = THREE;

var scene;
var renderer;
var camera;
var controls;
var gui;
var settings = {
    backgroundColor: '#111',
};

function init () {
    // scene
    scene            = new THREE.Scene();
    scene.background = new THREE.Color( settings.backgroundColor );
    window.scene     = scene;

    // camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set( 0, 10, -10 );
    camera.lookAt( scene.position );

    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    $( '#scene' ).append( renderer.domElement );

    // controls
    controls = new OrbitControls( camera, renderer.domElement );

    // gui
    gui = new GUI();
    gui.addColor( settings, 'backgroundColor' ).onChange( value => {
        scene.background = new THREE.Color( value );
    } );
    gui.open();
}

function render () {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
}

function onResize () {
    let width  = window.innerWidth;
    let height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );

    render();
}

$( window ).resize( onResize );
init();
requestAnimationFrame( render );