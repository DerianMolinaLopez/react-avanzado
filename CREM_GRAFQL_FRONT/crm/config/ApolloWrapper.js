"use client"
import cliente from "./apollo"
import { ApolloProvider } from "@apollo/client"

const ApolloWrapper = ({ children }) => {
  return <ApolloProvider client={cliente}>{children}</ApolloProvider>
}
export default ApolloWrapper