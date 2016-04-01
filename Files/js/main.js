"use strict";		
var segmentsCount = 15;
var canvas = document.getElementById('c');
var segment = new SixteenSegment(segmentsCount, canvas);
segment.X = -5;
segment.Y = -5;
segment.SegmentWidth = 0.18;//0.12;
segment.SegmentInterval = 0;
segment.BevelWidth = 0;//0.49;
segment.SideBevelEnabled  = false;
segment.Padding  = 15;
segment.Spacing = 5;
segment.FillLight  = "#9e0000";
segment.FillDark = "#000000";//"#2A0203";
segment.StrokeLight ="#ff0000";
segment.StrokeDark = "#550000";
segment.StrokeWidth = 0;
segment.Width = 230;
segment.Height = 40;
var updateSegmentDisplay = undefined;
var segmentDisplayText = "";
var segmentCurrentIndex = 0;
			
function UpdateSegmentText(text)
{
	text = text.trim().toUpperCase();
	
	if(text == segmentDisplayText)
		return;
		
	if(updateSegmentDisplay!=undefined)
		clearInterval(updateSegmentDisplay);
	
	segmentDisplayText = text;
	segmentCurrentIndex = 0;
	segment.DisplayText(segmentDisplayText);
	
	if(segmentDisplayText.length>segmentsCount)
	{
		updateSegmentDisplay = setInterval(function(){
			MoveSegmentText();
		},500);
	}
}
function MoveSegmentText()
{
	segmentCurrentIndex++;
	if(segmentCurrentIndex>segmentDisplayText.length)
		segmentCurrentIndex = 0;
	
	var segmentCurrentText = segmentDisplayText.substring(segmentCurrentIndex);
	segment.DisplayText(segmentCurrentText);
}
UpdateSegmentText("Loading...");
navigator.plugins.refresh(false);
function plugin() {
	return document.querySelector('#plugin');
}
if (plugin() == null) {}
document.querySelector('#btnPlayPause').onclick = function() {
	if($("#btnPlayPause").hasClass("play"))
		$("#btnPlayPause").removeClass("play").addClass("pause");
	else
		$("#btnPlayPause").removeClass("pause").addClass("play");
	plugin().playPause(function(data) { 
		UpdateTitle();
	});
};
document.querySelector('#btnNextTrack').onclick = function() {  
	plugin().nextTrack(function(data) { 
		UpdateTitle();
	});
};
document.querySelector('#btnPrevTrack').onclick = function() {  
	plugin().prevTrack(function(data) { 
		UpdateTitle();
	});
};
function UpdateTitle() {
	plugin().getWindowTitle(function(data) { 
		data = data.trim();
		if(data.toUpperCase() == "SPOTIFY")
		{
			$("#btnPlayPause").removeClass("pause").addClass("play");
			UpdateSegmentText("-Paused-");
		}
		else if(data == "")
		{
			$("#btnPlayPause").removeClass("pause").addClass("play");
			UpdateSegmentText("-Not Running-");
		}
		else
		{
			$("#btnPlayPause").removeClass("play").addClass("pause");
			UpdateSegmentText(data);
		}
	});
}
UpdateTitle();
var getWindowTitleTimer = setInterval(function(){UpdateTitle();},2000);
$("body").on("mousedown","#content",function(evnt){
	overwolf.windows.getCurrentWindow(function(result){
		if (result.status=="success"){
			overwolf.windows.dragMove(result.window.id);
		}
	});
});
$("body").on("click","#btnClose",function(evnt){
	overwolf.windows.getCurrentWindow(function(result){
		if (result.status=="success"){
			overwolf.windows.close(result.window.id);
		}
	});
});
$("body").on("click","#btnToggleSize",function(evnt){
	var $content = $("#content");
	var isMinimized = $content.hasClass("minimized");
	if(isMinimized)
		$content.removeClass("minimized");
	else
		$content.addClass("minimized");
	localStorage.setItem("minimized", !isMinimized);
});
if(localStorage.getItem("minimized")=="true")
	$("#content").addClass("minimized");