const form =document.getElementById('add-form')
form.addEventListener('submit',addItem)

function addItem(e)
{
  e.preventDefault();
    const value=document.getElementById('numbers').value;
   const description=document.getElementById('description').value;
   const category=document.getElementById('category').value;
   const expense =
   {
        value:value,
        description:description,
        category:category
   }
   axios.post("https://crudcrud.com/api/f7518c576fa94dd1aafc17c7a981048a/expenseData",expense)
   .then((response)=>
   {
     showuser(expense)
     console.log(response);
   }).catch((error)=>
   {
      document.body.innerHTML=`<li>Something went wrong</li>`
      console.error(error)
   })
   
  
}
window.addEventListener("DOMContentLoaded", () => {
  axios.get("https://crudcrud.com/api/f7518c576fa94dd1aafc17c7a981048a/expenseData")
  .then((response)=>
  {
    for(var i=0;i<response.data.length;i++)
    {
      showuser(response.data[i])
    }
  }).catch((error)=>
  {
    console.log(error)
  })
  
})

function showuser(exp)
{
  const parentnode=document.getElementById('items');
  const child=`<li  class="fw-bold text-dark" id='${exp._id}'>${exp.value} ${exp.description} ${exp.category}
              <button onclick=editUser('${exp.value}','${exp.description}','${exp.category}','${exp._id}') class="btn btn-secondary fs-6" >edit</button>
              <button onclick=removeUser('${exp._id}') class="btn btn-secondary fs-6">delete</button>
                                      </li>`
  parentnode.innerHTML=parentnode.innerHTML+child;
}

function removeUser(expid)
{

  axios.delete(`https://crudcrud.com/api/f7518c576fa94dd1aafc17c7a981048a/expenseData/${expid}`)
  .then((response)=>
  {
        removeUSerFromScreen(expid);
        //console.log(response);
  })
  .catch((error)=>
  {
    console.error(error)
  })
  
}

function removeUSerFromScreen(expid)
{
   const parentNode=document.getElementById('items');
   const child=document.getElementById(expid);
   
   parentNode.removeChild(child);
}

function editUser(value,description,category,expid)
{
  document.getElementById('numbers').value=value;
  document.getElementById('description').value=description;
  document.getElementById('category').value=category;

  removeUser(expid)
}