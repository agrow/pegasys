/**
 * @author Kate Compton
 */

// ToolInventory class
// Contains tools, elements, etc

define(["kcolor", "modules/models/vector", "particleTypes", "toolTypes"], function(KColor, Vector, particleTypes, toolTypes) {
    return (function() {
        var universe;
        //===========================================================
        //===========================================================

        // Make the ToolInventory class
        function ToolInventory() {
            var toolToolInventory = this;
            this.tools = [];

            // What should go in the toolToolInventory
            var moveTool = new toolTypes.Move(this, "Move", "move");
            this.defaultTool = moveTool;
            this.addTool(moveTool);

            var spawnables = [{
                name : "Star",
                constructor : particleTypes.Star,
                spacing : 50
            }];

            $.each(spawnables, function(index, spawnable) {
                var spawnTool = new toolTypes.Spawn(toolToolInventory, "Spawn " + spawnable.name, "spawn" + "_" + spawnable.name);
                toolToolInventory.addTool(spawnTool);

            });

            this.defaultTool.activate();
        };

        // Shared class attributes
        ToolInventory.prototype = {

            // A method to add tools
            addTool : function(tool) {
                this.tools.push(tool);
            },

            setActiveTool : function(tool) {
                pegasysGame.touch.activeTool = tool;
            },

            activateDefaultTool : function() {
                this.defaultTool.activate();
            },

            //===========================================================
            //===========================================================
            // View stuff

            createPaletteDiv : function(parent) {
                var palette = $('<div/>', {
                    html : "Palette<br>",
                    "class" : "palette",
                });
                parent.append(palette);

                // add all the tool buttons
                $.each(this.tools, function(index, tool) {
                    palette.append(tool.createPaletteButton(palette));

                });

            },

            //===========================================================
            //===========================================================

            toString : function() {
                return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.z.toFixed(2) + ")";
            },
        };

        return ToolInventory;
    })();

});
