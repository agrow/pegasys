/**
 * @author April Grow
 */

// Its the UI Manager!

define(['modules/views/game_view', "modules/models/ui/popup", "modules/models/ui/popupContents"], function(gameView, Popup, PopupContents) {

    return (function() {
    	var playerInventory;
    	var infoScreen;

        function init() {
            console.log("INIT UI");


            makeInventoryPopup();
            makeMainMenu();
        };
        
        function makeInventoryPopup() {
        	playerInventory = new Popup("#world");
        	
	        var worldHeight = gameView.worldView.dimensions.height;
	        
	        playerInventory.addState("closed", 0, 0, 20, worldHeight, 0.1);
	        playerInventory.addState("open", 0, 0, 150, worldHeight, 1);
	        playerInventory.addTransition("open", "closed", "mouseleave", true);
	        playerInventory.addTransition("closed", "open", "mousedown", true);
	        playerInventory.setState("closed");

	        
	    };
	    
	    function makeMainMenu() {
	    	infoScreen = new Popup("#world");
	    	
	    	var worldWidth = gameView.worldView.dimensions.width;
	    	var worldHeight = gameView.worldView.dimensions.height;
	    	
	    	infoScreen.addState("closed", worldWidth-40, 0, 20, 20, 0.5);
	    	infoScreen.addState("open", 20, 20, worldWidth-50, worldHeight-50, 1);
	    	//infoScreen.addTransition("open", "closed", "click");
	    	infoScreen.addTransition("closed", "open", "click", false);
	    	infoScreen.setState("closed");
	    	infoScreen.addCloseDiv();
	    	
	    	var menu = new PopupContents();
	    	infoScreen.addContents("menu", menu);
	    	
	    	var stats = new PopupContents();
	    	stats.initStatisticsHTMLHolder();
	    	infoScreen.addContents("stats", stats);
	    };
	    
	    function generateWorldStatistics(){
	    	
	    };
	    
	    function getPlayerInventory() {
	    	return playerInventory;
	    };

        return {
            init : init,
            getPlayerInventory : getPlayerInventory
        };

    })();

});
