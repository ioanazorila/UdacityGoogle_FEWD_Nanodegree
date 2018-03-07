///////////////////////// Common functions and event listeners /////////////////////////


function makeGrid(r, c) {

	// This allows the makeGrid function to be called with arguments (50,50) to draw 50x50 grid
	// Or with "fake" arguments (0,0) to read height and width from user input
	let row = (r > 0) ? r : $("#input_height").val();
	let column = (c > 0) ? c : $("#input_width").val();
	
	// Get table element for pixel art
	const table = $("#pixel_canvas");

	// Mouse button down?
	let isDown = false;
	
	let colour;

	// Remove existing table from webpage
	table.children().remove();

	// Draw new table
	for (let i = 0; i < row; i++) {
		table.append("<tr></tr>");                    		// Add new line to table
		for (let j = 0; j < column; j++) {
			table.children().last().append("<td></td>").css("background-color", "white");		// Add new cell on line i, override CSS background colour
		}
	}

	// Listen for mouse button pressed
	table.on("mousedown", function() {
		isDown = true;
	});

	// Listen for mouse button released
	table.on("mouseup", function() {
		isDown = false;
	});

	// Draw coloured pixel - listen for click on a single cell
	table.on("click", "td", function() {
		colour = $("input[type='color']").val(); 			// Read selected colour
		$(this).css("background-color", colour);            // Apply colour to cell that was clicked
	});
	
	// Draw coloured line - listen for hover with mouse button pressed
	table.on("mouseover", "td", function() {
		if (isDown) {
			colour = $("input[type='color']").val(); 		// Read selected colour
			$(this).css("background-color", colour);        // Apply colour to cell that was hovered over
		}
	});
	
}


function clearGrid() {
	$("td").each(function() {
		$(this).css("background-color","white");			// Set background colour to white on each cell
	});	
}

		
// Listen for click on Submit button
$(".leftSide").on("click","input[name='submit']",function(evt) {
	evt.preventDefault();                           		// Prevent page reload on Submit
	makeGrid(0,0);                                     		// Call makeGrid function
});



/////////////////////////////////////// Classic mode ///////////////////////////////////////


function drawClassic() {
	
	// Remove existing elements from top and bottom (leftSide, rightSide) of page
	const selectMode = $("#mode");
	selectMode.nextAll().remove();
	const leftSide = $(".leftSide");
	leftSide.children().remove();
	const rightSide = $(".rightSide");
	rightSide.children().remove();
	
	// Insert elements and format the left side menu
	const h2_1 = $("<h2>Choose Grid Size</h2>");
	const sizePicker = $("<form id='sizePicker'></form>");
	const heightPicker = $("<p>Grid Height: <input type='number' id='input_height' name='height' min='1' value='1'></p>");
	const widthPicker = $("<p>Grid Width: <input type='number' id='input_width' name='width' min='1' value='1'></p>");
	const submitButton = $("<input type='submit' id='submit' name='submit'>");	
	const h2_2 = $("<h2>Pick A Colour</h2>");
	const colorPicker = $("<input type='color' id='colorPicker'>");
	const clearButton = $("<p><input type='submit' id='clear' name='clear' value='Clear canvas'></p>");	
	
	leftSide.append(h2_1);
	sizePicker.insertAfter(h2_1);
	sizePicker.append(heightPicker);
	widthPicker.insertAfter(heightPicker);
	submitButton.insertAfter(widthPicker);
	h2_2.insertAfter(sizePicker);
	colorPicker.insertAfter(h2_2);
	clearButton.insertAfter(colorPicker);
	leftSide.css("width", "25%").css("text-align","center");
	
	// Insert elements and format the right side canvas
	const h2_3 = $("<h2>Design Canvas</h2>");
	const canvas = $("<table id='pixel_canvas'></table>");
	
	rightSide.append(h2_3);
	canvas.insertAfter(h2_3);
	rightSide.css("width","75%");
	
	// Restore the original background image for the entire page
	const body = $('body');	
	body.css("background-image", "url('" + pathToImg + "2.jpg')").css("background-size", "auto");
		
}


