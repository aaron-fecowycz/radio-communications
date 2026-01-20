$(document).ready(function() {
	
	


	// Set history home Page
	history.pushState('home', "",'#home' );
	// $('title').html('Radio Coms: Home');
	
	
	
	
	// Update the current URL in the address bar without adding a new history entry
	function replace_URL(new_url) {
		window.history.replaceState({ path: new_url }, '', new_url);
	}
	// Set the initial location
	replace_URL('#home');
	
	
	
	
    // Hide all sections except the first one
    $('section').hide();
    $('section:first').show();
	// Handle Navigation
    $('nav ul li a').not('.dropdown-toggle').click(function(e) {
        e.preventDefault();
		
		
        var target = $(this).attr('href');
		//history.pushState({ page: target }, '', target);
        
		// Hide all sections
        $('section').hide();
		// Hide the off canvas nav bar
		$('#offcanvasNavbar').offcanvas('hide');
        // Show the selected section
        $(target).show();
		$(target + ' h1').focus();
    });
	// Home button
	$('a.navbar-brand').click(function(e){
		e.preventDefault();
		$('title').html('Radio Coms: Home');
		replace_URL('#home');
		$('section').hide();
		$('#home').show();
	});
	
	
	var htmlContent ='<p>This is the Radio Communications Training Resource Developed by Fire Fighter Aaron Fecowycz (Fez)</p><h1>Message Log</h1><hr>';
	// START Top level code
	var appliance = 'T23P1';
	var oic = 'WM Fordham';
	var incident_location = '';
	var crew_number = 4;
	var equipment_in_use ='';
	var tactical_mode ='';
	var tactical_mode_reason ='';
	var detained_at_scene ='';
	var  assistance_requirement ='';
	// Command  Point stuff
	var command_point_status = false;
	var ecp_cp_appliance;
	var ecp_cp_incident_commander;
	var ecp_cp_command_point_name;
	var  ecp_cp_command_point_location;


	if(localStorage.command_point_status != null){
		command_point_status = localStorage.command_point_status;
	}

	if(localStorage.appliance != null){
		appliance = localStorage.appliance;
	}
	if(localStorage.oic != null){
		oic = localStorage.oic;
	}
	if(localStorage.crew_number != null){
		crew_number = localStorage.crew_number;
	}
	if(localStorage.incident_location != null){
		incident_location = localStorage.incident_location;
	}


	// Function to handle text box selection for quick text constructors
	$(function() {
		var current_text_box_id;
		var taget_message_builder_id;
		// START function to allow for insertion of clickable words/phrases
		// class="text_box"
		function insertWord(word) {
			//alert('function triggered');
			//alert(current_text_box_id);
			const textarea = document.getElementById(current_text_box_id);
			const startPos = textarea.selectionStart;
			const endPos = textarea.selectionEnd;
			//const text_length = (textarea.value.length + 2);
			const textBefore = textarea.value.substring(0, textarea.value.length);
			const textAfter = textarea.value.substring(endPos, textarea.value.length);

			textarea.value = textBefore + ' ' + word + ' ' + textAfter;
			textarea.selectionStart = textarea.selectionEnd = startPos + word.length + 2;
			textarea.focus();
		}
		  
		$(document).on("click", ".text_box", function () {
			current_text_box_id = $(this).attr("id");
			taget_message_builder_id = $(this).attr('data-target-message-builder-id');
			$('#'+taget_message_builder_id).show();
			//alert(current_text_box_id);
		});
		  
		$(document).on("click", ".phrase", function (event) {
			event.preventDefault();
			var word = $(this).html();
			//alert(word);
			insertWord(word);
		});
	  
	});
	// END Top level code
	
	
	// START Phonetic Translator

	$(document).on("click", "#translate_btn", function(e){
		e.preventDefault();
		console.log('translate pressed');
		// Get the user input
		const word = document.getElementById("wordInput").value.trim().toUpperCase();

		// Define the NATO phonetic alphabet mapping
		const phoneticAlphabet = {
		"A": "<span>Alpha</span>",
		"B": "<span>Bravo</span>",
		"C": "<span>Charlie</span>",
		"D": "<span>Delta</span>",
		"E": "<span>Echo</span>",
		"F": "<span>Foxtrot</span>",
		"G": "<span>Golf</span>",
		"H": "<span>Hotel</span>",
		"I": "<span>India</span>",
		"J": "<span>Juliet</span>",
		"K": "<span>Kilo</span>",
		"L": "<span>Lima</span>",
		"M": "<span>Mike</span>",
		"N": "<span>November</span>",
		"O": "<span>Oscar</span>",
		"P": "<span>Papa</span>",
		"Q": "<span>Quebec</span>",
		"R": "<span>Romeo</span>",
		"S": "<span>Sierra</span>",
		"T": "<span>Tango</span>",
		"U": "<span>Uniform</span>",
		"V": "<span>Victor</span>",
		"W": "<span>Whiskey</span>",
		"X": "<span>X-ray</span>",
		"Y": "<span>Yankee</span>",
		"Z": "<span>Zulu</span>",
		" ": " <br />"
		};

		// Translate the word into phonetic alphabet if possible
		let translatedWord = "";
		for (let i = 0; i < word.length; i++) {
			const letter = word.charAt(i);
			const phoneticEquivalent = phoneticAlphabet[letter];
			if (phoneticEquivalent) {
				translatedWord += phoneticEquivalent + " ";
			} else {
				// If a letter has no phonetic equivalent, skip it.
				// For example, spaces or special characters.
				continue;
			}
		}

		// Display the result
		const resultElement = document.getElementById("result");
		if (translatedWord.trim() !== "") {
		   // resultElement.textContent = "Phonetic Translation: " + translatedWord.trim();
		  $('#result').html("<h2>Result</h2><p>Phonetic Translation: " + translatedWord.trim() + '</p>');
		} else {
			resultElement.textContent = "<h2>Result</h2><p>Invalid input. Please enter a word containing letters only.</p>";
		}
	
	});
	
	$(document).on("click", "#clear_translator", function(e){
		e.preventDefault();
		$('#wordInput').val('');
		$('#wordInput').focus();
	});
	
	// END Phonetic Translator
	
	
	
	// START Basic Information	
	// pre populate fields
	$('#incident_location').val(incident_location);
	$('#oic').val(oic);
	$('#crew_number').val(crew_number);
	$('#appliance option').each(function(){
	  var $this = $(this);
	  if($this.val() == appliance){
		$this.attr('selected', 'selected');
	  }
	});
	// respond to clicks

	$(document).on("click", "#basic_info_continue", function(e){
		e.preventDefault();
		replace_URL('#message_selector');
		$('title').html('Radio Coms: Message Selector');
		history.pushState('message_selector', "", '#message_selector');
		oic = $('#oic').val();
		crew_number = $('#crew_number').val();
		incident_location = $('#incident_location').val();
		appliance = $('#appliance').val();

		localStorage.incident_location = incident_location;
		localStorage.oic = oic;
		localStorage.crew_number = crew_number;
		localStorage.appliance = appliance;
		$('section').hide();
		$('#message_selector').show();
	  
	});
	
	// END Basic Information
	
	
	
	// START closing down home station
	function mobile_to_incident(){
		$('.appliance').html(appliance);
		other_crew = crew_number - 1;
		$('.crew_number').html(other_crew);
		$('.oic').html(oic);
		$('.incident_location').html(incident_location);
	}
	// END closing down home station
	
	
	// START In Attendance
	
	function in_attendance(){
	
		$('#update_address').hide();
		$('#new_incident_location_details').hide();
		$('.appliance').html(appliance);
		other_crew = crew_number - 1;
		$('.crew_number').html(other_crew);
		$('.oic').html(oic);
		$('.incident_location').html(incident_location);
		$('#standard').show();
		$('#correct_button_area').show();

		$('#correct_address').click(function(){
			$('#new_incident_location_details').show();
			$('#standard').hide();
		});

		$('#save_correct_address').click(function(){
			incident_location = $('#new_incident_location').val();
			localStorage.incident_location = incident_location;
			$('.new_incident_location').html(incident_location);
			$('#new_incident_location_details').show();
			$('#update_address').show();
			$('#correct_button_area').hide();
		});
	
	}
	
	// END In Attendance  
	
	// START First Impression Message
	function first_impression(){
		console.log('tactical mode: '+tactical_mode);
		var fim_describe_tactical_mode = 0;
		$('.fim_rm_tactical_mode').hide();
		$('#first_impression_details').show();
		$('#first_impression_message').hide();
		$('.tactical_mode_container').hide();

		if(tactical_mode != ''){
			console.log('tactical mode established');
			$('#tactical_mode_yes').checked = true;
			fim_describe_tactical_mode = 1;
			$('.tactical_mode_container').show();
			$('.fim_rm_tactical_mode').show();
		}

		$('.helpers').hide();
		/*if(localStorage.assistance_requirement != null){
		assistance_requirement = localStorage.assistance_requirement;
		}*/
		$('.appliance').html(appliance);
		$('.oic').html(oic);
		$('.incident_location').html(incident_location);
		$('.assistance_requirement').html(assistance_requirement);


		$('.tactical_mode_reason').html(tactical_mode_reason);
		$('#fim_tactical_mode').each(function(){
		  var $this = $(this);
		  if($this.val() == tactical_mode){
			$this.attr('selected', 'selected');
		  }
		});
		// START decide tactical mode code


		$('input[name="establish_tactical_mode"]').change(function() {
			if ($('#tactical_mode_yes').is(':checked')) {
				fim_describe_tactical_mode = 1;
				$('.tactical_mode_container').show();
				$('.fim_rm_tactical_mode').show();
			}else{
				$('.tactical_mode_container').hide();
				fim_describe_tactical_mode = 0;
				$('.fim_rm_tactical_mode').hide();
			}
		});
		// END decide tactical mode code

		$('#create_message').click(function(){
			tactical_mode = $('#fim_tactical_mode').val();
			tactical_mode_reason = $('#tactical_mode_reason').val();
			first_impression_message_details = $('#first_impression_message_details').val();

			$('.first_impression_message_details').html(first_impression_message_details);
			$('.tactical_mode').html(tactical_mode);
			$('.tactical_mode_reason').html(tactical_mode_reason);
			// localStorage.incident_location = incident_location;
			// localStorage.assistance_requirement = assistance_requirement;
			$('#first_impression_message').show();
			$('#first_impression_details').hide();
		});
		
		$('#new_first_impression_message').click(function(){
			$('#first_impression_message').hide();
			$('#first_impression_details').show(); 
		});
		
		$('#clear_message').click(function(){
			console.log('clear clicked');
			$('#first_impression_message_details').val();
			$('#tactical_mode_reason').val('');
		});
		
	
	}
	// END First Impression Message
	
	
	
	
	
	// START Assistance Message
	function assistance_message(){
		$('#assistance_message').hide();
		$('#assistance_details').show();
		$('.helpers').hide();
		if(localStorage.assistance_requirement != null){
			assistance_requirement = localStorage.assistance_requirement;
		}
		$('.appliance').html(appliance);
		$('.oic').html(oic);
		$('.incident_location').html(incident_location);
		$('.assistance_requirement').html(assistance_requirement);
		$('.tactical_mode_reason').html(tactical_mode_reason);
		$('#tactical_mode').each(function(){
			var $this = $(this);
			if($this.val() == tactical_mode){
				$this.attr('selected', 'selected');
			}
		});

		$('#am_create_message').click(function(){

			if(command_point_status == true){
				$('.appliance').html(ecp_cp_command_point_name + ' Command');
				$('.incident_location').html(ecp_cp_command_point_name + ' Command');
				$('.oic').html('Incident Commander');
			}
		  
			tactical_mode = $('#tactical_mode').val();
			assistance_requirement = $('#assistance_requirement').val();
			tactical_mode_reason = $('#am_tactical_mode_reason').val();
			$('.assistance_requirement').html(assistance_requirement);
			$('.tactical_mode').html(tactical_mode);
			$('.tactical_mode_reason').html(tactical_mode_reason);
			// localStorage.incident_location = incident_location;
			localStorage.assistance_requirement = assistance_requirement;
			$('#assistance_message').show();
			$('#assistance_details').hide();
		});
		
		$('#new_assistance_message').click(function(){
			$('#assistance_message').hide();
			$('#assistance_details').show();
		});
		
		$('#clear_message').click(function(){
			console.log('clear clicked');
			$('#assistance_requirement').val("");
			$('#am_tactical_mode_reason').val('');
		});
	};
	// END Assistance Message
	
	
	
	
	
	
	
	// START Simple Informative Message 
	
	function simple_informative_message(){
		console.log('tactical mode reason: ' + tactical_mode_reason);	
		$('#informative_message_simple').hide();
		$('#informative_message_simple_details').show();
		$('.helpers').hide();
		/*if(localStorage.assistance_requirement != null){
		assistance_requirement = localStorage.assistance_requirement;
		}*/
		$('.appliance').html(appliance);
		$('.oic').html(oic);
		$('.incident_location').html(incident_location);
		$('.assistance_requirement').html(assistance_requirement);


		$('#ims_tactical_mode_reason').html(tactical_mode_reason);
		$('#tactical_mode').each(function(){
			var $this = $(this);
			if($this.val() == tactical_mode){
				$this.attr('selected', 'selected');
			}
		});

		$('#ims_create_message').click(function(){

			if(command_point_status == true){
				$('.appliance').html(ecp_cp_command_point_name + ' Command');
				$('.incident_location').html(ecp_cp_command_point_name + ' Command');
				$('.oic').html('Incident Commander');
			}

			tactical_mode = $('#tactical_mode').val();

			tactical_mode_reason = $('#ims_tactical_mode_reason').val();
			informative_simple_detail = $('#informative_simple_detail').val();


			$('.informative_simple_detail').html(informative_simple_detail );
			$('.tactical_mode').html(tactical_mode);
			$('.tactical_mode_reason').html(tactical_mode_reason);

			$('#informative_message_simple').show();
			$('#informative_message_simple_details').hide();
		});
		$('#new_informative_simple_message').click(function(){
			$('#informative_message_simple').hide();
			$('#informative_message_simple_details').show();
		});
		$('#clear_informative_simple_message').click(function(){
			console.log('clear clicked');
			$('#informative_simple_detail').val('');
			$('#ims_tactical_mode_reason').val('');
		});
	
	}
		
	// END Simple Informative Message 
	
	
	
	
	
	
	// START HAULAT Message 
	function informative_message_haulat(){

		$('#informative_haulat_message').hide();
		$('.helpers').hide();
		/*if(localStorage.assistance_requirement != null){
		assistance_requirement = localStorage.assistance_requirement;
		}*/
		$('.appliance').html(appliance);
		$('.oic').html(oic);
		$('.incident_location').html(incident_location);
		$('.assistance_requirement').html(assistance_requirement);


		$('.tactical_mode_reason').html(tactical_mode_reason);
		$('#tactical_mode').each(function(){
		var $this = $(this);
		if($this.val() == tactical_mode){
		$this.attr('selected', 'selected');
		}
		});

		$('#imh_create_message').click(function(){

		if(command_point_status == true){
			$('.appliance').html(ecp_cp_command_point_name + ' Command');
			$('.incident_location').html(ecp_cp_command_point_name + ' Command');
			$('.oic').html('Incident Commander');
			}

			tactical_mode = $('#tactical_mode').val();

			tactical_mode_reason = $('#imh_tactical_mode_reason').val();
			informative_haulat_height = $('#informative_haulat_height').val();
			informative_haulat_area = $('#informative_haulat_area').val();
			informative_haulat_use = $('#informative_haulat_use').val();
			informative_haulat_location = $('#informative_haulat_location').val();
			informative_haulat_action = $('#informative_haulat_action').val();


			$('.informative_haulat_height').html('<strong>Height</strong> '+informative_haulat_height + ' Floors');
			$('.informative_haulat_area').html('<strong>Area</strong> approximately '+informative_haulat_area);
			$('.informative_haulat_use').html('<strong>Used</strong> as '+informative_haulat_use);
			$('.informative_haulat_location').html('<strong>Fire Located</strong> in '+informative_haulat_location);
			$('.informative_haulat_action').html('<strong>Actions</strong> '+informative_haulat_action);
			$('.tactical_mode').html(tactical_mode);
			$('.tactical_mode_reason').html(tactical_mode_reason);

			$('#informative_haulat_message').show();
			$('#informative_haulat_details').hide();
		});
		
		$('#new_informative_haulat_message').click(function(){
			$('#informative_haulat_message').hide();
			$('#informative_haulat_details').show();
		});
		
		$('#clear_informative_haulat_message').click(function(){
			console.log('clear clicked');
			$('#informative_haulat_height').val('');
			$('#informative_haulat_area').val('');
			$('#informative_haulat_use').val('');
			$('#informative_haulat_location').val('');
			$('#informative_haulat_action').val('');
			$('#tactical_mode_reason').val('');
		});
	
	}
	// END HAULAT Message 
	
	
	
	
	
	
	
	// START METHANE Messsage
	
	function informative_message_methane(){

		$('#informative_message').hide();
		$('#informative_methane_details').show();
		$('.helpers').hide();
		$('.appliance').html(appliance);
		$('.oic').html(oic);
		$('.incident_location').html(incident_location);
		$('.assistance_requirement').html(assistance_requirement);

		$('.tactical_mode_reason').html(tactical_mode_reason);
		$('#tactical_mode').each(function(){
			var $this = $(this);
			if($this.val() == tactical_mode){
				$this.attr('selected', 'selected');
			}
		});

		$('#create_message_methane').click(function(){

			if(command_point_status == true){
				$('.appliance').html(ecp_cp_command_point_name + ' Command');
				$('.incident_location').html(ecp_cp_command_point_name + ' Command');
				$('.oic').html('Incident Commander');
			}

			tactical_mode = $('#tactical_mode').val();
			tactical_mode_reason = $('#im_m_tactical_mode_reason').val();
			informative_major_incident = $('#informative_major_incident').val();
			informative_exact_location = $('#informative_exact_location').val();
			informative_type_of_incident = $('#informative_type_of_incident').val();
			informative_hazards = $('#informative_hazards').val();
			informative_access = $('#informative_access').val();
			informative_number_casulaties = $('#informative_number_casulaties').val();
			informative_emergency_services = $('#informative_emergency_services').val();

			if(informative_major_incident!=''){
				$('.informative_major_incident').show();
				$('.informative_major_incident').html('<strong>Mike Major Incident </strong> '+informative_major_incident);
			}else{
				$('.informative_major_incident').hide();
			}
			$('.informative_exact_location').html('<strong>Echo - Exact location</strong> '+informative_exact_location);
			$('.informative_type_of_incident').html('<strong>Tango - Type of incident</strong> '+informative_type_of_incident);
			$('.informative_hazards').html('<strong>Hotel - Hazards are</strong> '+informative_hazards);
			$('.informative_access').html('<strong>Alpha - Access Best Access to incident is via</strong> '+informative_access);
			$('.informative_number_casulaties').html('<strong>November - Number of casualties</strong> ' +informative_number_casulaties);
			$('.informative_emergency_services').html('<strong>Echo - Emergency services required</strong> '+informative_emergency_services);
			$('.tactical_mode').html(tactical_mode);
			$('.tactical_mode_reason').html(tactical_mode_reason);
			$('#informative_message').show();
			$('#informative_methane_details').hide();
			
		});
		
		$('#new_informative_message').click(function(){
			$('#informative_message').hide();
			$('#informative_details').show();
		});
		
		$('#clear_message').click(function(){
			console.log('clear clicked');
			$('#informative_major_incident').val();
			$('#informative_exact_location').val();
			$('#informative_type_of_incident').val();
			$('#informative_hazards').val();
			$('#informative_access').val();
			$('#informative_number_casulaties').val();
			$('#informative_emergency_services').val();
			$('#tactical_mode_reason').val('');
		});


		
	};
	
	// END METHANE Message
	
	
	
	
	
	// START Informative Message - Establishing a Command Point
	
	function informative_message_establish_command_point(){
	
		$('#ecp_message').hide();
		$('#command_point_details').show();
		$('.helpers').hide();
		$('#ecp_cp_appliance').val(appliance);
		$('#ecp_cp_incident_commander').val(oic);
		$('#incident_location').val(incident_location);

		$('#im_ecp_create_message').click(function(){
			command_point_status = true;
			ecp_cp_appliance = $('#ecp_cp_appliance').val();
			ecp_cp_incident_commander = $('#ecp_cp_incident_commander').val();
			ecp_cp_command_point_name = $('#ecp_cp_command_point_name').val();
			console.log($('#ecp_cp_command_point_location').val());
			ecp_cp_command_point_location = $('#ecp_cp_command_point_location').val();

			tactical_mode = $('#tactical_mode').val();
			tactical_mode_reason = $('#im_ecp_tactical_mode_reason').val();

			$('.appliance').html(appliance);
			$('.oic').html(oic);
			$('.ecp_cp_appliance').html(ecp_cp_appliance);
			$('.ecp_cp_incident_commander').html(ecp_cp_incident_commander);
			$('.ecp_cp_command_point_name').html(ecp_cp_command_point_name);
			
			if(ecp_cp_command_point_location != ''){
				$('.ecp_cp_location').html(' <span class="cp_located"><br>Command point is located '+ecp_cp_command_point_location + '. </span>');
			}else{
				$('.cp_located').remove();
			}
			
			//$('.ecp_cp_command_point_location').html(ecp_cp_command_point_location);
			$('.tactical_mode').html(tactical_mode);
			$('.tactical_mode_reason').html(tactical_mode_reason);

			// localStorage.incident_location = incident_location;
			$('#ecp_message').show();
			$('#command_point_details').hide();
		});
	
	}
	
	// END Informative Message - Establishing a Command Point	
	
	
	// START Informative Message - Close Down a Command Point
	function informative_message_close_down_command_point(){
		
		$('#cdcp_message').hide();
		$('#cd_command_point_details').show();
		$('.helpers').hide();

		$('#cdcp_cp_appliance').val(appliance);
		$('#cdcp_cp_incident_commander').val(oic);
		$('#incident_location').val(incident_location);

		/*$('#tactical_mode').each(function(){
		var $this = $(this);
		if($this.val() == tactical_mode){
		$this.attr('selected', 'selected');
		}
		});*/

		$('#cdcp_create_message').click(function(){

			if(command_point_status == true){
				$('.appliance').html(ecp_cp_command_point_name + ' Command');
				$('.oic').html('Incident Commander');

			}

			command_point_status = false;
			// ecp_cp_appliance = $('#cdcp_cp_appliance').val();
			//ecp_cp_incident_commander = $('#cdcp_cp_incident_commander').val();

			cdcp_cp_incident_commander = $('#cdcp_cp_incident_commander').val();
			cdcp_cp_appliance = $('#cdcp_cp_appliance').val();
			tactical_mode = $('#tactical_mode').val();
			tactical_mode_reason = $('#cdcp_tactical_mode_reason').val();

			//$('.appliance').html(appliance);
			//$('.oic').html(oic);
			$('.cdcp_cp_incident_commander').html(ecp_cp_incident_commander);
			$('.cdcp_cp_appliance').html(cdcp_cp_appliance);
			$('.tactical_mode').html(tactical_mode);
			$('.tactical_mode_reason').html(tactical_mode_reason);

			// localStorage.incident_location = incident_location;
			$('#cdcp_message').show();
			$('#cd_command_point_details').hide();
		});	
		
	};
	// END Informative Message - Close Down a Command Point 
	
	
	
	// START Priority Message 
	
	function priority_message(){
		//console.log('tactical mode reason: ' + tactical_mode_reason);	
		$('#priority_message').hide();
		$('#priority_message_details').show();
		$('.helpers').hide();
		/*if(localStorage.assistance_requirement != null){
		assistance_requirement = localStorage.assistance_requirement;
		}*/
		$('.appliance').html(appliance);
		$('.oic').html(oic);
		$('.incident_location').html(incident_location);
		//$('.assistance_requirement').html(assistance_requirement);


		$('#priority_tactical_mode_reason').html(tactical_mode_reason);
		$('#tactical_mode').each(function(){
			var $this = $(this);
			if($this.val() == tactical_mode){
				$this.attr('selected', 'selected');
			}
		});

		$('#priority_create_message').click(function(){

			if(command_point_status == true){
				$('.appliance').html(ecp_cp_command_point_name + ' Command');
				$('.incident_location').html(ecp_cp_command_point_name + ' Command');
				$('.oic').html('Incident Commander');
			}

			tactical_mode = $('#tactical_mode').val();

			tactical_mode_reason = $('#priority_tactical_mode_reason').val();
			priority_detail = $('#priority_message_detail').val();


			$('.priority_detail').html(priority_detail );
			$('.tactical_mode').html(tactical_mode);
			$('.tactical_mode_reason').html(tactical_mode_reason);

			$('#priority_message').show();
			$('#priority_message_details').hide();
		});
		$('#new_priority_message').click(function(){
			$('#priority_message').hide();
			$('#priority_message_details').show();
		});
		$('#clear_priority_message').click(function(){
			console.log('clear clicked');
			$('#priority_message_detail').val('');
			$('#priority_tactical_mode_reason').val('');
		});
	
	}
		
	// END Priority Message 
	
	
	
	
	
	
	// START Stop Message
	function stop_message(){	
	
	
		var fim_describe_tactical_mode = 0;
		$('.sm_rm_tactical_mode').hide();

		$('#stop_message').hide();
		$('#stop_details').show();
		$('.helpers').hide();

		$('.appliance').html(appliance);
		$('.oic').html(oic);
		$('.incident_location').html(incident_location);

		// START decide tactical mode code

		$('input[name="establish_tactical_mode"]').change(function() {
			if ($('#tactical_mode_yes').is(':checked')) {
				sm_describe_tactical_mode = 1;
				$('.tactical_mode_container').show();
				$('.sm_rm_tactical_mode').show();
			} else {
				$('.tactical_mode_container').hide();
				sm_describe_tactical_mode = 0;
				$('.sm_rm_tactical_mode').hide();
			}
		});
		// END decide tactical mode code

		$('#sm_create_message').click(function(){

			tactical_mode = $('#tactical_mode').val();
			equipment_in_use = $('#equipment_in_use').val();
			tactical_mode_reason = $('#sm_tactical_mode_reason').val();
			detained_at_scene = $('#detained_at_scene').val();

			$('.equipment_in_use').html(equipment_in_use);
			$('.tactical_mode').html(tactical_mode);
			$('.tactical_mode_reason').html(tactical_mode_reason);
			$('.detained_at_scene').html(detained_at_scene);
			// localStorage.incident_location = incident_location;
			$('#stop_message').show();
			$('#stop_details').hide();
		});

	
	};
	// END Stop Message
	
	
	
	
	
	// START Further Informative Message
	function further_informative_message(){
		$('#further_informative_message').hide();
		$('#further_informative_details').show();
		$('.helpers').hide();
		$('.appliance').html(appliance);
		$('.oic').html(oic);
		$('.incident_location').html(incident_location);
		$('.assistance_requirement').html(assistance_requirement);


		$('.tactical_mode_reason').html(tactical_mode_reason);
		$('#tactical_mode').each(function(){
			var $this = $(this);
			if($this.val() == tactical_mode){
				$this.attr('selected', 'selected');
			}
		});

		$('#fim_create_message').click(function(){

			tactical_mode = $('#tactical_mode').val();
			tactical_mode_reason = $('#fim_tactical_mode_reason').val();
			further_informative_message_details = $('#further_informative_message_details').val();
			$('.further_informative_message_details').html(further_informative_message_details);
			$('.tactical_mode').html(tactical_mode);
			$('.tactical_mode_reason').html(tactical_mode_reason);
			$('#further_informative_message').show();
			$('#further_informative_details').hide();
		});
		
		$('#new_further_informative_message').click(function(){
			$('#further_informative_message').hide();
			$('#further_informative_details').show();
		});
		$('#fim_clear_message').click(function(){
			console.log('clear clicked');
			$('#further_informative_message_details').val();
			$('#fim_tactical_mode_reason').val('');
		});
	
	}
	
	// END Further Informative Message
	
	
	// START Message Log Display
	
	function message_log_display(){
	
		$('#message_log_container').html(htmlContent);
	
	
	
	};
	
	
	// END Messsage log Display
	
	
	
	
	
	// START returning home Station
	function returning_home_station(){
		$('.appliance').html(appliance);
		other_crew = crew_number - 1;
		$('.crew_number').html(other_crew);
		$('.oic').html(oic);
		$('.incident_location').html(incident_location);
	}
	// END returning home station
	
	// START closing down home station
	function closing_down_home_station(){
		$('.appliance').html(appliance);
		other_crew = crew_number - 1;
		$('.crew_number').html(other_crew);
		$('.oic').html(oic);
		$('.incident_location').html(incident_location);
	}
	// END closing down home station
	
	
	// Start generic page links
	
	$(document).on("click", ".page_link", function (e) {
		e.preventDefault();
		
		$('section').hide();
		$('.alert').remove();
		var target_page = $(this).attr('data-target-page');
		//console.log(target_page);
		replace_URL('#'+target_page);
		$('title').html('Radio Coms: '+target_page);
		
		history.pushState(target_page, "", '#'+target_page);
		console.log(target_page +' clicked');
		
		switch(target_page){
			case 'message_mti':
			mobile_to_incident();
			break;
			case 'message_ia':
			in_attendance();
			break;
			case 'message_fi':
			first_impression();
			break;
			case 'message_rhs':
			returning_home_station();
			break;
			case 'message_cdhs':
			closing_down_home_station();
			break;
			case 'message_ims':
			simple_informative_message();
			break;
			case 'message_im_haulat':
			informative_message_haulat();
			break;
			case 'message_im_methane':
			informative_message_methane();
			break;
			case 'message_im_ecp':
			informative_message_establish_command_point();
			break;
			case 'message_im_cdcp':
			informative_message_close_down_command_point();
			break;
			case 'message_am':
			assistance_message();
			break;
			case 'message_sm':
			stop_message();
			break;
			case 'message_fim':
			further_informative_message();
			break;
			case 'message_priority':
			priority_message();
			break;
			case 'message_log':
			message_log_display();
			break;
			
		}
		$('#'+target_page).show();
	});
	
	// END generic page links
	
	
	
	window.addEventListener("popstate", (event) => {
		console.log(
			`location: ${document.location}, state: ${JSON.stringify(event.state)}`,
		);
		// START display appropriate section
		
		var temp_section = event.state['path'];
			$(temp_section).show();
			temp_section = temp_section.substring(1);
			console.log(temp_section);
			$('section').hide();
			$('title').html('Radio Coms: '+temp_section);
			$('#'+temp_section).show();

		// END display appropriate section
	});
	
	// START generate PDF code	
	function generate_log(){
		
		const options = {
		  filename: 'message_log.pdf',
		  margin: 10,
		  image: { type: 'jpeg', quality: 0.98 },
		  html2canvas: { scale: 1.8 },
		  jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
		};
		const element = document.querySelector('#message_log_container');
		html2pdf().set(options).from(element).save();

	}
	
	

	// ADD message to htmlContent const
	$(document).on("click", ".add_message_to_pdf", function (e) {
		e.preventDefault();
		//get the message identifier
		var target_message = $(this).attr('data-target-message');
		var message_title = $(this).attr('data-target-message-title');
		var now = new Date();
		var formatted_date_time = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ` +
			  `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
		var temp_message = $('#'+target_message).html();
		htmlContent += '<h2>'+message_title+'</h2><p>'+formatted_date_time+'</p>'+temp_message+'<hr>';
		
		$(this).parent().prepend('<div class="alert alert-success" role="alert">Success! Message added to message log!</div>');
		
	});
	
//htmlContent
        // Handle button click
        $(document).on("click", '#download_pdf_log', function(e){
			console.log('download clicked');
			generate_log();


        });


	
	// END Generate PDF code


	
});