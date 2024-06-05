function Answers({ answers, handleVote }) {
  return (
    <div className=" grid grid-cols-2 gap-5  ">
      {answers?.map((answer) => {
        return (
          <button
            onClick={() => {
              handleVote(answer.gameName);
            }}
            className="border-2 border-green-500 p-4 rounded-2xl drop-shadow-lg mx-10 mb-10"
          >
            {answer.gameName} | {answer.count}
          </button>
        );
      })}
    </div>
  );
}

export { Answers };
