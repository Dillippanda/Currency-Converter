const Base_URL="https://open.er-api.com/v6/latest/USD";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr = document.querySelector(".from select ")
const toCurr = document.querySelector(".to select ")
let msg = document.querySelector(".msg")


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option")
newOption.innerText=currCode;
newOption.value=currCode;
if(select.name === "from" && currCode === "USD"){
    newOption.selected="selected";
}
else if(select.name === "to" && currCode === "INR"){
    newOption.selected="selected";

}
select.append(newOption)
    }
    select.addEventListener("change",(evt)=>{
updateFlag(evt.target);
    });
}
const update = async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
   if ( !(amtVal >=0 || amtVal== NaN) ){
alert("Enter a valid  input");
    }
else{
    
    const URL=`https://open.er-api.com/v6/latest/${fromCurr.value}`


    const getcurrency = async() =>{
        let response= await fetch(URL);
    let data=await response.json();
    let rate=data.rates[toCurr.value];
let finalAmount = amtVal * rate ;

msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
    }
    getcurrency();
}
}
const updateFlag=(element)=>{
let currCode= element.value;
let cuntryCode=countryList[currCode];
let newSrc = `https://flagsapi.com/${cuntryCode}/flat/64.png`;
let imgl =element.parentElement.querySelector("img");
imgl.src = newSrc;
};
window.addEventListener("load",()=>{
    update();
})
btn.addEventListener("click" , (evt)=>{
    evt.preventDefault();
update();

})
