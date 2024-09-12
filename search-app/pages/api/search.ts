// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

// type Data = {
//   user_name: string;
//   user_location: 
// };

const fetchUsers = async(query: string | string[]) => {
  console.log("here is the query:", query)
  try {
    const client = await clientPromise;
    const db = client.db("Users");

    let users: any[] = [];

    if (query) {
      users = await db.collection("User_details").find({
        $or: [
          { user_name: { $regex: query, $options: 'i' } },
          { user_location: { $regex: query, $options: 'i' } },
          { user_phone_number: { $regex: query, $options: 'i' } }
        ]
      }).sort({ user_name: 1 }).limit(20).toArray();
    } else {
      users = await db.collection("User_details").find().sort({ user_name: 1 }).limit(20).toArray();
    }
    console.log("Here are the users:", users)
    // Convert the array to a string
    return users;
  } catch (e) {
    console.error(e);
    return '';
  }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(req.method==="GET"){
    try {
      const { q: query } = req.query;

    if (query) {
      const response = await fetchUsers(query);
      console.log("Json from server", response)
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "No search query provided" });
    }
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
    }
  }
}
