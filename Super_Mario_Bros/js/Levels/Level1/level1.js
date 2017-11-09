

var marioBros = marioBros || {};

marioBros.level1 = {
    preload:function(){
     this.game.physics.startSystem(Phaser.Physics.ARCADE);
     this.load.spritesheet('mario','img/Player/Mario_Small/mario_small_idle.png',13,16);
     this.load.spritesheet('running','img/Player/Mario_Small/mario small run.png',36,16);

    
    },
   
    create:function(){
    
        this.player = new marioBros.marioPrefab(this.game,150,150);
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(2);
        this.player.animations.add('run',[0,1,2],true);
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
    },
    
    update:function(){
        this.player.body.velocity.x = 0;
        
        if(this.cursors.left.isDown){
            this.player.body.velocity.x = -gameOptions.playerSpeed;
            this.player.animations.play('run');
            
            this.player.scale.x = -2;
         } else if (this.cursors.right.isDown){
            this.player.body.velocity.x = gameOptions.playerSpeed;
            this.player.animations.play('run');
          this.player.scale.setTo(2,2);            
        } 
    
    }
};


