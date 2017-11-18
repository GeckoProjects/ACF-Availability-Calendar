(function($){


	function initialize_field( $el ) {
		//$el.doStuff();
		$('#gk-multidatepicker').multiDatesPicker({
			dateFormat: "y-m-d",
			altField: '#gk-temp-dates',
			numberOfMonths: 3,
			disabled: true,
			onSelect: function(dateText, obj) {
				$('#gk-available-dates').val( $('#gk-temp-dates').val() );
			}
		});

		if( $('#gk-available-dates').val().trim() != '' ) {
			var dates = $('#gk-available-dates').val().replace(/\s/g, '').split(',');
			$('#gk-multidatepicker').multiDatesPicker('addDates', dates);
		}
	}


	if( typeof acf.add_action !== 'undefined' ) {

		/*
		*  ready append (ACF5)
		*
		*  These are 2 events which are fired during the page load
		*  ready = on page load similar to $(document).ready()
		*  append = on new DOM elements appended via repeater field
		*
		*  @type	event
		*  @date	20/07/13
		*
		*  @param	$el (jQuery selection) the jQuery element which contains the ACF fields
		*  @return	n/a
		*/

		acf.add_action('ready append', function( $el ){

			// search $el for fields of type 'FIELD_NAME'
			acf.get_fields({ type : 'availability_calendar'}, $el).each(function(){

				initialize_field( $(this) );

			});

		});


	} else {


		/*
		*  acf/setup_fields (ACF4)
		*
		*  This event is triggered when ACF adds any new elements to the DOM.
		*
		*  @type	function
		*  @since	1.0.0
		*  @date	01/01/12
		*
		*  @param	event		e: an event object. This can be ignored
		*  @param	Element		postbox: An element which contains the new HTML
		*
		*  @return	n/a
		*/

		$(document).on('acf/setup_fields', function(e, postbox){

			$(postbox).find('.field[data-field_type="availability_calendar"]').each(function(){

				initialize_field( $(this) );

			});

		});


	}


})(jQuery);
