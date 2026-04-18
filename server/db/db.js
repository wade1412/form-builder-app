export const db = {
  forms: [
    {
      id: "form-1",
      title: "Developer Survey",
      description: "Basic dev questions",
      questions: [
        {
          id: "q-1",
          type: "TEXT",
          text: "What is your name?",
        },
        {
          id: "q-2",
          type: "MULTIPLE_CHOICE",
          text: "Favorite language?",
          options: ["JavaScript", "TypeScript", "Python"],
        },
        {
          id: "q-3",
          type: "CHECKBOX",
          text: "Technologies you use",
          options: ["React", "Vue", "Angular"],
        },
        {
          id: "q-4",
          type: "DATE",
          text: "When did you start coding?",
        },
      ],
    },
    {
      id: "form-2",
      title: "Simple Feedback",
      description: "Quick feedback form",
      questions: [
        {
          id: "q-5",
          type: "TEXT",
          text: "Your feedback",
        },
        {
          id: "q-6",
          type: "CHECKBOX",
          text: "What did you like?",
          options: ["UI", "Performance", "Features"],
        },
      ],
    },
  ],

  responses: [
    {
      id: "res-1",
      formId: "form-1",
      answers: [
        {
          questionId: "q-1",
          value: ["Valera"],
        },
        {
          questionId: "q-2",
          value: ["JavaScript"],
        },
        {
          questionId: "q-3",
          value: ["React", "Vue"],
        },
        {
          questionId: "q-4",
          value: ["2020-01-01"],
        },
      ],
    },
    {
      id: "res-2",
      formId: "form-1",
      answers: [
        {
          questionId: "q-1",
          value: ["Alex"],
        },
        {
          questionId: "q-2",
          value: ["TypeScript"],
        },
        {
          questionId: "q-3",
          value: ["Angular"],
        },
        {
          questionId: "q-4",
          value: ["2018-05-10"],
        },
      ],
    },
    {
      id: "res-3",
      formId: "form-2",
      answers: [
        {
          questionId: "q-5",
          value: ["Great app!"],
        },
        {
          questionId: "q-6",
          value: ["UI", "Performance"],
        },
      ],
    },
  ],
};
