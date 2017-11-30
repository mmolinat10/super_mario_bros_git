var textPointsHUDLevel;
var textPointsLevel;
var textCoinsLevel;
var textWorldHUDLevel;
var textWorldLevel;
var textTimeHUDLevel;
var textTimeLevel;
var changeHUD = false;
var textPoints;
var textCoins;
var textTime;
var textPointsHUD;
var coin;
var textWorldHUD;
var textWorld;
var textTimeHUD;

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
    player.die = true;    
}

function deadEnemy(enemy){

    enemy.kill();
    
}

marioBros.level1.prototype = {
    init:function(){
        this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
    },
    
    preload:function(){
        


    
    },
   
    create:function(){
                
        gameOptions.numLevel = 1;
        this.soundLevel1 = this.game.add.audio('level1');
        this.runningOutOfTime = this.game.add.audio('runningOutOfTime');
        this.runningOutOfTimeOnce = false;
        this.soundLevel1.loopFull();
        this.game.paused = false;
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
        this.p = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        this.u = this.game.input.keyboard.addKey(Phaser.Keyboard.U);
        this.gamePaused = false;
        this.brick = [];
        this.brickCoin = [];
        this.brickCoinsA = [];
        this.brickFlowerOrMushroom = [];
        this.brickStar = [];
        this.brickInvisible = [];
        this.createBlocksPrefabs();
        
        this.player = new marioBros.marioPrefab(this.game,50,this.game.world.height/3-25, this);
        this.game.add.existing(this.player);       
        
        this.goomba = [];
        this.createGoombasPrefabs();
        
        this.coinsAlone = [];
        this.createCoinsPrefabs();
        
        this.camera.follow(this.player, null, 1, 0);
        this.game.time.events.loop(1000, function(){
            if(gameOptions.time < 100 && !this.runningOutOfTimeOnce){
                this.runningOutOfTimeOnce = true;
                this.runningOutOfTime.play();
            }
            if(gameOptions.time > 0 && !this.player.die){
                gameOptions.time -= 1;
                changeHUD = true;        
            }
            
        }, this);
        this.loadHud();

    },
    
    update:function(){   
       
        
        if(changeHUD){
            textTimeHUD.destroy();
            textWorld.destroy();
            textWorldHUD.destroy();
            coin.destroy();
            textPointsHUD.destroy();
            textPoints.destroy();
            textCoins.destroy();
            textTime.destroy();
            this.loadHud();
            changeHUD = false;
        }
        
       
        this.collisionLayers();
        
        if(this.escape.isDown){
            this.startMenu();
        }
        
        /*
         if(this.p.isDown ){
            this.game.paused = true;
            }
      
     
        if(this.u.isDown) { 
            this.game.paused = false;   
        }*/
      
    },
    
    startMenu: function () {
        this.soundLevel1.stop();
        this.state.start('menu');
    },
    
    
    createLayers: function(){
        this.backgroundColor = this.map.createLayer('Background_Color');
        this.graphicLayer = this.map.createLayer('Graphic_Layer');

        this.pipesAccessLevelLayer = this.map.createLayer('PipesAccessLevel');
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
        this.map.setCollision([265,266],true,this.pipesAccessLayer);
        this.map.setCollision([267,300],true,this.exitPipesLayer);
        this.map.setCollision([267,300],true,this.pipesAccessLevelLayer);
        this.map.setCollision([281,314],true,this.finishLevelLayer);
    },
    
    collisionLayers: function(){

        this.game.physics.arcade.collide(this.player, this.pipesAccessLayer, pipeAccess, null, this);
        this.game.physics.arcade.collide(this.player, this.exitPipesLayer, pipeExit, null, this);
        this.game.physics.arcade.collide(this.player, this.pipesAccessLevelLayer, pipeNextLevel, null, this);
        this.game.physics.arcade.collide(this.player,this.finishLevelLayer, flag, null, this);
        
                
        this.game.physics.arcade.overlap(this.player, this.deadZones, dead, null, this);
        
        this.game.physics.arcade.overlap(this.player,this.doorFinalLevel, finishLevelDoor, null, this);
        
        this.game.physics.arcade.overlap(this.goomba, this.deadZones, deadEnemy, null, this);
        
    },
    
    createBlocksPrefabs: function(){
        
        this.brickPos;
        for(var i = 0; i < this.bricks.children.length; i++){
            this.brickPos = this.bricks.children[i];
            this.brick.push(new marioBros.brickPrefab(this.game,this.brickPos.x,this.brickPos.y+16, this));
            this.game.add.existing(this.brick[i]);
        }
        
        this.brickCoinPos;
        
        for(var i = 0; i < this.bricksCoin.children.length; i++){
            this.brickCoinPos = this.bricksCoin.children[i];
            this.brickCoin.push(new marioBros.brickCoinPrefab(this.game,this.brickCoinPos.x,this.brickCoinPos.y+16, this));
            this.game.add.existing(this.brickCoin[i]);
        }
        
        this.brickCoinsPos;
        
        for(var i = 0; i < this.brickCoins.children.length; i++){
            this.brickCoinsPos = this.brickCoins.children[i];
            this.brickCoinsA.push(new marioBros.brickCoinsPrefab(this.game,this.brickCoinsPos.x,this.brickCoinsPos.y+16, this));
            this.game.add.existing(this.brickCoinsA[i]);
        }
                
        this.brickFlowerOrMushroomPos;
        for(var i = 0; i < this.bricksFlowerOrMushroom.length; i++){
            this.brickFlowerOrMushroomPos = this.bricksFlowerOrMushroom.children[i];
            this.brickFlowerOrMushroom.push(new marioBros.brickFlowerOrMushroomPrefab(this.game,this.brickFlowerOrMushroomPos.x,this.brickFlowerOrMushroomPos.y+16, this));
            this.game.add.existing(this.brickFlowerOrMushroom[i]);
        }
        
        this.brickStarPos;
        for(var i = 0; i < this.bricksStar.length; i++){
            this.brickStarPos = this.bricksStar.children[i];
            this.brickStar.push(new marioBros.brickStarPrefab(this.game,this.brickStarPos.x,this.brickStarPos.y+16, this));
            this.game.add.existing(this.brickStar[i]);
        }
        
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
    },
    
    createCoinsPrefabs: function(){
        
        this.coinPos;
        for(var i = 0; i < this.coins.length; i++){
            this.coinPos = this.coins.children[i];
            this.coinsAlone.push(new marioBros.coinPrefab(this.game,this.coinPos.x,this.coinPos.y+16, this));
            this.game.add.existing(this.coinsAlone[i]);
        }
    },
    
    stopBackgroundAudioLevel: function(){
        this.soundLevel1.stop();
    },
    
    playBackgroundAudioLevel: function(){
        this.soundLevel1.loopFull();
    },
    
    loadHud:function(){
        textPointsHUDLevel = "MARIO";

        if(gameOptions.score < 10){
           textPointsLevel = "0"+gameOptions.score;
        }
        else{
            textPointsLevel = gameOptions.score;
        }

        if(gameOptions.coins < 10){
            textCoinsLevel = "x"+"0"+gameOptions.coins;
        }
        else{
            textCoinsLevel = "x"+gameOptions.coins;
        }

        textWorldHUDLevel = "WORLD";
        if(gameOptions.numLevel == 1){
           textWorldLevel = "1-1";
        }
        else if(gameOptions.numLevel == 11){
            textWorldLevel = "1-2";
        }

        textTimeHUDLevel = "TIME";
        textTimeLevel = gameOptions.time;
        
        textPointsHUD = this.add.text(30, 10, textPointsHUDLevel, style);
        textPointsHUD.fixedToCamera = true;
        textPoints = this.add.text(30, 20, textPointsLevel, style5);
        textPoints.fixedToCamera = true;
        
        
        coin = this.add.image(75,20, 'coin1');
        coin.scale.setTo(0.8);
        coin.fixedToCamera = true;
        
        textCoins = this.add.text(90, 20, textCoinsLevel, style5);
        textCoins.fixedToCamera = true;
        
        textWorldHUD = this.add.text(130, 10, textWorldHUDLevel, style);
        textWorldHUD.fixedToCamera = true;
        textWorld = this.add.text(144, 20, textWorldLevel, style);
        textWorld.fixedToCamera = true;
        
        textTimeHUD = this.add.text(200, 10, textTimeHUDLevel, style);
        textTimeHUD.fixedToCamera = true;
        textTime = this.add.text(205, 20, textTimeLevel, style);
        textTime.fixedToCamera = true;
    }
   
};


