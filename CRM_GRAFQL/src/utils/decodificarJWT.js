import jwt from 'jsonwebtoken';
export default function decodificarToken(token){
    const decodificacion = jwt.verify(token,process.env.SECRETA)
    return decodificacion   
}