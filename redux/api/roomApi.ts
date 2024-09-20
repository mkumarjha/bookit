import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const roomApi = createApi({
    reducerPath: 'roomApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api'}),
    endpoints: (builder) => ({
        canUserReview: builder.mutation({
            query(id){
                return {
                    url: `/reviews/can_reivew?roomId=${id}`
                }
            }
        }),
        postReview: builder.mutation({
            query(body){
                return {
                    url: '/reviews',
                    method: 'PUT',
                    body
                }
            }
        })
    })
})

export const { usePostReviewMutation, useCanUserReviewMutation } = roomApi