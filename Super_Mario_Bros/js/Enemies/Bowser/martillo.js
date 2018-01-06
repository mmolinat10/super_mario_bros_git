marioBros.martilloPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'martilloBowser');
    this.animations.add('movement',[0,1,2,3], 15, true);
    
    this.game.physics.arcade.enable(this);
    //this.body.immovable = true;
    this.speed = 10;
    
    this.level = level;
    this.body.gravity.y = gameOptions.playerGravity;
    this.body.collideWorldBounds = true;
    this.checkWorldBounds = true; 
    
    this.animations.play('movement');
    this.martilloDie = false;
    this.touchPlayer = false;
    this.timeInit;
    this.timeInitChangeToSmall;
    this.changeToSmall = false;
    this.timeCheckLife = this.game.time.now;
    //this.game.physics.arcade.velocityFromRotation(this.rotation, 400, this.body.velocity);
    this.body.velocity.y -= 250;
    if(this.level.bowser.x >= this.level.player.x){
        this.body.velocity.x -= 100;
    }
    if(this.level.bowser.x <= this.level.player.x){
        this.body.velocity.x += 100;
    }
    
};
marioBros.martilloPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.martilloPrefab.prototype.constructor = marioBros.martilloPrefab;


marioBros.martilloPrefab.prototype.collisionPlayerMartillo = function() {
    //this.touchPlayer = true;

    //daño al jugador
    if(!this.level.player.bigMario && !this.level.player.marioStar && !this.changeToSmall){
       this.level.player.die = true;
    }
    else if(this.level.player.bigMario && !this.level.player.marioStar && !this.level.player.marioFlower){
        this.level.player.bigMario = false; 
        this.level.player.animations.stop();
        this.level.player.loadTexture('marioSmall');
        this.level.player.body.setSize(16, 16);
        this.timeInitChangeToSmall = this.game.time.now;
        this.changeToSmall = true;
    }
    else if(this.level.player.marioFlower && !this.level.player.marioStar)
    {
        this.level.player.marioFlower = false;
        this.level.player.bigMario = false;
        this.level.player.animations.stop();
        this.level.player.loadTexture('marioSmall');
        this.level.player.body.setSize(16, 16);
        this.timeInitChangeToSmall = this.game.time.now;
        this.changeToSmall = true;
    }
    
    this.kill();
    
};


marioBros.martilloPrefab.prototype.update = function(){
    
    this.timeCheck = this.game.time.now;
    
    if(this.level.destroyBowser){
       this.kill();
    }
    
    //tiempo de invulnerabilidad al pasar de grande a pequeño
    if(this.timeCheck>= this.timeInitChangeToSmall + 2000 && this.changeToSmall){
        this.changeToSmall = false;
    }
    
    //parte derecha camara
    if(this.game.camera.x < this.x-(256)){
        this.kill();
    }
    //parte izquierda camara
    if(this.x <= this.game.camera.x-16){
        this.kill();
    }
    
    if(this.timeCheck >= this.timeCheckLife + 800){
        this.kill();
    } 
    
    this.collPlayer = this.game.physics.arcade.overlap(this, this.level.player, this.collisionPlayerMartillo, null,this);        
    
   
};