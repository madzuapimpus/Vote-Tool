import { ObjectId } from "mongodb";
import { dbConnect } from "../../../database";

export async function POST(req, res) {
  const db = await dbConnect();
  const body = await req.json();

  const questions = await db.connection.collection("questions");
  questions.updateOne(
    { _id: new ObjectId(body.id) },
    {
      $inc: { "answers.$[elem].count": 1 },
    },
    {
      arrayFilters: [{ "elem.gameName": body.gameName }],
      new: true,
    }
  );

  //z body musimy wziąć ID pytania i  gameName

  // te informacje wykorzystujemy do zaktualizowania odpowiedzi +1 do count

  return new Response([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
}
