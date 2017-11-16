marioBros.level1 = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      
    this.add;       
    this.camera;    
    this.input;     
    this.sound;     
    this.runKey;
    this.space;
    this.escape;
    this.jumpTimer;
   

};

function pipeAccess(player, pipesAccess){

    if(this.cursors.down.isDown){
        player.body.position.y += 140;
        this.camera.y += 200;
        this.pipeLevel1.play();
        //this.camera.follow(this.player, null, 0, 0);
        
    }
    
}

function pipeExit(player, exitPipes){

    if(this.cursors.right.isDown){
        player.body.position.x = 2630;
        player.body.position.y = (this.game.world.height/3-25)-60;
        this.camera.y -= 200;
        this.pipeLevel1.play();
        //this.camera.follow(this.player, null, 1, 0);
    }
    
    
}

function dead(player, deadZones){

    player.body.position.x = 50;
    player.body.position.y = this.game.world.height/3-30;
    player.die = true;    
    this.soundLevel1.stop();
    
}

marioBros.level1.prototype = {
    init:function(){
      
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //this.game.physics.arcade.gravity.y = gameOptions.playerGravity;
        this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
    },
    
    preload:function(){
     

    
    },
   
    create:function(){
     ;
        this.soundLevel1 = this.game.add.audio('level1');
        this.soundLevel1.loopFull();
        
        this.pipeLevel1 = this.game.add.audio('pipe');
                
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('tileset_levels');
    
        this.createLayers();
        
        this.setCollisionLayers();
        
        this.backgroundColor.resizeWorld();
        this.graphicLayer.resizeWorld();
        
        this.createObjectLayers();
        
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.runKey = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.escape = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        
        this.player = new marioBros.marioPrefab(this.game,50,this.game.world.height/3-25);
        
        this.game.add.existing(this.player);
         
        this.camera.follow(this.player, null, 1, 0);
        
    },
    
    update:function(){      
        
        
        this.collisionLayers();
        /*
        pause..
        if(this.escape.isDown && !this.game.paused){
            this.game.paused = true;
        }else if(this.escape.isDown && this.game.paused){
            this.game.paused = false;  
        }*/
        
        if(this.escape.isDown){
            this.startMenu();
        }
        
    },
    
    startMenu: function () {
        this.soundLevel1.stop();
        this.state.start('menu');
    },
    
    
    createLayers: function(){
        this.backgroundColor = this.map.createLayer('Background_Color');
        this.graphicLayer = this.map.createLayer('Graphic_Layer');
        this.bricksLayer = this.map.createLayer('Bricks');
        this.brickStarLayer = this.map.createLayer('BrickStar');
        this.bricksMushroomLayer = this.map.createLayer('BricksMushroom');
        this.bricksFlowerOrMushroomLayer = this.map.createLayer('BricksFlowerOrMushroom');
        this.bricksCoinLayer = this.map.createLayer('BricksCoin');
        this.brickCoinsLayer = this.map.createLayer('BrickCoins');
        this.pipesAccessLevelLayer = this.map.createLayer('PipesAccessLevel');
        this.bricksInvisible1UPLayer = this.map.createLayer('BricksInvisible1UP');
        this.pipesAccessLayer = this.map.createLayer('PipesAccess');
        this.exitPipesLayer = this.map.createLayer('ExitPipes');
        this.finishLevelLayer = this.map.createLayer('FinishLevel');
    },
    
    createObjectLayers: function(){
        this.pipesAccess = this.game.add.physicsGroup(); 
        this.map.createFromObjects('PipesAccess', 'pipesAccess', '', 0, true, false, this.pipesAccess);
        
        this.pipesAccessLevel = this.game.add.physicsGroup(); 
        this.map.createFromObjects('PipesAccessLevel', 'pipesAccessLevel', '', 0, true, false, this.pipesAccess);
        
        this.exitPipes = this.game.add.physicsGroup(); 
        this.map.createFromObjects('ExitPipes', 'exitPipes', '', 0, true, false, this.exitPipes);
        
        this.deadZones = this.game.add.physicsGroup(); 
        this.map.createFromObjects('DeadZones', 'deadZones', '', 0, true, false, this.deadZones);
        
        this.positionExitPipe = this.game.add.physicsGroup();
        this.map.createFromObjects('PositionExitPipe', 'positionExitPipe', '', 0, true, false, this.positionExitPipe);
        
        this.turtles = this.game.add.physicsGroup(); 
        this.map.createFromObjects('Turtles', 'turtles', '', 0, true, false, this.turtles);
        
        this.goombas = this.game.add.physicsGroup(); 
        this.map.createFromObjects('Goombas', 'goombas', '', 0, true, false, this.goombas);
        
        this.bricksCoin = this.game.add.physicsGroup(); 
        this.map.createFromObjects('BricksCoin', 'bricksCoin', '', 0, true, false, this.bricksCoin);
        
        this.brickCoins = this.game.add.physicsGroup(); 
        this.map.createFromObjects('BricksCoins', 'brickCoins', '', 0, true, false, this.brickCoins);
        
        this.bricksStar = this.game.add.physicsGroup(); 
        this.map.createFromObjects('BricksStar', 'brickStar', '', 0, true, false, this.bricksStar);
        
        this.bricks = this.game.add.physicsGroup(); 
        this.map.createFromObjects('Bricks', 'bricks', '', 0, true, false, this.bricks);
        
        this.bricksMushroom = this.game.add.physicsGroup(); 
        this.map.createFromObjects('BricksMushroom', 'bricksMushroom', '', 0, true, false, this.bricksMushroom);
        
        this.coins = this.game.add.physicsGroup(); 
        this.map.createFromObjects('Coins', 'coins', '', 0, true, false, this.coins);
        
        this.bricksInvisible1UP = this.game.add.physicsGroup(); 
        this.map.createFromObjects('BricksInvisible1UP', 'bricksInvisible1UP', '', 0, true, false, this.bricksInvisible1UP);
        
        this.finishLevelLayer = this.game.add.physicsGroup(); 
        this.map.createFromObjects('FinishLevel', 'finishLevelLayer', '', 0, true, false, this.finishLevelLayer);
        
        this.doorFinalLevel = this.game.add.physicsGroup(); 
        this.map.createFromObjects('DoorFinalLevel', 'doorFinalLevel', '', 0, true, false, this.doorFinalLevel);
        
    },
    
    setCollisionLayers: function(){
        //1 bloque suelo
        //2 bloque rompible
        //25 bloque interrogante
        //29 bloque invisible
        //34 bloques solidos
        //67 bloque suelo subnivel
        //69 bloque paredes subnivel 
        //265 266 267 268 269 298 299 300 301 301 302 Tuberias
        
        
        this.map.setCollision([1,34,67,69,265,266,267,268,269,298,299,300,301,301,302],true,this.graphicLayer);
        this.map.setCollision(2,true,this.bricksLayer);
        this.map.setCollision(25,true,this.bricksCoinLayer);
    },
    
    collisionLayers: function(){
        this.game.physics.arcade.collide(this.player,this.graphicLayer);
        this.game.physics.arcade.collide(this.player,this.bricksLayer);
        this.game.physics.arcade.collide(this.player,this.bricksCoinLayer);
        
        this.game.physics.arcade.overlap(this.player, this.pipesAccess, pipeAccess, null, this);
        this.game.physics.arcade.overlap(this.player, this.exitPipes, pipeExit, null, this);
        this.game.physics.arcade.overlap(this.player, this.deadZones, dead, null, this);
        
    }
    
    
};


