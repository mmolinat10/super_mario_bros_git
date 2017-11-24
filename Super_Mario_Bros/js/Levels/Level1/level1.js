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

function pipeAccess(player){
    
    if(player.body.blocked.down){
        if(this.cursors.down.isDown){
            player.body.position.y = 420;
            this.camera.y = 400;
            this.camera.x = 896;
            this.pipeLevel1.play();
            this.camera.follow(this.player, null, 0, 0);
        
        }
    }  
    
    
}

function pipeExit(player){

    if(player.body.blocked.right){
        if(this.cursors.right.isDown){
            var exitPipeValue;
            //ejemplo de obtener posicion de object layer
            this.positionExitPipe.forEach(function(positionExitPipe){
                positionExitPipe.body.immovable = true;
                exitPipeValue = positionExitPipe;
            }); 
            player.body.position.x = exitPipeValue.x+8;
            player.body.position.y = exitPipeValue.y;
            this.camera.y -= 400;
            this.camera.x -= 896;
            this.pipeLevel1.play();
            this.camera.follow(this.player, null, 1, 0);
        }
    }
}

function pipeNextLevel(player){

    if(player.body.blocked.right){
        if(this.cursors.right.isDown){
            //tuberia next level
            console.log("tuberia next level");
        }
    }
}

function flag(player){
    console.log("bandera");
}

function finishLevelDoor(player){
    console.log("puerta");
}

function dead(player){
    this.state.start('loadLevel');
    player.die = true;    
    this.soundLevel1.stop();
    
}

