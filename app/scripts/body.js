function Body(motionData) {
    'use strict';
    this.motion = motionData;
    this.frame = 0;
    this.fpms = 30 / 1000; // absolute speed of animation, in frames per millisecond, regardless of refresh rate
    this.imgHead = new Image();
    this.imgHead.src = "images/motion/head.png";
    this.imgHandRight = new Image();
    this.imgHandRight.src = "images/motion/righthand.png";
    this.imgHandLeft = new Image();
    this.imgHandLeft.src = "images/motion/lefthand.png";
    this.imgFootRight = new Image();
    this.imgFootRight.src = "images/motion/rightfoot.png";
    this.imgFootLeft = new Image();
    this.imgFootLeft.src = "images/motion/leftfoot.png";
    this.imgArmUpperLeft = new Image();
    this.imgArmUpperLeft.src = "images/motion/leftupperarm.png";
    this.imgArmUpperRight = new Image();
    this.imgArmUpperRight.src = "images/motion/rightupperarm.png";
    this.imgArmLowerLeft = new Image();
    this.imgArmLowerLeft.src = "images/motion/leftlowerarm.png";
    this.imgArmLowerRight = new Image();
    this.imgArmLowerRight.src = "images/motion/rightlowerarm.png";
    this.imgTorsoUpper = new Image();
    this.imgTorsoUpper.src = "images/motion/uppertorso.png";
    this.imgTorsoLower = new Image();
    this.imgTorsoLower.src = "images/motion/lowertorso.png";
    this.imgLegUpper = new Image();
    this.imgLegUpper.src = "images/motion/upperrightleg.png";
    this.imgLegLower = new Image();
    this.imgLegLower.src = "images/motion/lowerrightleg.png";
    
    this.halfPi = Math.PI / 2;
    
    
}

/* Draw the effect on a context
    animTime is the 'playhead' position in milliseconds */
Body.prototype.draw = function (context, playhead) {
    'use strict';
    
    // 'playhead' to frame number
    this.frame = Math.round(playhead * this.fpms) % this.motion.length;
    
    context.beginPath();
    //context.moveTo(this.motion[this.frame].Head[0], this.motion[this.frame].Head[1]);
    //context.lineTo(this.motion[this.frame].Neck[0], this.motion[this.frame].Neck[1]);
    context.lineTo(this.motion[this.frame].SpineShoulder[0], this.motion[this.frame].SpineShoulder[1]);
    context.lineTo(this.motion[this.frame].SpineMid[0], this.motion[this.frame].SpineMid[1]);
    context.lineTo(this.motion[this.frame].SpineBase[0], this.motion[this.frame].SpineBase[1]);
    context.lineTo(this.motion[this.frame].HipRight[0], this.motion[this.frame].HipRight[1]);
    context.lineTo(this.motion[this.frame].KneeRight[0], this.motion[this.frame].KneeRight[1]);
    context.lineTo(this.motion[this.frame].AnkleRight[0], this.motion[this.frame].AnkleRight[1]);
    context.lineTo(this.motion[this.frame].FootRight[0], this.motion[this.frame].FootRight[1]);
    context.moveTo(this.motion[this.frame].HandTipLeft[0], this.motion[this.frame].HandTipLeft[1]);
    context.lineTo(this.motion[this.frame].HandLeft[0], this.motion[this.frame].HandLeft[1]);
    context.lineTo(this.motion[this.frame].ThumbLeft[0], this.motion[this.frame].ThumbLeft[1]);
    context.moveTo(this.motion[this.frame].HandLeft[0], this.motion[this.frame].HandLeft[1]);
    context.lineTo(this.motion[this.frame].ElbowLeft[0], this.motion[this.frame].ElbowLeft[1]);
    context.lineTo(this.motion[this.frame].ShoulderLeft[0], this.motion[this.frame].ShoulderLeft[1]);
    context.lineTo(this.motion[this.frame].SpineShoulder[0], this.motion[this.frame].SpineShoulder[1]);
    context.lineTo(this.motion[this.frame].ShoulderRight[0], this.motion[this.frame].ShoulderRight[1]);
    context.lineTo(this.motion[this.frame].ElbowRight[0], this.motion[this.frame].ElbowRight[1]);
    context.lineTo(this.motion[this.frame].HandRight[0], this.motion[this.frame].HandRight[1]);
    context.lineTo(this.motion[this.frame].HandTipRight[0], this.motion[this.frame].HandTipRight[1]);
    context.moveTo(this.motion[this.frame].HandRight[0], this.motion[this.frame].HandRight[1]);
    context.lineTo(this.motion[this.frame].ThumbRight[0], this.motion[this.frame].ThumbRight[1]);
    context.moveTo(this.motion[this.frame].SpineBase[0], this.motion[this.frame].SpineBase[1]);
    context.lineTo(this.motion[this.frame].HipLeft[0], this.motion[this.frame].HipLeft[1]);
    context.lineTo(this.motion[this.frame].KneeLeft[0], this.motion[this.frame].KneeLeft[1]);
    context.lineTo(this.motion[this.frame].AnkleLeft[0], this.motion[this.frame].AnkleLeft[1]);
    context.lineTo(this.motion[this.frame].FootLeft[0], this.motion[this.frame].FootLeft[1]);
    context.stroke();
};

