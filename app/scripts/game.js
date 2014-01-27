function simpleReduce (arr) {
  return arr.reduce( function (prev, next) {
    return prev + next;
  },0)
}

function Game () {
  var obj = {
    frames: [[]],
    bowl: function (pins) {

      var frames = obj.frames
      , framesLength = frames.length
      , currentFrame = frames[framesLength-1]
      ;

      if(!framesLength || currentFrame.length === 2 || simpleReduce(currentFrame) === 10) {
        frames[framesLength] = [];
        obj.bowl(pins);
      } else {
        currentFrame[currentFrame.length] = pins;
      }
    },
    score: function (frameIndex) {

      var frames = obj.frames
      , framesLength = frames.length
      , tally = 0
      ;

      if(frameIndex === undefined || frameIndex >= framesLength || frameIndex < 0) {
        frameIndex = framesLength-1;
      }

      for(var i = 0; i <= frameIndex; i++) {

        var frame = frames[i]
        , toTally = simpleReduce(frame)
        ;

        if(toTally == 10) {
          if(frame.length == 1) {
            if(frames[i+1] && frames[i+1][0]) {
              toTally += frames[i+1][0];
              if(frames[i+1][0] == 10 && frames[i+2] && frames[i+2][0]) {
                toTally += frames[i+2][0];
              } else if(frames[i+1][0] != 10 && frames[i+1][1]) {
                toTally += frames[i+1][1];
              }
            }
          } else if(frame.length == 2) {
            if(frames[i+1] && frames[i+1][0]) {
              toTally += frames[i+1][0];
            }
          }
        }

        tally += toTally;

      }

      return tally;

    }
  }
  return obj;
}
