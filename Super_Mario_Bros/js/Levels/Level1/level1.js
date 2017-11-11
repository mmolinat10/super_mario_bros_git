

var marioBros = marioBros || {};

marioBros.level1 = {
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.scale.setGameSize(gameOptions.gameWidth/2,gameOptions.gameHeight/2);   
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.game.physics.arcade.gravity.y = gameOptions.playerGravity;
        this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
    },
    
    preload:function(){
     this.load.tilemap('level1','tilemaps/level1.json',null,Phaser.Tilemap.TILED_JSON);
     this.load.image('tileset_levels','tilemaps/tileset_levels.png');
     this.load.spritesheet('mario','img/Player/Mario Small/mario small idle.png',19,16);
     this.load.spritesheet('runLeft','img/Player/Mario Small/mario small.png',22,16);
    this.load.image('Ground','img/Levels/block.png');

    
    },
   
    create:function(){
     ;
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('tileset_levels');
 
        this.map.createLayer('Background_Color');
        this.map.createLayer('Graphic_Layer');
        
        this.map.addTilesetImage('Ground');
  
        this.player = new marioBros.marioPrefab(this.game,150,150);
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(2);
        this.player.animations.add('runLeft',[1,2,3,4],6,false);
   
        this.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    
    update:function(){      
       this.game.physics.arcade.collide(this.player,this.walls);
         
        this.player.body.velocity.x = 0;
      
        if(this.cursors.left.isDown){
            this.player.body.velocity.x = -this.player.velocity;
            this.player.animations.play('runLeft');
            
            this.player.scale.x = -2;
         } else if (this.cursors.right.isDown){
            this.player.body.velocity.x = this.player.velocity;
            this.player.animations.play('runLeft');
          this.player.scale.setTo(2,2);            
        }else{
              this.player.frame = 0;
        }
        
         if(this.space.isDown 
            && this.player.body.blocked.down
            && this.space.downDuration(1)){
            this.player.body.velocity.y = -gameOptions.playerJump;
        }
        if(!this.player.body.blocked.down){
            this.player.frame = 6;
        }
    }
};


