
//bruh 
var fraktal=(function (){
	//start
	var module = {},
		zoomlevel=4,
		zoom=Math.pow(1.25,zoomlevel),
		c,
		ctx,
		height,
		width;
	
	module.init = function (){
		c = document.getElementById("main");
		
		c.addEventListener("mousewheel", fraktal.zoom, false);
		c.addEventListener("DOMMouseScroll", fraktal.zoom, false);
		
		ctx = c.getContext("2d");
		fraktal.vinkel = makeSlider({steps:360/5, step:0/5, id:"vinkel"});
		fraktal.skewvinkel = makeSlider({steps:180/5, step:90/5, id:"skewvinkel"});
		fraktal.poly = makeThumb({steps:5, step:0, id:"poly"});
		fraktal.segments = makeThumb({steps:5, step:0, id:"segments"});
		fraktal.mirror = makeThumb({steps:2, step:0, id:"mirror"});
		
		fraktal.vinkel.unlock();
		
		fraktal.arms = makeThumb({steps:2, step:0, id:"arms"});
		fraktal.depth = makeThumb({steps:5, step:0, id:"depth"});
		
		window.requestAnimFrame = (function(){
			return window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			};
		})();
		
		fraktal.vinkel.fix = function () {
			//this function changes steps to match the number of degrees required to do a full loop.
			//this code is ugly, but i can't be bothered fixing it right now, I have to go to a party.
			var segments=(fraktal.segments.step+1);
			var loopat360=(2/(fraktal.segments.step+1));
			var i=1;
			this.steps=360/5;
			while (Math.abs(loopat360*i % 1) >0.1)	{
				i++;
			}
			this.steps= 360/5*i;
			
			var skew=fraktal.skewvinkel.step-fraktal.skewvinkel.steps/2;
			fraktal.skewvinkel.steps= 180/5*segments;
			if (fraktal.arms.step){
				fraktal.skewvinkel.steps*=2;	
				if (segments%2===0){
					fraktal.vinkel.steps*=2;
				}
			}
			
			if (this.step>this.steps){
				this.step=this.steps;
			}
			if (Math.abs(skew)>fraktal.skewvinkel.steps/2){
				fraktal.skewvinkel.step=(fraktal.skewvinkel.step+fraktal.skewvinkel.steps/2)%fraktal.skewvinkel.steps;
			}
			else{
				fraktal.skewvinkel.step=fraktal.skewvinkel.steps/2+skew;
			}
			fraktal.vinkel.update(this.step,0,1);
			fraktal.skewvinkel.update(fraktal.skewvinkel.step,0,1);
		}
		
		fraktal.skewvinkel.updateLabel =function(){
			this.label.innerHTML=Math.round((this.step-this.steps/2)*5);
		}
		fraktal.skewvinkel.updateLabel();
		
		if (window.location.hash != 0){
			fraktal.hash.load();
		}
		
		fraktal.fixsize();	
	};
	
	var clear = function (){
		ctx.globalCompositeOperation = "source-over";
		ctx.fillRect(0 ,0 , width, height);
		fraktal.hash.save();
	}
	
	module.fixsize = function (){
		width= window.innerWidth;
		height= window.innerHeight;
		c.width=width;
		c.height=height;
		ctx.fillStyle=fraktal.color.bg;
		ctx.strokeStyle=fraktal.color.fraktalal;
		ctx.lineWidth=0.5;
		fraktal.vinkel.resize();
		fraktal.skewvinkel.resize();
		clear();
		fraktal.al.render();
	}
	//Tabort allt
	module.reset = function (){
		fraktal.vinkel.update(0);
		fraktal.depth.update(0);
		fraktal.segments.update(0);
		fraktal.arms.update(0);
		fraktal.skewvinkel.update(90/5);
		fraktal.mirror.update(0);
		fraktal.poly.update(0);
		if (fraktal.animate.on){
			fraktal.animate.toggle();
		}
		clear();
		fraktal.al.render();
	}
	//random
	module.random = function (){
		fraktal.vinkel.random();
		fraktal.skewvinkel.random();
		fraktal.depth.update(Math.floor(Math.random()*2));
		fraktal.segments.random();
		fraktal.mirror.random();
		fraktal.poly.random();
		fraktal.arms.random();
		clear();
		fraktal.al.render();
	}
	
	module.color = (function (){
		module.black="#000000";
		module.white="#ffffff";
		module.bg = module.white;
		module.fraktalal = module.black;
		module.on = false;
		return module;
	}());
	
	module.trails = (function (){
		var module = {},
			knapp;
		module.on = false;
		module.toggle = function (){
			knapp=knapp||document.getElementById("trailsbutton");
			if (this.on){
				this.on=false;
				ctx.globalCompositeOperation = "source-over";
				knapp.className=("knapp");
				fraktal.al.render();
			}
			else {
				this.on=true;
				knapp.className=("knappon");
			}
		}
		return module;
	}());
	
	module.animate = (function (){
		var module = {},
			knapp;
		module.on = false;
		module.disabled = false;
		module.toggle = function (){
			knapp=knapp||document.getElementById("animatebutton");
			if (this.on){
				this.on=false;
				fraktal.hash.save();
				knapp.className=("knapp");
			}
			else {
				if (!fraktal.vinkel.locked || !fraktal.skewvinkel.locked){
					this.on=true;
					knapp.className=("knappon");
					module.loop();
				}
			}
		}
		
		module.loop = function (){
			if (module.on){
				window.setTimeout(module.loop, 1000 / 30);
				//requestAnimFrame(module.loop);
				fraktal.vinkel.nudge(1/2);
				fraktal.skewvinkel.nudge(1/5);
				if (fraktal.auto.on){
					fraktal.auto.frame();
				}
				fraktal.al.render();
			}
		};
		
		module.disable = function(){
			knapp=knapp||document.getElementById("animatebutton");
			knapp.className=("knappgrey");
			module.disabled=true;
		}
		module.enable = function(){
			knapp.className=("knapp");
			module.disabled=false;
		}
		
		return module;
	}());
	
	module.auto = (function (){
		var module = {},
			pre,
			count,
			changes,
			mode,
			oneframes,
			knapp,
			nextchange,
			extra;
		module.on = false;
		module.toggle = function (){
			knapp=knapp||document.getElementById("autobutton");
			if (this.on){
				this.on=false;
				//if (fraktal.animate.on){
				//	fraktal.animate.toggle();
				//}
				fraktal.hash.save();
				knapp.className=("knapp");
			}
			else {
				this.on=true;
				count=0;
				symmetrystart();
				if (!fraktal.animate.on){
					fraktal.animate.toggle();
				}
				knapp.className=("knappon");
			}
		}
		
		var symmetrystart = function(){
			ones = 20;
			if (!fraktal.trails.on){
				fraktal.trails.toggle();
			}
			if (Math.floor(Math.random()*2)){
				fraktal.color.toggle();
			}
			if (fraktal.color.bg===fraktal.color.white && Math.floor(Math.random()*5)!==0){
					fraktal.color.invert();
			}
			mode="symmetry";
			nextchange=1;
			lastchange=count;
			pre=128;
			fraktal.vinkel.unlock();
			fraktal.skewvinkel.lock();
			fraktal.random();
			fraktal.skewvinkel.update(fraktal.skewvinkel.steps/2);
		}
		return module;
	}());
	
	module.kontroller = function(){
		var controlbox = document.getElementById("kontroller");
		var homelink = document.getElementById("homediv");
		if (controlbox.className === "kontroller" ) {
			homelink.className = "hidden";
			controlbox.className = "hidden";
		}
		else {
			controlbox.className = "kontroller";
			fraktal.vinkel.resize();
			fraktal.skewvinkel.resize();
			homelink.className = "homediv";
		}
	}
	
	module.drag = (function (){
		var module = {};
		var mposy;
		module.offset=0;
		module.held=false;
		var moved=false;
		
		module.down= function(e){
			mposy=e.clientY;
			document.onmouseup=function () {
								return function(event) {
									module.up(event)
									}
								}();
			document.onmouseout=function () {
								return function(event) {
									module.out(event)
									}
								}();
								
			document.onmousemove=function () {
								return function(event) {
									module.move(event)
									}
								}();					
			module.held=true;
			module.loop();
			e.stopPropagation();
		}
		
		module.out = function (e){
			if (e.relatedTarget==null){
				stopdrag(e);
			}
		}
		module.up = function (){
			document.onmouseout=[];
			document.onmouseout=[];
			document.onmousemove=[];
			module.held=false;
		}
		module.move = function(e){
			var diffy=e.clientY-mposy;
			module.offset-=diffy;
			//fraktal.al.render();
			mposy=e.clientY;
			moved=true;
		}
		
		module.loop = function (){
			if (module.held){
				if(moved && !fraktal.animate.on){
					fraktal.al.render();
					moved=false;
				}
				requestAnimFrame(module.loop);
			}
		};
		
		module.nudge = (function (){
			var module = {};
			module.down = false;
			module.direction=0;
			module.loop = function (){
				if (module.down){
					if (module.direction){
						fraktal.drag.offset-=5;
					}
					else{
						fraktal.drag.offset+=5;
					}
					if(!fraktal.animate.on){
						fraktal.al.render();
					}
					requestAnimFrame(module.loop);
				}
			};
			
			module.start = function(direction){
				module.direction=direction;
				if (!module.down){
					module.down=true;
					module.loop();
				}
			};
			
			module.stop = function (){
				module.down=false;
			};
			
			return module;
		}());
		
		return module;
	}());
	
	//ZOOM
	module.zoom = function (e){
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || (0-e.detail))));
		fraktal.zoomnudge(delta);
	};
	
	module.zoomnudge = function (delta){
		zoomlevel-=delta;
		zoom=Math.pow(1.25,zoomlevel);
		if (zoom<1){
			zoomlevel=1;
			zoom=1;
		}
		fraktal.al.render();
	}
	
	module.hash =(function(){
		var module={};
		module.current;
		module.save=function(){
			var ruleid = "#" +
			(('000'+(Math.round(fraktal.vinkel.step*5))).substr(-4)) + "," +
			('000'+(Math.round(fraktal.skewvinkel.step*5))).substr(-4) + "," +
			(fraktal.poly.step+1) + "," +
			(fraktal.segments.step+1) + "," +
			fraktal.mirror.step + "," +
			fraktal.arms.step + "," +
			(fraktal.depth.step+1);
			module.current=ruleid;
			window.location = String(window.location).replace(/\#.*$/, "") + ruleid;
		}
		
		module.load = function(){
			if (window.location.hash != 0){
				if (window.location.hash !== module.current){
					var ruleid= window.location.hash;
					if (ruleid.length===14){
						fraktal.depth.update(ruleid.charAt(6) - 1);
						fraktal.poly.update(ruleid.charAt(8) -1);
						fraktal.segments.update((ruleid.charAt(10) + ruleid.charAt(11))-4);
						fraktal.vinkel.fix();
						fraktal.vinkel.update((ruleid.charAt(1) + ruleid.charAt(2) + ruleid.charAt(3) + ruleid.charAt(4))/5);
						fraktal.mirror.update(ruleid.charAt(13)-0);
						fraktal.arms.update(0);
						fraktal.skewvinkel.update(fraktal.skewvinkel.steps/2);
						fraktal.al.render();
					}
					else{
						fraktal.poly.update(ruleid.charAt(11)-1);
						fraktal.segments.update(ruleid.charAt(13)-1);
						fraktal.mirror.update(ruleid.charAt(15)-0);
						fraktal.arms.update(ruleid.charAt(17)-0);
						fraktal.depth.update(ruleid.charAt(19)-1);
						fraktal.vinkel.fix();
						fraktal.vinkel.update((ruleid.charAt(1)+ruleid.charAt(2)+ruleid.charAt(3)+ruleid.charAt(4))/5);
						fraktal.skewvinkel.update((ruleid.charAt(6)+ruleid.charAt(7)+ruleid.charAt(8)+ruleid.charAt(9))/5);
						fraktal.al.render();
					}
				}
			}
		}
		
		window.onhashchange = module.load;
		
		return module;
	}());
	
	module.al =(function(){
		var module = {},
			heading,
			unit,
			x,
			y,
			rads,
			depth,
			segments,
			mirror,
			poly,
			arms,
			motifLines,
			segrad,
			lastrad,
			sideLines;
		
		var prepare = function prepare(){
			depth=fraktal.depth.step+1;
			mirror=fraktal.mirror.step;
			segments=fraktal.segments.step+1;
			poly=fraktal.poly.step+1;
			arms=fraktal.arms.step;
			rads= fraktal.vinkel.step*5 * (Math.PI / 180);
			
			if (fraktal.color.bg === fraktal.color.white && fraktal.trails.on){
				ctx.globalCompositeOperation = "lighter";
				ctx.globalAlpha = 0.008;
				ctx.fillRect(0 ,0 , width, height);
				ctx.globalAlpha = 1;
				ctx.globalCompositeOperation = "source-over";
			}
			
			else if (!fraktal.trails.on){
				ctx.fillRect(0 ,0 , width, height);
			}
			if (fraktal.color.on){
				ctx.strokeStyle=fraktal.color.jump();
			}
			//this code below is a bit of a mess, but it works.
			var skewrad=(fraktal.vinkel.step-fraktal.skewvinkel.step+fraktal.skewvinkel.steps/2)*5*(Math.PI/180);

			segrad=skewrad*2/segments;
			lastrad=skewrad*2-rads;
			
			var motifTestWidth=2+Math.cos(rads);
			var motifTestHeight=Math.sin(rads);
			var motifHeading=rads;
			var motifHeight;
			var motifWidth;
			var motifMax;
			
			for (i=0; i<segments; i++){
				motifHeading -= (segrad);
				motifTestWidth += Math.cos(motifHeading);
				motifTestHeight += Math.sin(motifHeading);
			}			
			//if the correction is zero, it doesn't work. so i need the default zero.
			var skewCorrection=Math.atan2(motifTestHeight,motifTestWidth)||0;
			//now test for the highest/lowest the line gets after skew correction is applied. if it is too much i change the way the shape renders.
			var testline = function (){
				motifTestWidth += Math.cos(motifHeading);
				motifTestHeight += Math.sin(motifHeading);
				motifMax = Math.max(motifMax,Math.abs(motifTestHeight));
			}
			
			motifHeading=skewCorrection;
			motifTestWidth = Math.cos(motifHeading);
			motifTestHeight = Math.sin(motifHeading);
			motifMax = Math.abs(motifTestHeight);
			
			motifHeading-=rads;
			testline();
			
			for (i=0; i<segments; i++){
				motifHeading += (segrad);
				testline();
			}
			motifHeading=skewCorrection;
			testline();
			
			motifWidth=Math.abs(motifTestWidth);
			
			var gap;
			if (motifWidth>0.98){
				//the default(I would use 1, but i want some leeway to make up for floating point weirdness).
				unit=width/zoom/Math.abs(Math.pow(motifWidth, depth));
				gap=width/zoom;
				
			}
			else{
				//the fraktalal turns in on itself, so the start and end points won't be the limits of the shape.
				unit=Math.abs(width/zoom/(motifWidth-Math.cos(skewCorrection)*2));
				gap=unit*Math.pow(motifWidth,depth);
			}
			
			var shrinkray;
			if (motifMax*unit>width/zoom/2){
				//the motif sticks out too much, so the shape should be shrunk.
				var shrinkray=(width/zoom/2)/(motifMax*unit);
				unit=unit*shrinkray;
				gap=gap*shrinkray;
			}
			
			var polyRads;
			var polyOffset=0;
			if (poly>2){
				//the fraktalal is a polygon, so it must be offset and resized accordingly
				polyRads=Math.PI/poly;
				polyOffset = (gap/2)/Math.tan(polyRads);
				if ((polyOffset*2) > width/zoom){
					shrinkray=((polyOffset*2)/(width/zoom));
					unit=unit/shrinkray;
					gap = gap/shrinkray;
					polyOffset = polyOffset/shrinkray;
				}
			}
			
			//the fraktalal turns as it starts, so i have to act like it's just finished a polygon side. The skews have to stack with every iteration.
			heading=(skewCorrection*depth-(Math.PI*2)/poly);
			
			x=width/2-(gap/2);
			y=height/2-polyOffset-fraktal.drag.offset;
			
			motifLines=3+segments;
			if (mirror){
				motifLines+=1+segments;
			}
			if (arms){
				motifLines+=segments*(mirror+1);
			}
			sideLines=Math.pow(motifLines,depth);
		}
		
		var i,
			snaps=[],
			armSnaps=[];
			
		var starttime;
		
		module.render = function render(){
			prepare();
			if (!fraktal.animate.on && (!fraktal.vinkel.held && !fraktal.skewvinkel.held)){
				fraktal.hash.save();
			}
			i=0;
			//little box at the start to help debug
			//ctx.fillStyle="#000000";
			//ctx.fillRect(x,y,10,10);
			//ctx.fillStyle="#ffffff";
			ctx.beginPath();
			ctx.moveTo(x, y);
			module.morelines();
		}
		
		module.morelines = function morelines(){
			var turnDepth=0;
			starttime=Date.now();
			
			var saveSnap = function savesnap(){
				var outward = {x:x, y:y, heading:heading};
				outward.load = function(){
					x=this.x;
					y=this.y;
					heading=this.heading;
					ctx.moveTo(x, y);
				}
				return outward;
			}
			
			var turn = function turn(){
				var count=i/Math.pow(motifLines,turnDepth)%motifLines;
				if (i%sideLines===0){
					heading+=(Math.PI*2)/poly;
				}
				else if (count===0){
					turnDepth+=1;
					turn();
					turnDepth-=1;
				}
				else if (count===1)	{
					if (mirror){
						snaps[turnDepth]=saveSnap();
					}
					heading+=-rads;
				}
				else if (count<2+segments*(arms+1)){
					if (arms){
						if (count%2===1){
							armSnaps[turnDepth].load();
							heading+=segrad;
						}
						else{
							armSnaps[turnDepth]=saveSnap();
							heading-=(Math.PI-segrad)/2;
						}
					}
					else {
						heading+=segrad;
					}
					
				}
				else if (count===2+segments*(arms+1)){
					//last turn if mirror is off, otherwise do the snap
					if (mirror){
						snaps[turnDepth].load();
						heading+=lastrad;
					}
					else{
					heading+=-lastrad;
					}
				}
				else if (count<motifLines-1){
					if (arms){
						if (count%2===0){
							armSnaps[turnDepth].load();
							heading-=segrad;
						}
						else{
							armSnaps[turnDepth]=saveSnap();
							heading+=(Math.PI-segrad)/2;
						}
					}
					else {
						heading-=segrad;
					}
				}
				else if (count===motifLines-1){
					//this is the last turn, but is only reached when mirror is on
					heading+=rads;
				}
			}
			
			while (i<sideLines*poly) {
				//check if we need a break after a certain number of lines (can be raised);
				if (i%256===0){
					ctx.stroke();
					ctx.beginPath();
					ctx.moveTo(x, y);
					if (Date.now()-starttime>50){
						if (fraktal.auto.on){
							fraktal.random();
						}
						else if (fraktal.animate.on){
							fraktal.animate.toggle();
						}
						requestAnimFrame(fraktal.al.morelines);
						break;
					}
					else {
						turn();
						x += unit * Math.cos(heading);
						y += unit * Math.sin(heading);
						ctx.lineTo(x, y);
						i++
					}
				}
				else {
					turn();
					x += unit * Math.cos(heading);
					y += unit * Math.sin(heading);
					ctx.lineTo(x, y);
					i++
				}
			}
			if (i===sideLines*poly) {
				ctx.stroke();
			}
		}
		return module;
	}());
	
	var makeSlider = function(spec){
		var outward={};
		outward.held = false;
		outward.element = document.getElementById(spec.id);
		outward.steps = spec.steps;
		var slidersize = outward.element.clientWidth;

		outward.resize = function (){
			outward.range = outward.element.parentNode.clientWidth- outward.element.clientWidth;
			outward.start = outward.element.parentNode.getBoundingClientRect().left;
		};
		outward.resize();
		
		outward.label = document.getElementById("l"+spec.id);
		
		outward.update = function(step,clicked,fixed){
			if (outward.step != step || fixed){
				outward.step = step;
				var sliderx = step*(outward.range/outward.steps);
				outward.element.style.left=sliderx + "px";
				outward.updateLabel();
				if (clicked){
					if (fraktal.animate.on){
						outward.lock();
					}
					fraktal.al.render();
				}
			}
		};
		
		outward.random = function(){
			outward.update(Math.floor(Math.random()*outward.steps));
		}
	
		outward.updateLabel = function(){
			outward.label.innerHTML=Math.round(outward.step*5);
		}
		outward.down = function (e){
			e.preventDefault();
			outward.held=true;
			var where=this;
			document.onmouseup=function () {
								return function(event) {
									where.stop(event)
									}
								}();
			document.onmouseout=function () {
								return function(event) {
									where.out(event)
									}
								}();
								
			document.onmousemove=function () {
								return function(event) {
									where.move(event)
									}
								}();
			outward.element.className="sliderdown";
			e.stopPropagation();
		};
		outward.stop = function(e) {
			if (outward.held===true){
				document.onmouseout=[];
				document.onmouseout=[];
				document.onmousemove=[];
				outward.element.className="slider";
				outward.held=false;
				fraktal.hash.save();
			}
		};
		outward.out = function(e){
			if (e.relatedTarget==null){
				outward.stop(e);
			}
		};
		var getx = function(mpos){
				var slidermousepos;
				if ((mpos) < outward.start+(outward.element.clientWidth/2)){
					slidermousepos = 0;
				}
				else if (mpos > outward.start+ outward.range+(outward.element.clientWidth/2)){
					slidermousepos = outward.range;
				}
				else{
					slidermousepos= (mpos - outward.start -(outward.element.clientWidth/2));
				}
				return slidermousepos;
		};
		outward.move = function(e){
			var step = Math.round(getx(e.clientX)/(outward.range/outward.steps));
			outward.update(step, true);
		};
		outward.jump = function(e){
			outward.move(e);
			outward.down(e);
		};
		
		outward.nudge = function (amount){
			//move by a small amount (for animating)
			if (!outward.locked){
				var next=this.step+amount;
				if (this.step>this.steps-amount){
				next=0;
				}
				this.update(next);
			}
		}
		
		var lockbutton=document.getElementById(spec.id+"lock");
		outward.locked = true;
		outward.locktoggle = function (){
			if (outward.locked){
				outward.unlock();
			}
			else{
				outward.lock();
			}
		}
		outward.lock = function (){
			outward.locked = true;
			lockbutton.className="knapp";
			if (fraktal.vinkel.locked && fraktal.skewvinkel.locked){
				if (fraktal.animate.on){
					fraktal.animate.toggle();
				}
				if (fraktal.auto.on){
					fraktal.auto.toggle();
				}
				fraktal.animate.disable();
			}
		}
		outward.unlock = function (){
			outward.locked = false;
			lockbutton.className="knappon";
			if (fraktal.animate.disabled){
				fraktal.animate.enable();
				fraktal.animate.toggle();
			}
		}
		outward.highlight = function(state){
			if (state){
				outward.element.className="sliderdown";
			}
			else{
				outward.element.className="slider";
			}
		}
		
		outward.step = spec.step;
		outward.element.style.left=outward.step*(outward.range/outward.steps) + "px";
		outward.label.innerHTML=outward.step*5;
		
		return outward;
	};
	
	var makeThumb = function(spec){
		var outward = {},
			area,
			c,
			ctx,
			d,
			icon,
			cCell,
			over=false;
			
		area=document.getElementById("egenskaperarea");
		c = document.createElement("canvas");
		c.className="egenskapercanvas";
		c.width=56;
		c.height=56;
		c.onclick=function (){outward.up(true);};
		ctx=c.getContext("2d");
		ctx.fillStyle="#ffffff";
		ctx.lineWidth=2;
		
		d = document.createElement("div");
		icon = document.createElement("div");
			
		d.onclick=function (){outward.down();};
		c.onmouseover=function (){outward.hover();};
		c.onmouseout=function (){over=false; outward.render();};
		
		d.onmouseover=function (){};
		d.onmouseout=function (){};
		
		cCell = document.createElement("td");
		
		area.appendChild(cCell);
		
		cCell.appendChild(c);
		cCell.appendChild(d);
		d.appendChild(icon);
		
		outward.steps = spec.steps;
		outward.step =spec.step;
		outward.id = spec.id;
		
		var fixButtons = function (){
			if (outward.step===0){
				d.className="prevGrey";
			}
			else {	
				d.className="prev";
			}
		}
		outward.render = function (){
			if (!over){
				ctx.fillRect (0 ,0 , c.width, c.height);
			}
			else {
				ctx.fillStyle="#aaaaaa";
				ctx.fillRect (0 ,0 , c.width, c.height);
				ctx.fillStyle="#ffffff";
			}
			if (renders[this.id]){
				renders[this.id](outward.step);
			}
		};
		outward.hover = function (){
			over=true;
			ctx.fillStyle="#aaaaaa";
			ctx.fillRect (0 ,0 , c.width, c.height);
			ctx.fillStyle="#ffffff";
			if (renders[this.id]){
				renders[this.id]((outward.step+1)%outward.steps);
			}
		};
		outward.up = function (loop){
			if (this.step!==this.steps-1){
				this.update(this.step+1);
			}
			else if (loop){
				this.update(0);
			}
			fraktal.al.render();
		};
		outward.down = function (){
			if (this.step!==0){
				this.update(this.step-1);
			}
			fraktal.al.render();
		};
		outward.update = function (step){
			this.step=step;
			this.render();
			if (this.id==="segments"||this.id==="arms"){
				fraktal.vinkel.fix();
			}
			fixButtons();
		}
		outward.random = function(){
			outward.update(Math.floor(Math.random()*outward.steps));
		}
		outward.hide = function(setting){
			if (setting){
				cCell.className="";
			}
			else {
				cCell.className="hidden";
			}
		}
		
		var renders = {};
		renders.mirror = function (step){
			var topmost = c.width/3*Math.cos(60 * (Math.PI / 180));
			ctx.beginPath();
			ctx.moveTo(0, c.height/2);
			ctx.lineTo(c.width/3, c.height/2);
			ctx.lineTo(c.width/2, topmost);
			ctx.lineTo(c.width*2/3, c.height/2);
			if (step){
				ctx.moveTo(c.width/3, c.height/2);
				ctx.lineTo(c.width/2, c.height-topmost);
				ctx.lineTo(c.width*2/3, c.height/2);
			}
			ctx.lineTo(c.width, c.height/2);
			ctx.stroke();
		}
		renders.poly = function (step){
			var length = c.width*2/3,
				polyOffset = (length/2)/Math.tan(180/(step+1) * (Math.PI / 180)),
				x,
				y,
				heading=360/(step+1)*-1,
				radians,
				shrinkray;
				
			if (step===0){
				polyOffset=0;
			}
				
			if ((polyOffset*2) > length){
				shrinkray=(polyOffset*2/length);
				length=length/shrinkray;
				polyOffset = polyOffset/shrinkray;
			}
			x = (c.width-length)/2;
			y = c.height/2-polyOffset;
			
			if (step === 1){
				ctx.beginPath();
				ctx.moveTo(x,y-2);
				ctx.lineTo(x+length, y-2);
				ctx.moveTo(x,y+2);
				ctx.lineTo(x+length, y+2);
				ctx.stroke();
			}
			else{
				ctx.beginPath();
				ctx.moveTo(x,y);
					for (i=0; i<(step+1); i++){
						heading+=360/(step+1);
						radians = heading * (Math.PI / 180);
						x += length * Math.cos(radians);
						y += length * Math.sin(radians);
						ctx.lineTo(x, y);
					}
				ctx.stroke();
			}
		}
		renders.segments = function (step){
			function oneline(){
				x += length * Math.cos(heading);
				y += length * Math.sin(heading);
				ctx.lineTo(x,y);
			}
			var length,
				x = 0,
				y = c.height/2,
				heading,
				rad=60*Math.PI / 180;
				
			var lengthinunits = 2+Math.cos(rad);
				heading=-rad;
			for (i=0; i<step+1; i++){
				heading += (rad*2/(step+1));
				lengthinunits += Math.cos(heading);
			}
				
			length = c.width/lengthinunits;
			heading =0;
			ctx.beginPath();
			ctx.moveTo(x,y);
			oneline();
			heading+=-rad;
			oneline();
			for (i=0; i<step+1; i++){
				heading+=rad*2/(step+1);
				oneline ();
			}
			heading+=-rad;
			oneline();
			ctx.stroke();
			
		}
		renders.arms = function (step){
			var topmost = c.width/3*Math.cos(60 * (Math.PI / 180));
			ctx.beginPath();
			ctx.moveTo(0, c.height/2);
			ctx.lineTo(c.width/3, c.height/2);
			ctx.lineTo(c.width/2, topmost);
			ctx.lineTo(c.width*2/3, c.height/2);
			ctx.lineTo(c.width, c.height/2);
			if (step){
				ctx.moveTo(c.width/2, topmost);
				ctx.lineTo(c.width/2, topmost-c.height/3);
			}
			ctx.stroke();
		}
		renders.depth = function (step){
			var heading = 0;
			function recursivedraw(rads,localdepth){
				heading=heading+rads;
				if (localdepth === 0){
					//this is for when the fraktalal is at the bottom level and actually has to draw a line.
					x += length * Math.cos(heading);
					y += length * Math.sin(heading);
					ctx.lineTo(x, y);
				}
				else{
					recursivedraw (0,localdepth-1);
					recursivedraw (-rad,localdepth-1);
					recursivedraw (rad*2,localdepth-1);
					recursivedraw (-rad,localdepth-1);
				}
			}
			var x = 0;
			var y = c.height/2;
			var rad = 60 * Math.PI/180;
			var length = c.width/(Math.pow(3,step+1));
			
			ctx.beginPath();
			ctx.moveTo(x, y);
			recursivedraw(0, step+1);
			ctx.stroke();
		}
		
		fixButtons();
		outward.render();
		return outward;
	};
	
	return module;
}());
