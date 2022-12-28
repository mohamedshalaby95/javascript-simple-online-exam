import { useCallback, useEffect, useState } from "react";
import axiosWords from "../../api/wordsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";
import {
  answeredQuestionsType,
  buttonsAnswersType,
  ClickHandler,
  goQuestionClickHandler,
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
  // this state contain list from the number question showed but not answered
  //to help user know the questions was show but not answer
  const [questionsWasShowButNotAnswer, setQuestionsWasShowButNotAnswer] =
    useState<number[]>([]);
  // make a loader to fetch the data and closed it when received response
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

  //at this method help me to controll the answer of question
  // help us to make a list from questions were answer and
  //toast the user the answered is correct or incorrect
  //remove the question if exist at list of questions were show but not answer

  const AnswerQuestionHandler = useCallback(
    (answerText: string) => {
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
      //to remove this question if exist at list of questions were  show but not answer
      if (questionsWasShowButNotAnswer.includes(counterQuestions + 1)) {
        setQuestionsWasShowButNotAnswer((oldState) =>
          oldState.filter(
            (questionNumber) => questionNumber !== counterQuestions + 1
          )
        );
      }
    },
    [
      setCounterCorrectAnswers,
      setQuestionsWasShowButNotAnswer,
      questions,
      counterQuestions,
      questionsWasShowButNotAnswer,
    ]
  );

  // this function  help us to  make list from questions showed and not answer
  const checkQuestionWasAnswer = useCallback(() => {
    if (
      !questionsIsAnswered.some(
        (question) => question?.id === questions[counterQuestions]?.id
      ) &&
      !questionsWasShowButNotAnswer.includes(counterQuestions + 1)
    ) {
      setQuestionsWasShowButNotAnswer((oldState) => [
        ...oldState,
        counterQuestions + 1,
      ]);
    }
  }, [
    questionsWasShowButNotAnswer,
    setQuestionsWasShowButNotAnswer,
    questions,
    counterQuestions,
    questionsIsAnswered,
  ]);

  //this method is help us to  handle the prev and next question

  const nextAndPrevHandler: ClickHandler = useCallback(
    (value: number) => () => {
      setCounterQuestions((oldState: number) => oldState + value);
      //call this function to check if this question was answer or not
      checkQuestionWasAnswer();
    },
    [setCounterQuestions, checkQuestionWasAnswer]
  );

  // this function  help us to display the question that user click on it from a list of questions were show but not answer

  const goQuestionHandle: goQuestionClickHandler = useCallback(
    () => (e) => {
      checkQuestionWasAnswer();
      setCounterQuestions(
        Number((e.target as HTMLButtonElement).innerText) - 1
      );
    },
    [checkQuestionWasAnswer, setCounterQuestions]
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div
          className="flex justify-center items-center h-[100vh] w-[1/2] bg-cover bg-right bg-gray-700 "
          style={{ backgroundImage: `url('images/home-page-image.jpg')` }}
        >
          {/*make overlay  */}
          <div className="bg-black opacity-75 fixed top-0 right-0 left-0 bottom-0"></div>
          {/* this is check if he answered all questions to navigate the rank screen */}
          {questions && questions.length !== questionsIsAnswered.length ? (
            <div className="flex flex-col bg-white z-50 p-5 rounded-sm">
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
                    counterQuestions === 0 ? "bg-gray-900" : "bg-blue-600"
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

              {/*start box contain list of  questions were show and not answered */}

              {questionsWasShowButNotAnswer &&
              questionsWasShowButNotAnswer.length > 0 ? (
                <div className="bg-whit my-5">
                  <p className="mb-4">
                    The number of questions that have been viewed but not
                    answered{" "}
                  </p>
                  <div className="flex justify-center">
                    {questionsWasShowButNotAnswer.map((question) => (
                      <button
                        className="bg-blue-600 text-white py-2 px-3 my-2 mx-1"
                        onClick={goQuestionHandle()}
                      >
                        {question}
                      </button>
                    ))}
                    {/*end box contain list of  questions were show and not answered */}
                  </div>
                </div>
              ) : (
                ""
              )}
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
