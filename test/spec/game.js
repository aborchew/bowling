'use strict';

describe('Game: Basics', function () {

  var game = new Game();

  it('should create a game object', function () {
    expect(game).not.toBeUndefined();
  });

  it('should create a frames object on the game.', function () {
    expect(game.frames).not.toBeUndefined();
  });

});

describe('Actions: Basics', function () {

  var game = new Game();

  it('should bowl once', function () {
    game.bowl(3);
    expect(game.frames[0][0]).toBe(3);
  })

  it('should complete an open frame', function () {
    game.bowl(3);
    expect(game.frames[0][0]).toBe(3);
    expect(game.frames[0][1]).toBe(3);
  })

  it('should complete a second open frame', function () {
    game.bowl(3);
    game.bowl(3);
    expect(game.frames[1][0]).toBe(3);
    expect(game.frames[1][1]).toBe(3);
  })

})

describe('Actions: Closed Frames', function () {

  var game = new Game();

  it('should bowl a spare', function () {
    game.bowl(3);
    game.bowl(7);
    expect(game.frames[0][0]).toBe(3);
    expect(game.frames[0][1]).toBe(7);
  });

  it('should bowl a strike', function () {
    game.bowl(10);
    expect(game.frames[1][0]).toBe(10);
    expect(game.frames[1][1]).toBeUndefined();
  });

  it('should add the next bowl to a new frame', function () {
    game.bowl(6);
    expect(game.frames[1][1]).toBeUndefined();
    expect(game.frames[2][0]).toBe(6);
    expect(game.frames[2][1]).toBeUndefined();
  });

})

describe('Scoring', function () {

  it('Should score a series of open frames', function () {
    var game = new Game();
    game.bowl(2);
    game.bowl(5);
    expect(game.score(0)).toBe(7);
    game.bowl(3);
    game.bowl(4);
    expect(game.score(1)).toBe(14);
    game.bowl(3);
    game.bowl(3);
    expect(game.score(2)).toBe(20);
    expect(game.score()).toBe(20);
  })

  it('Should score a spare followed by an open frame', function () {
    var game = new Game();
    game.bowl(7);
    game.bowl(3);
    game.bowl(5);
    game.bowl(4);
    expect(game.score(0)).toBe(15);
    expect(game.score()).toBe(24);
  })

  it('Should score a strike followed by an open frame', function () {
    var game = new Game();
    game.bowl(10);
    game.bowl(5);
    game.bowl(4);
    expect(game.score(0)).toBe(19);
    expect(game.score()).toBe(28);
  })

  it('Should score a strike followed by an incomplete frame', function () {
    var game = new Game();
    game.bowl(10);
    game.bowl(5);
    expect(game.score(0)).toBe(15);
    expect(game.score()).toBe(20);
  })

})

describe('End game scenarios', function () {

  it('Should bowl an open frame in the 10th', function () {

    var game = new Game();
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    // Tenth frame
    game.bowl(3);
    game.bowl(4);

    expect(game.frames.length).toBe(10);
    expect(game.score()).toBe(257);

  });

  it('Should bowl a spare in the 10th', function () {

    var game = new Game();
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    // Tenth frame
    game.bowl(3);
    game.bowl(7);
    game.bowl(5);

    expect(game.frames.length).toBe(10);
    expect(game.score()).toBe(268);

  });

  it('Should record a perfect game', function () {

    var game = new Game();
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);

    expect(game.score(0)).toBe(30);
    expect(game.score(1)).toBe(60);
    expect(game.score(2)).toBe(90);
    expect(game.score(3)).toBe(120);
    expect(game.score(4)).toBe(150);
    expect(game.score(5)).toBe(180);
    expect(game.score(6)).toBe(210);
    expect(game.score(7)).toBe(240);
    expect(game.score(8)).toBe(270);
    expect(game.score()).toBe(300);

    expect(game.frames.length).toBe(10);
    expect(game.score()).toBe(300);

  });

  it('Should record two strikes and a smaller tally in the tenth', function () {

    var game = new Game();
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);

    game.bowl(10);
    game.bowl(10);
    game.bowl(7);
    expect(game.score(0)).toBe(30);
    expect(game.score(1)).toBe(60);
    expect(game.score(2)).toBe(90);
    expect(game.score(3)).toBe(120);
    expect(game.score(4)).toBe(150);
    expect(game.score(5)).toBe(180);
    expect(game.score(6)).toBe(210);
    expect(game.score(7)).toBe(240);
    expect(game.score(8)).toBe(270);
    expect(game.score()).toBe(297);

  });

  it('Should record accurate scores throughout a game', function () {

    var game = new Game();
    game.bowl(2);
    game.bowl(6);

    game.bowl(9);
    game.bowl(1);

    game.bowl(10);

    game.bowl(4);
    game.bowl(1);

    game.bowl(7);
    game.bowl(2);

    game.bowl(10);

    game.bowl(8);
    game.bowl(1);

    game.bowl(2);
    game.bowl(8);

    game.bowl(9);
    game.bowl(1);

    game.bowl(7);
    game.bowl(3);
    game.bowl(10);

    expect(game.score(0)).toBe(8);
    expect(game.score(1)).toBe(28);
    expect(game.score(2)).toBe(43);
    expect(game.score(3)).toBe(48);
    expect(game.score(4)).toBe(57);
    expect(game.score(5)).toBe(76);
    expect(game.score(6)).toBe(85);
    expect(game.score(7)).toBe(104);
    expect(game.score(8)).toBe(121);
    expect(game.score()).toBe(141);

  });

})

describe('Frame Displays', function () {

  var game = new Game();
  game.bowl(2);
  game.bowl(5);
  game.bowl(2);
  game.bowl(8);
  game.bowl(10);
  game.bowl(10);
  game.bowl(10);
  game.bowl(10);
  game.bowl(10);
  game.bowl(10);
  game.bowl(10);
  game.bowl(8);
  game.bowl(2);
  game.bowl(10);

  it('Should return an open frame unmodified', function () {

    expect(game.displayFrame(0)[0]).toBe(2);
    expect(game.displayFrame(0)[1]).toBe(5);

  });

  it('Should return a correctly modified spare frame', function () {

    expect(game.displayFrame(1)[0]).toBe(2);
    expect(game.displayFrame(1)[1]).toBe('/');

  });

  it('Should return a correctly modified strike frame', function () {

    expect(game.displayFrame(2)[0]).toBe('');
    expect(game.displayFrame(2)[1]).toBe('X');

  });

  it('Should return a correctly modified tenth frame', function () {

    expect(game.displayFrame(9)[0]).toBe(8);
    expect(game.displayFrame(9)[1]).toBe('/');
    expect(game.displayFrame(9)[2]).toBe('X');

  });

})
