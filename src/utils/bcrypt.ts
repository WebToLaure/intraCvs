import * as bcrypt from 'bcrypt';


const salt = 10;

export function encodePassword (password:string) {
    console.log(password);
    
    return bcrypt.hashSync (password, salt);
}