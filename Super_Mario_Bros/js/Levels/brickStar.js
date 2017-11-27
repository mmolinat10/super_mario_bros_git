marioBros.brickStarPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'brickStar');
        
    this.game.physics.arcade.enable(this);
    //this.body.collideWorldBounds = true;
    //this.checkWorldBounds = true;
    this.body.immovable = true;
    this.level = level;
    this.isCollisioned = false;
    
        
};
marioBros.brickStarPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickStarPrefab.prototype.constructor = marioBros.brickStarPrefab;

function collisionBrickStar(brickStar, player){
    if(brickStar.body.touching.down && player.body.touching.up){
        if(!this.isCollisioned){
            this.isCollisioned = true;
            this.tweenBlock = this.game.add.tween(brickStar.position);
            this.tweenBlock.to({y: brickStar.y -8}, 100, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
            
           // createStar();
            /*this.star = this.game.add.physicsGroup(); 
            this.map.createFromObjects('star', 'star', '', 0, true, false, this.goombas);*/
            //sonido de la estrella al aparecer
            //aparición de la estrella encima del bloque y que se desplaze a la derecha botando en el terreno al colisionar
            //animación de bloque estatico (ya no hay nada)
        }
        else{
            //sonido bump
        }
    }
}
/*function createStar()
{
    if(this.isCollisioned == true) {
           this.star = new marioBros.starPrefab(this.game,this.brickStarPos.x,this.brickStarPos.y+16,this.level); 
           this.game.add.existing(this.star);
        }
}*/
marioBros.brickStarPrefab.prototype.update = function(){
    this.game.physics.arcade.collide(this, this.level.player,collisionBrickStar, null, this);
      //  this.game.physics.arcade.collide(this, this.level.brick, null, this);
   
    };

