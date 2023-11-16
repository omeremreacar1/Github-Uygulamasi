class Storage1 {

    static getUsernamesFromStorage(){
        let usernamesArray;

        if(localStorage.getItem("usernames") == null){
            usernamesArray = [];
        }else {
            usernamesArray = JSON.parse(localStorage.getItem("usernames"));
        }

        return usernamesArray;
    }
    
    static checkUsername(username){
        let usernamesArray = Storage1.getUsernamesFromStorage();
        let check = false;

        if(!usernamesArray.includes(username)){
            check = true;
        }

        return check;
    }

    static addUsernameToStorage(username){
        let usernamesArray = Storage1.getUsernamesFromStorage();

        if(Storage1.checkUsername(username)){
            usernamesArray.push(username);
            localStorage.setItem("usernames", JSON.stringify(usernamesArray));
        }
    }

    static clearUsernamesFromStorage(){
        let usernamesArray = [];

        localStorage.setItem("usernames", JSON.stringify(usernamesArray));
    }
}