
    var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var points=[];
	var noPoint=false;
	var large=0.0;

	//function to draw the circle	
	function draw(e) {
	    var pos = getMousePos(canvas, e);
	    posx = pos.x;
	    posy = pos.y;
	    points.push(pos.x);
	    points.push(pos.y);
	    var f=false;
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
	    if(points.length>=4 && noPoint===false){
	    	noPoint=true;
	    }
	    if(f===false){
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
	    if(noPoint===true){
			var dictionary = {}
			for(var i=0;i<points.length-2;i=i+2){
				for(var j=i+2;j<points.length-1;j=j+2){
					var len = Math.sqrt(Math.pow((points[j]-points[i]),2)+Math.pow((points[j+1]-points[i+1]),2));
					//window.alert(len);
					dictionary[len]=[points[i],points[i+1],points[j],points[j+1]];
					dist.push(len);
				}
			}
			large=Math.max.apply(null,dist);
			//finding the mid point and drawing circle
			var midx=(dictionary[large][0]+dictionary[large][2])/2;
			var midy=(dictionary[large][1]+dictionary[large][3])/2;
			
			//clearing the canvas of present circle and points

			context.clearRect(0, 0, canvas.width, canvas.height);
			
			//marking the points
			markPoints();

			//drawing the circle
			context.beginPath();
			context.arc(midx,midy,large/2,0,2*Math.PI);
			context.stroke();
			//if there is a 3r point outside circle finding the centroid and drawing the new circle
			for(var i=0;i<points.length-1;i=i+2){
				var len = Math.sqrt(Math.pow((midx-points[i]),2)+Math.pow((midy-points[i+1]),2));
				large=Math.max.apply(null,dist);
				if(len>large/2){
					//window.alert("hello");
					var D = (points[i] - dictionary[large][2]) * (dictionary[large][1] - dictionary[large][3]) - (dictionary[large][0] - dictionary[large][2]) * (points[i+1] - dictionary[large][3]);
					var circCenterX = (((points[i] - dictionary[large][2]) * (points[i] + dictionary[large][2]) + (points[i+1] - dictionary[large][3]) * (points[i+1] + dictionary[large][3])) / 2 * (dictionary[large][1] - dictionary[large][3])-((dictionary[large][0]-dictionary[large][2]) * (dictionary[large][0] + dictionary[large][2]) + (dictionary[large][1] - dictionary[large][3]) * (dictionary[large][1] + dictionary[large][3])) / 2 * (points[i+1] - dictionary[large][3]))/D;

					var circCenterY = (((dictionary[large][0]-dictionary[large][2])*(dictionary[large][0]+dictionary[large][2])+(dictionary[large][1]-dictionary[large][3])*(dictionary[large][1]+dictionary[large][3]))/2*(points[i]-dictionary[large][2])-((points[i]-dictionary[large][2])*(points[i]+dictionary[large][2])+(points[i+1]-dictionary[large][3])*(points[i+1]+dictionary[large][3]))/2*(dictionary[large][0]-dictionary[large][2]))/D;
					var l=Math.sqrt(Math.pow((circCenterX-points[i]),2)+Math.pow((circCenterY-points[i+1]),2));
					context.clearRect(0, 0, canvas.width, canvas.height);
					context.beginPath();
					context.arc(circCenterX,circCenterY,l,0,2*Math.PI);
		    		context.stroke();
		    		markPoints();
					break;

				}
			}
		}
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
