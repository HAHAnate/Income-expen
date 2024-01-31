const balance = document.getElementById('balance');
const  mminus = document.getElementById('mminus');
const mplus = document.getElementById('mplus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dataTransaction = [
//     {id:1 , text:"อ้นยืมเงิน", amount:-1000 },
//     {id:2 , text:"เติมสุ้มกาชา" ,amount:-2000},
//     {id:3 , text:"อ้นคืนนี้ ", amount:2000},
//     {id:4 , text:"เงินเดิอน", amount:35000}
// ]
// let transsaction = dataTransaction

let transsaction =[]
let dataTransaction = async () => {
    try {
        let response = await fetch('http://127.0.0.1:3000/income')
        if (response.ok){
            transsaction = await response.json();
            console.log(transsaction);
        }else{
            console.log("failed to fetch data " + response.status);
        }


    } catch (error) {
        console.log("Error fetch data",error );
    }

}




const start = async () =>{
    list.innerHTML = '';
    await dataTransaction();
    transsaction.forEach(addDataTolist);
    calculateMouny();

}

const addDataTolist = (transsaction) =>{
    const symbo = transsaction.amount < 0 ? '-' : '+';
    const status = transsaction.amount <0 ? 'mminus' : 'plus';
    const item = document.createElement('li');
    item.classList.add(status)
    // item.innerHTML =`${transsaction.text}<span>${symbo} ${Math.abs(transsaction.amount) }
    // </span> <button class="delete" onclick="remove(${transsaction.id})">x</button>`
    // list.appendChild(item)
    const DeleteButton = document.createElement('button');
    DeleteButton.textContent = 'x'
    DeleteButton.classList.add('delete')
    DeleteButton.addEventListener('click',async () =>{
           try {
                await axios.delete(`http://127.0.0.1:3000/income/${transsaction.id}`)
                console.log("ลบข้อมูลเรียนร้อย");
                console.log(`${transsaction.id}`);
                list.innerHTML= '';
                start();
    } catch (error) {
        console.log("เกิดข้อผิดพลาด",error);
        
    }
    })
    const spa = document.createElement("span")
    const tex = document.createElement("h4");

    tex.innerHTML = `${transsaction.text}`
    spa.innerHTML = `${symbo} ${Math.abs(transsaction.amount)}`
    item.appendChild(tex);
    item.appendChild(spa);
    item.appendChild(DeleteButton);
    list.appendChild(item);
}


 



const  calculateMouny = () =>{
    const amount = transsaction.map(transsaction => transsaction.amount);
    console.log(amount);

    //คำนวนยอดคงเหลือ
    const total = amount.reduce( (result ,i)=>(result += i),0 );
    console.log(total);

    //คำนวนรายรับ
    const income = amount.filter(i => i>0).reduce((result,i)=>(result += i),0);

    console.log(income);
    
     //คำนวนรายจ่าย
     const expense = Math.abs(amount.filter(i => i<0).reduce((result,i)=>(result += i),0));


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


        text.value = '';
        amount.value = 0;

    }
}
const autoid = () => {
    return Math.floor(Math.random() *1000000) ;
}



form.addEventListener('submit', addTransactions);

const remove = (id) => {
    transsaction = transsaction.filter(transsaction => transsaction.id!== id);
    //1 2 3 4  =>  id 2
    start()
    console.log(transsaction);




}



start()