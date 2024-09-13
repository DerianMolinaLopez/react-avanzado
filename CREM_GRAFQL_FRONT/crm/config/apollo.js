import { ApolloClient,HttpLink,InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch"
import { setContext } from "apollo-link-context";
const httpLink = new HttpLink({
     uri:"http://localhost:4000",
        fetch
})

const authLink = setContext((_,{headers})=>{
    const token = localStorage.getItem("token")
    return {
        headers:{
            ...headers,
            authorization:token ? `Bearer ${token}` : ""
        }
    }
})

const cliente = new ApolloClient({
    cache:new InMemoryCache(),
    link:authLink.concat(httpLink)
})
export default cliente  