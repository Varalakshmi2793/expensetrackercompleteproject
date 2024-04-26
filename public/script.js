const form = document.getElementById('form-control');
const userlist = document.getElementById('list-id');

window.addEventListener('load', async () => {
    await updateuserdetails();
});

form.addEventListener('submit', async function(event){
    event.preventDefault();
        
    const expenseamount = document.getElementById("expenseamount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("choose_category").value;
    
    try {
        const response=await fetch('/expense',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({expenseamount, description, category})
        });

        if (response.ok) {
           form.reset();
           
        } else {
            console.log("User details not submitted");
        }
    } catch (err) {
        console.log(err);
    }
});

async function updateuserdetails() {
    try {
        const response = await fetch('/expense');
        const datas = await response.json();
        datas.forEach(element => {
            const useritem = document.createElement('li');
            const usertext = document.createTextNode(`${element.expenseamount}, ${element.description}, ${element.category}`);
            useritem.appendChild(usertext);
            userlist.appendChild(useritem);            
          
            const editbutton = document.createElement('button');
            editbutton.textContent = "Edit";
            editbutton.addEventListener('click', () => {
                
                editExpense(element.id);
            });
            useritem.appendChild(editbutton);

      
            const delbutton = document.createElement('button');
            delbutton.textContent = "Delete";
            delbutton.addEventListener('click', async () => {
                try {
                    await fetch(`/expense/${element.id}`, {
                        method: 'DELETE'
                    });
                    
                } catch (error) {
                    console.log(error);
                }
            });
            useritem.appendChild(delbutton); 
            userlist.appendChild(useritem); 
        });
    } catch (error) {
        console.log(error);
    }
}

async function editExpense(id, newData) {
    try {
        const response = await fetch(`/expense/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });

        if (response.ok) {
            console.log("Expense updated successfully");
            await updateuserdetails();
        } else {
            console.log("Failed to update expense");
        }
    } catch (err) {
        console.log(err);
    }
}
