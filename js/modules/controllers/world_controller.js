/**
 * @author Kate Compton
 */

// Create the way that the game will render on-screen

define(["modules/models/vector", "jQueryUITouchPunch", "jQueryHammer"], function(Vector, $) {
    var maxHistory = 50;
    return (function() {

        // Attach mouse events to the world window
        var worldDiv = $("#world_canvas");
        var touch = {
            lastPressed : new Vector(0, 0),
            lastReleased : new Vector(0, 0),
            dragOffset : new Vector(0, 0),
            lastOffset : new Vector(0, 0),

            // History function
            history : [],
            historyIndex : 0,
            getHistory : function(stepsBack) {
                var index = (this.history.length + this.historyIndex - stepsBack) % this.history.length;
                return this.history[index];
            },

            getOffsetToHistory : function(stepsBack) {
                var p = this.getHistory(stepsBack);

                return this.currentPosition.getOffsetTo(p);
            },

            currentWorldPosition : new Vector(0, 0),
            currentPosition : new Vector(0, 0),
            center : new Vector(0, 0),
            overObjects : [],

            toWorldPosition : function(p) {
                return worldView.toWorldPosition(p);

            },

            transformScreenToWorld : function(p) {
                return worldView.transformScreenToWorld(p);

            },

            pressed : false,
        };

        for (var i = 0; i < maxHistory; i++) {
            touch.history[i] = new Vector(0, 0, 0);
        }

        var worldView;

        var setWorldView = function(view) {
            worldView = view;
            touch.center.setTo(view.dimensions.width / 2, view.dimensions.height / 2);

            touch.setoWorldPosition = worldView.setoWorldPosition;

        };

        var controlUpdateFunction = [];

        var onControl = function(f) {
            controlUpdateFunction.push(f);
        };

        var initTouchFunctions = function() {

            worldDiv.click(function(e) {
                var p = toRelative(this, e);

            });

            worldDiv.mousemove(function(e) {

                var w = worldView.dimensions.width;
                var h = worldView.dimensions.height;

                var p = toRelative(this, e);
                // Find the offset since the last movement
                touch.lastOffset.setTo(p[0] + touch.currentPosition.x, p[1] + touch.currentPosition.y);
                touch.currentPosition.setTo(p[0] - w / 2, p[1] - h / 2);
                touch.currentWorldPosition.setTo(touch.currentPosition);
                touch.transformScreenToWorld(touch.currentWorldPosition);

                touch.historyIndex = (touch.historyIndex + 1) % maxHistory;
                touch.history[touch.historyIndex] = touch.currentPosition.clone();

                touch.overObjects = worldView.getTouchableAt(touch.currentPosition);

                if (touch.pressed) {

                    touch.dragOffset.setTo(-touch.lastPressed.x + p[0], -touch.lastPressed.y + p[1]);
                    if (touch.activeTool !== undefined) {
                        touch.activeTool.touchDrag(touch);

                    }

                } else {
                    touch.activeTool.touchMove(touch);

                }
                controlUpdated();

            });

            worldDiv.mouseup(function(e) {
                touch.pressed = false;
                var p = toRelative(this, e);
                touch.dragOffset.mult(0);
                touch.lastReleased.setTo(p[0], p[1]);

                // If there is an active tool, pass the event to it
                if (touch.activeTool !== undefined) {
                    touch.activeTool.touchUp(touch);
                }
            });

            worldDiv.mousedown(function(e) {
                touch.pressed = true;
                var p = toRelative(this, e);
                touch.lastPressed.setTo(p[0], p[1])

                if (touch.activeTool !== undefined) {
                    touch.activeTool.touchDown(touch);
                }

            });

            var hammertime = worldDiv.hammer();

        };

        var controlUpdated = function() {
            $.each(controlUpdateFunction, function(index, f) {
                f.call(undefined, touch);
            });
        };

        var toRelative = function(div, e) {

            //   var parentOffset = $(div).parent().offset();
            var parentOffset = $(div).offset();
            //or $(this).offset(); if you really just want the current element's offset
            var relX = e.pageX - parentOffset.left;
            var relY = e.pageY - parentOffset.top;
            return [relX, relY];
        };

        //=======================================================
        // Initialize the world controller

        console.log("START UNIVERSE CONTROLLER");

        // Make the touch accessible from anywhere (but use sparingly!)
        var init = function() {
            pegasysGame.touch = touch;
            initTouchFunctions();
        };

        return {
            init : init,
            onControl : onControl,
            setWorldView : setWorldView,

        };
    })();

});
