marioBros.starPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'star');
  
    //this.game.physics.arcade.enable(this);
    //this.body.immovable = true;
    //this.speed = 30;
    //this.direction = -1;
    this.level = level;
    //this.body.gravity.y = gameOptions.playerGravity;
    //this.body.collideWorldBounds = true;
    //this.checkWorldBounds = true;
    //this.playerVisible = false;
        
};
marioBros.starPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.starPrefab.prototype.constructor = marioBros.starPrefab;

function collisionStar(star, player){
    if(star.body.touching.up && player.body.touching.down){
      this.dieStar = true;
      //this.animations.stop();
    }else{
        //el jugaodor aumenta
    }
}

marioBros.starPrefab.prototype.update = function(){
   /* if(!this.dieStar){
       this.game.physics.arcade.collide(this, this.level.player,collisionStar, null, this);
    }*/
   // this.game.physics.arcade.collide(this, this.level.bricks); intento de hacer que los goombas colisionen con bloques bricks(para andar encima de los bloques)
    
    /*if(this.body.blocked.right || this.body.blocked.left){
        this.direction *= -1;        
    }
    if(this.game.physics.arcade.distanceBetween(this, this.level.player) < 300 || this.playerVisible){
       this.playerVisible = true;
       this.body.velocity.x = this.speed * this.direction;
    }*/
    
};

