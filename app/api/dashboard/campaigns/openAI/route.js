import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";



export const GET = async (req, res) => {

  // const formName = req.url.split("query")[1].split("=")[1].split("+")[1];
  // const formOffer = req.url.split("query")[1].split("=")[2].split("+")[1];
  // const formCondition = req.url.split("query")[1].split("=")[3].split("+")[1];
  // const formStartDate = req.url.split("query")[1].split("=")[4].split("+")[1];
  // const formEndDate = req.url.split("query")[1].split("=")[5].split("+")[1];
  
  try {
    
    // console.log("process.env.OPENAIKEY",process.env.OPENAIKEY)
    
    const AIKEY = process.env.OPENAIKEY;

    const configuration = new Configuration({
    });

    configuration.baseOptions.headers = {
      Authorization: `Bearer ${AIKEY}`,
    };

    // console.log(configuration);
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a advertising expert." },
        {
          role: "user",
          content: `Please write a great campaign advertising for a mexican restaurant promoting a campaign that give away everybody a free taco at roughly 20 words. Don't include restaurant name`,
          // content: `Please write a great campaign advertising for a restaurant promoting a campaign name ${formName} with the offer ${formOffer} and the condition ${formCondition} that start ${formStartDate} and end at ${formEndDate} at roughly 20 words. Don't include restaurant name`,
        },
      ],
    });
    console.log(completion.data.choices[0].message.content);
    return new NextResponse(
      JSON.stringify(completion.data.choices[0].message.content),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify("Database Error"), { status: 500 });
  }
};
