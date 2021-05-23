import {connectToDatabase} from '../../../util/mongodb'

export default async function handler(req,res){
    const {db} = await connectToDatabase();
    const {user} = req.query;
    const data = await db.collection("P4User").find({"postedBy":user}).toArray();
          res.json(data);
}