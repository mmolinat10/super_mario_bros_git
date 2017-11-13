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
    }
    
}

function pipeExit(player, exitPipes){

    if(this.cursors.right.isDown){
        player.body.position.x = 2630;
        player.body.position.y = (this.game.world.height/2-25)-60;
        this.camera.y -= 200;
        this.pipeLevel1.play();
    }
    
    
}

function dead(player, deadZones){

    player.body.position.x = 50;
    player.body.position.y = this.game.world.height/2-30;
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
    
        this.backgroundColor = this.map.createLayer('Background_Color');
        this.graphicLayer = this.map.createLayer('Graphic_Layer');
        
        //1 bloque suelo
        //2 bloque rompible
        //25 bloque interrogante
        //34 bloques solidos
        //67 bloque suelo subnivel
        //69 bloque paredes subnivel 
        //265 266 267 268 269 298 299 300 301 301 302 Tuberias
        
        
        this.map.setCollision([1,2,25,34,67,69,265,266,267,268,269,298,299,300,301,301,302],true,this.graphicLayer);
      
        //coins object layer (es aplicable para obtener otros object layers del json)
        //muy util para luego situar prefabs de objects sabiendo las coordenadas del object layer
        /*-----
        this.coins = this.game.add.physicsGroup(); 
        this.map.createFromObjects('Coins', 'coins', '', 0, true, false, this.coins);
        ------*/
        
        this.pipesAccess = this.game.add.physicsGroup(); 
        this.map.createFromObjects('PipesAccess', 'pipesAccess', '', 0, true, false, this.pipesAccess);
        
        this.exitPipes = this.game.add.physicsGroup(); 
        this.map.createFromObjects('ExitPipes', 'exitPipes', '', 0, true, false, this.exitPipes);
        
        this.deadZones = this.game.add.physicsGroup(); 
        this.map.createFromObjects('DeadZones', 'deadZones', '', 0, true, false, this.deadZones);
        
        this.backgroundColor.resizeWorld();
        this.graphicLayer.resizeWorld();
        
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.runKey = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.escape = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        
        this.player = new marioBros.marioPrefab(this.game,50,this.game.world.height/2-25);
        
        this.game.add.existing(this.player);
         
        this.camera.follow(this.player, null, 1, 0);
        
    },
    
    update:function(){      
        
        this.game.physics.arcade.collide(this.player,this.graphicLayer);
        
        //detect collision overlap with coins object layer (ejemplo para ver que funciona... ya que esto no se aplicara en la version final)
        //la detección de colision y destrucción como por ejemplo las monedas se hara con prefabs y no con object layers..estos ultimos solo sirven de referencia (situación en el mapa de los elementos)
        /*-----
        this.game.physics.arcade.overlap(this.player, this.coins, keyCollision, null, this);
        .------*/   
        
        this.game.physics.arcade.overlap(this.player, this.pipesAccess, pipeAccess, null, this);
        this.game.physics.arcade.overlap(this.player, this.exitPipes, pipeExit, null, this);
        this.game.physics.arcade.overlap(this.player, this.deadZones, dead, null, this);
        
        
        /*
        if(this.escape.isDown && !this.game.paused){
            this.game.paused = true;
        }else if(this.escape.isDown && this.game.paused){
            this.game.paused = false;  
        }*/
        
    }
    
    
};


