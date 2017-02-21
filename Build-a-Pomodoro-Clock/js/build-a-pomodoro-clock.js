function minuTime() {
    $(document).on('click', '#work-time-min,#break-time-min', function(event) {
        var timeNum = $(this).next().children('span').text();
        if (timeNum > 1) {
            timeNum--;
            $(this).next().children('span').text(timeNum);
            if ($(this).next().children('span').attr('id') === "work-time") {
                $('div.bottom span').text(timeNum);
            }
        }

    });
}
var _clockflag = false;

function addTime() {
    $(document).on('click', '#work-time-add,#break-time-add', function(event) {
        var timeNum = $(this).prev().children('span').text();
        timeNum++;
        $(this).prev().children('span').text(timeNum);
        if ($(this).prev().children('span').attr('id') === "work-time") {
            $('div.bottom span').text(timeNum);
        }
    });
}

var _clockflag = false;

function startWorkClock(func) {
    $(document).on('click', '.bottom', function(event) {
        var settime = $('#work-time').text();
        var timenow = $('div.bottom span').text();
        if (timenow === settime) {
            $('div.bottom span').text(timenow + ':00');
        }
        if(!_clockflag){
          _clockflag = true;
          var a = setInterval(function(){
            var time = $('div.bottom span').text();
            var restarray = time.split(':');
            restarray = restarray.map(function(ele) {
                return parseInt(ele);
            });
            var min = restarray[0];
            var sec = restarray[1];
            if (min == 0 && sec==0) {
                clearInterval(a);
                startBreakClock();
                return false;
            }
              if (sec === 0) {
                  min--;
                  sec = 60;
              }
              sec--;
              var formsec = sec<10? function(){ return '0'+sec;}() : sec;
              var formmin = min<10? function(){ return '0'+min;}() : min;
              $('div.bottom span').text(min + ":" + formsec);
          }, 100);
        }
    });
}

function timeminus(){
  var time = $('div.bottom span').text();
  var restarray = time.split(':');
  restarray = restarray.map(function(ele) {
      return parseInt(ele);
  });
  var min = restarray[0];
  var sec = restarray[1];
  if (min == 0 && sec==0) {
      clearInterval(sec);
      return false;
  }
    if (sec === 0) {
        min--;
        sec = 60;
    }
    sec--;
    var formsec = sec<10? function(){ return '0'+sec;}() : sec;
    var formmin = min<10? function(){ return '0'+min;}() : min;
    $('div.bottom span').text(min + ":" + formsec);
}

function startBreakClock() {
        var settime = $('#break-time').text();
        var timenow = $('div.bottom span').text();
        if (timenow === "0:00") {
            $('div.bottom span').text(settime + ':00');
        }
        var b =  setInterval(function(){timeminus();}, 100);

        //console.log(restarray);
}

$(document).ready(function() {
    minuTime();
    addTime();
    startWorkClock(startBreakClock);
    //startWorkClock().done(startBreakClock);
});
