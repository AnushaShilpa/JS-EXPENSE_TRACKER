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
   localStorage.setItem(expense.description,JSON.stringify(expense));
   showuser(expense);
  
}
function showuser(exp)
{
  const parentnode=document.getElementById('items');
  const child=`<li  class=" fw-bold text-dark" id=${exp.description}>${exp.value} ${exp.description} ${exp.category}
              <button onclick=editUser('${exp.value}','${exp.description}','${exp.category}') class="btn btn-secondary fs-6" >edit</button>
              <button onclick=removeUser('${exp.description}') class="btn btn-secondary fs-6">delete</button>
                                      </li$>`
  parentnode.innerHTML=parentnode.innerHTML+child;
}

function removeUser(description)
{
  localStorage.removeItem(description);
  removeUSerFromScreen(description);
}

function removeUSerFromScreen(description)
{
   const parentNode=document.getElementById('items');
   const child=document.getElementById(description);
   parentNode.removeChild(child);
}

function editUser(value,description,category)
{
  document.getElementById('numbers').value=value;
  document.getElementById('description').value=description;
  document.getElementById('category').value=category;
  removeUser(description);
}