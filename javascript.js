BALLS_INITIAL_POSITION = {
	".kecik5": "96px",
	".kecik4": "192px",
	".kecik3": "212px",
	".kecik2": "232px",
	".kecik1": "252px"
};

BALLS_SECOND_POSITION = {
	".kecik4": "263px",
	".kecik3": "283px",
	".kecik2": "303px",
	".kecik1": "323px"
};



$(document).ready(function(){
	var idStr = "";
	var numId = "";
	var imgId = "";

	var baseBottomValue = "";
    var newBottomValue = "";
	var number = 0;

	var expressionArray = [];
	var expression = "";
		
	

	

	function move () {      	

    	if (numId==5){        		        
       		if ($(imgId).css("bottom") === "96px"){
       			$(imgId).css("bottom", "56px");
       			number += parseInt(numId)*Math.pow(10, idStr[3]);
       		} else {
       			$(imgId).css("bottom", "96px");
       			number -= parseInt(numId)*Math.pow(10, idStr[3]);
       		}
    	}
    	    	
        
    
    	if ($(imgId).css("bottom") !== newBottomValue){
            for (var i = numId; i < 5; i++){   

            	imgId = "#" + idStr.slice(0, idStr.length-1) + i;
            	baseBottomValue = BALLS_INITIAL_POSITION[".kecik"+i];
            	newBottomValue = BALLS_SECOND_POSITION[".kecik"+i];

            	if ($(imgId).css("bottom") !== newBottomValue){
            		$(imgId).css("bottom", newBottomValue);
            		number += Math.pow(10, idStr[3]); 		            		
            	}            	
            } 
        }else{
            for (var i = numId; i > 0; i--) {   

            	imgId = "#" + idStr.slice(0, idStr.length-1) + i;
            	baseBottomValue = BALLS_INITIAL_POSITION[".kecik"+i];           	   

            	if ($(imgId).css("bottom") !== baseBottomValue){
            		$(imgId).css("bottom", baseBottomValue); 
            		number -= Math.pow(10, idStr[3]); 
            	}            	
        	}
        }    
    }

    function printNumber () {
		$("#number").text(expression+number); 
        console.log(expression+number);   
	}

	function clean(){
		for (var i = 0; i < 11; i++) {  
    			for (var j = 0; j <6; j++) { 
    				imgId = "#col" + i + "-" + j;
    				$(imgId).css("bottom", BALLS_INITIAL_POSITION[".kecik"+j]);
    			}
    		}
    	number = 0;    	
	}

	function expressionJoin(){
		expression = expressionArray.join("");
	}

	function resultPosition(result){	
		if (parseInt(result)>0 && result.length < 10) {
			result = result.split("").reverse().join("");

			for (var i = 0; i < result.length; i++) {
				var counter = 0; 
				if (parseInt(result[i])>4){
					counter +=5;
					imgId = "#col" + i + "-5";				
					$(imgId).css("bottom","56px");
				}
				for (var j = 4; j > 0; j--) {							
					if (counter<parseInt(result[i])){
						imgId = "#col" + i + "-" + j;
						$(imgId).css("bottom", BALLS_SECOND_POSITION[".kecik"+j]);
						counter += 1;
					}			
				}
			}
		};			
		$('#framework img').off("click");
		$('#framework img').css("cursor", "default");
		$('#operators .sing').css("cursor", "default");

	}

	function operation(){
		switch (idStr){
			case "clean":	
				$('#framework img').css("cursor", "pointer");
				$('#operators .sing').css("cursor", "pointer");
				$('#framework img').on({    	
			        'click': function (){
			        	idStr = this.id;
			        	numId = idStr.slice(-1);
			        	imgId = "#" + idStr;

			        	baseBottomValue = BALLS_INITIAL_POSITION[".kecik"+numId];
				        newBottomValue = BALLS_SECOND_POSITION[".kecik"+numId];
			        	
					    move();
					    printNumber();
					}	          
				});
				clean();      		
				expression = "";  
				expressionArray = []; 
				$("#number").text("0");          		  		
				break;  
			case "add":  
				expressionArray.push(number+"+");
				expressionJoin();        			
				clean();    
				$("#number").text(expression);   		        		
				break;
			case "extract":
				expressionArray.push(number+"-"); 
				 expressionJoin();        			
				clean();    
				$("#number").text(expression);  
				break;
			case "multiply":
				expressionArray.push(number+"*");
				expressionJoin();        			
				clean();    
				$("#number").text(expression);  
				break;
			case "divide":
				expressionArray.push(number+"/");
				expressionJoin();        			
				clean();    
				$("#number").text(expression);  
				break;
			case "result": 
				var result = 0;      		
				if (number==0){	
					result = eval(expression.slice(0,-1))				
					$("#number").text(result);			
				} else {
					result = eval(eval(expression + number))				
					$("#number").text(result);	
				}
				clean();				
				expression = "";  
				expressionArray = [];
				resultPosition(result.toString());				
				break; 	
		}        
	}
    
    $('#framework img').on({    	
        'click': function (){
        	idStr = this.id;
        	numId = idStr.slice(-1);
        	imgId = "#" + idStr;

        	baseBottomValue = BALLS_INITIAL_POSITION[".kecik"+numId];
	        newBottomValue = BALLS_SECOND_POSITION[".kecik"+numId];
        	
		    move();
		    printNumber();
		}	          
	});	


	
	

	$('#operators img').on({
        'click': function (){ 
        	idStr= this.id;        	
	        
	        operation();
	        	 
        	      
	        if (expression.length>23){
	        	$("#number").text("Operasi terlalu besar");	        	
        		clean();      		
				expression = "";  
				expressionArray = []; 		        	
	        }        
	    }        	
	});
	
})