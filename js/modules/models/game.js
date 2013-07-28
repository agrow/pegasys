/**
 * @author Kate Compton
 */

// Organize the game
// Singleton pattern from here: http://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-singleton-in-javascript

define(['modules/views/game_view', 'modules/controllers/game_controller', 'modules/models/world', 'modules/models/ui/toolInventory', 'modules/models/ui/uiManager'], function(gameView, gameController, world, toolInventory, uiManager) {
    var game = {};

    var startGame = function() {
        // Make this into a global object

        world.init();
        pegasysGame.world = world;

        game.view = gameView;
        console.log("START GAME");

        // Hook the world view to the world, so it knows what to draw
        gameView.worldView.setWorld(world);

        gameView.worldView.onUpdate(function(time) {
            world.update(time);

        });

        // Give the game controller access to the world view so that it
        //  can find objects by screen position
        gameController.worldController.setWorldView(gameView.worldView);
        gameController.worldController.init();

        game.toolInventory = new toolInventory(world);
        game.toolInventory.createPaletteDiv($("#controls"));
		
		uiManager.init();
		
        pegasysGame.ready = true;

    };

    return {
        startGame : startGame,
    };

});
