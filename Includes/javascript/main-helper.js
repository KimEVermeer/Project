$(function() {
	var output = "";
	var params = [];
	var inputlanguage = "";
	var outputlanguage = "";

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
	});

	$(".input .language-select li.input-lang").on("click", function(e){
		if($(".input .language-select li.input-lang").hasClass("active")) {
			if($(".input .language-select li.input-lang") != $(this)) {
				$(".input .language-select li.input-lang").removeClass('active');
				$(this).toggleClass("active");
				inputlanguage = $(this).text();
				inputlanguage = inputlanguage.toLowerCase();
				console.log(inputlanguage);
			}
		} else {
			$(this).toggleClass("active");
			inputlanguage = $(this).text();
			inputlanguage = inputlanguage.toLowerCase();
			console.log(inputlanguage);
		}
	});

	$(".output .language-select li.output-lang").on("click", function(e){
		if($(".output .language-select li.output-lang").hasClass("active")) {
			if($(".output .language-select li.output-lang") != $(this)) {
				$(".output .language-select li.output-lang").removeClass('active');
				$(this).toggleClass("active");
				outputlanguage = $(this).text();
				outputlanguage = outputlanguage.toLowerCase();
			}
		} else {
			$(this).toggleClass("active");
			outputlanguage = $(this).text();
			outputlanguage = outputlanguage.toLowerCase();
		}
	});

	function translate(){
		$("textarea.input-area").keyup(function(event) {
			output = $(this).val();

			var split = splitcode(output);
			var translated = [];
			var languageid = 2;
			var optionid;
			var translation;
			// translateOut( output);
			for(var i = 0; i<split.length; i++)
			{
				var index = isEqual(split[i], params);

				console.log(index);
				if(index != -1)
				{
					optionid=params[index].optionid;
					//index translation
					var geniaal = translationAvailable(optionid, outputlanguage, params);
					// translated.push(params[geniaal].translation);
					translated.push(params[geniaal].translation);
					
				}
				else
				{
					if (split[i-1] == "for" && split[i] === undefined)
					{
						console.log(split[i-1]);
					}
					translated.push(split[i]);
				}
				translateOut(translated);
			}
			console.log(translated);
		});
	}

	function translateOut(translated)
	{
		for(var i = 0; i<translated.length; i++)
		{
			if(translated[i] === undefined) translated.splice(i,1);
		}
		
		$("div.output-area").html("<xmp>"+translated.join("") +"</xmp>");
	}

	function isEqual(tekst, array)
	{
		var theIndex = false;
			index 	 = -1;
		for (var i = 0; i < array.length; i++) {
			if (array[i].language == inputlanguage)
			{
				if (array[i].translation == tekst) {
					theIndex = true;
					index = i;
					break;
				}
			}
		}
		return index;
	}

	function detectLanguage()
	{

	}

	function translationAvailable(optionid, language, array)
	{
		var theIndex = false;
			index 	 = -1;
		for (var i = 0; i < array.length; i++) {
			if (array[i].optionid == optionid) {
				if (array[i].language == language) {
					console.log(array[i]);
					theIndex = true;
					index = i;
					break;
				}
			}
		}
		return index;
	}

	/*function splitShit(input)
	{
		var splitted = input.split(/(?=\{)|(?=\})|(\s)|(?=\[)|(?=\])|(?=\;)|(?=\()|(?=\))/);
		return splitted;
	}*/

	function splitcode(input)
	{
		var splitted = input.split(/(\{)|(\})|(\s)|(\[)|(\])|(\;)|(\()|(\))/);
		return splitted;
	}

    $.ajax({
        url: "http://localhost:8080",
        dataType: "json",
        data: params,
        success: function (response) {
        	for(var i=0; i<response.length; i++){
				params.push({
					id         	: response[i].id,
					optionid   	: response[i].optionid,
					optionname 	: response[i].optionname,
					color		: response[i].color,
					languageid 	: response[i].languageid,
					language   	: response[i].language,
					translation	: response[i].translation
				});
	        }
			translate();
        },
        error: function () {
        	//error handling
        }
    });

	$(".language-dropdown").each(function(){
		$(this).click(function(e){
			e.stopPropagation();
			$(this).toggleClass("active");
		});
	});  

	$("body").on("click", function(){
		$(".language-dropdown").removeClass("active");
	});
});

/*function splitcode(input)
{
	var brackets = input.split("(");
		result = [];

	for(var i = 0; i<brackets.length; i++) {
		var semicolon = brackets[i].split(";");
		for(var j = 0; j<semicolon.length; j++) {
			var space = semicolon[j].split(" ");
			for(var x = 0; x<space.length; x++) {
				var curlybracket = space[x].split("{");
				for(var z=0; z<curlybracket.length; z++) {
					var squarebracket = curlybracket[z].split("[");
					for(var y = 0; y<squarebracket.length; y++){
						result.push(squarebracket[y]);
						// console.log(result[i]);
					}
				}
			}
		}
	}
	console.log(result.length);
	return result;
}*/

/*function translate(){
	$("textarea.input-area").keyup(function(event) {
		output = $(this).val();
		// output.split("(");
		outputz = splitcode(output);
		if(outputz == params[3].translation)
		{
			$("div.output-area").html("<xmp>"+params[4].translation+"</xmp>");
			$("div.output-area").css("color", "#" + params[4].color);
		}
		else
		{
			// $("div.output-area").html("<xmp>"+outputz+"</xmp>");
			$("div.output-area").html(outputz);
			console.log(outputz);
			$("div.output-area").css("color", "#fff");
		}
	});
}*/