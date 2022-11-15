// *************
//AKIES VERSION 0.1
// *************
//https://studio.ai21.com/playground/complete?promptShare=6d181a4d-7e50-4c0f-93d8-e291a2032836
var happiness = 80;
var currentEmotion = 0;
var blinking = true;
var leftEyeHeight = 55;
var rightEyeHeight = 55;
var dipAmt;
var eyeballRadius = 40;
var mouthHeight = 200;
var eclipseHeight = 200;
var dipped_amt = 0;
var delta_dip = 4;
var eyeHeight = 250;
var br = 167;
var bg = 199;
var bb = 181;

function setup() {
    //init vars that need to be in setup
    eclipseHeight = height / 2;
    createCanvas(780, 480 - 50);
    
    //fullScreen();
    noStroke();
    ellipseMode(CENTER);
    rectMode(CENTER);

    // Create the Input stream

    // amp = new Amplitude(this);
    //in = new AudioIn(this, 0);
    //in.start();
    // amp.input(in);

    frameRate(60);
    console.log("Hello, world!");

}

function draw() {
    Controller();
    //background(200)
    
    //black square around screen
    background(0)
    //draw expression
    
    expression();

    if (frameCount % 480 == 0) {
        happiness = happiness - 0.01;
        // println((int)happiness);
    }
    //if (amp.analyze() > 0.5) {
    //  happiness+=0.05;
    //}
    //audio
    //println(amp.analyze());


    // square around face
    noFill();
    // strokeWeight(15);
    rect(width / 2, height / 2, width, height);
} //end draw



//Amplitude amp;
//AudioIn in;

function keyPressed() {
    happiness++;
    console.log(
        
            'Happiness:' + happiness
        
    );
}

//Moods: Happy 80% of time

function Controller() {

    // if (frameCount % 120 == 0) {
    //currentEmotion = int(random(3));
    //}

    //currentEmotion = 0;

}
function expression() {



    //Colors
    //Background color

    //0 neutral
    //1 laughing
    //2 confused
    //3 thinking
    //4 sad
    fill(0);
    //mouthHeight =  (let)happiness/2 + 20;

    stroke(0);
    strokeWeight(5);

    //  eyeballRadius = 40;
    // eyeHeight = 250; //where on the face the eyes go

    // leftEyeHeight = 55;
    // rightEyeHeight = 55;


    if (frameCount % 240 == 0) {

        if (round((random(1, 2))) == 1 && currentEmotion != 1) {
            //eyes are already closed in emotion 1
            blinking = true;
        }
    }



    blink();
   



    if (!blinking && currentEmotion != 1) {
        //cant use open eyes if 'current emotion' is 1

        //left eye
        ellipse(width / 4, eyeHeight, eyeballRadius, leftEyeHeight);

        //right eye
        ellipse(width - width / 4, eyeHeight, eyeballRadius, rightEyeHeight);
    }

    //mouth
    if (currentEmotion == 0) {//0 is  "neutral" or default state
        if (happiness > 95) { //Super big smile
            mouthHeight = 200;
            //Mouth
            fill(0, 113, 8);
            arc(width / 2, height / 1.5, width / 4, mouthHeight, 0, PI, CHORD);
            //teeth
            fill(255);
            arc(width / 2, height / 1.5, width / 4, mouthHeight / 4, 0, 3.14, CHORD);
        } else if (happiness > 65) {
            //Normal Smile
            mouthHeight = 10;
            //Mouth
            fill(0, 113, 8);
            noFill();
            arc(width / 2, height / 1.5, width / 4, eclipseHeight, 0, PI);
        } else if (happiness > 0) {
            //Frown
            noFill();
            arc(width / 2, height / 1.5, 80, 80, PI, TWO_PI);
        }
    } else if (currentEmotion == 1) {
        background(br, bg, bb);
        noFill();
        arc(width / 2, height / 1.5, 80, 90, 0, PI);

        //left eye
        //ellipse(width/4, height / 2, eyeballRadius, leftEyeHeight);

        arc(width / 4, eyeHeight, 80, 40, PI, TWO_PI);

        //right eye
        arc(width - width / 4, eyeHeight, 80, 40, PI, TWO_PI);
    } else if (currentEmotion == 2) {
        noFill();
        //LEFT brow
        arc(width / 4, eyeHeight - 45, 80, 40, PI, TWO_PI);

        //right brow
        arc(width - width / 4, eyeHeight - 65, 80, 40, 0, PI);

        //mouth
        mouthHeight = 10;
        //Mouth
        fill(0, 113, 8);
        noFill();
        line(300, 340, 500, 340);
        //arc(, , width/4, eclipseHeight, 0, PI);
    }



    //toungue
    //fill(0,152,11);
    //arc(width / 2, height / 1.5, width/4, mouthHeight/4, 0, 3.14);
}

function blink() {
    //changes variables in express that makes it blink
    if (blinking) {
        dipped_amt += delta_dip;
        if (dipped_amt >= random(leftEyeHeight, 100)) {
            delta_dip = -4;
        }
        if (dipped_amt <= 0) {
            dipped_amt = 0;
            delta_dip = 4;
            blinking = false;
        }
    }

    background(br, bg, bb);
    ellipse(width / 4, eyeHeight, eyeballRadius /*+ (dipped_amt/4)*/, leftEyeHeight - dipped_amt);
    ellipse(width - width / 4, eyeHeight, eyeballRadius /*+ (dipped_amt/4)*/, rightEyeHeight - dipped_amt);
}


