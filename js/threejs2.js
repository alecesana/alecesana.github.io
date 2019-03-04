
      var container, stats, controls;
      var camera, scene, renderer2;
      var nNodes =30;
      var nGroupsth = 30;//aka groups shifted on th angle
      var nGroupsph = 30  ///aka groups shifted on ph angle    
      let gTh =30, gPh = 30
      var clock = new THREE.Clock();

      //addons to use spherical coordinates
      let r = [nNodes*nGroupsth*nGroupsph]
      var rG1Parameter = 60, rG2Parameter = 120, rG3Parameter= 180
      let th = [nNodes*nGroupsth*nGroupsph]
      let ph = [nNodes*nGroupsth*nGroupsph]
      
      var nodesDistancesX=30
      var nodesDistancesY = 30
      var nodesDistancesZ = 30;
      
      var groupsDistancesX = 100;
      var groupsDistancesY = 100;
      var groupsDistancesZ = 100;
      
      let gRX = 1, gRY = 1, gRZ =1;    
      let nRX = 1, nRY = 1, nRZ =1;    
      var increment1 = 0.001, increment2 = 0.001, increment3 = 0.001, increment4 = 0.001, increment5 = 0.001, increment6 = 0.001;
      var Nodes, count1 = 10000, count2 = 5000, count3 = 0, count4 = 0, count5 = 0, count6 = 0
      var phSpread = 0.01, thSpread = 0.01
      
      var mouseX = 0, mouseY = 0;
      
      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;
      
      
  //camera rotation
  var camera_pivot = new THREE.Object3D()
  var Y_AXIS = new THREE.Vector3( 0, 1, 0 );
  var Z_AXIS = new THREE.Vector3(0,0,1);

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


  camera_pivot.add( camera );
  camera.position.set( 130, 0, 500);
  camera.lookAt( camera_pivot.position );
        
        ///define set of parameters of gui
        var effectController = {            
                GeneralDistances:30,
                nodesDistancesY: 30,
                nodesDistancesZ:30,
                phSpread,
                thSpread,          
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
           phSpread= effectController.phSpread
           thSpread = effectController.thSpread

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
        gui.add( effectController, "phSpread", 0.001, 0.05, 0.000001 ).onChange( valuesChanger );
        gui.add( effectController, "thSpread", 0.001, 0.05, 0.000001 ).onChange( valuesChanger );
   
        gui.add( effectController, "Speed1", -0.25, 0.25, 0.000001 ).onChange( valuesChanger );
        gui.add( effectController, "Speed2", -0.25, 0.25, 0.000001 ).onChange( valuesChanger );
        gui.add( effectController, "Speed3", -0.25, 0.25, 0.000001 ).onChange( valuesChanger );
        gui.add( effectController, "Speed4", -0.25, 0.25, 0.000001 ).onChange( valuesChanger );
        //gui.add( effectController, "Speed5", -0.25, 0.25, 0.000001 ).onChange( valuesChanger );
       // gui.add( effectController, "Speed6", -0.25, 0.25, 0.000001 ).onChange( valuesChanger );     
      
        scene = new THREE.Scene();  
       // scene.background = new THREE.Color( 0xf5f5f5 );
       scene.add( camera_pivot );
        var positions = new Float32Array( nNodes * 3 *nGroupsth*nGroupsph );
        var scales = new Float32Array( nNodes * nGroupsth*nGroupsph);
        var colors = new Float32Array( nNodes*nGroupsth*nGroupsph * 3 );
        var color = new THREE.Color();
        ///setting up node 0
        th[0] = (360/nGroupsth) +  Math.sin(count1)
        ph[0] =  (360/nGroupsph) +  Math.sin(count1)
        scales[ 0 ] = 5
        r[0]= rG1Parameter+  Math.sqrt(Math.pow(nodesDistancesX,2) + Math.pow(nodesDistancesY,2) + Math.pow(nodesDistancesZ,2) )  
        positions[ 0] = r[0]*Math.sin(th[0])*Math.cos(ph[0]); 
        positions[ 1] = r[0]*Math.sin(th[0])*Math.sin(ph[0]); 
        positions[ 2 ] = r[0]*Math.cos(th[0]); 
        ///r, gth, ph of groups    
        for(var i=1; i < nNodes * nGroupsth * nGroupsph;i++){
              th[i] = i * (360/nGroupsth) +  Math.sin(count1)
              ph[i] =  i* (360/nGroupsph) +  Math.sin(count1)
              scales[ i ] = ( Math.sin( i*(count1 )  ))*20;           
              r[i] =  i*Math.sqrt(Math.pow(nodesDistancesX,2) + i*Math.pow(nodesDistancesY,2) + i*Math.pow(nodesDistancesZ,2) )          
            }
          
        //xyz of node 0         
      
        for ( var i = 1; i < nNodes*3 * nGroupsth * nGroupsph ; i +=3 ) {            
            positions[ i] = r[i]*Math.sin(th[i])*Math.cos(ph[i]); 
            positions[ i+1] = r[i]*Math.sin(th[i])*Math.sin(ph[i]); 
            positions[ i+2 ] = r[i]*Math.cos(th[i]);
            color.setHSL( 0.001 * ( i ), 0.5, 1 );					
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
        renderer2 = new THREE.WebGLrenderer( { antialias: true } );
        renderer2.setPixelRatio(window.devicePixelRatio );
        //renderer2.setSize( container.innerWidth, container.innerHeight );
        renderer2.setSize(  window.innerWidth, window.innerHeight  );
        //renderer2.appendChild(gui)
        container.appendChild( renderer2.domElement );
  
        //container.appendChild( renderer2.domElement );
        //controls needs to be after renderer2 as it is referenced to it
        /*
        controls = new THREE.TrackballControls( camera, renderer2.domElement );
        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;
        controls.keys = [ 65, 83, 68 ];
        controls.addEventListener( 'change', render );
        */
        //stats = new Stats();
        //container.appendChild( stats.domElement );
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );
      }
      window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer2.setSize( window.innerWidth, window.innerHeight );
};
      
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
        camera_pivot.rotateOnAxis( Y_AXIS, 0.001 );    // radians
        camera_pivot.rotateOnAxis( Z_AXIS, 0.0001 );
        //controls.update();
        render();
      }
      
      function render() {    
        
        var positions = Nodes.geometry.attributes.position.array;
        var scales = Nodes.geometry.attributes.scale.array;
        var color = new THREE.Color();
        var elapsedTime = clock.getElapsedTime()

        var colors = Nodes.geometry.attributes.customColor.array;  
        var timeOscillator = Math.sin(elapsedTime)
      
        rG1Parameter += Math.sin(elapsedTime/2) + Math.sin(elapsedTime/1.5)
        rG2Parameter += Math.sin(elapsedTime/5) + Math.sin(elapsedTime/1.3)
        rG3Parameter += Math.sin(elapsedTime/3) + Math.sin(elapsedTime/9.5)

        //generalr is given by generalDistances
        var generalr  = Math.sqrt(Math.pow(nodesDistancesX,2) +  Math.pow(nodesDistancesY,2) + Math.pow(nodesDistancesZ,2)) //given by general distances
        //settig up node 0
        th[0] = (360/nGroupsth) +  Math.sin(count1)
        ph[0] =  (360/nGroupsph) +  Math.sin(count1)
        scales[ 0 ] = 5
        r[0]= rG1Parameter+  generalr  
        positions[ 0] = r[0]*Math.sin(th[0])*Math.cos(ph[0]); // x
        positions[1] = r[1]*Math.sin(th[1])*Math.sin(ph[1]); 
        positions[2] = r[2]*Math.cos(th[2]);                
      
      //spherical coordinates of three groups
      
      //--------------------------------------------------------------------------g1
            for(let i=1; i < nNodes * nGroupsth * nGroupsph/3;i++){
              th[i] = i*(360/nGroupsth) * thSpread*(Math.sin(count1/100000) + Math.cos(count2/100000))
              ph[i] =  i* (360/nGroupsph) * phSpread*(Math.sin(count1/100000) + Math.sin(count2/100000))
              scales[ i ] = (mqList.matches?2.9:10.5)+( Math.sin(i+ count1 ));           
              r[i] = 0.05*i+(Math.sin(count1/i)) * rG1Parameter+ generalr * 5 
              color.setHSL( 0.05 *( i )*(0.001+Math.abs(timeOscillator)/300), 1, 0.3 );	
                color.toArray( colors, i * 3 ); 
              
                  
            }
         
            for(let i=nNodes * nGroupsth * nGroupsph/3; i < 2*nNodes * nGroupsth * nGroupsph/3;i++){
              th[i] = i * (360/nGroupsth) * thSpread*(Math.sin(count1/100000) + Math.cos(count2/100000))
              ph[i] =  i* (360/nGroupsph) *phSpread*(Math.sin(count1/100000) + Math.sin(count2/100000))
              r[i] =i*0.05 + (Math.sin(count1/i))* rG1Parameter+ generalr *5   
                
            }
            
            for(let i=2*nNodes * nGroupsth * nGroupsph/3; i < nNodes * nGroupsth * nGroupsph;i++){
              th[i] = i * (360/nGroupsth) * thSpread*(Math.sin(count1/100000) + Math.cos(count2/100000))
              ph[i] =  i* (360/nGroupsph) *phSpread*(Math.sin(count1/100000) + Math.sin(count2/100000))
              r[i] = i*0.05+ (Math.sin(count1/i))*rG1Parameter+ generalr * 5   
               
            }
        //make groups individually shifted
        //cartesian positions from spherical coordinates
      
        for(let i=3; i < nNodes * nGroupsth * nGroupsph/3;i+=3){           
                positions[ i  ] =  r[i]*Math.sin(th[i])*Math.cos(ph[i]); 
                positions[ i+1] = r[i]*Math.sin(th[i])*Math.sin(ph[i]); 
                positions[ i+2] = r[i]*Math.cos(th[i]);                         

            }   

            for(let i=nNodes * nGroupsth * nGroupsph/3; i < 2*nNodes * nGroupsth * nGroupsph/3;i+=3){
                positions[ i  ] = r[i]*Math.sin(th[i])*Math.cos(ph[i]); 
                positions[ i+1] =   r[i]*Math.sin(th[i])*Math.sin(ph[i]); 
                positions[ i+2] = r[i]*Math.cos(th[i]);    
           
            } 

            for(let i=2*nNodes * nGroupsth * nGroupsph/3; i < nNodes * nGroupsth * nGroupsph;i+=3){
                positions[ i  ] = r[i]*Math.sin(th[i])*Math.cos(ph[i]); 
                positions[ i+1] = r[i]*Math.sin(th[i])*Math.sin(ph[i]); 
                positions[ i+2] = r[i]*Math.cos(th[i]);    
           
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
        camera.translateZ(  Math.sin(elapsedTime/2)* 10 )

        //flag properties to be updated
        Nodes.geometry.attributes.position.needsUpdate = true;
        Nodes.geometry.attributes.scale.needsUpdate = true;
        Nodes.geometry.attributes.customColor.needsUpdate = true;
        camera.needsUpdate = true;
        renderer2.render( scene, camera );
        
      }