import { dbConnect, run } from "../../../database";
import { inistialAnswers } from "../../../data";

export async function GET(req, res) {
  const db = await dbConnect();
  const questions = await db.connection
    .collection("questions")
    .find({})
    .toArray();

  return new Response(JSON.stringify(questions));
}

export async function POST(req, res) {
  const db = await dbConnect();
  const body = await req.json();

  const createdQuestion = db.connection
    .collection("questions")
    .insertOne({ text: body.text, answers: inistialAnswers });

  return new Response(JSON.stringify(createdQuestion));
}
