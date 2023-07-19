//for user authentication
"use client"  
import { SessionProvider } from "next-auth/react";

const Provider = ({children, session}) => {
    return (
        /**wrap the children inside of it */
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
      );
}

 
export default Provider;

/**this will be imported in the layout component */