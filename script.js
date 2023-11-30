const balance = document.getElementById('balance');
const  mminus = document.getElementById('mminus');
const mplus = document.getElementById('mplus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dataTransaction = [
    {id:1 , text:"อ้นยืมเงิน", amount:-1000 },
    {id:2 , text:"เติมสุ้มกาชา" ,amount:-2000},
    {id:3 , text:"อ้นคืนนี้ ", amount:2000},
    {id:4 , text:"เงินเดิอน", amount:35000}

    
]

let transsaction = dataTransaction

const start = () =>{
    list.innerHTML = '';
    transsaction.forEach(addDataTolist);

}

const addDataTolist = (transsaction) =>{
    const symbo = transsaction.amount < 0 ? '-' : '+';
    const status = transsaction.amount <0 ? 'mminus' : 'plus';
    const item = document.createElement('li');
    item.classList.add(status)
    item.innerHTML =`${transsaction.text}<span>${symbo} ${Math.abs(transsaction.amount) }</span> <button class="delete">x</button>`
    list.appendChild(item)

}
start()