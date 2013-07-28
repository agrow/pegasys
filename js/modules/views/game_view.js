/**
 * @author Kate Compton
 */

// It's using a singleton pattern

define(["modules/views/world_view"], function(worldView) {
    return (function() {

        console.log("Init game view");
        // Private functions

        function initializeUI() {
        
        };
        initializeUI();

        return {
            // public interface: these attributes are visible in the returned object
            worldView : worldView,
        };
    })();

});

