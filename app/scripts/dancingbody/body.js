function Body(context, motionData, imagefolder) {
    'use strict';

    this.context = context;
    this.motion = motionData;
    this.frame = 0;
    this.fpms = 30 / 1000; // absolute speed of animation, in frames per millisecond, regardless of refresh rate
    this.halfPi = Math.PI / 2;
 
    // TODO: refactor to associative array nodename -> image
    this.imgHead = new Image();
    this.imgHead.src = imagefolder + "head.png";
    this.imgHandRight = new Image();
    this.imgHandRight.src = imagefolder + "righthand.png";
    this.imgHandLeft = new Image();
    this.imgHandLeft.src = imagefolder + "lefthand.png";
    this.imgFootRight = new Image();
    this.imgFootRight.src = imagefolder + "rightfoot.png";
    this.imgFootLeft = new Image();
    this.imgFootLeft.src = imagefolder + "leftfoot.png";
    this.imgArmUpperLeft = new Image();
    this.imgArmUpperLeft.src = imagefolder + "leftupperarm.png";
    this.imgArmUpperRight = new Image();
    this.imgArmUpperRight.src = imagefolder + "rightupperarm.png";
    this.imgArmLowerLeft = new Image();
    this.imgArmLowerLeft.src = imagefolder + "leftlowerarm.png";
    this.imgArmLowerRight = new Image();
    this.imgArmLowerRight.src = imagefolder + "rightlowerarm.png";
    this.imgTorsoUpper = new Image();
    this.imgTorsoUpper.src = imagefolder + "uppertorso.png";
    this.imgTorsoLower = new Image();
    this.imgTorsoLower.src = imagefolder + "lowertorso.png";

    this.imgLegUpperLeft = new Image();
    this.imgLegUpperLeft.src = imagefolder + "upperleftleg.png";
    this.imgLegLowerLeft = new Image();
    this.imgLegLowerLeft.src = imagefolder + "lowerleftleg.png";

    this.imgLegUpperRight = new Image();
    this.imgLegUpperRight.src = imagefolder + "upperrightleg.png";
    this.imgLegLowerRight = new Image();
    this.imgLegLowerRight.src = imagefolder + "lowerrightleg.png";

}

/* Draw the effect
     'playhead' position in milliseconds */
Body.prototype.draw2 = function (playhead) {
    'use strict';

    // 'playhead' to frame number
    this.frame = Math.round(playhead * this.fpms) % this.motion.length;

    this.context.strokeStyle = "#808080";
    this.context.beginPath();
    this.context.moveTo(this.motion[this.frame].Head[0], this.motion[this.frame].Head[1]);
    this.context.lineTo(this.motion[this.frame].Neck[0], this.motion[this.frame].Neck[1]);
    this.context.lineTo(this.motion[this.frame].SpineShoulder[0], this.motion[this.frame].SpineShoulder[1]);
    this.context.lineTo(this.motion[this.frame].SpineMid[0], this.motion[this.frame].SpineMid[1]);
    this.context.lineTo(this.motion[this.frame].SpineBase[0], this.motion[this.frame].SpineBase[1]);
    this.context.lineTo(this.motion[this.frame].HipRight[0], this.motion[this.frame].HipRight[1]);
    this.context.lineTo(this.motion[this.frame].KneeRight[0], this.motion[this.frame].KneeRight[1]);
    this.context.lineTo(this.motion[this.frame].AnkleRight[0], this.motion[this.frame].AnkleRight[1]);
    this.context.lineTo(this.motion[this.frame].FootRight[0], this.motion[this.frame].FootRight[1]);
    this.context.moveTo(this.motion[this.frame].HandTipLeft[0], this.motion[this.frame].HandTipLeft[1]);
    this.context.lineTo(this.motion[this.frame].HandLeft[0], this.motion[this.frame].HandLeft[1]);
    this.context.lineTo(this.motion[this.frame].ThumbLeft[0], this.motion[this.frame].ThumbLeft[1]);
    this.context.moveTo(this.motion[this.frame].HandLeft[0], this.motion[this.frame].HandLeft[1]);
    this.context.lineTo(this.motion[this.frame].ElbowLeft[0], this.motion[this.frame].ElbowLeft[1]);
    this.context.lineTo(this.motion[this.frame].ShoulderLeft[0], this.motion[this.frame].ShoulderLeft[1]);
    this.context.lineTo(this.motion[this.frame].SpineShoulder[0], this.motion[this.frame].SpineShoulder[1]);
    this.context.lineTo(this.motion[this.frame].ShoulderRight[0], this.motion[this.frame].ShoulderRight[1]);
    this.context.lineTo(this.motion[this.frame].ElbowRight[0], this.motion[this.frame].ElbowRight[1]);
    this.context.lineTo(this.motion[this.frame].HandRight[0], this.motion[this.frame].HandRight[1]);
    this.context.lineTo(this.motion[this.frame].HandTipRight[0], this.motion[this.frame].HandTipRight[1]);
    this.context.moveTo(this.motion[this.frame].HandRight[0], this.motion[this.frame].HandRight[1]);
    this.context.lineTo(this.motion[this.frame].ThumbRight[0], this.motion[this.frame].ThumbRight[1]);
    this.context.moveTo(this.motion[this.frame].SpineBase[0], this.motion[this.frame].SpineBase[1]);
    this.context.lineTo(this.motion[this.frame].HipLeft[0], this.motion[this.frame].HipLeft[1]);
    this.context.lineTo(this.motion[this.frame].KneeLeft[0], this.motion[this.frame].KneeLeft[1]);
    this.context.lineTo(this.motion[this.frame].AnkleLeft[0], this.motion[this.frame].AnkleLeft[1]);
    this.context.lineTo(this.motion[this.frame].FootLeft[0], this.motion[this.frame].FootLeft[1]);
    this.context.stroke();
};

