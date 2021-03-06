$(function() {
	var output = "";

	$(".language-dropdown").each(function(){
		$(this).click(function(e){
			e.stopPropagation();
			$(this).toggleClass("active");
		});
	});  

	$("body").on("click", function(){
		$(".language-dropdown").removeClass("active");
	});

	$("textarea.input-area").keydown(function(e) {
		if(e.keyCode === 9) {
			var start = this.selectionStart;
			var end = this.selectionEnd;

			var $this = $(this);
			var value = $this.val();

			$this.val(value.substring(0, start)
						+ "\t"
						+ value.substring(end));
			this.selectionStart = this.selectionEnd = start + 1;

			e.preventDefault();
			$("div.output-area").html(output);
		}
		if(e.which == 13) {
        	
    	}
	});

	$("textarea.input-area").keyup(function(event) {
		output = $(this).val();
		$("div.output-area").html("<xmp>"+output+"</xmp>");
	});
});