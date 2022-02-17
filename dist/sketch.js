const SWITCH_LOGGING_LEVEL="info",CANVAS_WIDTH=1080,CANVAS_HEIGHT=1080;let rescaling_width,rescaling_height,line_canvas,lines,SECOND_RUN,COUNT_OF_POINTS_X,COUNT_OF_POINTS_Y,PAIRING_COUNT,PADDING_X,PADDING_Y,DISTANCE_BETWEEN_LINES,STROKE_SPEED,STROKE_DISTORT,STROKE_SIZE,STROKE_COLOR,STROKE_RESOLUTION,BACKGROUND_COLOR,PALETTE_NAME,BACKGROUND_GRAIN,MINIMIMUM_DISTANCE=54,SCALING_FACTOR=1,width_points=[0],height_points=[0],PALETTES=[{name:"Mellow Melone",stroke_color:"#484848",background_color:"#F7AF9D"},{name:"Lohengrin",stroke_color:"#58b0e0",background_color:"#358f8c"},{name:"Horseradish",stroke_color:"#f25e44",background_color:"#D91C32"},{name:"Nur-nuri",stroke_color:"#D5D5D5",background_color:"#f25e44"},{name:"Sunny from the Swiss mountains",stroke_color:"#666666",background_color:"#ffe173"},{name:"Würstelprater",stroke_color:"#73A3BF",background_color:"#A97A60"},{name:"Majestix",stroke_color:"#938FB8",background_color:"#5A4EE4"},{name:"Funky Funkelstein",stroke_color:"#9070B5",background_color:"#B1ABB8"},{name:"Beef Burger",stroke_color:"#376F7D",background_color:"#7A2E1B"},{name:"Helgoland",stroke_color:"#376F7D",background_color:"#E1E1E1"},{name:"Flasche",stroke_color:"#FF896B",background_color:"#D5D5D5"},{name:"Lachsforelle",stroke_color:"#FF896B",background_color:"#ECECEC"}],CHOSEN_PALETTE=getRandomFromList(PALETTES);function preload(){font=loadFont("SourceSansPro-Regular.otf")}function setup(){logging.setLevel("info"),createCanvas(1080,1080,WEBGL).parent("canvasHolder"),DISTANCE_BETWEEN_LINES=map(STROKE_SIZE,1,5,10,25,!0);let o=create_coordinates_for_boxes(COUNT_OF_POINTS_X,COUNT_OF_POINTS_Y);if(boxes=new Boxes(o[0],o[1],PAIRING_COUNT),1==SECOND_RUN){let o=create_coordinates_for_boxes(COUNT_OF_POINTS_X,COUNT_OF_POINTS_Y);boxes2=new Boxes(o[0],o[1],PAIRING_COUNT)}background_buffer=createGraphics(1080,1080),background_buffer.loadPixels();for(let o=0;o<background_buffer.width;o++)for(let e=0;e<background_buffer.height;e++)background_buffer.set(o,e,distortColor(color(BACKGROUND_COLOR),BACKGROUND_GRAIN));background_buffer.updatePixels(),line_canvas=createGraphics(1080,1080),line_canvas.clear(),resize_canvas()}function draw(){translate(-width/2,-height/2,0),image(background_buffer,0,0,background_buffer.width*SCALING_FACTOR,background_buffer.height*SCALING_FACTOR),image(line_canvas,0,0,1080*SCALING_FACTOR,1080*SCALING_FACTOR),boxes.show(),boxes.show_lines(),boxes.check_boxes_complete(),1==SECOND_RUN&&(boxes2.show(),boxes2.show_lines(),boxes2.check_boxes_complete()),1==SECOND_RUN?1==boxes.boxes_completely_run&&1==boxes2.boxes_completely_run&&(logging.info("Fully rendered, stop the loop, brother!"),noLoop(),fxpreview()):1==boxes.boxes_completely_run&&(logging.info("Fully rendered, stop the loop, brother!"),noLoop(),fxpreview())}SECOND_RUN=!0,COUNT_OF_POINTS_X=Math.floor(getRandomFromInterval(1,5)),COUNT_OF_POINTS_Y=Math.floor(getRandomFromInterval(1,5)),PAIRING_COUNT=Math.floor(getRandomFromInterval(1,3)),PADDING_X=0,PADDING_Y=0,STROKE_SPEED=1,STROKE_DISTORT=getRandomFromInterval(.1,.4),STROKE_SIZE=getRandomFromInterval(1,5),PALETTE_NAME=CHOSEN_PALETTE.name,STROKE_COLOR=CHOSEN_PALETTE.stroke_color,STROKE_RESOLUTION=1,BACKGROUND_COLOR=CHOSEN_PALETTE.background_color,BACKGROUND_GRAIN=getRandomFromInterval(5,20),logging.info("FXHASH: "+fxhash),logging.info("PAIRING_COUNT: "+PAIRING_COUNT),logging.info("PADDING_X: "+PADDING_X),logging.info("PADDING_Y: "+PADDING_Y),logging.info("DISTANCE_BETWEEN_LINES: "+DISTANCE_BETWEEN_LINES),logging.info("STROKE_SPEED: "+STROKE_SPEED),logging.info("STROKE_DISTORT: "+STROKE_DISTORT),logging.info("STROKE_SIZE: "+STROKE_SIZE),logging.info("STROKE_COLOR: "+STROKE_COLOR),logging.info("STROKE_RESOLUTION: "+STROKE_RESOLUTION),logging.info("BACKGROUND_COLOR: "+BACKGROUND_COLOR),logging.info("PALETTE_NAME: "+PALETTE_NAME);