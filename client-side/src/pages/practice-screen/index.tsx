import { useEffect, useState } from "react";
import axiosWords from "../../api/wordsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";
import {
  answeredQuestionsType,
  buttonsAnswersType,
  ClickHandler,
  questionsType,
} from "./practice.type";
import ButtonExam from "../../components/button-exam";
import ProgressBar from "../../components/progress-bar";


//it is defined the arry of answer enable
const buttonsAnswers: buttonsAnswersType[] = [
  { text: "Verb", backgroundColor: "blue" },
  { text: "Noun", backgroundColor: "blue" },
  { text: "Adverb", backgroundColor: "blue" },
  { text: "Adjective", backgroundColor: "blue" },
];
export default function Index() {
  //state for question that fetch it
  const [questions, setQuestions] = useState<questionsType[]>([]);
  //that for count the correct answer to get score percent
  const [counterCorrectAnswers, setCounterCorrectAnswers] = useState<number>(0);
  //that counter question to display the question 
  const [counterQuestions, setCounterQuestions] = useState<number>(0);
  //that is answered question to make sure answered all question and save the answer to help me disabled answered button and make border about his chooice
  const [questionsIsAnswered, setQuestionsIsAnswered] = useState<
    answeredQuestionsType[]
  >([]);
  // make a loader to fetch the data
  const [loading, setLoading] = useState<boolean>(true);
  let navigate = useNavigate();
  useEffect(() => {
    axiosWords
      .get("")
      .then((res) => {
        setLoading(false);
        setQuestions(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("something Go Wrong!");
        navigate(`/`);
      });
  }, []);

  //at this method that help me to controll the answer each chooice at questions and help me to set the questions answered and toast the user the answered is correct or incorrect
  const AnswerQuestionHandler = (answerText: string) => {
    if (questions) {
      setQuestionsIsAnswered((oldState) => [
        ...oldState,
        { id: questions[counterQuestions]?.id, yourAnswer: answerText },
      ]);
      if (questions[counterQuestions]?.pos === answerText.toLowerCase()) {
        setCounterCorrectAnswers((oldState: number) => oldState + 1);
        toast.success("Correct Answer");
      } else {
        toast.error("Incorrect Answer");
      }
    }
  };
  //this method is help handle the prev and next questions and help me to know the question i displayed it 
  const nextAndPrevHandler: ClickHandler = (value: number) => () => {
    setCounterQuestions((oldState: number) => oldState + value);
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center items-center h-[100vh] w-[1/2] ">
          {/* this is check if he finish answered all questions to navigate the rank screen */}
          {questions && questions.length !== questionsIsAnswered.length ? (
            <div className="flex flex-col bg-gray-400 p-5 rounded-sm  ">
              <span className="text-black font-bold">
                Chooice the correct answer
              </span>
              <span>
                {" "}
                {counterQuestions + 1} -{" "}
                <span className="text-black font-bold mt-2">
                  {questions[counterQuestions]?.word}
                </span>{" "}
                is a
              </span>
              {buttonsAnswers && buttonsAnswers.length > 0 ? (
                <div className="flex justify-center flex-wrap">
                  {buttonsAnswers.map((button) => (
                    <ButtonExam
                      answer={
                        questionsIsAnswered.find(
                          (question) =>
                            question?.id === questions[counterQuestions]?.id
                        )?.yourAnswer
                      }
                      disabled={questionsIsAnswered?.some(
                        (question) =>
                          question?.id === questions[counterQuestions]?.id
                      )}
                      text={button?.text}
                      backgroundColor={button?.backgroundColor}
                      AnswerQuestionHandler={AnswerQuestionHandler}
                    />
                  ))}
                </div>
              ) : (
                ""
              )}

              <div className="flex justify-between">
                <button
                  className={`mt-8 ${
                    counterQuestions === 0 ? "bg-gray-900":"bg-blue-600"
                  } bg-blue-600 text-white rounded-md px-4 py-2`}
                  disabled={counterQuestions === 0}
                  onClick={nextAndPrevHandler(-1)}
                >
                  Prev
                </button>
                <button
                  className={`mt-8 bg-blue-600 text-white rounded-md ${
                    counterQuestions + 1 === questions.length
                      ? "bg-gray-900"
                      : "bg-blue-600"
                  } px-4 py-2`}
                  disabled={counterQuestions + 1 === questions.length}
                  onClick={nextAndPrevHandler(1)}
                >
                  next
                </button>
              </div>
              <div className="mt-10">
                <ProgressBar
                  percent={Math.round(
                    (questionsIsAnswered.length / questions?.length) * 100
                  )}
                />
              </div>
            </div>
          ) : (
            <>
              {navigate({
                pathname: "/rank",
                search: `?score=${
                  (counterCorrectAnswers / questions.length) * 100
                }`,
              })}
            </>
          )}
        </div>
      )}
    </>
  );
}
