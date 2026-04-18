export const typeDefs = `#graphql
    enum QuestionEnum{
    TEXT
    MULTIPLE_CHOICE
    CHECKBOX
    DATE
}

type Form {
    id: ID!
    title: String!
    description: String
    questions: [Question!]!
}

type Question{
    id: ID!
    type: QuestionEnum!
    text: String!
    options: [String!]
}

type Response{
    id: ID!
    formId: ID!
    answers: [Answer!]!
}

type Answer{
    questionId: ID!
    value: [String!]!
}

input QuestionInput{
    type: QuestionEnum!
    text: String!
    options: [String!]
}

input AnswerInput{
    questionId: ID!
    value: [String!]!
}

type Query{ 
    forms: [Form!]!
    form(id: ID!): Form
    responses(formId: ID!): [Response!]
}



type Mutation{
    createForm(title: String!, description: String, questions: [QuestionInput!]!): Form
    submitResponse(formId: ID!, answers: [AnswerInput!]!): Response
}

`;
