function saveToLocalStorage(event){
event.preventDefault();
const price = document.getElementById('amount').value;
const pName = document.getElementById('pName').value;
const category = document.getElementById('category').value;
const obj ={
    price,
    pName,
    category
}
axios.post("https://crudcrud.com/api/09bc76b9cdab452f94a7655cb29e1939/seller",obj)
.then((response)=>{
    console.log(response);
})
.catch((err)=>{
    console.log(err)
})
showNewOrderScreen(obj);

}
function showNewOrderScreen(order){
    document.getElementById('amount').value='';
    document.getElementById('pName').value='';
    document.getElementById('category').value='';
    if(`${order.category}` === "Electronics")
    {
        var parentNode =document.getElementById('listOfOrder1');
    }
    else if(`${order.category}` === "FoodItems"){
        var parentNode = document.getElementById('listOfOrder2');
    }
   else{
    var parentNode = document.getElementById('listOfOrder3');
   }
   const childHTML =`<li class="inputs" id=${order._id}>SellingPrice: ${order.price} - OrderName: ${order.pName} - Category: ${order.category}
  <button class="todo-btn" onclick=delteOrder('${order._id}')>Delete Order</buton>
  </li> `
  parentNode.innerHTML=parentNode.innerHTML+childHTML;
}
window.addEventListener("DOMContentLoaded",() =>{
    axios.get("https://crudcrud.com/api/09bc76b9cdab452f94a7655cb29e1939/seller")
    .then((response)=>{
        console.log(response);
        for(var i=0;i < response.data.length;i++){
            showNewOrderScreen(response.data[i]);
        }
    })
    .catch((err)=>{
        console.log(err);
    })
})
function delteOrder(orderId){
    axios.delete(`https://crudcrud.com/api/09bc76b9cdab452f94a7655cb29e1939/seller/${orderId}`)
    .then((response)=>{
        removeOrderFromScreen(orderId)
    })
    .catch((err)=>{
        console.log(err);
    })
}
function removeOrderFromScreen(orderId){
    const parentNode=document.getElementsByClassName("order");
    const childNodeToBeDeleted = document.getElementById(orderId);
    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted)
    }
}

