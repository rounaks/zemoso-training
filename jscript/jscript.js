
    var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var points=[];
	var ZeroPoints=false;
	var LargestDistance=0.0;
	

	//function to draw the circle	
	function draw(e) {
	    var pos = getMousePos(canvas, e);
	    posx = pos.x;
	    posy = pos.y;
	    points.push(pos.x);
	    points.push(pos.y);
	    var PointExists=false;
	    for(var i=0;i<points.length-2;i=i+2){
	    	if(points[i]===pos.x){
	    		if(points[i+1]===pos.y){
	    			points.splice(i,2);
	    			var k=points.length-2;
	    			points.splice(k,2);
	    			f=true;
	    			break;
	    		}
	    	}
	    }
	    if(points.length>=4 && ZeroPoints===false){
	    	ZeroPoints=true;
	    }
	    if(PointExists===false){
	    	context.fillStyle = "#000000";
		    context.beginPath();
		    context.arc(posx, posy, 1, 0, 2*Math.PI);
		}
	    else{
	    	context.fillStyle = "#ffffff";
	        context.beginPath();
	    	context.arc(posx, posy, 1, 0, 2*Math.PI);
	    }
	    context.fill();

	    //Checking for number of points and finding the pair of points at max distance
	    var dist=[];
	    if(ZeroPoints===true){
			var dictionary = {}
			for(var i=0;i<points.length-2;i=i+2){
				for(var j=i+2;j<points.length-1;j=j+2){
					var len = Math.sqrt(Math.pow((points[j]-points[i]),2)+Math.pow((points[j+1]-points[i+1]),2));
					dictionary[len]=[points[i],points[i+1],points[j],points[j+1]];
					dist.push(len);
				}
			}
			LargestDistance=Math.max.apply(null,dist);
			//finding the mid point and drawing circle
			var midx=(dictionary[LargestDistance][0]+dictionary[LargestDistance][2])/2;
			var midy=(dictionary[LargestDistance][1]+dictionary[LargestDistance][3])/2;
			
			//clearing the canvas of present circle and points

			context.clearRect(0, 0, canvas.width, canvas.height);
			
			//marking the points
			markPoints();

			//drawing the circle
			context.beginPath();
			context.arc(midx,midy,LargestDistance/2,0,2*Math.PI);
			context.stroke();
			//if there is a 3r point outside circle finding the circumcenter and drawing the new circle
			for(var i=0;i<points.length-1;i=i+2){
				var len = Math.sqrt(Math.pow((midx-points[i]),2)+Math.pow((midy-points[i+1]),2));
				LargestDistance=Math.max.apply(null,dist);
				if(len>LargestDistance/2){
					var Circ = circumcenter(dictionary, LargestDistance,i);

					CircX = Circ.CenterX;
					CircY = Circ.CenterY;
					
					var l=Math.sqrt(Math.pow((CircX-points[i]),2)+Math.pow((CircY-points[i+1]),2));
					context.clearRect(0, 0, canvas.width, canvas.height);
					context.beginPath();
					context.arc(CircX,CircY,l,0,2*Math.PI);
		    		context.stroke();
		    		markPoints();
					break;

				}
			}
		}
	}

//function to get Circumcenter
	function circumcenter(dict, LargeDist, K){
		D = (points[K] - dict[LargeDist][2]) * (dict[LargeDist][1] - dict[LargeDist][3]) - (dict[LargeDist][0] - dict[LargeDist][2]) * (points[K+1] - dict[LargeDist][3]);
					CenterX = (((points[K] - dict[LargeDist][2]) * (points[K] + dict[LargeDist][2]) + (points[K+1] - dict[LargeDist][3]) * (points[K+1] + dict[LargeDist][3])) / 2 * (dict[LargeDist][1] - dict[LargeDist][3])-((dict[LargeDist][0]-dict[LargeDist][2]) * (dict[LargeDist][0] + dict[LargeDist][2]) + (dict[LargeDist][1] - dict[LargeDist][3]) * (dict[LargeDist][1] + dict[LargeDist][3])) / 2 * (points[K+1] - dict[LargeDist][3]))/D;

					CenterY = (((dict[LargeDist][0]-dict[LargeDist][2])*(dict[LargeDist][0]+dict[LargeDist][2])+(dict[LargeDist][1]-dict[LargeDist][3])*(dict[LargeDist][1]+dict[LargeDist][3]))/2*(points[K]-dict[LargeDist][2])-((points[K]-dict[LargeDist][2])*(points[K]+dict[LargeDist][2])+(points[K+1]-dict[LargeDist][3])*(points[K+1]+dict[LargeDist][3]))/2*(dict[LargeDist][0]-dict[LargeDist][2]))/D;
	}
//function to mark the points array
	function markPoints(){
		for(var i=0;i<points.length-1;i=i+2){
			context.fillStyle = "#000000";
		    context.beginPath();
		    context.arc(points[i], points[i+1], 1, 0, 2*Math.PI);
		    context.fill();
		}
	}
//function to get the location of the click
	function getMousePos(canvas, evt) {
	    var rect = canvas.getBoundingClientRect();
	    return {
	      x: evt.clientX - rect.left,
	      y: evt.clientY - rect.top
	    };
	}
