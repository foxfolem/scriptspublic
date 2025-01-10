function esperar(){
    return new Promise((res) => {
        let interv = setInterval(() => {
            if(document.querySelector('#loading_content').style.display == 'none'){
                clearInterval(interv)
                res(true);
            }
        }, 10);
    });
}
function esperar2(){
    return new Promise((res) => {
        let atual = Number(document.querySelectorAll('.queue_icon').length)
        let interv = setInterval(() => {
            if(Number(document.querySelectorAll('.queue_icon').length) > atual){
                clearInterval(interv)
                res(true);
            }
        }, 10);
    });
}
function esperarBtnID(argumento){
    return new Promise((res) => {
        let interv = setInterval(() => {
            if(document.querySelector(`#${argumento}`) != null){
                clearInterval(interv);
                res(true);
            }
        }, 10);
    });
}

function getSeq(){
    return new Promise((res) => {
        res($.getScript("https://foxfolem.github.io/scriptspublic/seqC.js"));
    });
}
const timer = (ms) => {
    return new Promise(res => setTimeout(res, ms))
}
let data = new Date();
async function start(){
    if(game_data.features.Premium.active && window.location.search.includes('mode=buildings')){
        console.log('começou')
        let vilagesid = [];
        let timetotal = 0;
        for(let i = 0; i < document.querySelectorAll('#villages')[0].children.length; i++){
            vilagesid.push(document.querySelectorAll('#villages')[0].children[i].id)
        }
        await esperarBtnID('get_all_possible_build')
        document.querySelector('#get_all_possible_build').click();
        await esperar();
        await getSeq();
        while(true){
            for(let e = 0; e < vilagesid.length; e++){
                for await(let item of seqC){
                    let up = item.split('_')
                    let order = Number(document.querySelector(`#${vilagesid[e]}`).querySelectorAll('.queue_icon').length)
                    let nvAtual = Number(document.querySelector(`#${vilagesid[e]}`).querySelector(`.b_${up[0]}`).innerText)
                    console.log(nvAtual)
                    for(let i = 0; i < 5; i++){
                        if(document.querySelector(`#${vilagesid[e]}`).querySelector(`#order_${i}`) != null){
                            //order++
                            if(document.querySelector(`#${vilagesid[e]}`).querySelector(`#order_${i}`).children[2].children[0].src.includes(up[0])){
                                nvAtual += 1;
                            }
                        }
                    }
                    if(Number(up[1]) > nvAtual && order < 5){
                        if(!document.querySelector('#villages').querySelector(`#${vilagesid[e]}`).querySelector(`.b_${up[0]}`).innerText.includes('⬆️') && document.querySelector(`#${vilagesid[e]}`).querySelector(`.b_${up[0]}`).children[0] == undefined || !document.querySelector('#villages').querySelector(`#${vilagesid[e]}`).querySelector(`.b_${up[0]}`).innerText.includes('⬆️') && document.querySelector(`#${vilagesid[e]}`).querySelector(`.b_${up[0]}`).children[0].classList[0] == 'hidden'){
                            document.querySelector('#villages').querySelector(`#${vilagesid[e]}`).querySelector(`.b_${up[0]}`).innerHTML = document.querySelector('#villages').querySelector(`#${vilagesid[e]}`).querySelector(`.b_${up[0]}`).innerHTML + "⬆️"
                        }
                        console.log('Vilage: ' + vilagesid[e] + ' Up: ' + up[0] + ' Nvl Atual: ' + nvAtual + ' Nvl Up: '+ up[1]);
                        if(document.querySelector(`#${vilagesid[e]}`).querySelector(`.b_${up[0]}`).children[0] != undefined && document.querySelector(`#${vilagesid[e]}`).querySelector(`.b_${up[0]}`).children[0].classList.value != 'hidden'){
                            console.log('CLICANDO')
                            document.querySelector(`#${vilagesid[e]}`).querySelector(`.b_${up[0]}`).children[0].click();
                            //let time = document.querySelector(`#${vilagesid[e]}`).querySelector(`.b_${up[0]}`).children[0].attributes.tooltip.textContent.split('Tempo de construção: ')[1].split(':')
                            //timetotal += (((time[0]*60)*60)*1000) + ((time[1]*60)*1000) + (time[2]*1000)
                            //setTimeout(()=>{window.location.reload()},timetotal)
                            await esperar2();
                            await timer(200);
                        }else{
                            break;
                        }
                    }
                }
            }
            await timer(100);
        }
    }else{
        console.log('Não tem premium!.')
    }
    console.log('Terminou')
};
setInterval(()=>{window.location.reload()},1800000)
start();
