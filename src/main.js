/////////////////////////////////////////
// KPR Script file
// Jung Yeon Lee
// Temperature Converter App
// January 28 2015
//
/////////////////////////////////////////

// Global vars for themes
var FIELDTHEME = require('themes/sample/theme');
var THEME = require('themes/flat/theme');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
var BUTTONS = require('controls/buttons');
var SLIDERS = require('controls/sliders');

var greyS = new Skin({fill:"#C2F0FF"});
var bigText = new Style({Font:"bold 12px", color:"#333333"});

var labelStyle = new Style( { font: "bold 60px", color:"grey" } );
var labelStyleStill = new Style( { font: "20px", color:"grey" } );
var labelTitleStyle = new Style( {font: "35px", color:"black" } );
var title = new Label( {top:0, height:80, string: "Convert Temperature", style: labelTitleStyle});
var tempFromLabel = new Label({top: 120, left:130, right:0, height:65, string:"0", style: labelStyle});
var tempToLabel = new Label({top: 340,left:130, right:0, height:65, string:"0", style: labelStyle});
var labelConvertFrom = new Label({top: 50, left:0, right:0, height:65, string:"Convert From", style: labelStyleStill});
var labelConvertTo = new Label({top: 270, left:0, right:0, height:65, string:"Convert To", style: labelStyleStill});
var slideToChange = new Label({top: 200, height:65, string:"Slide to change temperature", style: labelStyleStill});

var mySlider = SLIDERS.HorizontalSlider.template(function($){ return{
	top:230, height:50, left:50, right:50,
	behavior: Object.create(SLIDERS.HorizontalSliderBehavior.prototype, {
		onValueChanged: { value: function(container){
			SLIDERS.HorizontalSliderBehavior.prototype.onValueChanged.call(this, container);
			changeTemperature(this.data.value);
			
	}},
		getValue: {value: function() {
			return this.data.value;
	}}})
	}});


function changeTemperature(value) {
	if (tempFromRadioGroup.behavior.getSelectedName() == "Fahrenheit") {
		if(tempToRadioGroup.behavior.getSelectedName() == "Celsius") {
			var convert = (value - 32) / 1.8;
			tempFromLabel.string = (Math.round(value * 100) / 100).toString();
			tempToLabel.string = (Math.round(convert * 100) / 100).toString();
		} else if (tempToRadioGroup.behavior.getSelectedName() == "Kelvin") {
			var convert = (value + 459.67) * (5.0/9.0);
			tempFromLabel.string = (Math.round(value * 100) / 100).toString();
			tempToLabel.string = (Math.round(convert * 100) / 100).toString();
		} else {
			tempFromLabel.string = (Math.round(value * 100) / 100).toString();
			tempToLabel.string = (Math.round(value * 100) / 100).toString();
		}		
	} else if(tempFromRadioGroup.behavior.getSelectedName() == "Celsius") {
		if (tempToRadioGroup.behavior.getSelectedName() == "Fahrenheit") {
			var convert = (value*1.8) + 32.0;
			tempFromLabel.string = (Math.round(value * 100) / 100).toString();
			tempToLabel.string = (Math.round(convert * 100) / 100).toString();
		} else if (tempToRadioGroup.behavior.getSelectedName() == "Kelvin") {
			var convert = (value + 273.15);
			tempFromLabel.string = (Math.round(value * 100) / 100).toString();
			tempToLabel.string = (Math.round(convert * 100)	 / 100).toString();
		} else {
			tempFromLabel.string = (Math.round(value * 100) / 100).toString();
			tempToLabel.string = (Math.round(value * 100) / 100).toString();
		}
	} else if(tempFromRadioGroup.behavior.getSelectedName() =="Kelvin") {
		if (tempToRadioGroup.behavior.getSelectedName() == "Fahrenheit") {
			var convert = (value-273.15)*1.800;
			tempFromLabel.string = (Math.round(value * 100) / 100).toString();
			tempToLabel.string = (Math.round(convert * 100) / 100).toString();
		} else if(tempToRadioGroup.behavior.getSelectedName() == "Celsius") {
			var convert = (value-273.15);
			tempFromLabel.string = (Math.round(value * 100) / 100).toString();
			tempToLabel.string = (Math.round(convert * 100) / 100).toString();
		} else {
			tempFromLabel.string = (Math.round(value * 100) / 100).toString();
			tempToLabel.string = (Math.round(value * 100) / 100).toString();
		}
	} else {
		tempFromLabel.string = (Math.round(value * 100) / 100).toString();
		tempToLabel.string = (Math.round(value * 100) / 100).toString();
	}
}

var slider = new mySlider({ min:-500, max:500, value:0
,  });

var convertFromRadioGroup = BUTTONS.RadioGroup.template(function($){ return{
	top:100, bottom:50, left:0, right:50,
	behavior: Object.create(BUTTONS.RadioGroupBehavior.prototype, {
		onRadioButtonSelected: { value: function(buttonName){
			this.selectedName = buttonName;
			trace(slider.behavior.getValue())
			changeTemperature(slider.behavior.getValue());
			trace("Radio button with name " + buttonName + " was selected.\n");
	}},
		getSelectedName: {value: function(){
			return this.selectedName;
			}}})
	}});

var convertToRadioGroup = BUTTONS.RadioGroup.template(function($){ return{
	top:320, bottom:50, left:0, right:50,
	behavior: Object.create(BUTTONS.RadioGroupBehavior.prototype, {
		onRadioButtonSelected: { value: function(buttonName){
			this.selectedName = buttonName;
			changeTemperature(slider.behavior.getValue());
			trace("Radio button with name " + buttonName + " was selected.\n");
	}},
		getSelectedName: {value: function(){
			return this.selectedName;
			}}})
	}});
var tempFromRadioGroup = new convertFromRadioGroup({ buttonNames: "Fahrenheit,Celsius,Kelvin" });
var tempToRadioGroup = new convertToRadioGroup({ buttonNames: "Fahrenheit,Celsius,Kelvin" });



var MainCon = Container.template(function($) { return {
	left: 0, right: 0, top: 0, bottom: 0, skin: greyS, active: true,
	contents:[title, tempFromLabel, tempToLabel, labelConvertFrom, labelConvertTo, slideToChange] }});


var main = new MainCon();

application.add(main);
main.add(tempFromRadioGroup);
main.add(tempToRadioGroup);
main.add(slider);