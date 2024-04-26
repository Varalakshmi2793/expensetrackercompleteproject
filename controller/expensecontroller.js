const form = document.getElementById('form-control');
const userlist = document.getElementById('list-id');

// Function to fetch and display expenses
async function updateuserdetails(token) {
    try {
        userlist.innerHTML = ''; // Clear previous list items
        
        const response = await fetch('/expense/getexpense', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the request headers
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }
        
        const datas = await response.json();
        
        datas.forEach(element => {
            const useritem = document.createElement('li');
            const usertext = document.createTextNode(`${element.expenseamount}, ${element.description}, ${element.category}`);
            useritem.appendChild(usertext);
            userlist.appendChild(useritem);        

            const delbutton = document.createElement('button');
            delbutton.textContent = "Delete";
            delbutton.addEventListener('click', async () => {
                try {
                    await fetch(`/expense/addexpense/${element.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` // Include the token in the request headers
                        }
                    });
                    await updateuserdetails(token); // Refresh the list after deletion
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

// Call updateuserdetails function when the page loads
window.addEventListener('load', async () => {
    const token = await getTokenFromServer(); // Retrieve the token from the server
    await updateuserdetails(token); // Pass token to the function
});

form.addEventListener('submit', async function(event){
    event.preventDefault();
        
    const expenseamount = document.getElementById("expenseamount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("choose_category").value;
    
    try {
        const token = await getTokenFromServer(); // Retrieve the token from the server
        
        const response = await fetch('/expense/addexpense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the request headers
            },
            body: JSON.stringify({ expenseamount, description, category })
        });

        if (response.ok) {
            form.reset();
            await updateuserdetails(token); // Refresh the list after adding a new expense
        } else {
            console.log("Expense not submitted successfully");
        }
    } catch (err) {
        console.log(err);
    }
});

// This function should be implemented on the server-side to retrieve the token
async function getTokenFromServer() {
    try {
        const response = await fetch('/auth/token', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Include any additional headers if required
            }
        });

        if (!response.ok) {
            throw new Error('Failed to retrieve token');
        }

        const data = await response.json();
        return data.token; // Assuming the token is returned in the response
    } catch (error) {
        console.log(error);
    }
}
