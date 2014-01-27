function Game () {

  function simpleReduce (arr) {
    return arr.reduce( function (prev, next) {
      return prev + next;
    },0)
  }

  this.frames = [[]];

  this.bowl = function (pins) {

    if(this.frames.length <= 10) {
      var frames = this.frames
      , framesLength = frames.length
      , currentFrame = frames[framesLength-1]
      ;

      if((currentFrame.length === 2 || simpleReduce(currentFrame) === 10) && framesLength < 10) {
        frames[framesLength] = [];
        this.bowl(pins);
      } else {
        currentFrame[currentFrame.length] = pins;
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
        } else if(frameLength == 1) {
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
    var constructedFrame = [];

    if(frame && frameIndex !== 9) {
      if(frame.length === 1 && frame[0] === 10) {
        return ['','X'];
      } else if(frame.length === 2 && frame[0] + frame[1] === 10) {
        return [frame[0],'/'];
      } else {
        return frame;
      }
    } else if(frame && frameIndex === 9) {

      if(frame[0] === 10) {
        constructedFrame[0] = 'X';
        if(frame[1] === 10) {
          constructedFrame[1] = 'X';
        }
      } else if(frame[0] + frame[1] === 10) {
        constructedFrame[0] = frame[0];
        constructedFrame[1] = '/';
      }

      if(frame[2]) {
        if(frame[2] === 10) {
          constructedFrame[2] ='X';
        } else {
          constructedFrame[2] = frame[2];
        }
      }

      return constructedFrame;

    }

    return [];

  }

  return this;

}
