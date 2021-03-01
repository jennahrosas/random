var demo = {}, centerX = 1500 / 2, centerY = 1080 / 2, holly, speed = 4, score = 0, coin, coincluster, scoretext;
demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){
        game.load.spritesheet('holly', 'assets/sprites/hollywalking.png', 32, 32)
        game.load.image('stars', 'assets/backgrounds/stars.png')
        game.load.image('coin', 'assets/sprites/coin.png')
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log('state1');
        addChangeStateEventListeners();
        game.world.setBounds(0, 0, 1728, 1080);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var starsb = game.add.sprite(0, 0, 'stars')
        
        holly = game.add.sprite(77, 593, 'holly');
        holly.scale.setTo(2.5,2.5);
        game.physics.enable(holly);
        holly.body.collideWorldBounds = true;
        holly.animations.add('walk', [0, 1, 2, 3, 4]);
        
        coincluster = game.add.group();
        coincluster.enableBody = true;
        coincluster.physicsBodyType = Phaser.Physics.ARCADE;
        for (i = 0; i < 5; i++){
            coincluster.create(100*i+1100, 15*i+800, 'coin');
        }
        for (j = 0; j < 3; j++){
            coincluster.create(100*j+500, 15*j+200, 'coin')
        }
        coincluster.setAll('anchor.y',.5);
        coincluster.setAll('anchor.x',.5);
        coincluster.setAll('scale.x',.1);
        coincluster.setAll('scale.y',.1);
        
        scoretext = game.add.text(1604, 50,'SCORE: '+ score);
        scoretext.anchor.setTo(.5)
    },
    update: function(){
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            holly.x += speed;
            holly.animations.play('walk', 14, true);
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            holly.x -= speed;
            holly.animations.play('walk', 14, true);
        }
        else{
            holly.animations.stop('walk');
            holly.frame = 0;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            holly.y -= speed;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            holly.y += speed;
        }
        
        game.physics.arcade.overlap(holly, coincluster, hit_coin, null, this);
        
        if (score == 8){
            game.state.start('state2');
        }
    }
};

function changeState(i, stateNum){
    console.log(i)
    game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
    addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
}

function hit_coin(holly, coins){
    coins.kill();
    score += 1;
    scoretext.setText('SCORE: '+ score);
}