import React from 'react'; 
import { Status, Loader } from 'shared'; 
 
type WithLoaderProps = { 
    status: Status
}; 
 
const withLoader = <T extends object>(Component: React.ComponentType<T>): React.FC<T & WithLoaderProps> => { 
    return ({ status, ...props }: WithLoaderProps) => { 
 
        const isloading = status === Status.Initial || status === Status.Running; 
 
        return ( 
            isloading ? <Loader /> : <Component {...props as T} /> 
        ) 
 
    } 
}; 
 
export default withLoader;