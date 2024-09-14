"use client"
import cliente from "./apollo"
import { ApolloProvider } from "@apollo/client"
import { ToastContainer } from "react-toastify"
const ApolloWrapper = ({ children }) => {
  return <ApolloProvider client={cliente}>
    {children}
  </ApolloProvider>
}
export default ApolloWrapper