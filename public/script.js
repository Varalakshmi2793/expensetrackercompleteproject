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
        const response=await fetch('/expense/addexpense',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({expenseamount, description, category})
        });

        if (response.ok) {
            console.log(response);
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
        const token = localStorage.getItem('token');
        console.log(token);
        const headers = { "Authorization": token };
        console.log('Headers:', headers);
        const response = await fetch('/expense/getexpense',{ headers});
        console.log(response);
        if(response.ok){const datas = await response.json();
            datas.forEach(element => {
                const useritem = document.createElement('li');
                const usertext = document.createTextNode(`${element.expenseamount}, ${element.description}, ${element.category}`);
                useritem.appendChild(usertext);
                userlist.appendChild(useritem);            
    
               
    
                const delbutton = document.createElement('button');
                delbutton.textContent = "Delete";
                delbutton.addEventListener('click', async () => {
                    try {
                        await fetch(`/expense/delexpense/${element.id}`, {
                            method: 'DELETE'
                        });
    
                    } catch (error) {
                        console.log(error);
                    }
                });
                useritem.appendChild(delbutton); 
                userlist.appendChild(useritem); 
            });
        }else {
            console.error('Fetch request failed:', response.statusText);
        }
        
    } catch (error) {
        console.log(error);
    }
}

