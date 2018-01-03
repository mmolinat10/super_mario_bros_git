marioBros.puentePrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'puente');
    this.game.physics.arcade.enable(this);
    this.body.immovable = true;
    
    this.level = level;
    this.bowserDie = false;
    this.speed = 90;
};
marioBros.puentePrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.puentePrefab.prototype.constructor = marioBros.puentePrefab;

marioBros.puentePrefab.prototype.playPuente = function() {
    if(this.body.touching.up && this.level.player.body.touching.down){
       this.level.player.onGround = true;
    }
}

marioBros.puentePrefab.prototype.update = function(){
    if(this.bowserDie){
       this.move();
    }
};

marioBros.platformPrefab.prototype.move = function(){
  
    this.body.velocity.y -= this.speed;
       
};