Body.prototype.draw = function (playhead) {
    'use strict';

    // 'playhead' to frame number
    var frame = Math.round(playhead * this.fpms) % this.motion.length;

    this.drawJoint(this.imgLegUpperRight, this.motion[frame].HipRight, this.motion[frame].KneeRight);
    this.drawJoint(this.imgLegUpperLeft, this.motion[frame].HipLeft, this.motion[frame].KneeLeft);
    this.drawJoint(this.imgLegLowerRight, this.motion[frame].KneeRight, this.motion[frame].AnkleRight);
    this.drawJoint(this.imgLegLowerLeft, this.motion[frame].KneeLeft, this.motion[frame].AnkleLeft);
    
    this.drawJoint(this.imgTorsoLower, this.motion[frame].SpineMid, this.motion[frame].SpineBase);
    this.drawJoint(this.imgTorsoUpper, this.motion[frame].SpineShoulder, this.motion[frame].SpineMid);

    this.drawJoint(this.imgHead, this.motion[frame].Head, this.motion[frame].SpineShoulder);
    this.drawJoint(this.imgHandRight, this.motion[frame].HandRight, this.motion[frame].HandTipRight);
    this.drawJoint(this.imgHandLeft, this.motion[frame].HandLeft, this.motion[frame].HandTipLeft);
    this.drawJoint(this.imgFootRight, this.motion[frame].AnkleRight, this.motion[frame].FootRight);
    this.drawJoint(this.imgFootLeft, this.motion[frame].AnkleLeft, this.motion[frame].FootLeft);

    this.drawJoint(this.imgArmUpperLeft, this.motion[frame].ShoulderLeft, this.motion[frame].ElbowLeft);
    this.drawJoint(this.imgArmUpperRight, this.motion[frame].ShoulderRight, this.motion[frame].ElbowRight);
    this.drawJoint(this.imgArmLowerRight, this.motion[frame].ElbowRight, this.motion[frame].HandRight);
    this.drawJoint(this.imgArmLowerLeft, this.motion[frame].ElbowLeft, this.motion[frame].HandLeft);

    //this.draw(playhead);
};

Body.prototype.drawJoint = function (img, from, to) {

    var a = from[0] - to[0],
        b = from[1] - to[1],
        zoom = Math.sqrt(a * a + b * b) / img.height * 1,
        halfw = img.width >> 1;

    this.context.save();

    this.context.translate(from[0], from[1]);
    this.context.rotate(this.halfPi + Math.atan2(b, a));
    this.context.scale(1, zoom);

    this.context.drawImage(img, -halfw, 0);

    this.context.restore();
};