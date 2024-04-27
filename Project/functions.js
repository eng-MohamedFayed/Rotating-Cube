"use strict";

var canvas;
var gl;

var NumVertices  = 36;

var points = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];

// Define initial scale factors
var currentScale = 0.7;
var scalingUp = false;
var scaling= false;
var maxScale = 1.2; // Maximum scale factor

//transition factors
var currentTransition = 0.0; // Initialize the current transition position
var transitioningRight = true; // Flag to control the direction of the transition
var transitioning = false;
var maxTransition = 1.0; // Maximum transition position

var transitionLoc;
var thetaLoc;
var scaleMatrixLoc;
var myTimeOut=100;
window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    colorCube();

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta");
    scaleMatrixLoc = gl.getUniformLocation(program, "scale");
    transitionLoc = gl.getUniformLocation(program, "transition");

    //event listeners for buttons

    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };

    document.getElementById("scaleButton").onclick = function () {
        // Check if scaling up or down
        if(!scaling)
        {
            scaling=true;
        }
        else
        {
            scaling=false;
        }
        // Trigger a re-render or update to see the changes
        render();
    };

    document.getElementById("transitionButton").onclick = function () {
        // Call a function to handle transitioning
        if(!transitioning)
        {
            transitioning=true;
        }
        else
        {
            transitioning=false;
        }
    };


    document.getElementById( "StopButton" ).onclick = function () {
        myTimeOut = 100000;
    };

    document.getElementById( "MoveButton" ).onclick = function () {
        myTimeOut = 10;
        render();
    };

    document.getElementById( "SlowButton" ).onclick = function () {
        myTimeOut = 200;
        render();
    };

    render();
}

function colorCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

function quad(a, b, c, d)
{
    var vertices = [
        vec4( -0.5, -0.5,  0.5, 1.0 ),
        vec4( -0.5,  0.5,  0.5, 1.0 ),
        vec4(  0.5,  0.5,  0.5, 1.0 ),
        vec4(  0.5, -0.5,  0.5, 1.0 ),
        vec4( -0.5, -0.5, -0.5, 1.0 ),
        vec4( -0.5,  0.5, -0.5, 1.0 ),
        vec4(  0.5,  0.5, -0.5, 1.0 ),
        vec4(  0.5, -0.5, -0.5, 1.0 )
    ];

    var vertexColors = [
        [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 0.7, 0.0, 1.0, 1.0 ],  // magenta
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 1.0, 1.0, 1.0 ]   // white
    ];

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices

    //vertex color assigned by the index of the vertex

    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
        //colors.push( vertexColors[indices[i]] );

        // for solid colored faces use
        colors.push(vertexColors[a]);

    }
}

function render()
{
    setTimeout( function() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    if (scaling){  
        if (scalingUp) {
            // Increase the scale until it reaches the maximum
            currentScale += 0.1; // You can adjust the scale increment/decrement
            if (currentScale >= maxScale) {
                scalingUp = false;
            }
        } else {
            // Decrease the scale until it reaches the initial size
            currentScale -= 0.1;
            if (currentScale <= 0.7) {
                scalingUp = true;
            }
    }}

    if(transitioning){
        if (transitioningRight) {
            // Move the cube to the right until it reaches the maximum
            currentTransition += 0.1; // You can adjust the transition increment
            if (currentTransition >= maxTransition) {
                transitioningRight = false;
            }
        } else {
            // Move the cube to the left until it reaches the initial position
            currentTransition -= 0.1;
            if (currentTransition <= -1.0) {
                transitioningRight = true;
            }
        }

    }
    theta[axis] += 1.0;
    gl.uniform3fv(thetaLoc, theta);
    gl.uniform3fv(scaleMatrixLoc, [currentScale, currentScale, currentScale]);
    gl.uniform3fv(transitionLoc, [currentTransition, 0.0, 0.0]);

    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
    requestAnimFrame( render );
    },myTimeOut)
}
