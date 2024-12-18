setInterval(()=>{
    console.log('Procurando')
    if(document.querySelector('#botprotection_quest') != null){
        console.log('Achou')
        document.querySelector('#botprotection_quest').click()
    }else if(document.querySelector('#bot_check') != null){
        if(document.querySelector('#bot_check').children[3] != null){
            document.querySelector('#bot_check').children[3].click()
        }
    }
    var CHECKBOX = "#checkbox";
    var ARIA_CHECKED = "aria-checked";

    function qSelector(selector) {
        return document.querySelector(selector);
    }

    function isHidden(el) {
        return (el.offsetParent === null)
    }

    if (window.location.href.includes("checkbox")) {
        var checkboxInterval = setInterval(function() {
            if (!qSelector(CHECKBOX)) {
            } else if (qSelector(CHECKBOX).getAttribute(ARIA_CHECKED) == "true") {
                clearInterval(checkboxInterval);
            } else if (!isHidden(qSelector(CHECKBOX)) && qSelector(CHECKBOX).getAttribute(ARIA_CHECKED) == "false") {
                qSelector(CHECKBOX).click();
            } else {
                return;
            }

        }, 500);
    }
},500)
