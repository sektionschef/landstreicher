function getRandomFromInterval(t,i){return fxrand()*(i-t)+t}function getRandomFromList(t){return t[Math.floor(fxrand()*t.length)]}function distortColor(t,i){void 0===i&&(i=10);let n=t.levels[0]+getRandomFromInterval(-i,i),o=t.levels[1]+getRandomFromInterval(-i,i),e=t.levels[2]+getRandomFromInterval(-i,i);return n=Math.min(Math.max(parseInt(n),0),255),o=Math.min(Math.max(parseInt(o),0),255),e=Math.min(Math.max(parseInt(e),0),255),color(n,o,e)}function windowResized(){logging.debug("Window is resized."),resize_canvas()}function resize_canvas(){rescaling_width=windowWidth/CANVAS_WIDTH,rescaling_height=windowHeight/CANVAS_HEIGHT,rescaling_width<rescaling_height?(logging.debug("Width is smaller than height. Width dominates"),SCALING_FACTOR=rescaling_width):(logging.debug("width is larger than height. Height dominates."),SCALING_FACTOR=rescaling_height);var t=createGraphics(CANVAS_WIDTH*SCALING_FACTOR,CANVAS_HEIGHT*SCALING_FACTOR);t.image(line_canvas,0,0,t.width,t.height),line_canvas=t,resizeCanvas(CANVAS_WIDTH*SCALING_FACTOR,CANVAS_HEIGHT*SCALING_FACTOR)}function create_coordinates_for_boxes(t,i){logging.info(t+" random points on x axis."),logging.info(i+" random points on y axis.");for(let i=0;i<t;i++)width_points.push(Math.floor(getRandomFromInterval(0,width-MINIMIMUM_DISTANCE)));for(let t=0;t<i;t++)height_points.push(Math.floor(getRandomFromInterval(0,height-MINIMIMUM_DISTANCE)));width_points.push(width),height_points.push(height),width_points.sort((function(t,i){return t-i})),height_points.sort((function(t,i){return t-i}));for(var n=width_points.length-1;n>=0;n--)width_points[n]-width_points[n-1]<MINIMIMUM_DISTANCE&&width_points[n]!=width&&width_points.splice(n,1);for(n=height_points.length-1;n>=0;n--)height_points[n]-height_points[n-1]<MINIMIMUM_DISTANCE&&height_points[n]!=height&&height_points.splice(n,1);return logging.debug("Coordinates of points on x axis: "+width_points),logging.debug("Coordinates of points on y axis: "+height_points),[width_points,height_points]}