import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";

export const GET= async (request, {params}) =>{
   /**params is a variable that holds session.user.id. so are assigning 'session.user.id' to the [id] parameter on the path */
   console.log(params.id) /**we wanna extract the content of the [id] parameter */
    try {
        await connectToDB();
        const prompts = await Prompt.find({
            creator:params.id
        }).populate('creator');
        
   
      return new Response(JSON.stringify(prompts), {
            status: 200
         })
    } catch(error) {
        return new Response(JSON.stringify('Failed to fetch all prompts'), {
            status: 500
         })
    }

   
 }
