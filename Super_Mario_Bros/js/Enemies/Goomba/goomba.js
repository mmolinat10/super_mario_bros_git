marioBros.goombaPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'goomba');
    this.animations.add('walk',[0,1],10,true);
    this.deadAnimationGoomba = this.animations.add('died',[2],15);
    this.game.physics.arcade.enable(this);
    this.animations.play('walk');
    this.body.immovable = true;
    this.speed = 30;
    this.direction = -1;
    this.level = level;
    this.dieGoomba = false;
    this.body.gravity.y = gameOptions.playerGravity;
    this.body.collideWorldBounds = true;
    this.checkWorldBounds = true;
    this.playerVisible = false;
    this.collPlayerGoomba;
    this.collBricksGoomba;
    this.timeCheck;
    this.timeInit;
};
marioBros.goombaPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.goombaPrefab.prototype.constructor = marioBros.goombaPrefab;

marioBros.goombaPrefab.prototype.update = function(){
    this.timeCheck = this.game.time.now;    
    
    if(!this.dieGoomba){
        this.collPlayerGoomba = this.game.physics.arcade.collide(this, this.level.player,this.collisionPlayerGoomba, null, this);
        this.collBricksGoomba = this.game.physics.arcade.collide(this, this.level.brick);
    }else{
        if(this.timeCheck>= this.timeInit + 150){
            this.kill();
        }
    }
    
    if(this.body.blocked.right || this.body.blocked.left){
        this.direction *= -1;        
    }
    
    if(this.game.physics.arcade.distanceBetween(this, this.level.player) < 400 || this.playerVisible){
        if(!this.playerVisible){
           this.playerVisible = true;
        }
        this.body.velocity.x = this.speed * this.direction;
    }
};

marioBros.goombaPrefab.prototype.collisionPlayerGoomba = function() {
    if(this.body.touching.up && this.level.player.body.touching.down){
        this.level.player.body.velocity.y -= 200; //mini jump al matar al goomba
        this.dieGoomba = true;
        this.animations.stop();
        this.deadAnimationGoomba = this.animations.play('died');
        this.timeInit = this.game.time.now;
    }
    else{
        //daño al jugador
        if(!this.level.player.bigMario){
           this.level.player.die = true;
        }
        else{
            //this.level.player.bigMario = false; activar cuando esten las animaciones y todo listo del big mario
        }
    }
};