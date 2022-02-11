class Auth {
    constructor() {
      this.isLogin = false;
    }
  
    login() {
      this.isLogin = true;
      console.log(this.isLogin)
    }
  
    logout() {
      this.isLogin = false;
      
    }
  
  }
  export default new Auth();  