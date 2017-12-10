marioBros.piranyaPrefab = function(game,x,y,level,typeOfPiranya, posOverPipe)
{
    this.level = level;
    this.typeOfPiranya = typeOfPiranya;
    this.posOverPipe = posOverPipe;
    
    if(this.typeOfPiranya == 'green'){
        Phaser.Sprite.call(this,game,x,y,'piranyaGreen');
    }
    else if(this.typeOfPiranya == 'blue'){
       Phaser.Sprite.call(this,game,x,y,'piranyaBlue');     
    }
    
    this.animations.add('eat',[0,1],5,true);
    
    
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(.5,.5);
    if(this.typeOfPiranya == 'green'){
        this.position.y = 200;
    }
    this.animations.play('eat');
    this.speed = 10;
   
    this.diePiranya = false;
   
    this.playerVisible = false;
   
    this.timeCheck;
    this.timeInit;
    this.timeInitChangeToSmall;
    this.changeToSmall = false;
   
    this.collGraphicLayer;
    this.score;
    this.fireBallColl = false;
    this.dieStarPiranya = false;
   
    if(this.typeOfPiranya == 'blue'){
        this.tween = game.add.tween(this.position).to( { y: this.posOverPipe.y-8 }, 4000, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
    }
    else if('green'){
        this.tween = game.add.tween(this.position).to( { y: this.posOverPipe.y-8 }, 4000, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);     
    }
};
marioBros.piranyaPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.piranyaPrefab.prototype.constructor = marioBros.piranyaPrefab;

marioBros.piranyaPrefab.prototype.update = function(){
    
    
    this.tween.repeat(-1);
        
    //parte izquierda camara
    if(this.x <= this.game.camera.x-16){
        this.kill();
    }
    this.timeCheck = this.game.time.now;    
    
   
    //this.collGraphicLayer = this.game.physics.arcade.collide(this,this.level.graphicLayer);

    
    if(!this.diePiranya){
        if(!this.dieStarPiranya && !this.level.player.die){
            this.collPlayerPiranya = this.game.physics.arcade.overlap(this, this.level.player,this.collisionPlayerPiranya, null, this);
        }

    }else{
        if(this.timeCheck>= this.timeInit + 20){
            this.kill();
        }
    }
    
    //tiempo de invulnerabilidad al pasar de grande a pequeño
    if(this.timeCheck>= this.timeInitChangeToSmall + 2000 && this.changeToSmall){
        this.changeToSmall = false;
    }
    
    if(this.game.physics.arcade.distanceBetween(this, this.level.player) < 400 || this.playerVisible){
        if(!this.playerVisible){
           this.playerVisible = true;
        }
        
        //this.body.velocity.x = this.speed * this.direction;
    
        
    }
    
};



marioBros.piranyaPrefab.prototype.collisionPlayerPiranya = function() {
    
    if(!this.level.player.marioStar){
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
        
    }
    if(this.level.player.marioStar){
        this.kickSound = this.game.add.audio('kick');
        this.kickSound.play();
        this.dieStarPiranya = true;
        gameOptions.score +=500;
        changeHUD = true;
        this.dieAnimation();
    }
    
   
};

marioBros.piranyaPrefab.prototype.dieAnimation = function() {
    this.animations.stop();
    this.timeInit = this.game.time.now;
    this.diePiranya = true;
    changeHUD = true;
};