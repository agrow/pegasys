/**
 * @author Kate
 */

// UParticle-inherited class

define(["modules/models/vector", "uparticle"], function(Vector, UParticle) {
    return (function() {

        var MyParticle = UParticle.extend({

            init : function(world) {
                this._super(world);

            },

            drawBackground : function(g, options) {
                

            },

            drawMain : function(g, options) {
                

            },

            drawOverlay : function(g, options) {

            },

            update : function(time) {
                this._super(time);
            }
        });

        return MyParticle;
    })();

});
