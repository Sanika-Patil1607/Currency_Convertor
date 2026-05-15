//const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/currencies";
const Base_URL = "https://open.er-api.com/v6/latest";


const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for (let select of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="Selected";
            }
            else if(select.name==="to" && currCode==="INR"){
                newOption.setAttribute("selected","selected");
            }
        
        select.appendChild(newOption);

        select.addEventListener("change",(e)=>{
            updateFlag(e.target);
        })
    }
}



const updateFlag=(select)=>{
  let currCode=select.value;
  let countrycode=countryList[currCode];
  let img=select.parentElement.querySelector("img");
  let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
  img.src=newsrc;
}

//     for(let code in countryList){
//         if(code===select.value){
//             let imgTag=select.parentElement.querySelector("img");
//             imgTag.src=`https://flagsapi.com/${countryList[code]}/flat/64.png`;
//         }       
// }

const updateExchangeRate= async()=>{
    let amount=document.querySelector(".amount input");
    let amtValue=amount.value;
    console.log(amtValue);
    if (amtValue === "" || amtValue < 1) {
        alert("Please enter a valid amount");
        amtValue=1;
        amount.value="1";
    }


    // console.log(fromCurr.value,toCurr.value);
    // let URL = `${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    // let response=await fetch(URL);

    // let data=await response.json();
    // let rate=data[toCurr.value.toLowerCase()];

    let URL = `${Base_URL}/${fromCurr.value}`;
    let response = await fetch(URL);

    let data = await response.json();
    let rate = data.rates[toCurr.value];
    console.log(rate);

    let finalAmt=amtValue*rate;
    msg.innerText=`${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;

}

btn.addEventListener("click",  (e)=>{
    e.preventDefault();
    updateExchangeRate();
    
})

window.addEventListener("load",()=>{
    updateExchangeRate();
})


