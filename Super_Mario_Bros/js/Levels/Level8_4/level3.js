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
var moveCamera = true;

marioBros.level3 = function (game) {

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

function pipeAccessLevel3(player){
    
    
    
    
}

function pipeAccess2Level3(player){

    
    
    
}

function pipeExitLevel3(player){

    
}

function pipeNextLevelLevel3(player){

   
}

function flagLevel3(player){
    console.log("bandera");
}

function finishLevelDoorLevel3(player){
    console.log("puerta");
}

function deadLevel3(player){
    player.die = true;    
}

function deadEnemyLevel3(enemy){

    enemy.kill();
    
}

marioBros.level3.prototype = {
    init:function(){
        this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
    },
    
    preload:function(){
        


    
    },
   
    create:function(){      
        gameOptions.numLevel = 84;
        this.soundLevel3 = this.game.add.audio('level3');
        this.soundLevel1 = this.game.add.audio('level1');
        this.runningOutOfTime = this.game.add.audio('runningOutOfTime');
        this.runningOutOfTimeOnce = false;
        this.soundLevel3.loopFull();
        this.game.paused = false;
        this.pipeLevel3 = this.game.add.audio('pipe');
        this.exitPipeDetect = false;
                
        this.map = this.game.add.tilemap('level3');
        this.map.addTilesetImage('tileset_levels');        
    
        this.createObjectLayers();        
        
        this.createLayers();
        
        this.setCollisionLayers();
        
        this.backgroundColor.resizeWorld();
        this.graphicLayer.resizeWorld();
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.runKey = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.escape = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.p = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        this.u = this.game.input.keyboard.addKey(Phaser.Keyboard.U);
        this.gamePaused = false;
        //this.brick = [];
        //this.brickCoin = [];
        //this.brickCoinsA = [];
        //this.brickFlowerOrMushroom = [];
        //this.brickFlowerOrMushroomType2 = [];
        //this.brickStar = [];
        //this.brickInvisible = [];
        //this.createBlocksPrefabs();
        
        //this.platformDown = [];
        //this.platformUp = [];
        //this.createPlatformsPrefabs();
        
        this.puente = [];
        this.createPuentePrefabs();
        

        //1250
        //400
        
        this.player = new marioBros.marioPrefab(this.game,4100,this.game.world.height/2-15, this);
        this.player.marioFlower = gameOptions.isMarioFier;
        this.player.bigMario = gameOptions.isMarioBig;
        this.player.level = this;
        
        if(this.player.bigMario){
            this.player.loadTexture('marioBig');
            this.player.body.setSize(16, 32);
        }
        if(this.player.marioFlower){
            this.player.loadTexture('marioFire');
            this.player.body.setSize(16, 32);    
        }
        
        this.game.add.existing(this.player);       
        
        this.bowser = new marioBros.bowserPrefab(this.game,4100,this.game.world.height/2-15,this);
        this.game.add.existing(this.bowser);
        //this.goomba = [];
        //this.createGoombasPrefabs();
        
        //this.koopa = [];
        //this.redKoopa = [];
        //this.createKoopasPrefabs();
        
        //this.coinsAlone = [];
        this.createCoinsPrefabs();
        
        this.camera.follow(this.player, null, 1, 0);
        this.game.camera.y = 270;
        
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
        
        if (this.cursors.right.isDown && moveCamera)
        {
            this.game.camera.x += (this.player.x - this.game.camera.x) * 0.02;
        }
        
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
        if(!moveCamera){
            this.camera.y = 495;
            this.camera.x = 1600;
        }
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
        this.soundLevel3.stop();
        this.state.start('menu');
    },
    
    finishLvls: function () {
        this.soundLevel1.stop();
        gameOptions.numLevel = 1;
        gameOptions.isMarioBig = this.player.bigMario;
        gameOptions.isMarioFier = this.player.marioFlower;
        this.state.start('loadLevel');
    },
    
    
    createLayers: function(){        
        this.backgroundColor = this.map.createLayer('Background_Color');
        
        //la piranyas van aqui porque interesa esconderlas detras de la tuberia
        this.isOverPipes = false;
        //this.piranyasVerdes = this.game.add.physicsGroup();
        
        //this.map.createFromObjects('PiranyaVerde', 'piranyaVerde', '', 0, true, false, this.piranyasVerdes);
        
        //this.piranyasAzules = this.game.add.physicsGroup();
        //this.map.createFromObjects('PiranyaAzul', 'piranyaAzul', '', 0, true, false, this.piranyasAzules);
        //this.piranyaAzul = [];
        //this.piranyaVerde = [];
        //this.createPiranyasPrefabs();
        
        this.graphicLayer = this.map.createLayer('Graphic_Layer');

        this.pipesAccessLayer = this.map.createLayer('PipesAccess');
        //this.pipesAccess2Layer = this.map.createLayer('PipesAccess2');
        this.exitPipesLayer = this.map.createLayer('ExitPipes');
        this.finishLevelLayer = this.map.createLayer('FinishLevel');
        this.fireLayer = this.map.createLayer('Fire');
        this.martilloLayer = this.map.createLayer('Martillo');
    },
    
    createObjectLayers: function(){
        
        /*this.overPipes = this.game.add.physicsGroup(); 
        this.map.createFromObjects('OverPipe', 'overPipe', '', 0, true, false, this.overPipes);*/
        
        this.pipesAccess = this.game.add.physicsGroup(); 
        this.map.createFromObjects('PipesAccess', 'pipesAccess', '', 0, true, false, this.pipesAccess);
        
        /*this.pipesAccess2 = this.game.add.physicsGroup(); 
        this.map.createFromObjects('PipesAccess2', 'pipesAccess2', '', 0, true, false, this.pipesAccess2);*/
        
        this.deadZones = this.game.add.physicsGroup(); 
        this.map.createFromObjects('DeadZones', 'deadZones', '', 0, true, false, this.deadZones);
        
        this.positionExitPipe = this.game.add.physicsGroup();
        this.map.createFromObjects('PositionExitPipe', 'positionExitPipe', '', 0, true, false, this.positionExitPipe);
        
        this.positionExitPipe2 = this.game.add.physicsGroup();
        this.map.createFromObjects('PositionExitPipe2', 'positionExitPipe2', '', 0, true, false, this.positionExitPipe2);
        
        this.turtles = this.game.add.physicsGroup(); 
        this.map.createFromObjects('Turtles', 'turtles', '', 0, true, false, this.turtles);
        
        /*this.redTurtles = this.game.add.physicsGroup(); 
        this.map.createFromObjects('RedTurtles', 'redTurtles', '', 0, true, false, this.redTurtles);*/ 
        
        this.goombas = this.game.add.physicsGroup(); 
        this.map.createFromObjects('Goombas', 'goombas', '', 0, true, false, this.goombas);
        
        this.bricksCoin = this.game.add.physicsGroup(); 
        this.map.createFromObjects('BricksCoin', 'bricksCoin', '', 0, true, false, this.bricksCoin);
        
        this.brickCoins = this.game.add.physicsGroup(); 
        this.map.createFromObjects('BricksCoins', 'bricksCoins', '', 0, true, false, this.brickCoins);
        
        this.bricksStar = this.game.add.physicsGroup(); 
        this.map.createFromObjects('BricksStar', 'bricksStar', '', 0, true, false, this.bricksStar);
        
        this.bricks = this.game.add.physicsGroup(); 
        this.map.createFromObjects('Bricks', 'bricks', '', 0, true, false, this.bricks);
        
        this.bricksFlowerOrMushroom = this.game.add.physicsGroup(); 
        this.map.createFromObjects('BricksFlowerOrMushroom', 'bricksFlowerOrMushroom', '', 0, true, false, this.bricksFlowerOrMushroom);
        
        this.bricksFlowerOrMushroomType2 = this.game.add.physicsGroup(); 
        this.map.createFromObjects('BricksFlowerOrMushroomType2', 'bricksFlowerOrMushroomType2', '', 0, true, false, this.bricksFlowerOrMushroomType2);
        
        this.coins = this.game.add.physicsGroup(); 
        this.map.createFromObjects('Coins', 'coins', '', 0, true, false, this.coins);
        
        this.bricksInvisible1UP = this.game.add.physicsGroup(); 
        this.map.createFromObjects('BricksInvisible1UP', 'bricksInvisible1UP', '', 0, true, false, this.bricksInvisible1UP);
        
        this.finishLevel = this.game.add.physicsGroup(); 
        this.map.createFromObjects('FinishLevel', 'finishLevel', '', 0, true, false, this.finishLevel);
        
        this.doorFinalLevel = this.game.add.physicsGroup(); 
        this.map.createFromObjects('DoorFinalLevel', 'doorFinalLevel', '', 0, true, false, this.doorFinalLevel);
        
        this.platformsUp = this.game.add.physicsGroup(); 
        this.map.createFromObjects('Platforms', 'platformsUp', '', 0, true, false, this.platformsUp);
        
        this.platformsDown = this.game.add.physicsGroup(); 
        this.map.createFromObjects('Platforms', 'platformsDown', '', 0, true, false, this.platformsDown);
        
        this.puentes = this.game.add.physicsGroup(); 
        this.map.createFromObjects('Puente', 'puente', '', 0, true, false, this.puentes);
        
        
    },
    
    setCollisionLayers: function(){
        //167 bloque suelo
        //69 bloque rompible
        //91 bloque interrogante
        //29 bloque invisible
        //100 bloques solidos
        
        //265 266 267 268 269 298 299 300 301 301 302, etc.. Tuberias
        
        
 
        this.map.setCollision([168,529,530,562,563],true,this.graphicLayer);
        this.map.setCollision([529,530],true,this.pipesAccessLayer);
        this.map.setCollision([529,530],true,this.exitPipesLayer);
        this.map.setCollision([529,530],true,this.pipesAccess2Layer);
        this.map.setCollision([281,314],true,this.finishLevelLayer);
        this.map.setCollision([193],true,this.martilloLayer);
    },
    
    collisionLayers: function(){
        if(!this.player.die){
            this.game.physics.arcade.collide(this.player, this.pipesAccessLayer, pipeAccessLevel3, null, this);
            this.game.physics.arcade.collide(this.player, this.pipesAccess2Layer, pipeAccess2Level3, null, this);
            this.game.physics.arcade.collide(this.player, this.exitPipesLayer, pipeExitLevel3, null, this);
            this.finishLvl2 = this.game.physics.arcade.collide(this.player,this.finishLevelLayer, flagLevel3, null, this);
            this.game.physics.arcade.collide(this.player, this.martilloLayer);
        
            if(this.finishLvl3){
               this.finishLvls();
            }
            
            this.game.physics.arcade.overlap(this.player, this.deadZones, deadLevel3, null, this);
            this.game.physics.arcade.overlap(this.player,this.doorFinalLevel, finishLevelDoorLevel3, null, this);
            this.isOverPipes = this.game.physics.arcade.overlap(this.player, this.overPipes);
        }
        
        this.game.physics.arcade.overlap(this.goomba, this.deadZones, deadEnemyLevel3, null, this);
        this.game.physics.arcade.overlap(this.koopa, this.deadZones, deadEnemyLevel3, null, this);
        this.game.physics.arcade.overlap(this.redKoopa, this.deadZones, deadEnemyLevel3, null, this);
        
        
        
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
            this.brickFlowerOrMushroom.push(new marioBros.brickFlowerOrMushroomPrefab(this.game,this.brickFlowerOrMushroomPos.x,this.brickFlowerOrMushroomPos.y+16, this,'type1'));
            this.game.add.existing(this.brickFlowerOrMushroom[i]);
        }
        
        this.brickFlowerOrMushroomType2Pos;
        for(var i = 0; i < this.bricksFlowerOrMushroomType2.length; i++){
            this.brickFlowerOrMushroomType2Pos = this.bricksFlowerOrMushroomType2.children[i];
            this.brickFlowerOrMushroomType2.push(new marioBros.brickFlowerOrMushroomPrefab(this.game,this.brickFlowerOrMushroomType2Pos.x,this.brickFlowerOrMushroomType2Pos.y+16, this,'type2'));
            this.game.add.existing(this.brickFlowerOrMushroomType2[i]);
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
    
    createKoopasPrefabs: function(){
        
        this.koopaPos;
        for(var i = 0; i < this.turtles.length; i++){
            this.koopaPos = this.turtles.children[i];
            this.koopa.push(new marioBros.koopaPrefab(this.game,this.koopaPos.x,this.koopaPos.y+16, this));
            this.game.add.existing(this.koopa[i]);
        }
        
        this.koopaPos2;
        for(var i = 0; i < this.redTurtles.length; i++){
            this.koopaPos2 = this.redTurtles.children[i];
            this.redKoopa.push(new marioBros.koopaPrefab(this.game,this.koopaPos2.x,this.koopaPos2.y+16, this));
            this.game.add.existing(this.redKoopa[i]);
        }
    },
    
    createPiranyasPrefabs: function(){
        
        this.piranyaVerdePos;
        for(var i = 0; i < this.piranyasVerdes.length; i++){
            this.piranyaVerdePos = this.piranyasVerdes.children[i];
            this.piranyaVerde.push(new marioBros.piranyaPrefab(this.game,this.piranyaVerdePos.x+17,this.piranyaVerdePos.y+63, this, 'green'));
            this.game.add.existing(this.piranyaVerde[i]);
        }
        
        this.piranyaAzulPos;
        for(var i = 0; i < this.piranyasAzules.length; i++){
            this.piranyaAzulPos = this.piranyasAzules.children[i];
            this.piranyaAzul.push(new marioBros.piranyaPrefab(this.game,this.piranyaAzulPos.x+17,this.piranyaAzulPos.y+63, this, 'blue'));
            this.game.add.existing(this.piranyaAzul[i]);
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
    
    createPlatformsPrefabs: function(){
        
    
    },
    
    createPuentePrefabs: function(){
        this.puentePos;
        for(var i = 0; i < this.puentes.length; i++){
            this.puentePos = this.puentes.children[i];
            this.puente.push(new marioBros.puentePrefab(this.game,this.puentePos.x,this.puentePos.y+16, this, 1));
            this.game.add.existing(this.puente[i]);
        }    
    },
    
    stopBackgroundAudioLevel: function(){
        this.soundLevel3.stop();
    },
    
    playBackgroundAudioLevel: function(){
        this.soundLevel3.loopFull();
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
        else if(gameOptions.numLevel == 84){
            textWorldLevel = "8-4";
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


