marioBros.firePrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'fuegoBowser');
    this.animations.add('movement',[0,1], 5, true);
    
    this.game.physics.arcade.enable(this);
    //this.body.immovable = true;
    this.speed = 18;
    
    this.level = level;
    //this.body.gravity.y = gameOptions.playerGravity;
    
    this.animations.play('movement');
    this.fuegoDie = false;
   
    this.timeInit;
    this.timeInitChangeToSmall;
    this.changeToSmall = false;
    this.timeCheckLife = this.game.time.now;

    if(this.level.bowser.x >= this.level.player.x){
        this.body.velocity.x -= 100;
    }
    if(this.level.bowser.x <= this.level.player.x){
        this.body.velocity.x += 100;
    }
    this.timeCheck = this.game.time.now;
    
};
marioBros.firePrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.firePrefab.prototype.constructor = marioBros.firePrefab;


marioBros.firePrefab.prototype.collisionPlayerFire = function() {
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


marioBros.firePrefab.prototype.update = function(){
    
    this.timeCheck = this.game.time.now;
    
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
    
    if(this.timeCheck >= this.timeCheckLife + 1200){
        this.kill();
    } 
    
    this.collPlayer = this.game.physics.arcade.overlap(this, this.level.player, this.collisionPlayerFire, null,this);        
    
   
};