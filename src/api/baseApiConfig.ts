import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseApiConfig = {
    
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3000',
        prepareHeaders: (headers, { getState }) => {
            // Use getState to access your redux store
            //const token = getState().auth.token;
           
            console.log('token will prepare in here')
            headers.set('authorization', `Bearer tokenhere`);
            
            return headers;
        },
    }),
 
    endpoints: () => ({}),
};