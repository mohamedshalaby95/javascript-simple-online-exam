
  export type questionsType={
    id: number,
    word: String,
    pos: String,
  }

  export type buttonsAnswersType={
    text:string,
     backgroundColor:string
  }

  export type answeredQuestionsType={
    id:number,
    yourAnswer:string
  }

  export type ClickHandler = (value:number ) => (e: React.MouseEvent) => void;

  export type goQuestionClickHandler = () => (e: React.MouseEvent) => void;