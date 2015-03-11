			function accordionGalleryReady(){
				//function called when component is ready to receive public method calls
				//console.log('accordionGalleryReady');
			}
			
			function detailActivated(){
				//function called when prettyphoto (in this case) is being triggered (in which case slideshow if is on, automatically stops, then later when prettyphoto is closed, slideshow is resumed)
				//console.log('detailActivated');
			}
			
			function detailClosed(){
				//function called when prettyphoto (in this case) is closed
				//console.log('detailClosed');
			}
			
			function beforeSlideChange(slideNum){
				//function called before slide change (plus slide number returned)
				//console.log('beforeSlideChange, slideNum = ', slideNum);
			}
			
			function afterSlideChange(slideNum){
				//function called after slide change (plus slide number returned)
				//console.log('afterSlideChange, slideNum = ', slideNum);
			}
			
			// SETTINGS
			var accordion_settings = {
				/* componentOrientation: horizontal/vertical */
				componentOrientation: 'horizontal',
				/* sameSizeSlides: true, false (if false, you NEED to set dimension attributtes for each slide: 'data-width', 'data-height', otherwise use css for slide dimensions since all slides will be the same size).*/
				sameSizeSlides: true,
				/* activeItem; slide to open on beginning, enter -1 for none, 0 = first, 1 = second, 2 = third... etc. */
				activeItem: 0,
				/* useKeyboardNavigation: true/false (navigate through slides with left/right keys) */
				useKeyboardNavigation: true,
				/* alignSlides: true/false (align slides in accordion as active slide number changes) */
				alignSlides: true,
				/* visibleItems: less of equal to total items in accordion. NOTE: The added sizes of your visible items HAVE to be at least the size of the accordion or more. So for example, you cannot have 1 visible item which has the width of 300px, while the width of your accordion is 500px, this is not going to work. Or you cannot have 2 visible items, each 250px wide, so together 500px, while the size of your accordion is 700px. The only way visibleItems can be 1, if the slide size is the size of the accordion or more (and thats in case of the sameSizeSlides = true obvioulsy). */
				visibleItems:5,
				/* slideshowOn; true, false (its automatically paused on accordion rollover) */
				slideshowOn: true,
				/* slideshowDirection; backward/forward */
				slideshowDirection: 'forward',
				/* useGlobalDelay; true, false (use same timer delay for all slides, if false you NEED to set individual delays for all slides: 'data-delay') */
				useGlobalDelay: true,
				/* slideshowDelay; global delay, in miliseconds */
				slideshowDelay: 3000,
				/* openOnRollover; true, false (if false, then open on click) */
				openOnRollover: false,
				/* keepSelection; true, false. If true, on mouse out of component keep accordion opened. This is only valid if openOnRollover = true.  */
				keepSelection: true,
				/* useControls: true, false (prev, pause/play, next). If you dont use them, dont delete them from the DOM, they css will remain 'display:none', but jquery code needs them for the slideshow timer. */
				useControls:true
				
			};
			
			//gallery instances
			var gallery1;
			
			jQuery(document).ready(function($) {
				
				//init component
				gallery1 = $('#componentWrapper').accordionGallery(accordion_settings);
				accordion_settings = null;
				
				//init prettyphoto
				$("#componentWrapper a[data-rel^='prettyPhoto']").prettyPhoto({theme:'pp_default',
											callback: function(){gallery1.checkSlideshow2();}/* Called when prettyPhoto is closed */});
			  
			});
			
	$(document).ready(function() {
        var cwidth = parseInt($("#container").css("width").replace("px", ""));
        var img_count = $("#img_container").children().length;
        var img_width = $("#img1").width();
        var divider = cwidth / img_count;
        var small_space = (cwidth - img_width) / (img_count - 1);

        // set position
        var cssleft = Array();
        $("#img_container img").each(function(index) {
            cssleft[index] = new Array();
            // set default position
            cssleft[index][0] = (index * divider) - (index * img_width);
            $(this).css("left", cssleft[index][0] + "px");

            // set left position
            cssleft[index][1] = (index * small_space) - (index * img_width);

            // set right position
            var index2 = index;
            if (index2 == 0) {
                index2++;
            }
            cssleft[index][2] = cssleft[index2 - 1][1];
        });

        // image hover 
        $("#img_container img").mouseenter(function() {
            var img_id = parseInt($(this).attr("id").replace("img", "")) - 1;

            if ($(this).attr("id") != "img1") {
                $(this).animate({ 
                    left: cssleft[img_id][1] 
                }, 300);
            }                
            loopNext(this);
            loopPrev(this);
        });

        // image container hover out back to default position
        $("#img_container").mouseleave(function() {
            $("#img_container img").each(function(index) {
                $(this).animate({
                    left: cssleft[index][0]
                }, 300);
            });
        });

        function loopPrev(el) {
            if ($(el).prev().is("img")) {
                var imgprev_id = parseInt($(el).attr("id").replace("img", ""));

                if ($(el).prev().attr("id") != "img1") {
                    $(el).prev().animate({
                        left: cssleft[imgprev_id - 2][1]
                    }, 300);
                }
                loopPrev($(el).prev());
            }
        }

        function loopNext(el) {
            if ($(el).next().is("img")) {
                var imgnext_id = parseInt($(el).attr("id").replace("img", ""));

                $(el).next().animate({
                    left: cssleft[imgnext_id][2]
                }, 300);
                loopNext($(el).next());
            }
        }
    });
