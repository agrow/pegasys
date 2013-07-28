/**
 * @author April
 */

// UParticle-inherited class

define(["inheritance", "modules/models/vector", "uparticle"], function(Inheritance, Vector, UParticle) {
    return (function() {
    	var htmlCount = 0;
    	
    	// ========================================
    	// View stuff
    	
    	function wrapStatisticsIntoHTML(divID){
    		var html = "";
    		var div = $("#" + divID);
    		
    		html += "STUFFFF"
    		
    		div.html(html);
    		//console.log("Setting html");
    		//console.log(div);
    	};
    	
    	function emptHTMLContents(divID){
    		var div = $("#" + divID);
    		div.html = "";
    	};
    	
    	// =========================================
    	

        var PopupContents = Class.extend({

            init : function() {
				//console.log("a set of popupContents initiated");
            	
            },

            
            initStatisticsHTMLHolder : function() {
            	this.liveHTMLHolder = true;
            },

            
            // Gets set when added to a popup: generally after initation?
            setParentDivID : function (str) {
            	this.parentDivID = str;
 				if (this.liveHTMLHolder !== undefined) {
            		this.htmlHolderID = this.parentDivID + "_html" + htmlCount;
            		
            		htmlCount++;
            		
            		// ========================================
    				// View stuff
    				
    				var id = this.htmlHolderID;
    				var options = {
		                "id" : this.htmlHolderID
		            };
		            
					var div = $('<div/>', options);
					var parent = $("#" + this.parentDivID)
					parent.append(div); 
					
					setInterval(function(){wrapStatisticsIntoHTML(id)},1000);
    				
    				// ========================================
            		
            	}
            	// grab the div and do some fancy insertions?!?!?!?
            	// Or grab the view and do it there
            },

            
        });

        return PopupContents;
    })();

});
