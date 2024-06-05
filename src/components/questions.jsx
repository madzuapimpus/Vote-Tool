function Questions({ text }) {
  return (
    <div className="flex justify-center items-center m-10 ">
      <div className="flex justify-center items-center bg-green-500 p-8 w-1/2 h-32 rounded-3xl text-white">
        {text}
      </div>
    </div>
  );
}

export { Questions };
