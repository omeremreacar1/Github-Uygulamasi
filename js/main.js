const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const leftSideOfProfileSection = document.querySelector("#leftSideOfProfileSection");
const rightSideOfProfileSection = document.querySelector("#rightSideOfProfileSection");
const reposTable = document.querySelector("#reposTable");
const lastSearchedList = document.querySelector("#lastSearchedList");
const clearLastSearchesButton = document.querySelector("#clearLastSearchesButton");

let check = false;

const api = new Api();

runEventListeners();

function runEventListeners(){
    searchButton.addEventListener("click", search);
    document.addEventListener("DOMContentLoaded", addUsernamesToUI);
    clearButton.addEventListener("click", clearProfileInfo);
    clearLastSearchesButton.addEventListener("click", clearLastSearches);
}

function clearLastSearches(){
    lastSearchedList.innerHTML = "";

    Storage1.clearUsernamesFromStorage();
}


function clearProfileInfo(){
    leftSideOfProfileSection.innerHTML = "";
    rightSideOfProfileSection.innerHTML = "";
    reposTable.innerHTML = "";
    searchInput.value = "";
}

function search(){
    let username = searchInput.value.trim();

    if(username == null || username == ""){
        alert("Lütfen bir değer giriniz");
    }else{
        addUserDatasToUI(username);
        Storage1.addUsernameToStorage(username);
        addUsernameToUI(username);
    }
}

function addUserDatasToUI(username){
    let userDatas = api.getUserDatas(username);

    userDatas
    .then(data => {
        leftSideOfProfileSection.innerHTML = `
        <img src="${data.avatar_url}" width="200" id="profilePicture">
        <hr width="300">
        <h3>${data.name == null ? "" : data.name}</h3>
        `;

        rightSideOfProfileSection.innerHTML = `
        <div class="profileInfoTop">
        <button type="button" class="btn btn-info">
            Takipçi <span class="badge badge-light">${data.followers}</span>
            <span class="sr-only">unread messages</span>
        </button>

        <button type="button" class="btn btn-primary">
            Takip Edilen <span class="badge badge-light">${data.following}</span>
            <span class="sr-only">unread messages</span>
        </button>

        <button type="button" class="btn btn-secondary">
            Repolar <span class="badge badge-light">${data.public_repos}</span>
            <span class="sr-only">unread messages</span>
        </button>
        </div>

        <div class="profileInfoBottom mt-2">
        <ul class="list-group">
            <li class="list-group-item disabled"><img src="images/company.png" width="40">${data.company == null ? "" : data.company}</li>
            <li class="list-group-item disabled"><img src="images/location.png" width="40">${data.location == null ? "" : data.location}</li>
            <li class="list-group-item"><img src="images/mail.png" width="40">${data.email == null ? "" : data.email}</li>
            <li class="list-group-item"><a href="#" id="showReposButton">Repoları Göster</a></li>
        </ul>
        </div>
        `;

        document.querySelector("#showReposButton").addEventListener("click", checkShowRepos);
    });   
}

function checkShowRepos(){
    if(check){
        check = false;
        reposTable.innerHTML = "";
        document.querySelector("#showReposButton").textContent = "Repoları Göster";
    }else{
        check = true;
        document.querySelector("#showReposButton").textContent = "Repoları Kapat";
        addReposDatasToUI();
    }
}

function addReposDatasToUI(){
    const username = searchInput.value.trim();
    let reposDatas = api.getReposDatas(username);
    let i = 0;
    reposDatas
    .then(data => {
        data.forEach(element => {
            i++;
            reposTable.innerHTML += `
            <tr>
                <th scope="row">${i}</th>
                <td>${element.name}</td>
                <td>${element.pushed_at}</td>
            </tr>
            `;
        });
            
    });
}

function addUsernameToUI(username){
    lastSearchedList.innerHTML += `
    <li class="list-group-item">${username}</li>
    `
}

function addUsernamesToUI(){
    let usernamesArray = Storage1.getUsernamesFromStorage();

    usernamesArray.forEach(username => {
        lastSearchedList.innerHTML += `
        <li class="list-group-item">${username}</li>
        `
    })
}




