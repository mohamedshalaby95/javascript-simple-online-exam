
export type propsButtonExamComponent ={
  backgroundColor: string,
  text: string,
  disabled:boolean,
  answer?:string,
   AnswerQuestionHandler:(answerText:string) => void;
  }

  export type ClickHandler = (text:string ) => (e: React.MouseEvent) => void;