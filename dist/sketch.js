const SWITCH_LOGGING_LEVEL="info",CANVAS_WIDTH=1080,CANVAS_HEIGHT=1080;let MINIMIMUM_DISTANCE=54,gravity_counter=0,fps=0,default_debugging_text_size=15,debugging_physical_body_count=0,timeScaleTarget=1;var engine,world,Engine=Matter.Engine,World=Matter.World,Body=Matter.Body,Bodies=Matter.Bodies,Composite=Matter.Composite,Constraint=Matter.Constraint,Mouse=Matter.Mouse,MouseConstraint=Matter.MouseConstraint;let rescaling_width,rescaling_height,left_label,right_label,line_canvas,SCALING_FACTOR=1,width_points=[0],height_points=[0],physical_objects=[],line_coords={x:30,y:40},combinations_x=2,combinations_y=3;logging.info("FXHASH: "+fxhash);let SECOND_RUN,COUNT_OF_POINTS_X,COUNT_OF_POINTS_Y,PAIRING_COUNT,PADDING_X,PADDING_Y,DISTANCE_BETWEEN_LINES,STROKE_SPEED,STROKE_DISTORT,STROKE_SIZE,STROKE_COLOR,STROKE_RESOLUTION,BACKGROUND_COLOR,PALETTE_NAME,BACKGROUND_GRAIN,lines,palettes=[{name:"mellow melone",stroke_color:"#484848",background_color:"#F7AF9D"},{name:"Lohengrin",stroke_color:"#4281A4",background_color:"#48A9A6"},{name:"horsereddish",stroke_color:"#f25e44",background_color:"#D91C32"},{name:"nurnuri",stroke_color:"#484848",background_color:"#f25e44"},{name:"sunny",stroke_color:"#484848",background_color:"#ffe173"}],chosen_palette=getRandomFromList(palettes);function preload(){font=loadFont("SourceSansPro-Regular.otf")}function setup(){createCanvas(1080,1080,WEBGL).parent("canvasHolder"),line_canvas=createGraphics(width,height),line_canvas.clear(),logging.setLevel("info"),engine=Engine.create(),world=engine.world,Matter.Runner.run(engine),engine.world.gravity.y=1;let e=create_coordinates_for_boxes(COUNT_OF_POINTS_X,COUNT_OF_POINTS_Y);if(boxes=new Boxes(e[0],e[1],PAIRING_COUNT),1==SECOND_RUN){let e=create_coordinates_for_boxes(COUNT_OF_POINTS_X,COUNT_OF_POINTS_Y);boxes2=new Boxes(e[0],e[1],PAIRING_COUNT)}background_buffer=createGraphics(width,height),background_buffer.loadPixels();for(let e=0;e<background_buffer.width;e++)for(let o=0;o<background_buffer.height;o++)background_buffer.set(e,o,distortColor(color(BACKGROUND_COLOR),BACKGROUND_GRAIN));background_buffer.updatePixels(),resize_canvas()}function draw(){for(var e of(translate(-width/2,-height/2,0),image(background_buffer,0,0),boxes.show(),boxes.show_lines(),boxes.check_boxes_complete(),1==SECOND_RUN&&(boxes2.show(),boxes2.show_lines(),boxes2.check_boxes_complete()),1==SECOND_RUN?1==boxes.boxes_completely_run&&1==boxes2.boxes_completely_run&&(logging.info("Fully rendered, stop the loop, brother!"),noLoop(),fxpreview()):1==boxes.boxes_completely_run&&(logging.info("Fully rendered, stop the loop, brother!"),noLoop(),fxpreview()),image(line_canvas,0,0),physical_objects)){push(),strokeWeight(1),fill(255,0,0,50),beginShape();for(var o=0;o<e.vertices.length;o++)vertex(e.vertices[o].x,e.vertices[o].y);endShape(CLOSE),pop()}Engine.update(engine)}function keyPressed(){if(keyCode===LEFT_ARROW)for(var e of(console.log("left arrow pressed"),console.log(boxes.real_boxes[0].lines.bodies[0].history),boxes.real_boxes[0].lines.bodies))new_object=Body.create({position:{x:e.history[0].x,y:e.history[0].y},vertices:e.history}),physical_objects.push(new_object),World.add(world,new_object)}SECOND_RUN=!0,COUNT_OF_POINTS_X=Math.floor(getRandomFromInterval(1,5)),COUNT_OF_POINTS_Y=Math.floor(getRandomFromInterval(1,5)),PAIRING_COUNT=Math.floor(getRandomFromInterval(1,3)),PADDING_X=0,PADDING_Y=0,STROKE_SPEED=1,STROKE_DISTORT=getRandomFromInterval(.1,.4),STROKE_SIZE=getRandomFromInterval(1,5),DISTANCE_BETWEEN_LINES=getRandomFromInterval(10,25),PALETTE_NAME=chosen_palette.name,STROKE_COLOR=chosen_palette.stroke_color,STROKE_RESOLUTION=1,BACKGROUND_COLOR=chosen_palette.background_color,BACKGROUND_GRAIN=getRandomFromInterval(10,40),logging.info("PAIRING_COUNT: "+PAIRING_COUNT),logging.info("PADDING_X: "+PADDING_X),logging.info("PADDING_Y: "+PADDING_Y),logging.info("DISTANCE_BETWEEN_LINES: "+DISTANCE_BETWEEN_LINES),logging.info("STROKE_SPEED: "+STROKE_SPEED),logging.info("STROKE_DISTORT: "+STROKE_DISTORT),logging.info("STROKE_SIZE: "+STROKE_SIZE),logging.info("STROKE_COLOR: "+STROKE_COLOR),logging.info("STROKE_RESOLUTION: "+STROKE_RESOLUTION),logging.info("BACKGROUND_COLOR: "+BACKGROUND_COLOR),logging.info("PALETTE_NAME: "+PALETTE_NAME);