function saveToDatabase(event){
    event.preventDefault();

    let username = event.target.username.value;
    let phn = event.target.phone.value;
    let email = event.target.email.value;

    let obj = {
        name : username,
        phn : phn,
        email : email
    }

    showOnScreen(obj);

    axios.post("http://localhost:3000/",obj).then(res =>{
        console.log("User Saved>>",res.data);
        event.target.reset();  //for clearing the input fields
    }).catch((err)=>{
        console.log(err);
    })
}

function showOnScreen(obj){
    let ul = document.getElementById("listt");
    let li = document.createElement('li');
    li.id = obj.id;
    const userId = obj.id;

    let delBtn = document.createElement('button');
    delBtn.innerText = 'Delete';

    let editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';

    let textNode = document.createTextNode(`${obj.email} --- ${obj.name}`);
    li.appendChild(textNode);
    li.appendChild(document.createTextNode(' '));
    li.appendChild(delBtn);
    li.appendChild(document.createTextNode(' '));
    li.appendChild(editBtn);
    ul.appendChild(li);

    delBtn.addEventListener('click',()=>{
        axios.delete(`http://localhost:3000/delete-user/${userId}`)
    .then(() => {
        ul.removeChild(li);
    }).catch((err) => {
        console.log(err);
    })
    });

    editBtn.addEventListener('click',()=>{
        document.getElementById('username').value = obj.name;
        document.getElementById('email').value = obj.email;
        document.getElementById('phone').value = obj.phone;

        axios.delete(`http://localhost:3000/delete-user/${userId}`)
    .then((res) => {
        ul.removeChild(li);
    }).catch((err) => {
        console.log(err);
    })
    })

}

document.addEventListener('DOMContentLoaded', () => {
axios.get("http://localhost:3000/giveAllData")
.then(res => {
    // console.log(res.data);

    for(let i=0;i<res.data.length;i++){
        showOnScreen(res.data[i]);
    }
})
.catch(err => {
    console.error('Error fetching data:', err);
});
});

