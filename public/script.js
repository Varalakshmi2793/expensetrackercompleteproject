const form = document.getElementById('form-control');
const userlist = document.getElementById('list-id');

window.addEventListener('load', async () => {
    await updateuserdetails();
});

form.addEventListener('submit', async function(event){
    event.preventDefault();
    const token = localStorage.getItem('token');
    const expenseamount = document.getElementById("expenseamount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("choose_category").value;

    try {
        const response=await fetch('/expense/addexpense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token
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
    
        const headers = { "Authorization": token };
   
        const response = await fetch('/expense/getexpense',{ headers});
      
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
                        method: 'DELETE', 
                        headers: {"Authorization": token}
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
document.getElementById('razorpaybtn').onclick = async function (e) {
    const token = localStorage.getItem('token');
    const headers = { "Authorization": token };
    console.log(headers)
    try {
        const response = await fetch('/purchase/premium', { headers });
        if (response.ok) {
            const data = await response.json();
            if (data && data.order && data.order.id) {
                const orderId = data.order.id;
                console.log(orderId);
                const options = {
                    "key": data.key_id,
                    "order_id": orderId,
                    "handler": async function (response) {
                        try {
                            const transactionResponse = await fetch('/purchase/transaction', {
                                method: 'POST',
                                headers: { "Authorization": token, "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    order_id: orderId,
                                    payment_id: response.razorpay_payment_id,
                                })
                            });
                            if (transactionResponse.ok) {
                                alert("You are a Premium user now");
                            } else {
                                console.error('Transaction failed:', transactionResponse.statusText);
                                alert("Transaction failed");
                            }
                        } catch (transactionError) {
                            console.error('Transaction error:', transactionError);
                            alert("Transaction error occurred");
                        }
                    }
                };
                const rzpl = new Razorpay(options);
                rzpl.open();
                e.preventDefault();
                rzpl.on('payment.failed', function (response) {
                    console.log(response);
                    alert("Payment failed");
                });
            } else {
                console.error('Invalid response data:', data);
                alert("Invalid response data");
            }
        } else {
            console.error('Failed to fetch premium purchase:', response.statusText);
            alert("Failed to fetch premium purchase");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred");
    }
}
