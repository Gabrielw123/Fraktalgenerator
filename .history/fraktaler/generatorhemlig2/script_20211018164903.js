//Detta är js koden

var fraktal=(function (){
	//start
	var modul = {},
		zoomlevel=4,
		zoom=Math.pow(1.25,zoomlevel),
		c,
		ctx,
		height,
		width;
	
	modul.init = function (){
		c = document.getElementById("main");
		
		c.addEventListener("mousewheel", fraktal.zoom, false);
		c.addEventListener("DOMMouseScroll", fraktal.zoom, false);
		
		ctx = c.getContext("2d");
		fraktal.vinkel = makeSlider({steps:360/5, step:0/5, id:"vinkel"});
		fraktal.skewvinkel = makeSlider({steps:180/5, step:90/5, id:"skewvinkel"});
		fraktal.polygon = makeThumb({steps:5, step:0, id:"polygon"});
		fraktal.segments = makeThumb({steps:5, step:0, id:"segments"});
		fraktal.spegla = makeThumb({steps:2, step:0, id:"spegla"});
		
		fraktal.vinkel.unlock();
		
		fraktal.armar = makeThumb({steps:2, step:0, id:"armar"});
		fraktal.djup = makeThumb({steps:5, step:0, id:"djup"});
		
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
			if (fraktal.armar.step){
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
	
	modul.fixsize = function (){
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
	//Tabort allt/gör allt 0
	modul.reset = function (){
		fraktal.vinkel.update(0);
		fraktal.djup.update(0);
		fraktal.segments.update(0);
		fraktal.armar.update(0);
		fraktal.skewvinkel.update(90/5);
		fraktal.spegla.update(0);
		fraktal.polygon.update(0);
		if (fraktal.animera.on){
			fraktal.animera.toggle();
		}
		clear();
		fraktal.al.render();
	}
	//random
	modul.random = function (){
		fraktal.vinkel.random();
		fraktal.skewvinkel.random();
		fraktal.djup.update(Math.floor(Math.random()*2));
		fraktal.segments.random();
		fraktal.spegla.random();
		fraktal.polygon.random();
		fraktal.armar.random();
		clear();
		fraktal.al.render();
	}
	
	modul.color = (function (){
		modul.black="#000000";
		modul.white="#ffffff";
		modul.bg = modul.white;
		modul.fraktalal = modul.black;
		modul.on = false;
		return modul;
	}());
	
	modul.trails = (function (){
		var modul = {},
			knapp;
		modul.on = false;
		modul.toggle = function (){
			knapp=knapp||document.getElementById("trailsknapp");
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
		return modul;
	}());
	
	modul.animera = (function (){
		var modul = {},
			knapp;
		modul.on = false;
		modul.disabled = false;
		modul.toggle = function (){
			knapp=knapp||document.getElementById("animeraknapp");
			if (this.on){
				this.on=false;
				fraktal.hash.save();
				knapp.className=("knapp");
			}
			else {
				if (!fraktal.vinkel.locked || !fraktal.skewvinkel.locked){
					this.on=true;
					knapp.className=("knappon");
					modul.loop();
				}
			}
		}
		
		modul.loop = function (){
			if (modul.on){
				window.setTimeout(modul.loop, 1000 / 30);
				//requestAnimFrame(modul.loop);
				fraktal.vinkel.nudge(1/2);
				fraktal.skewvinkel.nudge(1/5);
				if (fraktal.auto.on){
					fraktal.auto.frame();
				}
				fraktal.al.render();
			}
		};
		
		modul.disable = function(){
			knapp=knapp||document.getElementById("animeraknapp");
			knapp.className=("knappgrey");
			modul.disabled=true;
		}
		modul.enable = function(){
			knapp.className=("knapp");
			modul.disabled=false;
		}
		
		return modul;
	}());
	
	modul.auto = (function (){
		var modul = {},
			pre,
			count,
			changes,
			mode,
			oneframes,
			knapp,
			nextchange,
			extra;
		modul.on = false;
		modul.toggle = function (){
			knapp=knapp||document.getElementById("autoknapp");
			if (this.on){
				this.on=false;
				//if (fraktal.animera.on){
				//	fraktal.animera.toggle();
				//}
				fraktal.hash.save();
				knapp.className=("knapp");
			}
			else {
				this.on=true;
				count=0;
				symmetrystart();
				if (!fraktal.animera.on){
					fraktal.animera.toggle();
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
		return modul;
	}());
	
	modul.kontroller = function(){
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
	
	modul.drag = (function (){
		var modul = {};
		var mposy;
		modul.offset=0;
		modul.held=false;
		var moved=false;
		
		modul.down= function(e){
			mposy=e.clientY;
			document.onmouseup=function () {
								return function(event) {
									modul.up(event)
									}
								}();
			document.onmouseout=function () {
								return function(event) {
									modul.out(event)
									}
								}();
								
			document.onmousemove=function () {
								return function(event) {
									modul.move(event)
									}
								}();					
			modul.held=true;
			modul.loop();
			e.stopPropagation();
		}
		
		modul.out = function (e){
			if (e.relatedTarget==null){
				stopdrag(e);
			}
		}
		modul.up = function (){
			document.onmouseout=[];
			document.onmouseout=[];
			document.onmousemove=[];
			modul.held=false;
		}
		modul.move = function(e){
			var diffy=e.clientY-mposy;
			modul.offset-=diffy;
			//fraktal.al.render();
			mposy=e.clientY;
			moved=true;
		}
		
		modul.loop = function (){
			if (modul.held){
				if(moved && !fraktal.animera.on){
					fraktal.al.render();
					moved=false;
				}
				requestAnimFrame(modul.loop);
			}
		};
		
		modul.nudge = (function (){
			var modul = {};
			modul.down = false;
			modul.direction=0;
			modul.loop = function (){
				if (modul.down){
					if (modul.direction){
						fraktal.drag.offset-=5;
					}
					else{
						fraktal.drag.offset+=5;
					}
					if(!fraktal.animera.on){
						fraktal.al.render();
					}
					requestAnimFrame(modul.loop);
				}
			};
			
			modul.start = function(direction){
				modul.direction=direction;
				if (!modul.down){
					modul.down=true;
					modul.loop();
				}
			};
			
			modul.stop = function (){
				modul.down=false;
			};
			
			return modul;
		}());
		
		return modul;
	}());
	
	//ZOOM
	modul.zoom = function (e){
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || (0-e.detail))));
		fraktal.zoomnudge(delta);
	};
	
	modul.zoomnudge = function (delta){
		zoomlevel-=delta;
		zoom=Math.pow(1.25,zoomlevel);
		if (zoom<1){
			zoomlevel=1;
			zoom=1;
		}
		fraktal.al.render();
	}
	
	modul.hash =(function(){
		var modul={};
		modul.current;
		modul.save=function(){
			var ruleid = "#" +
			(('000'+(Math.round(fraktal.vinkel.step*5))).substr(-4)) + "," +
			('000'+(Math.round(fraktal.skewvinkel.step*5))).substr(-4) + "," +
			(fraktal.polygon.step+1) + "," +
			(fraktal.segments.step+1) + "," +
			fraktal.spegla.step + "," +
			fraktal.armar.step + "," +
			(fraktal.djup.step+1);
			modul.current=ruleid;
			window.location = String(window.location).replace(/\#.*$/, "") + ruleid;
		}
		
		modul.load = function(){
			if (window.location.hash != 0){
				if (window.location.hash !== modul.current){
					var ruleid= window.location.hash;
					if (ruleid.length===14){
						fraktal.djup.update(ruleid.charAt(6) - 1);
						fraktal.polygon.update(ruleid.charAt(8) -1);
						fraktal.segments.update((ruleid.charAt(10) + ruleid.charAt(11))-4);
						fraktal.vinkel.fix();
						fraktal.vinkel.update((ruleid.charAt(1) + ruleid.charAt(2) + ruleid.charAt(3) + ruleid.charAt(4))/5);
						fraktal.spegla.update(ruleid.charAt(13)-0);
						fraktal.armar.update(0);
						fraktal.skewvinkel.update(fraktal.skewvinkel.steps/2);
						fraktal.al.render();
					}
					else{
						fraktal.polygon.update(ruleid.charAt(11)-1);
						fraktal.segments.update(ruleid.charAt(13)-1);
						fraktal.spegla.update(ruleid.charAt(15)-0);
						fraktal.armar.update(ruleid.charAt(17)-0);
						fraktal.djup.update(ruleid.charAt(19)-1);
						fraktal.vinkel.fix();
						fraktal.vinkel.update((ruleid.charAt(1)+ruleid.charAt(2)+ruleid.charAt(3)+ruleid.charAt(4))/5);
						fraktal.skewvinkel.update((ruleid.charAt(6)+ruleid.charAt(7)+ruleid.charAt(8)+ruleid.charAt(9))/5);
						fraktal.al.render();
					}
				}
			}
		}
		
		window.onhashchange = modul.load;
		
		return modul;
	}());
	
	modul.al =(function(){
		var modul = {},
			heading,
			unit,
			x,
			y,
			rads,
			djup,
			segments,
			spegla,
			polygon,
			armar,
			motifLines,
			segrad,
			lastrad,
			sideLines;
		
		var prepare = function prepare(){
			djup=fraktal.djup.step+1;
			spegla=fraktal.spegla.step;
			segments=fraktal.segments.step+1;
			polygon=fraktal.polygon.step+1;
			armar=fraktal.armar.step;
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
			//now test for the highest/lowest the line gets after skew correction is applied. if it is too much i change the way the shape rendera.
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
				unit=width/zoom/Math.abs(Math.pow(motifWidth, djup));
				gap=width/zoom;
				
			}
			else{
				//the fraktalal turns in on itself, so the start and end points won't be the limits of the shape.
				unit=Math.abs(width/zoom/(motifWidth-Math.cos(skewCorrection)*2));
				gap=unit*Math.pow(motifWidth,djup);
			}
			
			var shrinkray;
			if (motifMax*unit>width/zoom/2){
				//the motif sticks out too much, so the shape should be shrunk.
				var shrinkray=(width/zoom/2)/(motifMax*unit);
				unit=unit*shrinkray;
				gap=gap*shrinkray;
			}
			
			var polygonRads;
			var polygonOffset=0;
			if (polygon>2){
				//the fraktalal is a polygongon, so it must be offset and resized accordingly
				polygonRads=Math.PI/polygon;
				polygonOffset = (gap/2)/Math.tan(polygonRads);
				if ((polygonOffset*2) > width/zoom){
					shrinkray=((polygonOffset*2)/(width/zoom));
					unit=unit/shrinkray;
					gap = gap/shrinkray;
					polygonOffset = polygonOffset/shrinkray;
				}
			}
			
			//the fraktalal turns as it starts, so i have to act like it's just finished a polygongon side. The skews have to stack with every iteration.
			heading=(skewCorrection*djup-(Math.PI*2)/polygon);
			
			x=width/2-(gap/2);
			y=height/2-polygonOffset-fraktal.drag.offset;
			
			motifLines=3+segments;
			if (spegla){
				motifLines+=1+segments;
			}
			if (armar){
				motifLines+=segments*(spegla+1);
			}
			sideLines=Math.pow(motifLines,djup);
		}
		
		var i,
			snaps=[],
			armarnaps=[];
			
		var starttime;
		
		modul.render = function render(){
			prepare();
			if (!fraktal.animera.on && (!fraktal.vinkel.held && !fraktal.skewvinkel.held)){
				fraktal.hash.save();
			}
			i=0;
			//little box at the start to help debug
			//ctx.fillStyle="#000000";
			//ctx.fillRect(x,y,10,10);
			//ctx.fillStyle="#ffffff";
			ctx.beginPath();
			ctx.moveTo(x, y);
			modul.morelines();
		}
		
		modul.morelines = function morelines(){
			var turndjup=0;
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
				var count=i/Math.pow(motifLines,turndjup)%motifLines;
				if (i%sideLines===0){
					heading+=(Math.PI*2)/polygon;
				}
				else if (count===0){
					turndjup+=1;
					turn();
					turndjup-=1;
				}
				else if (count===1)	{
					if (spegla){
						snaps[turndjup]=saveSnap();
					}
					heading+=-rads;
				}
				else if (count<2+segments*(armar+1)){
					if (armar){
						if (count%2===1){
							armarnaps[turndjup].load();
							heading+=segrad;
						}
						else{
							armarnaps[turndjup]=saveSnap();
							heading-=(Math.PI-segrad)/2;
						}
					}
					else {
						heading+=segrad;
					}
					
				}
				else if (count===2+segments*(armar+1)){
					//last turn if spegla is off, otherwise do the snap
					if (spegla){
						snaps[turndjup].load();
						heading+=lastrad;
					}
					else{
					heading+=-lastrad;
					}
				}
				else if (count<motifLines-1){
					if (armar){
						if (count%2===0){
							armarnaps[turndjup].load();
							heading-=segrad;
						}
						else{
							armarnaps[turndjup]=saveSnap();
							heading+=(Math.PI-segrad)/2;
						}
					}
					else {
						heading-=segrad;
					}
				}
				else if (count===motifLines-1){
					//this is the last turn, but is only reached when spegla is on
					heading+=rads;
				}
			}
			
			while (i<sideLines*polygon) {
				//check if we need a break after a certain number of lines (can be raised);
				if (i%256===0){
					ctx.stroke();
					ctx.beginPath();
					ctx.moveTo(x, y);
					if (Date.now()-starttime>50){
						if (fraktal.auto.on){
							fraktal.random();
						}
						else if (fraktal.animera.on){
							fraktal.animera.toggle();
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
			if (i===sideLines*polygon) {
				ctx.stroke();
			}
		}
		return modul;
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
					if (fraktal.animera.on){
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
		
		var lockknapp=document.getElementById(spec.id+"lock");
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
			lockknapp.className="knapp";
			if (fraktal.vinkel.locked && fraktal.skewvinkel.locked){
				if (fraktal.animera.on){
					fraktal.animera.toggle();
				}
				if (fraktal.auto.on){
					fraktal.auto.toggle();
				}
				fraktal.animera.disable();
			}
		}
		outward.unlock = function (){
			outward.locked = false;
			lockknapp.className="knappon";
			if (fraktal.animera.disabled){
				fraktal.animera.enable();
				fraktal.animera.toggle();
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
		c.width=58;
		c.height=58;
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
		
		var fixKnappar = function (){
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
			if (rendera[this.id]){
				rendera[this.id](outward.step);
			}
		};
		outward.hover = function (){
			over=true;
			ctx.fillStyle="#aaaaaa";
			ctx.fillRect (0 ,0 , c.width, c.height);
			ctx.fillStyle="#ffffff";
			if (rendera[this.id]){
				rendera[this.id]((outward.step+1)%outward.steps);
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
			if (this.id==="segments"||this.id==="armar"){
				fraktal.vinkel.fix();
			}
			fixKnappar();
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
		//lista med de olika egenskaperna
		var rendera = {};
		rendera.spegla = function (step){
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
		rendera.polygon = function (step){
			var length = c.width*2/3,
				polygonOffset = (length/2)/Math.tan(180/(step+1) * (Math.PI / 180)),
				x,
				y,
				heading=360/(step+1)*-1,
				radians,
				shrinkray;
				
			if (step===0){
				polygonOffset=0;
			}
				
			if ((polygonOffset*2) > length){
				shrinkray=(polygonOffset*2/length);
				length=length/shrinkray;
				polygonOffset = polygonOffset/shrinkray;
			}
			x = (c.width-length)/2;
			y = c.height/2-polygonOffset;
			
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
		rendera.segments = function (step){
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
		rendera.armar = function (step){
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
		rendera.djup = function (step){
			var heading = 0;
			function recursivedraw(rads,localdjup){
				heading=heading+rads;
				if (localdjup === 0){
					//this is for when the fraktalal is at the bottom level and actually has to draw a line.
					x += length * Math.cos(heading);
					y += length * Math.sin(heading);
					ctx.lineTo(x, y);
				}
				else{
					recursivedraw (0,localdjup-1);
					recursivedraw (-rad,localdjup-1);
					recursivedraw (rad*2,localdjup-1);
					recursivedraw (-rad,localdjup-1);
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
		
		fixKnappar();
		outward.render();
		return outward;
	};
	
	return modul;
}());
