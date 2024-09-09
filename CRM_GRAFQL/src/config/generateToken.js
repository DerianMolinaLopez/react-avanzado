import jwt from 'jsonwebtoken'; 
const generarToken = (id,email) => {
    return  jwt.sign({id,email},process.env.SECRETA,{expiresIn:'20h'})

}
export default generarToken