Body.prototype.draw2 = function (context, playhead) {
    'use strict';
    
    //this.draw(context, playhead);
    
    // 'playhead' to frame number
    var frame = Math.round(playhead * this.fpms) % this.motion.length;

    this.drawJoint(context, this.imgLegUpper, this.motion[frame].HipRight, this.motion[frame].KneeRight);
    this.drawJoint(context, this.imgLegUpper, this.motion[frame].HipLeft, this.motion[frame].KneeLeft);
    this.drawJoint(context, this.imgLegLower, this.motion[frame].KneeRight, this.motion[frame].AnkleRight);
    this.drawJoint(context, this.imgLegLower, this.motion[frame].KneeLeft, this.motion[frame].AnkleLeft);
    this.drawJoint(context, this.imgTorsoLower, this.motion[frame].SpineMid, this.motion[frame].SpineBase);
    this.drawJoint(context, this.imgTorsoUpper, this.motion[frame].SpineShoulder, this.motion[frame].SpineMid);
  
    this.drawJoint(context, this.imgHead, this.motion[frame].Head, this.motion[frame].SpineShoulder);
    this.drawJoint(context, this.imgHandLeft, this.motion[frame].HandRight, this.motion[frame].HandTipRight);
    this.drawJoint(context, this.imgHandLeft, this.motion[frame].HandLeft, this.motion[frame].HandTipLeft);
    this.drawJoint(context, this.imgFootRight, this.motion[frame].AnkleRight, this.motion[frame].FootRight);
    this.drawJoint(context, this.imgFootLeft, this.motion[frame].AnkleLeft, this.motion[frame].FootLeft);
    this.drawJoint(context, this.imgArmLowerRight, this.motion[frame].ElbowRight, this.motion[frame].HandRight);
    this.drawJoint(context, this.imgArmLowerLeft, this.motion[frame].ElbowLeft, this.motion[frame].HandLeft);
    this.drawJoint(context, this.imgArmUpperLeft, this.motion[frame].ShoulderLeft, this.motion[frame].ElbowLeft);
    this.drawJoint(context, this.imgArmUpperRight, this.motion[frame].ShoulderRight, this.motion[frame].ElbowRight);

};

Body.prototype.drawJoint = function(context, img, fromp, top) {
    
    var a = fromp[0] - top[0],
        b = fromp[1] - top[1],
        length = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)),
        zoom = length / img.height;

    var halfw = img.width >> 1;

    context.save();
    
    context.translate(fromp[0], fromp[1]);
    context.rotate(this.halfPi + Math.atan2(b, a));
    context.scale(zoom, zoom);
    
    context.drawImage(img,  -halfw , 0 );
    context.restore();
};
