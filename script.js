const balance = document.getElementById('balance');
const  mminus = document.getElementById('mminus');
const mplus = document.getElementById('mplus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');



let transsaction =[]
let dataTransaction = async () => {
    try {
        let response = await fetch('http://127.0.0.1:3000/income')
        if (response.ok){
            transsaction = await response.json();
            console.log(transsaction);
        }else{
            console.log("failed to fetch data " , response.status);
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
    const total = amount.reduce( (result ,i)=>(result += i),0 ).toFixed(2);
    console.log(total);

    //คำนวนรายรับ
    const income = amount.filter(i => i>0).reduce((result,i)=>(result += i),0).toFixed(2);

    console.log(income);
    
     //คำนวนรายจ่าย
     const expense = Math.abs(amount.filter(i => i<0).reduce((result,i)=>(result += i),0)).toFixed(2);


     console.log(expense);

     balance.innerText = ` ${total} `;
     mplus.innerText = ` ${income} `;
     mminus.innerText = ` ${expense} `;

}


const addTransactions = async (e) => {
    e.preventDefault();
    if(text.value.trim() === ''|| amount.value.trim() === ''){
        alert('กรุณากรอกข้อมูลให้ครบ');
    }   
    else{
        try{
            await axios.post('http://127.0.0.1:3000/income', {
                text: text.value,
                amount: amount.value
            });
            
            text.value = '';
            amount.value = '';
            start();
        } catch (error) {
            console.error("Error sending income data: ", error);
        }
    }
}
const autoid = () => {
    return Math.floor(Math.random() *1000000) ;
}

form.addEventListener('submit', addTransactions);
start()
