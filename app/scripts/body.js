function Body(motionData) {
    'use strict';
    this.motion = motionData;
    this.frame = 0;
    this.fpms = 30 / 1000; // absolute speed of animation, in frames per millisecond, regardless of refresh rate
}

/* Draw the effect on a context
    animTime is the 'playhead' position in milliseconds */
Body.prototype.draw = function (context, playhead) {
    'use strict';
    
    // 'playhead' to frame number
    this.frame = Math.round(playhead * this.fpms) % this.motion.length;
    
    context.beginPath();
    context.moveTo(this.motion[this.frame].Head[0], this.motion[this.frame].Head[1]);
    context.lineTo(this.motion[this.frame].Neck[0], this.motion[this.frame].Neck[1]);
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
