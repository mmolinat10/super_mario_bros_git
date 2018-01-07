var textRankingStrings = [];
var dataJson;
var doneAjax = false;
marioBros.ranking = function (game) {

    this.spaceKey;
    this.cursors;
    this.escape;
};

marioBros.ranking.prototype = {

    create: function () {
         
        
        $.ajax({
            data:'',
            url: 'php/operacion_consulta.php',
            
            success: function(datos){
                dataJson = JSON.parse(datos);
                
                for(var i in dataJson){
                    var lifes = dataJson[i].lifes;
                    var coins = dataJson[i].coins;
                    var score = dataJson[i].score;
                    var time = dataJson[i].time;
                    
                    if(numDigits(lifes) == 1){
                        lifes = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + lifes;
                    }
                    else if(numDigits(lifes) == 2){
                        lifes = "\t\t\t\t\t\t\t\t\t\t\t\t" + lifes;    
                    }
                    else if(numDigits(lifes) == 3){
                        lifes = "\t\t\t\t\t\t\t\t\t\t" + lifes;    
                    }
                    
                    if(numDigits(coins) == 1){
                        coins = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + coins;    
                    }
                    else if(numDigits(coins) == 2){
                        coins = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + coins;    
                    }
                    else if(numDigits(coins) == 3){
                        coins = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + coins;     
                    }
                    else if(numDigits(coins) == 4){
                        coins = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + coins;    
                    }
                    else if(numDigits(coins) == 5){
                        coins = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + coins;    
                    }
                    else if(numDigits(coins) == 6){
                        coins = "\t\t\t\t\t\t\t\t\t\t\t\t\t" + coins;    
                    }
                    
                    if(numDigits(score) == 1){
                        score = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + score;    
                    }
                    else if(numDigits(score) == 2){
                        score = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + score;    
                    }
                    else if(numDigits(score) == 3){
                        score = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + score;    
                    }
                    else if(numDigits(score) == 4){
                        score = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + score;    
                    }
                    else if(numDigits(score) == 5){
                        score = "\t\t\t\t\t\t\t\t\t\t\t\t\t" + score;    
                    }
                    else if(numDigits(score) == 6){
                        score = "\t\t\t\t\t\t\t\t\t\t\t\t" + score;    
                    }
                    
                    if(numDigits(time) == 1){
                        time = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + time;    
                    }
                    else if(numDigits(time) == 2){
                        time = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + time;    
                    }
                    else if(numDigits(time) == 3){
                        time = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + time;   
                    }
                    
                    
                    textRankingStrings.push(lifes + coins + score + time);
                }
                
            
            },
            error: function (obj, error, objError){
            //avisar que ocurrió un error
            },
            complete: function (data) {
                doneAjax = true;
            }
        });   
        
        this.game.stage.backgroundColor = '#4e4845';
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.escape = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    },

    update: function () {
        if(this.escape.isDown){
            this.startMenu();
        }
        if(doneAjax){
            this.add.text(this.game.width/2-20, 5, "TOP 10", titleRanking);
            this.add.text(35, 30, "Pos\t\t\t\t\t\tLifes\t\t\t\t\t\t\tCoins\t\t\t\t\t\t\tScore\t\t\t\t\t\t\tTime", subtitleRanking);
            this.add.text(40, 45, "1."+textRankingStrings[0], styleRanking);
            this.add.text(40, 60, "2."+textRankingStrings[1], styleRanking);
            this.add.text(40, 75, "3."+textRankingStrings[2], styleRanking);
            this.add.text(40, 90, "4."+textRankingStrings[3], styleRanking);
            this.add.text(40, 105, "5."+textRankingStrings[4], styleRanking);
            this.add.text(40, 120, "6."+textRankingStrings[5], styleRanking);
            this.add.text(40, 135, "7."+textRankingStrings[6], styleRanking);
            this.add.text(40, 150, "8."+textRankingStrings[7], styleRanking);
            this.add.text(40, 165, "9."+textRankingStrings[8], styleRanking);
            this.add.text(36, 180, "10."+textRankingStrings[9], styleRanking);
            doneAjax = false;
        }
    },

    startMenu: function () {

        this.state.start('menu');
    },
    
    
    
};

function numDigits(x) {
  return (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;
}