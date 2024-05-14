import ErrorLoad from "./ErrorLoad"
import LoadingPage from "./LoadingPage"

interface IHandleLoading {
    children ?:   React.ReactNode 
    isLoading: boolean;
    isError : boolean;
}

export default function HandleLoading({isLoading,isError, children } : IHandleLoading ){
   if(isLoading) return <LoadingPage />;
   if(isError) return <ErrorLoad /> ;
    return <>
      {children}
    </>
  
}