function deadEnemy(enemy){

    enemy.kill();
    
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
        
        this.brick = [];
        this.createBlocksPrefabs();
        this.goomba = [];
        this.createGoombasPrefabs();
        
        this.player = new marioBros.marioPrefab(this.game,50,this.game.world.height/3-25, this);
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
        //this.bricksLayer = this.map.createLayer('Bricks');
        //this.brickStarLayer = this.map.createLayer('BrickStar');
        //this.bricksMushroomLayer = this.map.createLayer('BricksMushroom');
        //this.bricksFlowerOrMushroomLayer = this.map.createLayer('BricksFlowerOrMushroom');
        //this.bricksCoinLayer = this.map.createLayer('BricksCoin');
        //this.brickCoinsLayer = this.map.createLayer('BrickCoins');
        this.pipesAccessLevelLayer = this.map.createLayer('PipesAccessLevel');
        //this.bricksInvisible1UPLayer = this.map.createLayer('BricksInvisible1UP');
        this.pipesAccessLayer = this.map.createLayer('PipesAccess');
        this.exitPipesLayer = this.map.createLayer('ExitPipes');
        this.finishLevelLayer = this.map.createLayer('FinishLevel');
    },
    
    createObjectLayers: function(){
        this.pipesAccess = this.game.add.physicsGroup(); 
        this.map.createFromObjects('PipesAccess', 'pipesAccess', '', 0, true, false, this.pipesAccess);
        
        this.pipesAccessLevel = this.game.add.physicsGroup(); 
        this.map.createFromObjects('PipesAccessLevel', 'pipesAccessLevel', '', 0, true, false, this.pipesAccessLevel);
        
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
        
        this.bricksFlowerOrMushroom = this.game.add.physicsGroup(); 
        this.map.createFromObjects('BricksFlowerOrMushroom', 'bricksFlowerOrMushroom', '', 0, true, false, this.bricksFlowerOrMushroom);
        
        this.coins = this.game.add.physicsGroup(); 
        this.map.createFromObjects('Coins', 'coins', '', 0, true, false, this.coins);
        
        this.bricksInvisible1UP = this.game.add.physicsGroup(); 
        this.map.createFromObjects('BricksInvisible1UP', 'bricksInvisible1UP', '', 0, true, false, this.bricksInvisible1UP);
        
        this.finishLevel = this.game.add.physicsGroup(); 
        this.map.createFromObjects('FinishLevel', 'finishLevel', '', 0, true, false, this.finishLevel);
        
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
        //this.map.setCollision(2,true,this.bricksLayer);
        //this.map.setCollision(25,true,this.bricksCoinLayer);
        //this.map.setCollision(25,true,this.bricksFlowerOrMushroomLayer);
        //this.map.setCollision(25,true,this.bricksMushroomLayer);
        //this.map.setCollision(2,true,this.brickStarLayer);
        //this.map.setCollision(2,true,this.brickCoinsLayer);
        this.map.setCollision([265,266],true,this.pipesAccessLayer);
        this.map.setCollision([267,300],true,this.exitPipesLayer);
        //this.map.setCollision(29,true,this.bricksInvisible1UPLayer);
        this.map.setCollision([267,300],true,this.pipesAccessLevelLayer);
        this.map.setCollision([281,314],true,this.finishLevelLayer);
    },
    
    collisionLayers: function(){
        this.game.physics.arcade.collide(this.player,this.graphicLayer);
        //this.game.physics.arcade.collide(this.player,this.bricksLayer, brickCollision);
        //this.game.physics.arcade.collide(this.player,this.bricksCoinLayer, brickCoinCollision);
        //this.game.physics.arcade.collide(this.player,this.bricksMushroomLayer, brickMushroomCollision);
        //this.game.physics.arcade.collide(this.player,this.bricksFlowerOrMushroomLayer, brickFlowerOrMushroomCollision);
        //this.game.physics.arcade.collide(this.player,this.brickStarLayer, brickStarCollision);
        //this.game.physics.arcade.collide(this.player,this.brickCoinsLayer, brickCoinsCollision);
        this.game.physics.arcade.collide(this.player, this.pipesAccessLayer, pipeAccess, null, this);
        this.game.physics.arcade.collide(this.player, this.exitPipesLayer, pipeExit, null, this);
        this.game.physics.arcade.collide(this.player, this.pipesAccessLevelLayer, pipeNextLevel, null, this);
        this.game.physics.arcade.collide(this.player,this.finishLevelLayer, flag, null, this);
        
                
        this.game.physics.arcade.overlap(this.player, this.deadZones, dead, null, this);
        
        this.game.physics.arcade.overlap(this.player,this.doorFinalLevel, finishLevelDoor, null, this);
        
        
        this.game.physics.arcade.collide(this.goomba,this.graphicLayer);
        this.game.physics.arcade.overlap(this.goomba, this.deadZones, deadEnemy, null, this);
        
    },
    
    createBlocksPrefabs: function(){
        
        this.brickPos;
        for(var i = 0; i < this.bricks.children.length; i++){
            this.brickPos = this.bricks.children[i];
            this.brick.push(new marioBros.brickPrefab(this.game,this.brickPos.x,this.brickPos.y+16, this));
            this.game.add.existing(this.brick[i]);
            //console.log(i); num de object layers bricks
        }
        
        
        this.brickCoin = [];
        this.brickCoinPos;
        
        for(var i = 0; i < this.bricksCoin.children.length; i++){
            this.brickCoinPos = this.bricksCoin.children[i];
            this.brickCoin.push(new marioBros.brickCoinPrefab(this.game,this.brickCoinPos.x,this.brickCoinPos.y+16, this));
            this.game.add.existing(this.brickCoin[i]);
            //console.log(i); num de object layers bricks
        }
        
        
        this.brickCoinsA = [];
        this.brickCoinsPos;
        
        for(var i = 0; i < this.brickCoins.children.length; i++){
            this.brickCoinsPos = this.brickCoins.children[i];
            this.brickCoinsA.push(new marioBros.brickCoinsPrefab(this.game,this.brickCoinsPos.x,this.brickCoinsPos.y+16, this));
            this.game.add.existing(this.brickCoinsA[i]);
            //console.log(i); num de object layers bricks
        }
        
        this.brickMushroom = [];
        this.brickMushroomPos;
        for(var i = 0; i < this.bricksMushroom.length; i++){
            this.brickMushroomPos = this.bricksMushroom.children[i];
            this.brickMushroom.push(new marioBros.brickMushroomPrefab(this.game,this.brickMushroomPos.x,this.brickMushroomPos.y+16, this));
            this.game.add.existing(this.brickMushroom[i]);
        }
        
        this.brickFlowerOrMushroom = [];
        this.brickFlowerOrMushroomPos;
        for(var i = 0; i < this.bricksFlowerOrMushroom.length; i++){
            this.brickFlowerOrMushroomPos = this.bricksFlowerOrMushroom.children[i];
            this.brickFlowerOrMushroom.push(new marioBros.brickFlowerOrMushroomPrefab(this.game,this.brickFlowerOrMushroomPos.x,this.brickFlowerOrMushroomPos.y+16, this));
            this.game.add.existing(this.brickFlowerOrMushroom[i]);
        }
        
        this.brickStar = [];
        this.brickStarPos;
        for(var i = 0; i < this.bricksStar.length; i++){
            this.brickStarPos = this.bricksStar.children[i];
            this.brickStar.push(new marioBros.brickStarPrefab(this.game,this.brickStarPos.x,this.brickStarPos.y+16, this));
            this.game.add.existing(this.brickStar[i]);
        }
        
        this.brickInvisible = [];
        this.brickInvisiblePos;
        for(var i = 0; i < this.bricksInvisible1UP.length; i++){
            this.brickInvisiblePos = this.bricksInvisible1UP.children[i];
            this.brickInvisible.push(new marioBros.brickInvisible1UPPrefab(this.game,this.brickInvisiblePos.x,this.brickInvisiblePos.y+16, this));
            this.game.add.existing(this.brickInvisible[i]);
        }
    },
    
    createGoombasPrefabs: function(){
        
        this.goombaPos;
        for(var i = 0; i < this.goombas.length; i++){
            this.goombaPos = this.goombas.children[i];
            this.goomba.push(new marioBros.goombaPrefab(this.game,this.goombaPos.x,this.goombaPos.y+16, this));
            this.game.add.existing(this.goomba[i]);
        }
    }
};


