function Game () {

  function simpleReduce (arr) {
    return arr.reduce( function (prev, next) {
      return prev + next;
    },0)
  }

  this.frames = [[]];

  this.new = function () {
    this.frames = [[]];
  }

  this.bowl = function (pins) {

    if(this.frames.length <= 10) {
      var frames = this.frames
      , framesLength = frames.length
      , currentFrame = frames[framesLength-1],
      frameTally = simpleReduce(currentFrame);
      ;

      if(framesLength < 10 && frameTally + pins <= 10 && currentFrame.length < 2) {
        currentFrame[currentFrame.length] = pins;
      } else if(framesLength < 10 && (frameTally === 10 || currentFrame.length === 2)) {
        frames[framesLength] = [pins]
      } else if(framesLength === 10 && currentFrame.length < 3) {
        if(frameTally === 10 && currentFrame.length < 2) {
          currentFrame[currentFrame.length] = pins;
        } else if(frameTally >= 10 && currentFrame.length === 2) {
          currentFrame[currentFrame.length] = pins;
        } else if(frameTally < 10 && currentFrame.length == 1 && frameTally + pins <= 10) {
          currentFrame[currentFrame.length] = pins;
        }
      }
    }

  };

  this.score = function (frameIndex) {

    var frames = this.frames
    , framesLength = frames.length
    , tally = 0
    ;

    if(frameIndex === undefined || frameIndex >= framesLength || frameIndex < 0) {
      frameIndex = framesLength-1;
    }

    for(var i = 0; i <= frameIndex; i++) {

      var frame = frames[i]
      , frameTally = simpleReduce(frame)
      , frameLength = frame.length
      ;

      tally += frameTally;

      if(frameTally >= 10) {
        if(frameLength == 2 && frames[i+1]) {
          tally += frames[i+1][0] || 0;
        } else if(frameLength == 1 && frames[i+1]) {
          tally += frames[i+1][0] || 0;
          if(frames[i+1][0] == 10 && frames[i+2]) {
            tally += frames[i+2][0] || 0;
          } else {
            tally += frames[i+1][1] || 0;
          }
        }
      }

    };

    return tally;

  };

  this.displayFrame = function (frameIndex) {

    var frame = this.frames[frameIndex];

    if(frameIndex !== 9 && frame) {
      for(var i = 0; i < frame.length; i++) {
        if(i === 0 && frame[i] === 10) {
          return ['','X'];
        } else if(frame.length == 2 && simpleReduce(frame) === 10) {
          return [frame[0],'/'];
        } else {
          return frame;
        }
      }
    } else if(frameIndex === 9 && frame) {
      var constructed = [];
      for(var j = 0; j < frame.length; j++) {
        if(frame[j] === 10) {
          constructed[j] = 'X';
        } else {
          constructed[j] = frame[j];
        }
        if(frame.length > 1 && simpleReduce([frame[0],frame[1]]) === 10 && frame[0] !== 10) {
          constructed[1] = '/';
        }
      }
      return constructed;
    }

    return;

  }

  return this;

}
