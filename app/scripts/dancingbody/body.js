/* jslint bitwise: true */
function Body(context, motionData, imagefolder) {
    'use strict';

    this.context = context;
    this.motion = motionData;
    this.fpms = 30 / 1000; // absolute speed of animation, in frames per millisecond, regardless of refresh rate
    this.halfPi = Math.PI / 2;

    this.imgHead = new Image();
    this.imgHead.src = imagefolder + 'head.png';
    this.imgHandRight = new Image();
    this.imgHandRight.src = imagefolder + 'righthand.png';
    this.imgHandLeft = new Image();
    this.imgHandLeft.src = imagefolder + 'lefthand.png';
    this.imgFootRight = new Image();
    this.imgFootRight.src = imagefolder + 'rightfoot.png';
    this.imgFootLeft = new Image();
    this.imgFootLeft.src = imagefolder + 'leftfoot.png';
    this.imgArmUpperLeft = new Image();
    this.imgArmUpperLeft.src = imagefolder + 'leftupperarm.png';
    this.imgArmUpperRight = new Image();
    this.imgArmUpperRight.src = imagefolder + 'rightupperarm.png';
    this.imgArmLowerLeft = new Image();
    this.imgArmLowerLeft.src = imagefolder + 'leftlowerarm.png';
    this.imgArmLowerRight = new Image();
    this.imgArmLowerRight.src = imagefolder + 'rightlowerarm.png';
    this.imgTorsoUpper = new Image();
    this.imgTorsoUpper.src = imagefolder + 'uppertorso.png';
    this.imgTorsoLower = new Image();
    this.imgTorsoLower.src = imagefolder + 'lowertorso.png';
    this.imgLegUpperLeft = new Image();
    this.imgLegUpperLeft.src = imagefolder + 'upperleftleg.png';
    this.imgLegLowerLeft = new Image();
    this.imgLegLowerLeft.src = imagefolder + 'lowerleftleg.png';
    this.imgLegUpperRight = new Image();
    this.imgLegUpperRight.src = imagefolder + 'upperrightleg.png';
    this.imgLegLowerRight = new Image();
    this.imgLegLowerRight.src = imagefolder + 'lowerrightleg.png';
}

/* Draw the effect
     'playhead' position in milliseconds */
Body.prototype.draw2 = function (playhead) {
    'use strict';

    // 'playhead' to frame number
    var frame = ~~ (playhead * this.fpms) % this.motion.length;

    this.context.strokeStyle = '#808080';
    this.context.beginPath();
    this.context.moveTo(this.motion[frame].Head[0], this.motion[frame].Head[1]);
    this.context.lineTo(this.motion[frame].Neck[0], this.motion[frame].Neck[1]);
    this.context.lineTo(this.motion[frame].SpineShoulder[0], this.motion[frame].SpineShoulder[1]);
    this.context.lineTo(this.motion[frame].SpineMid[0], this.motion[frame].SpineMid[1]);
    this.context.lineTo(this.motion[frame].SpineBase[0], this.motion[frame].SpineBase[1]);
    this.context.lineTo(this.motion[frame].HipRight[0], this.motion[frame].HipRight[1]);
    this.context.lineTo(this.motion[frame].KneeRight[0], this.motion[frame].KneeRight[1]);
    this.context.lineTo(this.motion[frame].AnkleRight[0], this.motion[frame].AnkleRight[1]);
    this.context.lineTo(this.motion[frame].FootRight[0], this.motion[frame].FootRight[1]);
    this.context.moveTo(this.motion[frame].HandTipLeft[0], this.motion[frame].HandTipLeft[1]);
    this.context.lineTo(this.motion[frame].HandLeft[0], this.motion[frame].HandLeft[1]);
    this.context.lineTo(this.motion[frame].ThumbLeft[0], this.motion[frame].ThumbLeft[1]);
    this.context.moveTo(this.motion[frame].HandLeft[0], this.motion[frame].HandLeft[1]);
    this.context.lineTo(this.motion[frame].ElbowLeft[0], this.motion[frame].ElbowLeft[1]);
    this.context.lineTo(this.motion[frame].ShoulderLeft[0], this.motion[frame].ShoulderLeft[1]);
    this.context.lineTo(this.motion[frame].SpineShoulder[0], this.motion[frame].SpineShoulder[1]);
    this.context.lineTo(this.motion[frame].ShoulderRight[0], this.motion[frame].ShoulderRight[1]);
    this.context.lineTo(this.motion[frame].ElbowRight[0], this.motion[frame].ElbowRight[1]);
    this.context.lineTo(this.motion[frame].HandRight[0], this.motion[frame].HandRight[1]);
    this.context.lineTo(this.motion[frame].HandTipRight[0], this.motion[frame].HandTipRight[1]);
    this.context.moveTo(this.motion[frame].HandRight[0], this.motion[frame].HandRight[1]);
    this.context.lineTo(this.motion[frame].ThumbRight[0], this.motion[frame].ThumbRight[1]);
    this.context.moveTo(this.motion[frame].SpineBase[0], this.motion[frame].SpineBase[1]);
    this.context.lineTo(this.motion[frame].HipLeft[0], this.motion[frame].HipLeft[1]);
    this.context.lineTo(this.motion[frame].KneeLeft[0], this.motion[frame].KneeLeft[1]);
    this.context.lineTo(this.motion[frame].AnkleLeft[0], this.motion[frame].AnkleLeft[1]);
    this.context.lineTo(this.motion[frame].FootLeft[0], this.motion[frame].FootLeft[1]);
    this.context.stroke();
};

Body.prototype.draw = function (playhead) {
    'use strict';

    // playhead to frame number
    var frame = ~~ (playhead * this.fpms) % this.motion.length;


    this.context.save();
    this.context.translate(this.context.canvas.width / 4, 0);
    this.context.scale(this.context.canvas.height / 500, this.context.canvas.height / 500);
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
    this.context.restore();
};

Body.prototype.drawJoint = function (img, from, to) {
    'use strict';
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