// Listen for click on Classic mode button
$("input[name='classic']").on("click",function(evt) {
	evt.preventDefault();									// Prevent page reload on Submit
	drawClassic();											// Insert additional elements for Classic mode
});


// Listen for click on Classic mode Clear button
$(".leftSide").on("click","input[name='clear']",function(evt) {
	evt.preventDefault();                           		// Prevent page reload on Submit
	clearGrid();                                     		// Clear grid
});



///////////////////////// Italian Challenge and Christmas Challenge mode /////////////////////////


let currentMode = "";										// Required to keep track of the mode selected by user (italian or christmas)
const pathToImg = "http://i482.photobucket.com/albums/rr188/evanescenta/";	// Images on webpage are stored here


function drawItalian() {
	
	// Remove existing elements from top and bottom (including leftSide, rightSide) of page
	const selectMode = $("#mode");
	selectMode.nextAll().remove();
	const topMenu = $("<div></div>");
	const leftSide = $(".leftSide");
	leftSide.children().remove();
	const rightSide = $(".rightSide");
	rightSide.children().remove();
	
	// Insert elements for top menu
	const h2 = $("<h2>Pick A Colour</h2>");
	const colorPicker = $("<input type='color' id='colorPicker'>");
	const newChallenge = $("<input type='submit' id='challenge' name='challenge' value='New challenge'>");	
	const clearButton = $("<input type='submit' id='clear' name='clear' value='Clear canvas'>");
	const showSolution = $("<input type='submit' id='show' name='show' value='Show solution'>");
	
	topMenu.insertAfter(selectMode);
	topMenu.append(newChallenge);
	clearButton.insertAfter(newChallenge);
	showSolution.insertAfter(clearButton);
	h2.insertAfter(showSolution);
	colorPicker.insertAfter(h2);

	// Insert elements and format the left side canvas
	const h2_1 = $("<h2>Design Canvas</h2>");
	const canvas = $("<table id='pixel_canvas'></table>");
	
	leftSide.css("width", "50%").css("text-align","center");
	leftSide.append(h2_1);
	canvas.insertAfter(h2_1);
	
	makeGrid(50,50); 										// Generate 50x50 drawing canvas
	
	// Format right side container
	rightSide.css("width","50%");
	
	// Update background image for the entire page according to the current mode
	let img = currentMode === "italian" ? "flag.png" : currentMode === "christmas" ? "christmas_2.jpg" : [];
	$('body').css("background-image", "url('" + pathToImg + img + "')").css("background-size", "cover");
	
}


// Listen for click on Italian Challenge mode button
$("input[name='italian']").on("click",function(evt) {
	evt.preventDefault();									// Prevent page reload on Submit
	currentMode = "italian";								// Update currentMode
	drawItalian();											// Insert additional elements for Italian Challenge mode
});


// Listen for click on Christmas Challenge mode button
$("input[name='christmas']").on("click",function(evt) {
	evt.preventDefault();									// Prevent page reload on Submit
	currentMode = "christmas";								// Update currentMode
	drawItalian();											// Insert additional elements for Christmas Challenge mode
});


// Listen for click on Clear button in Italian Challenge or Christmas Challenge mode
$(".top").on("click","input[name='clear']",function(evt) {
	evt.preventDefault();                           		// Prevent page reload on Submit
	clearGrid();                                     		// Clear drawing canvas
});


