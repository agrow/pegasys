/**
 * @author Kate Compton
 */

// Its the World!

define(["modules/models/vector", "kcolor", "particleTypes"], function(Vector, KColor, particleTypes) {

    return (function() {

        var backgroundStars = [];
        var backgroundLayers = 3;
        var backgroundStarDensity = 10;

        var camera;


        var toAdd = [];

        // These stars loop
        function makeBackgroundStars() {
            for (var i = 0; i < backgroundLayers; i++) {
                backgroundStars[i] = [];
                var starCount = backgroundStarDensity * (backgroundLayers - i);
                pegasysGame.statistics.bgStarCount += starCount;
                
                for (var j = 0; j < starCount; j++) {
                    var color = new KColor(Math.random(), 1, 1);
                    backgroundStars[i][j] = [Math.random() * 800, Math.random() * 800, Math.random() * .2, Math.random() * 10 + 2, color];
                }
            }
            console.log("made background stars");
        };

        function drawBackgroundStars(g) {
            var cameraPosition
            g.noStroke();
            for (var i = 0; i < backgroundLayers; i++) {

                for (var j = 0; j < backgroundStars[i].length; j++) {

                    var x = backgroundStars[i][j][0];
                    var y = backgroundStars[i][j][1];
                    var r = backgroundStars[i][j][3];
                    var color = backgroundStars[i][j][4];

                    // Offset the position
                    var z = i + 5 + backgroundStars[i][j][2];
                    r *= .2 * i * Math.pow(z, .5);
                    var parallax = .1 * (z + .01);
                    x -= camera.angle.x * parallax;
                    y -= camera.angle.y * parallax;
                    x -= camera.center.x * parallax;
                    y -= camera.center.y * parallax;

                    // loop around the edges
                    x = (x % g.width);
                    y = (y % g.height);
                    if (x < 0)
                        x += g.width;
                    if (y < 0)
                        y += g.height;
                    x -= g.width / 2;
                    y -= g.height / 2;

                    //  g.fill(.1 + .32 * i, .5, 1, .3);
                    color.fill(g, 0, -.8);
                    g.ellipse(x, y, r, r);
                    g.fill(1, 0, 1);
                    g.ellipse(x, y, r * .1 + 1, r * .1 + 1);

                }
            }

            g.fill(1, 0, 1, .3);

        };

        // Draw the worlds background
        // May be camera-dependent, eventually
        function draw(g, options) {

            if (options.layer === 'bg') {
                drawBackgroundStars(g);
            }

            if (options.layer === 'overlay') {
                g.pushMatrix();
                g.translate(-camera.center.x, -camera.center.y);
                //  quadTree.drawTree(g);
                g.popMatrix();
            }

        }

        function generateStartRegion() {
            generateRegion({
                center : camera.center,
                w : 3000,
                h : 1500
            });
        };

        function generateOffscreen() {

        }

        function generateRegion(region) {

            console.log("GENERATE REGION");
            
            // Pick some random locations in the region
            var density = .003;
            var count = Math.ceil(region.w * region.h * density * density);
            console.log(count);
            var w2 = region.w / 2;
            var h2 = region.h / 2;
            var p = new Vector();
            for (var i = 0; i < count; i++) {
                p.setTo(utilities.random(-w2, w2) + region.center.x, utilities.random(-h2, h2) + region.center.y);

                var obj;

                if (Math.random() > .5) {
                    
                } else {
                    //console.log("3");
                    obj = new particleTypes.Critter();
                }
                obj.position.setTo(p);

                spawn(obj);
            }

        }

        function spawn(object) {
            toAdd.push(object);
            //quadTree.insert(object);
        }

        function update(time) {
            pegasysGame.time.worldTime = time.total;

            var theta = 10 * Math.sin(.01 * time.total);
            camera.center.addMultiple(camera.scrollingMovement, time.ellapsed);
            camera.scrollingMovement.mult(.98);

            utilities.debugOutput("Camera center: " + camera.center);
            //utilities.debugOutput("Camera scrollingMovement: " + camera.scrollingMovement);
            //utilities.debugOutput("time.ellapsed: " + time.ellapsed);
            utilities.debugOutput("Current tool: " + pegasysGame.touch.activeTool);

            //quadTree.cleanup();
        };

        function init() {
            console.log("INIT UNIVERSE");
            initStatistics();

            camera = {
                angle : new Vector(0, 0, 0),
                center : new Vector(0, 0, 0),
                zoom : 1,
                scrollingMovement : new Vector(20, 0, 0),

            };

            makeBackgroundStars();
            generateStartRegion();
        };
        
        function initStatistics() {
        	
        };

        function getCamera() {
            console.log(camera);
            return camera;
        }

        function addScrollingMovement(v) {
            camera.scrollingMovement.addMultiple(v, 1);

        }

        return {
            draw : draw,
            spawn : spawn,
            update : update,
            getCamera : getCamera,
            addScrollingMovement : addScrollingMovement,
            init : init,
        };

    })();

});