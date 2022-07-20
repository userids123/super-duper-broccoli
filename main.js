img = "";
objects = [];
status = "";

function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide();

}
function start(){
    object_detector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";

}
function modelloaded(){
    console.log("Modelloaded");
    status=true;
    
}
function gotResults(error,results){
if(error){
    console.error(error);

}
console.log(results);
objects=results;
}
function draw(){
    image(video,0,0,400,400);
    if(status!=""){
        object_detector.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects detected are "+objects.length;
            fill("#000000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#000000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }
    }
}