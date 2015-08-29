﻿/// <reference path="ajax.js" />
/// <reference path="helpingMethods.js" />
var map, customerPos, qualityValue, densityValue, colorPicker, votingTime, elapsedTime, hasVote;

$(document).delegate("#SplashScreen", "pageinit", function () {
    $("#LogoSplash").width($(window).width() - 30);
    $("#PublicitySplash").width($(window).width() - 30);
    setTimeout(hideSplash, 2000);
    function hideSplash() {
        $.mobile.changePage("#MapPage");
    }
});

$(document).delegate("#MapPage", "pageinit", function () {
    votingTime = localStorage.getItem('voteTime');
    //$('#content').height(getRealContentHeight());
    initialize();
    getAllCustomerVotes(markCustomerVotes);
    if (typeof votingTime != "undefined" && !hasVote) {
        elapsedTime = votingTime - Date.now() / 60000;
        if (parseInt(elapsedTime) >= 20) {

        }
    }
});

$(document).delegate("#VotePopUp", "pageinit", function () {
    LoadPopUp();

    var isDragging = false;

    $("#sliderDensity").on("vmousedown",function () {
        isDragging = true;
    })

    .on("vmousemove",function () {
        if (isDragging)
        {
              //debugger;
        var slideVal = parseInt($("#sliderDensity").val());
        densityValue = slideVal;
        $("#sliderDensityValue").val(slideVal);
        $("#sliderDensityValue").css("width", slideVal + 30);
        $("#sliderDensityValue").css("height", slideVal + 30);
        }
    })

    $("#sliderDensity").on("vmouseup",function() {
        isDragging = false;
    });

    //$("#sliderDensity").on("change", function () {
    //    debugger;
    //    var slideVal = parseInt($("#sliderDensity").val());
    //    densityValue = slideVal;
    //    $("#sliderDensityValue").val(slideVal);
    //    $("#sliderDensityValue").css("width", slideVal + 30);
    //    $("#sliderDensityValue").css("height", slideVal + 30);
    //});
    $(".round").on("vclick", function () {
        colorPicker = $(this).css("background-color");
        qualityValue = $(this).val();
        $("#sliderDensityValue").css("background-color", colorPicker);
        $("#sliderDensityValue").css("border", "1px solid " + colorPicker);
    });
    $(document).on("vclick", "#btnAlertRight", function () {
        var vote = { Latitude: customerPos.coords.latitude, Longitude: customerPos.coords.longitude, DensityValue: densityValue, QualityValue: qualityValue };
        setUserVote(vote);
        localStorage.setItem('voteTime', Date.now());
    });
});

$(function(){
   
});

$(document).ready(function () {
    var istriDragging = false;
    var startx = 0;
    var starty = 0;
    var triangleOpacity = 1;
    var size = 150;

    var op = 1.00;

    $("#imageTriangle").on("touchmove", function (event) {
        op = op - 0.01;
        size = size + 10;
        //console.log("taphold");
        $("#imageTriangle").css("width", size);
        $("#imageTriangle").css("height", size);
        $("#imageTriangle").css("opacity", op);
    });

    $("#slidertriangle").on("vmousedown",function (event) {
        startx = event.pageX;
        starty = event.pageY;
        istriDragging = true;
    });

    $("#slidertriangle").on("touchmove",function (event) {
        $("#slidertriangle").css("border-bottom-color", "#FFFFFF");
    });

    $("#slidertriangle").on("touchcancel",function (event) {
        $("#slidertriangle").css("border-bottom-color", "#00FF00");
    });

    $("#slidertriangle").on("touchend",function (event) {
        $("#slidertriangle").css("border-bottom-color", "#0000FF");
    });

    $(document).on("vmousemove",function (event) {
        if (istriDragging) {
            var distanceY = starty - event.pageY;
            var distanceX = startx - event.pageX;
            //distance = distance * 10;
          
            size = size + 200;
            if (distanceX > 1 || distanceY>1)
                triangleOpacity = triangleOpacity-0.02;
            if(distanceX > 1)
                $("#slidertriangle").css("border-left-width", size);
            if(distanceY > 1)
                $("#slidertriangle").css("border-bottom-width", size);
            if (triangleOpacity > 0.1)
                $("#slidertriangle").css("opacity", triangleOpacity);
        }
        else {
            $("#slidertriangle").css("border-bottom-width", 100);
            $("#slidertriangle").css("border-left-width", 100);
            $("#slidertriangle").css("opacity", 1);

        }
    });

    $(document).on("vmouseup", function () {
        triangleOpacity = 1;
       $("#slidertriangle").css("border-bottom-width", 100);
       $("#slidertriangle").css("border-left-width", 100);
       $("#slidertriangle").css("opacity", 1);
       $("#slidertriangle").css("border-bottom-color", "#000000");
        istriDragging = false;
    });


    $("#slidertriangle").on("vmouseout",function () {
        triangleOpacity = 1;
        $("#slidertriangle").css("border-bottom-width", 100);
        $("#slidertriangle").css("border-left-width", 100);
        $("#slidertriangle").css("opacity", 1);

        istriDragging = false;
    });

    //$("#slidertriangle").on("vmouseleave",function () {
    //    triangleOpacity = 1;
    //    $("#slidertriangle").css("border-bottom-width", 100);
    //    $("#slidertriangle").css("border-left-width", 100);
    //    $("#slidertriangle").css("opacity", 1);

    //    istriDragging = false;
    //});
    

})

