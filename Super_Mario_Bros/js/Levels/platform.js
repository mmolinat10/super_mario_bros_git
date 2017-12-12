marioBros.platformPrefab = function(game,x,y,level,dir)
{
    Phaser.Sprite.call(this,game,x,y,'platform');
    this.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.speed = 60;
    this.direction = dir;
    this.level = level;
};
marioBros.platformPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.platformPrefab.prototype.constructor = marioBros.platformPrefab;

marioBros.platformPrefab.prototype.playPlatform = function() {
    if(this.body.touching.up && this.level.player.body.touching.down){
       this.level.player.onGround = true;
    }
}

marioBros.platformPrefab.prototype.update = function(){
    this.move();
};

marioBros.platformPrefab.prototype.move = function(){
  
    if(this.y < 255){
        this.y = 255 + gameOptions.gameHeight;
    }
  
    else if(this.y > 255+gameOptions.gameHeight){
        this.y = 255;
    }
    
    this.body.velocity.y = this.speed * -this.direction;
       
};
