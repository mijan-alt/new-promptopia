import {Schema, model, models} from 'mongoose';

const PromptSchema = new Schema ({
    creator : {
        type: Schema.Types.ObjectId,    //a bunch of ids referencing the creator of the prompt
        ref:'User'                        //we are referencing the User collection  within our database            
    }, 



    prompt : {
        type:String,
        required: [true, 'Prompt is required'],

    },

    tag: {
        type: String,
        required: [true, 'Tag is required']
    }
});



const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt;