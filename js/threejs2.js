
      var container, stats, controls;
      var camera, scene, renderer;
      var nNodes =30;
      var nGroupsgTheta = 30;//aka groups shifted on theta angle
      var nGroupsgPhi = 30  ///aka groups shifted on phi angle    
      let gTheta =30, gPhi = 30
      var clock = new THREE.Clock();
  
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
      var increment1 = 0.001, increment2 = 0.001, increment3 = 0.001, increment4 = 0.001, increment5 = 0.001, increment6 = 0.001;
      var Nodes, count1 = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0, count6 = 0
      var phiSpread = 0.01, thetaSpread = 0.01
      
      var mouseX = 0, mouseY = 0;
      
      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;
      
      init();
      
  
      if (WEBGL.isWebGLAvailable()) {
   
      animate();
      } else {
      var warning = WEBGL.getWebGLErrorMessage();
      document.getElementById("symmetryContainer2").appendChild(warning);
      }
      
      //-----------------------------------------------------------------------/initialize things
      
      function init() {    
       
       var container = document.getElementById("symmetryContainer2")
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 100000000 );
        camera.position.z = 500; 
        camera.position.y = -900;     
        
        ///define set of parameters of gui
        var effectController = {            
                GeneralDistances:30,
                nodesDistancesY: 30,
                nodesDistancesZ:30,
                phiSpread,
                thetaSpread,          
                Speed1:0.0005,
                Speed2:0.0001,  
                Speed3:0.0001, 
                Speed4:0.0001,
                Speed5:0.0001, 
                Speed6:0.0001             					
              };
        //LINKING GUI TO VARIABLES
        var valuesChanger = function () {
          
           nodesDistancesX = effectController.GeneralDistances
           nodesDistancesY = effectController.GeneralDistances
           nodesDistancesZ = effectController.GeneralDistances
           phiSpread= effectController.phiSpread
           thetaSpread = effectController.thetaSpread

           increment1= effectController.Speed1 
           increment2= effectController.Speed2 
           increment3= effectController.Speed3
           increment4= effectController.Speed4 
           increment5= effectController.Speed5 
           increment6= effectController.Speed6  
        }
      
        var gui = new dat.GUI({ autoPlace: false, height: 200});
        var guiContainer = document.getElementById('gui-container2');
        guiContainer.appendChild(gui.domElement);
        //var guiContainer = document.getElementById('gui-container');
      //adding parameters to gui
      
        gui.add( effectController, "GeneralDistances", 0, 100.0, 1 ).onChange( valuesChanger );  
        gui.add( effectController, "phiSpread", 0.001, 0.05, 0.000001 ).onChange( valuesChanger );
        gui.add( effectController, "thetaSpread", 0.001, 0.05, 0.000001 ).onChange( valuesChanger );
   
        gui.add( effectController, "Speed1", -0.25, 0.25, 0.000001 ).onChange( valuesChanger );
        gui.add( effectController, "Speed2", -0.25, 0.25, 0.000001 ).onChange( valuesChanger );
        gui.add( effectController, "Speed3", -0.25, 0.25, 0.000001 ).onChange( valuesChanger );
        gui.add( effectController, "Speed4", -0.25, 0.25, 0.000001 ).onChange( valuesChanger );
        //gui.add( effectController, "Speed5", -0.25, 0.25, 0.000001 ).onChange( valuesChanger );
       // gui.add( effectController, "Speed6", -0.25, 0.25, 0.000001 ).onChange( valuesChanger );     
      
        scene = new THREE.Scene();  
        var positions = new Float32Array( nNodes * 3 *nGroupsgTheta*nGroupsgPhi );
        var scales = new Float32Array( nNodes * nGroupsgTheta*nGroupsgPhi);
        var colors = new Float32Array( nNodes*nGroupsgTheta*nGroupsgPhi * 3 );
        var color = new THREE.Color();
        ///setting up node 0
        theta[0] = (360/nGroupsgTheta) +  Math.sin(count1)
        phi[0] =  (360/nGroupsgPhi) +  Math.sin(count1)
        scales[ 0 ] = 5
        radius[0]= RadiusG1Parameter+  Math.sqrt(Math.pow(nodesDistancesX,2) + Math.pow(nodesDistancesY,2) + Math.pow(nodesDistancesZ,2) )  
        positions[ 0] = radius[0]*Math.sin(theta[0])*Math.cos(phi[0]); 
        positions[ 1] = radius[0]*Math.sin(theta[0])*Math.sin(phi[0]); 
        positions[ 2 ] = radius[0]*Math.cos(theta[0]); 
        ///radius, gTheta, phi of groups    
        for(var i=1; i < nNodes * nGroupsgTheta * nGroupsgPhi;i++){
              theta[i] = i * (360/nGroupsgTheta) +  Math.sin(count1)
              phi[i] =  i* (360/nGroupsgPhi) +  Math.sin(count1)
              scales[ i ] = ( Math.sin( i*(count1 )  ))*20;           
              radius[i] =  i*Math.sqrt(Math.pow(nodesDistancesX,2) + i*Math.pow(nodesDistancesY,2) + i*Math.pow(nodesDistancesZ,2) )          
            }
          
        //xyz of node 0         
      
        for ( var i = 1; i < nNodes*3 * nGroupsgTheta * nGroupsgPhi ; i +=3 ) {            
            positions[ i] = radius[i]*Math.sin(theta[i])*Math.cos(phi[i]); 
            positions[ i+1] = radius[i]*Math.sin(theta[i])*Math.sin(phi[i]); 
            positions[ i+2 ] = radius[i]*Math.cos(theta[i]);
            color.setHSL( 0.001 * ( i ), 0.5, 0.5 );					
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
        renderer.setSize(  window.innerWidth, window.innerHeight  );
        //renderer.appendChild(gui)
        container.appendChild( renderer.domElement );
  
        //container.appendChild( renderer.domElement );
        //controls needs to be after renderer as it is referenced to it
        controls = new THREE.TrackballControls( camera, renderer.domElement );
        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;
        controls.keys = [ 65, 83, 68 ];
        controls.addEventListener( 'change', render );
        //stats = new Stats();
        //container.appendChild( stats.domElement );
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );
        window.addEventListener( 'resize', onWindowResize, false );
      }
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
              camera.updateProjectionMatrix();
              renderer.setSize( window.innerWidth, window.innerHeight );
              controls.handleResize();
              render();
      }
      
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
      //-----------------------------------------------------------------------/main animate loop
      function animate() {
        requestAnimationFrame( animate );
        //stats.update();
        controls.update();
        render();
      }
      
      function render() {    
        
        var positions = Nodes.geometry.attributes.position.array;
        var scales = Nodes.geometry.attributes.scale.array;
        var color = new THREE.Color();

        var colors = Nodes.geometry.attributes.customColor.array;  
        var elapsedTime = clock.getElapsedTime()
        var timeOscillator = Math.sin(elapsedTime)
      
        RadiusG1Parameter += Math.sin(elapsedTime/2) + Math.sin(elapsedTime/1.5)
        RadiusG2Parameter += Math.sin(elapsedTime/5) + Math.sin(elapsedTime/1.3)
        RadiusG3Parameter += Math.sin(elapsedTime/3) + Math.sin(elapsedTime/9.5)

        //generalRadius is given by generalDistances
        var generalRadius  = Math.sqrt(Math.pow(nodesDistancesX,2) +  Math.pow(nodesDistancesY,2) + Math.pow(nodesDistancesZ,2)) //given by general distances
        //settig up node 0
        theta[0] = (360/nGroupsgTheta) +  Math.sin(count1)
        phi[0] =  (360/nGroupsgPhi) +  Math.sin(count1)
        scales[ 0 ] = 5
        radius[0]= RadiusG1Parameter+  generalRadius  
        positions[ 0] = radius[0]*Math.sin(theta[0])*Math.cos(phi[0]); // x
        positions[1] = radius[1]*Math.sin(theta[1])*Math.sin(phi[1]); 
        positions[2] = radius[2]*Math.cos(theta[2]);                
      
      //spherical coordinates of three groups
      
      //--------------------------------------------------------------------------g1
            for(let i=1; i < nNodes * nGroupsgTheta * nGroupsgPhi/3;i++){
              theta[i] = i*(360/nGroupsgTheta) * thetaSpread*(Math.sin(count1/100000) + Math.cos(count2/100000))
              phi[i] =  i* (360/nGroupsgPhi) * phiSpread*(Math.sin(count1/100000) + Math.sin(count2/100000))
              scales[ i ] = 4.5+( Math.sin(i+ count4 ));           
              radius[i] = 0.05*i+(Math.sin(count1/i)) * RadiusG1Parameter+ generalRadius * 5 
              color.setHSL( 0.05 *( i )*(0.001+Math.abs(timeOscillator)/300), 1, 0.5 );	
                color.toArray( colors, i * 3 ); 
              
                  
            }
         
            for(let i=nNodes * nGroupsgTheta * nGroupsgPhi/3; i < 2*nNodes * nGroupsgTheta * nGroupsgPhi/3;i++){
              theta[i] = i * (360/nGroupsgTheta) * thetaSpread*(Math.sin(count1/100000) + Math.cos(count2/100000))
              phi[i] =  i* (360/nGroupsgPhi) *phiSpread*(Math.sin(count1/100000) + Math.sin(count2/100000))
              scales[ i ] = 4.7+( Math.sin(i+ count4 ));           
              radius[i] =i*0.05 + (Math.sin(count1/i))* RadiusG1Parameter+ generalRadius *5   
                
            }
            
            for(let i=2*nNodes * nGroupsgTheta * nGroupsgPhi/3; i < nNodes * nGroupsgTheta * nGroupsgPhi;i++){
              theta[i] = i * (360/nGroupsgTheta) * thetaSpread*(Math.sin(count1/100000) + Math.cos(count2/100000))
              phi[i] =  i* (360/nGroupsgPhi) *phiSpread*(Math.sin(count1/100000) + Math.sin(count2/100000))
              scales[ i ] = 4.9+( Math.sin(i+ count4 ));           
              radius[i] = i*0.05+ (Math.sin(count1/i))*RadiusG1Parameter+ generalRadius * 5   
               
            }
        //make groups individually shifted
        //cartesian positions from spherical coordinates
      
        for(let i=3; i < nNodes * nGroupsgTheta * nGroupsgPhi/3;i+=3){           
                positions[ i  ] =  radius[i]*Math.sin(theta[i])*Math.cos(phi[i]); 
                positions[ i+1] = radius[i]*Math.sin(theta[i])*Math.sin(phi[i]); 
                positions[ i+2] = radius[i]*Math.cos(theta[i]);                         

            }   

            for(let i=nNodes * nGroupsgTheta * nGroupsgPhi/3; i < 2*nNodes * nGroupsgTheta * nGroupsgPhi/3;i+=3){
                positions[ i  ] = radius[i]*Math.sin(theta[i])*Math.cos(phi[i]); 
                positions[ i+1] =   radius[i]*Math.sin(theta[i])*Math.sin(phi[i]); 
                positions[ i+2] = radius[i]*Math.cos(theta[i]);    
           
            } 

            for(let i=2*nNodes * nGroupsgTheta * nGroupsgPhi/3; i < nNodes * nGroupsgTheta * nGroupsgPhi;i+=3){
                positions[ i  ] = radius[i]*Math.sin(theta[i])*Math.cos(phi[i]); 
                positions[ i+1] = radius[i]*Math.sin(theta[i])*Math.sin(phi[i]); 
                positions[ i+2] = radius[i]*Math.cos(theta[i]);    
           
            } 
            /*
             ///attempt to bounce apart if coordinates meet
             if(group1surphace == group2surphace)
             {
              x positions[ i] = -positions[ i]
              y positions[i+1] = -positions[ i+1]
              z positions[i+2] = positions[ i+2]
             }

      */
        
        ///counters to move things around, should be replaced with real time as this relates movement to fps in a silly and ugly way https://threejs.org/docs/#api/en/core/Clock
        count1 += increment1;
        count2 += increment2;
        count3 += increment3; 
        //flag properties to be updated
        Nodes.geometry.attributes.position.needsUpdate = true;
        Nodes.geometry.attributes.scale.needsUpdate = true;
        Nodes.geometry.attributes.customColor.needsUpdate = true;
        renderer.render( scene, camera );
        
      }