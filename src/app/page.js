"use client";

import { Title } from "../components/title";
import { Questions } from "../components/questions";
import { Answers } from "../components/answers";
import { useContext, useState } from "react";
import useSWR from "swr";
import { useVoteMutation } from "../helpers/vote.mutation";
import { useQuestionMutation } from "../helpers/question.mutation";
import { UserContext } from "../state";

const fetcherGet = async (url) => {
  const res = await fetch(url);
  return res.json();
};

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [textOfNewQuestion, setTextOfNewQuestion] = useState("");
  const { isAuthenticated, setIsAuthenticates } = useContext(UserContext);

  useSWR(`questions`, (url) => fetcherGet("/api/questions"), {
    refreshInterval: 0,
    onSuccess: (data) => {
      console.log("data", data);
      setQuestions(data);
    },
  });

  useSWR(`getAuth`, (url) => fetcherGetAuth("/api/login"), {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
    onSuccess: (data) => {
      setIsAuthenticates(data.isAuthenticated);
    },
  });

  const voteMutation = useVoteMutation();
  const questionMutation = useQuestionMutation();

  return (
    <div className="flex flex-col justify-center min-h-screen bg-white text-black">
      <Title></Title>
      <h2 className="text-center mx-20 mt-10 text-green-500">Na tej stronie zagłosujesz na wybrane przez nas gry, na podstawie podanych pytań. Masz 5 punktów głosu na kazdą z gier, przez co będziesz mógl oddać głos w postaci osobistego mini rankingu.</h2>
      {questions.map((question) => {
        return (
          <div
            key={question._id}
            className=""
          >
            <Questions className=""text={question.text}></Questions>
            <Answers
              answers={question.answers}
              handleVote={(gameName) => {
                const newQuestions = questions.map((newQuestion) => {
                  if (question.text !== newQuestion.text) {
                    return newQuestion;
                  }

                  const newAnswers = question.answers?.map((answer) => {
                    if (answer.gameName === gameName) {
                      return { ...answer, count: answer.count + 1 };
                    }
                    return answer;
                  });
                  return { ...newQuestion, answers: newAnswers };
                });
                if (
                  question.answers.find(
                    (answer) => answer.gameName === gameName
                  ).count >= 5
                )
                  return;

                voteMutation.trigger({ id: question._id, gameName });

                setQuestions(newQuestions);
              }}
            />
          </div>
        );
      })}
      {isAuthenticated && (
        <div className="flex justify-center items-center ">
          
        <form className="border-2 border-fuchsia-800 justify-center flex items-center flex-col m-24 p-10 rounded-xl w-1/2 gap-5 "
        
          onSubmit={(e) => {
            e.preventDefault();
            questionMutation.trigger(
              { text: textOfNewQuestion },
              {
                onSuccess: (data) => {
                  setQuestions([...questions, data]);
                },
              }
            );
          }}
        >
          <h1 className="text-xl text-green-500">UTWÓRZ NASTEPNE PYTANIE</h1>
          <textarea className="border-2 border-green-500 rounded-xl h-40 w-3/4 text-center p-8"
            value={textOfNewQuestion}
            onChange={(e) => {
              setTextOfNewQuestion(e.target.value);
            }}
          ></textarea>

          <button className="bg-green-500 border-2 border-green-500 text-white p-3 rounded-xl w-56 mt-5 hover:text-green-500 hover:bg-white hover:border-2 hover:border-green-500 " type="submit"> DODAJ</button>
        </form>
        </div>
      )}
    </div>
  );
}