// Listen for click on New Challenge button in Italian Challenge or Christmas Challenge mode
$(".top").on("click","input[name='challenge']",function(evt) {
	evt.preventDefault();                           		// Prevent page reload on Submit
	
	// List of possible challenges, according to selected mode
	const drawingItalian = [									// Will be used to generate random Italian challenges
		["gelato", pathToImg + "gelato.jpg"],
		["a pizza", pathToImg + "pizza.jpeg"],
		["an espresso", pathToImg + "espresso.jpg"],
		["the Colloseum", pathToImg + "colloseo.jpg"],
		["the tower of Pisa", pathToImg + "pisa.jpg"],
		["a Vespa", pathToImg + "vespa.jpeg"],
		["a Ferrari", pathToImg + "ferrari.jpg"],
		["WindTre", pathToImg + "windtre.jpg"],
		];
		
	const drawingChristmas = [									// Will be used to generate random Christmas challenges
		["the Christmas tree", pathToImg + "christmas_tree.jpg"],
		["Santa Claus", pathToImg + "santa_claus.jpeg"],
		["Rudolph", pathToImg + "rudolph.jpg"],
		["a gift", pathToImg + "gift.jpg"],
		["Christmas baubles", pathToImg + "baubles.jpg"],
		["holly", pathToImg + "holly.jpeg"],
		["a snowman", pathToImg + "snowman.png"],
		["a snowflake", pathToImg + "snowflake.jpeg"]
		];

	let drawing = currentMode === "italian" ? drawingItalian : currentMode === "christmas" ? drawingChristmas : [];
	
	// Select random element from list of challenges
	let index = Math.floor(Math.random() * drawing.length);	// Random index
	let img = $("<img src='" + drawing[index][1] + "' alt='" + drawing[index][0] + "'>");	// Image for quiz solution
	
	// Format left side of page (drawing canvas)
	const leftSide = $(".leftSide");
	leftSide.children("h2").text("Draw " + drawing[index][0] + "!").css("color", "crimson");
	makeGrid(50,50);										// Generate 50x50 drawing canvas
	
	// Format right side of page (container for quiz solution)
	const rightSide = $(".rightSide");
	rightSide.children().remove();							// Remove the image - solution to the previous quiz
	rightSide.height(leftSide.height());
	
	// Listen for click on Italian Challenge or Christmas Challenge Show Solution button
	$(".top").on("click","input[name='show']",function(evt) {
		evt.preventDefault();                           	// Prevent page reload on Submit
		rightSide.children().remove();						// Remove the image - solution to the previous quiz
		rightSide.append(img);								// Show solution image	
	});
	
});



/////////////////////////////////////// Help mode ///////////////////////////////////////


function drawHelp() {
	
	// Delete existing elements from top and bottom of page
	const selectMode = $("#mode");
	selectMode.nextAll().remove();
	const leftSide = $(".leftSide");
	leftSide.children().remove();
	const rightSide = $(".rightSide");
	rightSide.children().remove();
	
	// Insert elements and format the left side help menu
	const p1 = $("<h3>Select the preferred mode: Classic, Italian Challenge or Christmas Challenge.</h3>");
	const p2 = $("<h3>Classic Mode</h3>");
	const p3 = $("<p>Select the desired canvas height and width from the left-side menu and click on <span class='bold'>Submit</span> to generate the drawing canvas.</p>");
	const p4 = $("<p>To draw a dot, click in a cell. To draw a line, click and hold down the left mouse button and drag the cursor across the canvas.</p>");
	const p5 = $("<p>Use the colour picker to change the colour, and the <span class='bold'>Clear canvas</span> button to reset the drawing canvas.</p>");
	const p6 = $("<h3>Italian Challenge and Christmas Challenge</h3>");
	const p7 = $("<p>Click on <span class='bold'>New challenge</span> to generate a new challenge.</p>");
	const p8 = $("<p>To draw a dot, click in a cell. To draw a line, click and hold down the left mouse button and drag the cursor across the canvas.</p>");
	const p9 = $("<p>Use the colour picker to change the colour, and the <span class='bold'>Clear canvas</span> button to reset the drawing canvas.</p>");
	const p10 = $("<p>When you have finished drawing, click on <span class='bold'>Show solution</span> to display the solution.</p>");
	
	leftSide.css("width", "100%").css("text-align","left");
	leftSide.append(p1);
	p2.insertAfter(p1);
	p3.insertAfter(p2);
	p4.insertAfter(p3);
	p5.insertAfter(p4);
	p6.insertAfter(p5);
	p7.insertAfter(p6);
	p8.insertAfter(p7);
	p9.insertAfter(p8);
	p10.insertAfter(p9);

	// Hide right side container (not used for help mode)
	rightSide.css("width","0%");
	
}


// Listen for click on Help mode button
$("input[name='help']").on("click",function(evt) {
	evt.preventDefault();									// Prevent page reload on Submit
	drawHelp();												// Insert additional elements for Help mode
});
