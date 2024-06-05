function QuestionForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setQuestions([...questions, textOfNewQuestion]);
      }}
    >
      <input
        value={textOfNewQuestion}
        onChange={(e) => {
          setTextOfNewQuestion(e.target.value);
        }}
      ></input>

      <button type="submit"> dodaj</button>
    </form>
  );
}

export { QuestionForm };
