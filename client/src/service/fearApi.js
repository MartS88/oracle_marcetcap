import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


const baseUrl = 'https://api.alternative.me'

export const fearApi = createApi({
    reducerPath: 'fearApi',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getFear: builder.query({
            query: (count) => '/fng/'
        }),
    })
})

export const {
   useGetFearQuery

} = fearApi
