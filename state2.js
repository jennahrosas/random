demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor='#7abf4d';
        addChangeStateEventListeners();
        console.log('state2');
        var final = game.add.text(1728/2, 1080/2, 'YOU WIN!\nYOUR SCORE: '+score);
        final.anchor.setTo(.5);
    },
    update: function(){}
};