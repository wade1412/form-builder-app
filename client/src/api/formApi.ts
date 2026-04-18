import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { gql } from "graphql-request";
import {
  type Form,
  type Response,
  type MutationCreateFormArgs,
  type MutationSubmitResponseArgs,
} from "../types/formTypes.ts";

const formsApi = createApi({
  reducerPath: "formsApi",
  baseQuery: graphqlRequestBaseQuery({
    url: "http://localhost:4000/graphql",
  }),
  tagTypes: ["Form", "Response"],

  endpoints: (builder) => ({
    //Queries
    getForms: builder.query<Form[], void>({
      query: () => ({
        document: gql`
          query GetForms {
            forms {
              id
              title
              description
              questions {
                id
                type
                text
              }
            }
          }
        `,
      }),

      transformResponse: (response: { forms: Form[] }) => response.forms,
      providesTags: ["Form"],
    }),

    getForm: builder.query<Form, string>({
      query: (id) => ({
        document: gql`
          query GetForm($id: ID!) {
            form(id: $id) {
              id
              title
              description
              questions {
                id
                type
                text
                options
              }
            }
          }
        `,
        variables: { id },
      }),

      transformResponse: (response: { form: Form }) => response.form,
      providesTags: ["Form"],
    }),

    getResponsesByFormId: builder.query<Response[], string>({
      query: (formId) => ({
        document: gql`
          query GetResponsesByFormId($formId: ID!) {
            responses(formId: $formId) {
              id
              formId
              answers {
                questionId
                value
              }
            }
          }
        `,
        variables: { formId },
      }),

      transformResponse: (response: { responses: Response[] }) =>
        response.responses,
      providesTags: ["Response"],
    }),

    //Mutations
    createForm: builder.mutation<Form, MutationCreateFormArgs>({
      query: ({ title, description, questions }) => ({
        document: gql`
          mutation CreateForm(
            $title: String!
            $description: String
            $questions: [QuestionInput!]!
          ) {
            createForm(
              title: $title
              description: $description
              questions: $questions
            ) {
              id
              title
              description
              questions {
                id
                type
                text
              }
            }
          }
        `,

        variables: { title, description, questions },
      }),

      transformResponse: (response: { createForm: Form }) =>
        response.createForm,
      invalidatesTags: ["Form"],
    }),

    submitResponse: builder.mutation<Response, MutationSubmitResponseArgs>({
      query: ({ formId, answers }) => ({
        document: gql`
          mutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {
            submitResponse(formId: $formId, answers: $answers) {
              id
              formId
              answers {
                questionId
                value
              }
            }
          }
        `,

        variables: { formId, answers },
      }),

      transformResponse: (response: { submitResponse: Response }) =>
        response.submitResponse,
      invalidatesTags: ["Response"],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useGetResponsesByFormIdQuery,
  useCreateFormMutation,
  useSubmitResponseMutation,
} = formsApi;

export default formsApi;
