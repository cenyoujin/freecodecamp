function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        };
    }
}

var distxtval = document.getElementById("distxt");
//change the color when  the button is clicked;
var selectColor = function(e) {
    if (e.type === 'mousedown') {
        e.target.style.backgroundColor = "#A8A8A8";
    } else if (e.type === 'mouseup') {
        e.target.style.backgroundColor = oriColor;
    }
};

function addClick() {
    if (!document.getElementsByClassName) return false;
    var button = document.getElementsByClassName("calButton");
    if (document.getElementsByClassName("calButton")) {
        for (var i = 0, len = button.length; i < len; i++) {
            oriColor = button[i].style.backgroundColor;
            button[i].style.cursor = 'pointer';
            button[i].addEventListener("mousedown", selectColor, false);
            button[i].addEventListener("mouseup", selectColor, false);
        }
    }
}
//display the value be pressed
function displayVal() {
    var calButtonArr = document.getElementsByClassName("calButton");
    for (var i = 0, len = calButtonArr.length; i < len; i++) {
        calButtonArr[i].addEventListener("click", function returnValue(e) {
            var disNow = e.currentTarget.getElementsByTagName("span")[0].innerHTML;
            //when input num display num rather than displaying "0"+num;
            if (distxtval.innerHTML === "0" && disNow !== "AC" && disNow !== '.') {
                distxtval.innerHTML = e.currentTarget.getElementsByTagName("span")[0].innerHTML;
            }
            //not the 1st time input value
            else {
                var regEx = /[+\-*/]/gi;
                var dotreg = /[.]/gi;
                //when press AC set the screen as 0;
                if (disNow === "AC") {
                    distxtval.innerHTML = 0;
                    return false;
                }
                //when press "=" calculator the answer;
                else if (disNow === "%") {
                    distxtval.innerHTML = (distxtval.innerHTML * 100).toFixed(2) + "%";
                }
                else if (disNow === "+/-") {
                    distxtval.innerHTML = 0 - distxtval.innerHTML;
                }
                else if (disNow === "=") {
                    distxtval.innerHTML = eval(distxtval.innerHTML);
                }
                //the part before the "||" is used to unqiue the symbol "+-*/" and the another part is to unique the dot;
                else if (regEx.test(disNow) && disNow === distxtval.innerHTML[distxtval.innerHTML.length - 1] || (dotreg.test(distxtval.innerHTML) && disNow === ".")) {
                    distxtval.innerHTML = distxt.innerHTML;
                }
                else if(disNow !== "=") {
                    distxtval.innerHTML = distxt.innerHTML + disNow;
                }
            }
        }, false);
    }
}

function init() {
    addClick();
    displayVal();
}

addLoadEvent(init);
