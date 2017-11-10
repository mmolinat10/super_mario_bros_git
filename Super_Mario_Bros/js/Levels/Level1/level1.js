

var marioBros = marioBros || {};

marioBros.level1 = {
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.scale.setGameSize(gameOptions.gameWidth/2,gameOptions.gameHeight/2);   
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //this.game.physics.arcade.gravity.y = gameOptions.heroGravity; this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
    },
    
    preload:function(){
     this.load.tilemap('level1','tilemaps/level1.json',null,Phaser.Tilemap.TILED_JSON);
     this.load.image('tileset_levels','tilemaps/tileset_levels.png');
        
    // this.game.physics.startSystem(Phaser.Physics.ARCADE);
     this.load.spritesheet('mario','img/Player/Mario Small/mario small idle.png',13,16);
     this.load.spritesheet('runLeft','img/Player/Mario Small/mario small run.png',36,16);
    
    },
   
    create:function(){
     ;
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('tileset_levels');
        
     
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   /*     this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;*/
        
        this.map.createLayer('Background_Color');
        this.map.createLayer('Graphic_Layer');
        
      
           this.player = new marioBros.marioPrefab(this.game,150,150);
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(2);
        this.player.animations.add('runLeft',[0,1,2,3,4],6,false);
        this.player.animations.add('mario',[0],0,false);
       this.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
    },
    
    update:function(){
/*        this.player.body.velocity.x = 0;
   
        if(this.cursors.left.isDown){
            this.player.body.velocity.x = -gameOptions.playerSpeed;
            this.player.animations.play('runLeft');
            
            this.player.scale.x = -2;
         } else if (this.cursors.right.isDown){
            this.player.body.velocity.x = gameOptions.playerSpeed;
            this.player.animations.play('runLeft');
          this.player.scale.setTo(2,2);            
        }else{
                this.player.animations.play('mario');
        }
    */
    }
};


