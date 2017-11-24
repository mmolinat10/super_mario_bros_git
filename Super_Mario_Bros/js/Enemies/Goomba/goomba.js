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
        
};
marioBros.goombaPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.goombaPrefab.prototype.constructor = marioBros.goombaPrefab;

function collisionGoomba(goomba, player){
    if(goomba.body.touching.up && player.body.touching.down){
        this.dieGoomba = true;
        this.animations.stop();
        this.deadAnimationGoomba = this.animations.play('died', 50);
        this.animations.currentAnim.onComplete.add(function () {goomba.kill(); });        
    }else{
        //daño al jugador
    }
}

marioBros.goombaPrefab.prototype.update = function(){
    if(!this.dieGoomba){
       this.game.physics.arcade.collide(this, this.level.player,collisionGoomba, null, this);
    }
   // this.game.physics.arcade.collide(this, this.level.bricks); intento de hacer que los goombas colisionen con bloques bricks(para andar encima de los bloques)
    
    if(this.body.blocked.right || this.body.blocked.left){
        this.direction *= -1;        
    }
    if(this.game.physics.arcade.distanceBetween(this, this.level.player) < 300 || this.playerVisible){
       this.playerVisible = true;
       this.body.velocity.x = this.speed * this.direction;
    }
    
};