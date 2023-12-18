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
    calculateMouny();

}

const addDataTolist = (transsaction) =>{
    const symbo = transsaction.amount < 0 ? '-' : '+';
    const status = transsaction.amount <0 ? 'mminus' : 'plus';
    const item = document.createElement('li');
    item.classList.add(status)
    item.innerHTML =`${transsaction.text}<span>${symbo} ${Math.abs(transsaction.amount) }</span> <button class="delete">x</button>`
    list.appendChild(item)

}


const  calculateMouny = () =>{
    const amount = transsaction.map(transsaction => transsaction.amount);
    console.log(amount);

    //คำนวนยอดคงเหลือ
    const total = amount.reduce( (result ,i)=>(result += i) );
    console.log(total);

    //คำนวนรายรับ
    const income = amount.filter(i => i>0).reduce((result,i)=>(result += i));

    console.log(income);
    
     //คำนวนรายจ่าย
     const expense = Math.abs(amount.filter(i => i<0).reduce((result,i)=>(result += i)));


     console.log(expense);

     balance.innerText = ` ${total} `;
     mplus.innerText = ` ${income} `;
     mminus.innerText = ` ${expense} `;

}


const addTransactions = (e) => {
    e.preventDefault();
    if(text.value.trim() === ''|| amount.value.trim() === ''){
        alert('กรุณากรอกข้อมูลให้ครบ');
    }   
    else{
        console.log(text.value);
        console.log(amount.value);
        console.log(autoid());


        const data ={
            id:autoid(),
            text:text.value,
            amount:Number.parseFloat(amount.value)

        }

        transsaction.push(data);
        addDataTolist(data);
        calculateMouny();


    }
}
const autoid = () => {
    return Math.floor(Math.random() *1000000) ;
}



form.addEventListener('submit', addTransactions);





start()