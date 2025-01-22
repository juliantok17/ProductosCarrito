class UserDTO {
    constructor(user) {  
        console.log(user);
        this.usuario = user.usuario;   
        this.email = user.email;
        this.role = user.role;
        this.cart = user.cart && user.cart.toString ? user.cart.toString() : null;
        //El usuario y otros datos sensibles no me van a llegar a la vista. 
    }

}

export default UserDTO; 