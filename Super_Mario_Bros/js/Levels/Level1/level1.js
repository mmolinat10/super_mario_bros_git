marioBros.level1 = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    this.runKey;
    this.space;
    this.jumpTimer;

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};


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
        
        map = this.game.add.tilemap('level1');
        map.addTilesetImage('tileset_levels');
 
        map.createLayer('Background_Color');
        this.layer = map.createLayer('Graphic_Layer');
        this.layer.resizeWorld();
        
        //collisionArray = [0, 1, 2, 3, 25, 34, 265, 266, 298, 299];
        //map.setCollision(collisionArray);
        
        cursors = this.game.input.keyboard.createCursorKeys();
        this.runKey = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.player = new marioBros.marioPrefab(this.game,50,this.game.world.height/2-25);
        this.game.add.existing(this.player);
         
        this.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        
        
    },
    
    update:function(){      

        //this.game.physics.arcade.collide(this.player,this.layer);
        
        /*
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
        }*/
        
        
        
    }
};


