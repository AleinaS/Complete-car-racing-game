class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef= await database.ref('playerCount').once("value")
      if(playerCountRef.exists()){
        playerCount=playerCountRef.val();
        player.getCount();
      }
     
      form = new Form()
      form.display();

      car1=createSprite(100,200);
      car1.addImage("car1",car1IMG);
      car2=createSprite(300,200);
      car2.addImage("car2",car2IMG);
      car3=createSprite(500,200);
      car3.addImage("car3",car3IMG);
      car4=createSprite(700,200);
      car4.addImage("car4",car4IMG);
      cars=[car1,car2,car3,car4];

    }
  }

  
  play(){
    form.hide();
    textSize(30);
    text("GAME START",120,100);
    Player.getPlayerInfo();
    player.getRank();
    if(allPlayers!==undefined){
      image(trackIMG,0,-displayHeight*10,displayWidth,displayHeight*11);
      var index=0;
      var x =100;
      var y;
      
      var display_position=130;
      //reading the players from allPlayers array
      //allPlayer[0] = player1
      //cars[0] = car1
      for(var plr in allPlayers){
        index = index + 1
        x = x + 200;
        y = displayHeight - allPlayers[plr].distance;

        cars[index - 1].x = x;
        cars[index - 1].y = y;

        if (index === player.index){
          camera.position.x = displayWidth/2;
          camera.position.y =  cars[index - 1].y
          fill("black")
          ellipse(x,y,80,100);
        }
       

        if(plr==="player"+player.index )
        fill("red")
        else
        fill("black")
      
      display_position += 20;
      textSize(15);
      text(allPlayers[plr].name+":"+allPlayers[plr].distance,120,display_position);
    }
  }
  if(keyIsDown(UP_ARROW)&&player.index!==null){
    player.distance+=50
    player.update()
    
  }

  if(player.distance>=8000){
    gameState=2;
    player.rank=player.rank+1
    player.update();
    player.updateRank(player.rank);
  }

  drawSprites();
  
  
  
}

end(){
  console.log("GAME OVER");
}

showLeaderBoard(){
  background(255);
  var leaderBoard = createElement('h2');
  leaderBoard.position(displayWidth/2-50, 50);
  leaderBoard.html("Leaderboard");
  leaderBoard.style("color", 'blue');
  
  
  var ranks = [];

  for (var p in allPlayers){
    ranks.push({name : allPlayers[p].name,
                rank: allPlayers[p].rank})
  }

  var y = 200;
  for (var r in ranks){
      var tile = createElement('h2');
      tile.position(displayWidth/2, y);
      
      y = y + 100;

      ranks.sort(function(a,b){
        return a.rank - b.rank;
      });


      tile.html(ranks[r].name + " : " + ranks[r].rank)
  }

}
}


