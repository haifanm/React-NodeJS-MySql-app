import Cookies from 'js-cookie'

class Auth {

    constructor(){
        this.token=""
    }

    login(token){
        Cookies.set('user', token);
    }

    logout(){
        Cookies.remove('user');
    }

    isAuthenticated(){
        return Cookies.get('user');
    }

    getToken(){
        return Cookies.get('user');
    }
}

export default new Auth();