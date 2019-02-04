
        var container, stats, controls;
        var camera, scene, renderer;
        var nNodes =10;
        var nGroupsgTheta = 30;//aka groups shifted on theta angle
        var nGroupsgPhi = 30  ///aka groups shifted on phi angle    
        let gTheta =30, gPhi = 30
        var clock = new THREE.Clock();
        //camera rotation
        var camera_pivot = new THREE.Object3D()
        var Y_AXIS = new THREE.Vector3( 0, 1, 0 );
        var Z_AXIS = new THREE.Vector3(0,0,1);


    
        //addons to use spherical coordinates
        let radius = [nNodes*nGroupsgTheta*nGroupsgPhi]
        var RadiusG1Parameter = 60, RadiusG2Parameter = 120, RadiusG3Parameter= 180
        let theta = [nNodes*nGroupsgTheta*nGroupsgPhi]
        let phi = [nNodes*nGroupsgTheta*nGroupsgPhi]
        
        var nodesDistancesX=30
        var nodesDistancesY = 30
        var nodesDistancesZ = 30;
        
        var groupsDistancesX = 100;
        var groupsDistancesY = 100;
        var groupsDistancesZ = 100;
        
        let groupsRotationX = 1, groupsRotationY = 1, groupsRotationZ =1;    
        let nodesRotationX = 1, nodesRotationY = 1, nodesRotationZ =1;    
        var incrementX = 0.02, incrementY = 0.03, incrementZ = 0.001;
        var Nodes, countX = 0, countY = 0, countZ = 0;
        
        var mouseX = 0, mouseY = 0;
        
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
        
        init();
        
    
        if (WEBGL.isWebGLAvailable()) {

        animate();
        } else {
        var warning = WEBGL.getWebGLErrorMessage();
        document.getElementById("symmetryContainer1").appendChild(warning);
        }
        
        //-----------------------------------------------------------------------/initialize things
        
        function init() {    
          //var container = document.getElementById( 'canvas' ); 
         //var container =  document.querySelector("canvas")
         //container = document.createElement( 'div' );
         var container = document.getElementById("symmetryContainer1")
          camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight/2, 1, 100000000 );
          //camera.position.z = 87; 

          camera_pivot.add( camera );
          camera.position.set( 100, 0, 0 );
          camera.lookAt( camera_pivot.position );

          
          ///define set of parameters of gui
          var effectController = {            
                  GeneralDistances:55,
                  nodesDistancesY: 30,
                  nodesDistancesZ:30,          
                  Speed1:0.2,
                  Speed2:0.0001,             					
                };
          //LINKING GUI TO VARIABLES
          var valuesChanger = function () {
            
             nodesDistancesX = effectController.GeneralDistances
             nodesDistancesY = effectController.GeneralDistances
             nodesDistancesZ = effectController.GeneralDistances
             
             incrementX= effectController.Speed1 
             incrementY= effectController.Speed2 
             incrementZ= effectController.incrementZ  
          }
        
          var gui = new dat.GUI({ autoPlace: false });
          var guiContainer = document.getElementById('gui-container1');
          //guiContainer.appendChild(gui.domElement);
        //adding parameters to gui
        
          gui.add( effectController, "GeneralDistances", 0, 100.0, 0.1 ).onChange( valuesChanger );       
          gui.add( effectController, "Speed1", -0.25, 0.25, 0.000001 ).onChange( valuesChanger );
          gui.add( effectController, "Speed2", -0.25, 0.25, 0.000001 ).onChange( valuesChanger );     
        
          scene = new THREE.Scene();  
          scene.add( camera_pivot );

          var positions = new Float32Array( nNodes * 3 *nGroupsgTheta*nGroupsgPhi );
          var scales = new Float32Array( nNodes * nGroupsgTheta*nGroupsgPhi);
          var colors = new Float32Array( nNodes*nGroupsgTheta*nGroupsgPhi * 3 );
          var color = new THREE.Color();
          ///setting up node 0
          theta[0] = (360/nGroupsgTheta) +  Math.sin(countX)
          phi[0] =  (360/nGroupsgPhi) +  Math.sin(countX)
          scales[ 0 ] = 5
          radius[0]= RadiusG1Parameter+  Math.sqrt(Math.pow(nodesDistancesX,2) + Math.pow(nodesDistancesY,2) + Math.pow(nodesDistancesZ,2) )  
          positions[ 0] = radius[0]*Math.sin(theta[0])*Math.cos(phi[0]); 
          positions[ 1] = radius[0]*Math.sin(theta[0])*Math.sin(phi[0]); 
          positions[ 2 ] = radius[0]*Math.cos(theta[0]); 
          ///radius, gTheta, phi of groups    
          for(var i=1; i < nNodes * nGroupsgTheta * nGroupsgPhi;i++){
                theta[i] = i * (360/nGroupsgTheta) +  Math.sin(countX)
                phi[i] =  i* (360/nGroupsgPhi) +  Math.sin(countX)
                scales[ i ] = ( Math.sin( i*(countX )  ))*20;           
                radius[i] =  i*Math.sqrt(Math.pow(nodesDistancesX,2) + i*Math.pow(nodesDistancesY,2) + i*Math.pow(nodesDistancesZ,2) )          
              }
            
          //xyz of node 0         
        
          for ( var i = 1; i < nNodes*3 * nGroupsgTheta * nGroupsgPhi ; i +=3 ) {            
              positions[ i] = radius[i]*Math.sin(theta[i])*Math.cos(phi[i]); 
              positions[ i+1] = radius[i]*Math.sin(theta[i])*Math.sin(phi[i]); 
              positions[ i+2 ] = radius[i]*Math.cos(theta[i]);
              color.setHSL( 0.01 * ( i )/1000, 1, 0.5 );					
              color.toArray( colors, i * 3 );          
          }
        
          geometry = new THREE.BufferGeometry();  
          geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
         geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
          geometry.addAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );
        
          var material = new THREE.ShaderMaterial( {
            uniforms: {      
              color: { value: new THREE.Color( 0xffffff ) },
            },
            vertexShader: document.getElementById( 'vertexshader' ).textContent,
            fragmentShader: document.getElementById( 'fragmentshader' ).textContent
          } );
          Nodes = new THREE.Points( geometry, material );   
          scene.add( Nodes );
          renderer = new THREE.WebGLRenderer( { antialias: true } );
          renderer.setPixelRatio(window.devicePixelRatio );
          //renderer.setSize( container.innerWidth, container.innerHeight );
          renderer.setSize(  window.innerWidth, window.innerHeight/2  );
    
          container.appendChild( renderer.domElement );
    
          //container.appendChild( renderer.domElement );
          //controls needs to be after renderer as it is referenced to it
         // controls = new THREE.TrackballControls( camera, renderer.domElement );
          //controls.rotateSpeed = 1.0;
          //controls.zoomSpeed = 1.2;
          //controls.panSpeed = 0.8;
          //controls.noZoom = true;
          //controls.enabled = false;
         // controls.noPan = true
         // controls.staticMoving = true;
          //controls.dynamicDampingFactor = 0.3;
         // controls.keys = [ 65, 83, 68 ];
         // controls.addEventListener( 'change', render );
          //stats = new Stats();
          //container.appendChild( stats.domElement );
          //document.addEventListener( 'mousemove', onDocumentMouseMove, false );
          //document.addEventListener( 'touchstart', onDocumentTouchStart, false );
          //document.addEventListener( 'touchmove', onDocumentTouchMove, true );
          window.addEventListener( 'resize', onWindowResize, false );
        }
        function onWindowResize() {
          camera.aspect = window.innerWidth / window.innerHeight/2;
                camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight/2 );
                //controls.handleResize();
                render();
        }
        
        /*
        function onDocumentMouseMove( event ) {
          mouseX = event.clientX - windowHalfX;
          mouseY = event.clientY - windowHalfY;
        }
        function onDocumentTouchStart( event ) {
          if ( event.touches.length === 1 ) {
            event.preventDefault();
            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            mouseY = event.touches[ 0 ].pageY - windowHalfY;
          }
        }
        function onDocumentTouchMove( event ) {
          if ( event.touches.length === 1 ) {
            event.preventDefault();
            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            mouseY = event.touches[ 0 ].pageY - windowHalfY;
          }
          
        }
        */
        //-----------------------------------------------------------------------/main animate loop
        function animate() {
          requestAnimationFrame( animate );
          //stats.update();
          //controls.update();
          camera_pivot.rotateOnAxis( Y_AXIS, 0.001 );    // radians
          camera_pivot.rotateOnAxis( Z_AXIS, 0.001 );


          render();
        }
        
        function render() {    
          
          var positions = Nodes.geometry.attributes.position.array;
          var scales = Nodes.geometry.attributes.scale.array;
          var color = new THREE.Color();
          var colors = Nodes.geometry.attributes.customColor.array;  
          var elapsedTime = clock.getElapsedTime()

          RadiusG1Parameter =+ 50*Math.sin(elapsedTime/2);
          RadiusG2Parameter =+ 50*Math.sin(4+elapsedTime);
          RadiusG3Parameter =+ 50*Math.sin(7+elapsedTime/5);

          //console.log(RadiusG1Parameter)
        
          //settig up node 0
          theta[0] = (360/nGroupsgTheta) +  Math.sin(countX)
          phi[0] =  (360/nGroupsgPhi) +  Math.sin(countX)
          scales[ 0 ] = 5
          radius[0]= RadiusG1Parameter +  Math.sqrt(Math.pow(nodesDistancesX,2) + Math.pow(nodesDistancesY,2) + Math.pow(nodesDistancesZ,2) )  
          positions[ 0] = radius[0]*Math.sin(theta[0])*Math.cos(phi[0]); // x
          positions[1] = radius[1]*Math.sin(theta[1])*Math.sin(phi[1]); 
          positions[2] = radius[2]*Math.cos(theta[2]); 
          color.setHSL((  0.1*(Math.cos(elapsedTime)+0.1*(Math.sin(i/elapsedTime)))), 1,  0.5 );	
          color.toArray( colors, 3 ); 
        
        //spherical coordinates of three groups       
        
        var slowdown = Math.sin(elapsedTime)*0.0000005
        //--------------------------------------------------------------------------g1
              for(let i=1; i < nNodes * nGroupsgTheta * nGroupsgPhi/3;i++){
                theta[i] +=  i *(360/nGroupsgTheta) *slowdown*(Math.sin(countX) )
                phi[i] +=   i*(360/nGroupsgPhi) *slowdown*(Math.cos(countX) )
                scales[ i ] = 1.5+( Math.sin(i+ elapsedTime ));           
                radius[i] =  RadiusG1Parameter+ slowdown* i* Math.sqrt(Math.pow(nodesDistancesX,2) +  Math.pow(nodesDistancesY,2) + Math.pow(nodesDistancesZ,2) )     
                 
                 
              }
           
              for(let i=nNodes * nGroupsgTheta * nGroupsgPhi/3; i < 2*nNodes * nGroupsgTheta * nGroupsgPhi/3;i++){
                theta[i] += 0.001+i * (360/nGroupsgTheta) * slowdown*(Math.sin(countX) )
                phi[i] += i* (360/nGroupsgPhi) * slowdown*(Math.cos(countX) )
                scales[ i ] = 1.7+( Math.sin(i+ elapsedTime));           
                radius[i] =RadiusG2Parameter+ 0.0001*i*Math.sqrt(Math.pow(nodesDistancesX,2) +  Math.pow(nodesDistancesY,2) + Math.pow(nodesDistancesZ,2) )     
               

              }
              for(let i=2*nNodes * nGroupsgTheta * nGroupsgPhi/3; i < nNodes * nGroupsgTheta * nGroupsgPhi;i++){
                theta[i] += i /2* (360/nGroupsgTheta) *slowdown*(Math.sin(countX) )
                phi[i] +=  i/2* (360/nGroupsgPhi) *slowdown*(Math.cos(countX) )
                scales[ i ] = 10.9+( Math.sin(i+ countX ));           
                radius[i] = RadiusG3Parameter+ 0.00001*i*Math.sqrt(Math.pow(nodesDistancesX,2) +  Math.pow(nodesDistancesY,2) + Math.pow(nodesDistancesZ,2) )     
               

              }
          
          //cartesian positions from spherical coordinates
        
              for ( var i = 3; i < nNodes* nGroupsgTheta * 3 * nGroupsgPhi ; i +=3 ) {           
                  positions[ i  ] = radius[i]*Math.sin(theta[i])*Math.cos(phi[i]); 
                  positions[ i+1] = radius[i]*Math.sin(theta[i])*Math.sin(phi[i]); 
                  positions[ i+2] = radius[i]*Math.cos(theta[i]);  
                  color.setHSL(i/20000, 1,  0.5 );	
                  color.toArray( colors, i * 3 );
                   
              }   
      
         
        
          ///counters to move things around, should be replaced with real time as this relates movement to fps in a silly and ugly way https://threejs.org/docs/#api/en/core/Clock
          //countX += incrementX;
          countX += 0.0000005
          countY += 0.0000005
          countZ += 0.0000005
          




          //countY += incrementY;
          //countZ += incrementZ; 
          //flag properties to be updated
          Nodes.geometry.attributes.position.needsUpdate = true;
          Nodes.geometry.attributes.scale.needsUpdate = true;
          Nodes.geometry.attributes.customColor.needsUpdate = true;
          renderer.render( scene, camera );
          
        }
          