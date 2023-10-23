const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, dataLimit)
    console.log(data.data);

}

const displayPhones = (phones, dataLimit) => {
   
    const phoneContainer = document.getElementById('Phone-container')
    phoneContainer.innerText = '';

    //display 10 phones
    const showDiv = document.getElementById('show-btn')
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10)
        showDiv.classList.remove('d-none')

    }
    else{
        showDiv.classList.add('d-none')
    }
    

    // NO phone Found
    const noPhone = document.getElementById('no-phone')   

    if(phones.length === 0){
         noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }

    phones.forEach(phone => {
        //console.log(phone)
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-4" >
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onClick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetails"> Show Phone Details</button>
          
          
        </div>
      </div>
        
        `
        phoneContainer.appendChild(phoneDiv)
    });
}

const searchProcess = (dataLimit) => {
    const searchField = document.getElementById('serch-field')
    const serachText = searchField.value 
    loadPhones(serachText, dataLimit)
}

// search input field enter key handler
document.getElementById('serch-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchProcess(10);
    }
});

// handle search button click
document.getElementById('Search-button').addEventListener('click', function(){
    searchProcess(10);
})

document.getElementById('show-all-btn').addEventListener('click', function(){
  searchProcess();
})

const loadPhoneDetails = async id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    phoneDisplay(data.data);
    
}

const phoneDisplay = data => {
  console.log(data)
  const phoneTitle = document.getElementById('phone-details-title')
  phoneTitle.innerText = data.name
  const phoneDeatilsContainer = document.getElementById('phone-details-container')
  phoneDeatilsContainer.innerHTML = `
    <p>date: ${data.releaseDate}</p>
    <p>storage: ${data.mainFeatures ? data.mainFeatures.storage : 'No Storage'    }</p>
    <p>Usb:${data.others ? data.others.USB : 'No USB ' } </p>

  `
}


loadPhones('iphone');