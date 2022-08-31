const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data,dataLimit);

}

const displayPhones = (phones, dataLimit) =>{
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = '';

    // Display only 10 phones----//
    const showAll = document.getElementById("show-all");

 if( dataLimit && phones.length > 10){
    phones = phones.slice(0, 10);
    showAll.classList.remove('d-none');
 }
 else{
    showAll.classList.add('d-none')

 }

    // display 20 phones only//

    // phones = phones.slice(0,20);

    // ......diplay no phone found...//
    const noPhone = document.getElementById("no-phone" );
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none');
    }

    // display all phone---//

    phones.forEach( phone=> {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button onclick="loadPhoneDetails('${phone.slug}')"href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
    
        </div>
        </div>
        `
        phoneContainer.appendChild(phoneDiv);

    });

    toggoleSpiners(false)
}
 const processSearch = (dataLimit) => {
    toggoleSpiners(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);

 }
document.getElementById("btn-search").addEventListener('click', function(){
    processSearch(10)
})

// search input field enter key handler---//

 document.getElementById("search-field").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        processSearch(10);
    }
});

const toggoleSpiners = isLoading => {
    const loaderSection = document.getElementById("loader");
    if(isLoading){
        loaderSection.classList.remove('d-none')

    }
    else{
        loaderSection.classList.add('d-none')
    }
}

document.getElementById("btn-show-all").addEventListener('click', function(){
    processSearch();
})


const loadPhoneDetails =async id =>{
    const url =`https://openapi.programming-hero.com/api/phone/$%7Bid%7D`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails (data.data);

    
}

const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById("exampleModalLabel");
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById("phone-details");
    phoneDetails.innerHTML = `
    <p>Release Date:${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'} </p>
    `

}

loadPhones('apple');