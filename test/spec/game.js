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
