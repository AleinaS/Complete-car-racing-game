class Form {
  constructor() {
    this. input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h3');
    this.reset = createButton('Reset');

  }
  hide(){
    this.input.hide();
    this.button.hide();
    this.greeting.hide();
  }

  display(){
    var title = createElement('h2')
    title.html("Car Racing Game");
    title.position(130, 0);
    
    
    
   this.input.position(130, 160);
   this.button.position(250, 200);
   this.reset.position(100, 200);

   this.reset.mousePressed(()=>{
      game.update(0);
      player.updateCount(0);
      database.ref('players').remove();
   })

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
    
 player.name = this.input.value();
      
      playerCount+=1;
      player.index=playerCount;
      player.update();
      player.updateCount(playerCount);
      
     this. greeting.html("Hello " + player.name )
      this.greeting.position(130, 100)
    });

  }
}
