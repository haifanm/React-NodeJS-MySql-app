class Auth {

    constructor(){
        this.authenticated = false;
        this.token=""
    }

    //should accept token as parameter
    login(){
        this.authenticated = true;
        this.token="TOKEN";  //shouls passed token here
        console.log("login: this.authenticated = true; wtih token: "+this.token);
    }

    //set authenticated to false and clear token
    logout(){
        this.authenticated = false;
        console.log("logout: this.authenticated = false;");
        this.token="";
    }

    isAuthenticated(){
        return this.authenticated;
    }

    getToken(){
        return this.token;
    }
}

export default new Auth();