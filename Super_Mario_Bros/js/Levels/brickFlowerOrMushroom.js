marioBros.brickFlowerOrMushroomPrefab = function(game,x,y,level,typeOfBlock)
{
    this.typeOfBlock = typeOfBlock;
    if(this.typeOfBlock == 'type1'){
       if(gameOptions.numLevel == 1){
            Phaser.Sprite.call(this,game,x,y,'brickFlowerOrMushroom');
        }
        else if(gameOptions.numLevel == 11){
           Phaser.Sprite.call(this,game,x,y,'brickFlowerOrMushroom2');
        }
        //animacion interrogante y animación de quando canvia al ser golpeada
        this.animations.add('normalBrickFlowerOrMushroom', [0, 1, 2], 2, true); 
        this.animations.add('collisionedBrickFlowerOrMushroom', [3]);
    }
    else if(this.typeOfBlock == 'type2'){
        Phaser.Sprite.call(this,game,x,y,'brickFlowerOrMushroom3');
        this.animations.add('normalBrickFlowerOrMushroomType2',[0]);
        this.animations.add('collisionedBrickFlowerOrMushroomType2',[1]);
    }
    
    this.game.physics.arcade.enable(this);
    //this.body.collideWorldBounds = true;
    //this.checkWorldBounds = true;
    this.body.immovable = true;
    this.level = level;
    this.isCollisioned = false;
    this.mushroom;
    this.flower;
    this.playerIsTouching = false;
    
};
marioBros.brickFlowerOrMushroomPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickFlowerOrMushroomPrefab.prototype.constructor = marioBros.brickFlowerOrMushroomPrefab;

marioBros.brickFlowerOrMushroomPrefab.prototype.playBlock = function() {
    if(this.body.touching.down && this.level.player.body.touching.up){
        if(!this.isCollisioned){
            this.playerIsTouching = true;

            this.isCollisioned = true;
            if(!this.level.player.bigMario){
                this.tweenBlock = this.game.add.tween(this.position);
                this.tweenBlock.to({y: this.y -8}, 100, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
                //sonido del champiñon al aparecer y sonido bump
                //aparición del champiñon encima del bloque y que se desplaze a la derecha
                //animación de bloque estatico (ya no hay nada)
                this.powerUpAppearsSound = this.game.add.audio('powerup_appears');
                this.powerUpAppearsSound.play();
                this.animations.stop();
                this.createObject();
                console.log("mushroom");
            }
            else{
                this.playerIsTouching = true;

                this.powerUpAppearsSound = this.game.add.audio('powerup_appears');
                this.powerUpAppearsSound.play();
                //sonido de la flor al aparecer y sonido bump
                //aparición de la flor con su animacion encima del bloque sin moverse
                //animación de bloque estatico (ya no hay nada)
                this.createObject();
                console.log("flower");
            }
        }
        else{
            //sonido bump
            this.bumpSound = this.game.add.audio('bump');
            this.bumpSound.play();
        }
    }
    
    if(this.body.touching.up && this.level.player.body.touching.down){
       this.level.player.onGround = true;
    }
};

marioBros.brickFlowerOrMushroomPrefab.prototype.createObject = function() {
    if(this.isCollisioned == true) {
        if(!this.level.player.bigMario){
            this.mushroom = new marioBros.mushroomPrefab(this.game,this.x,this.y-16,this.level); 
            this.game.add.existing(this.mushroom);
            this.mushroom.body.velocity.y -= 250;
            this.mushroom.body.velocity.x += 100;
        }
        else{
         this.flower = new marioBros.flowerPrefab(this.game,this.x,this.y-16,this.level);
         this.game.add.existing(this.flower);
        }
        
    }
};

marioBros.brickFlowerOrMushroomPrefab.prototype.update = function(){
    if(!this.isCollisioned){
        if(this.typeOfBlock == 'type1'){
            this.animations.play('normalBrickFlowerOrMushroom');
        }
        else if(this.typeOfBlock == 'type2'){
            this.animations.play('normalBrickFlowerOrMushroomType2');
        }
    } 
    else{
        if(this.typeOfBlock == 'type1'){
            this.animations.play('collisionedBrickFlowerOrMushroom');
        }
        else if(this.typeOfBlock == 'type2'){
            this.animations.play('collisionedBrickFlowerOrMushroomType2');
        }
    }
};

