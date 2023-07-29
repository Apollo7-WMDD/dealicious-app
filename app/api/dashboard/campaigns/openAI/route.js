import { NextResponse } from "next/server";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";

config();


export const aiGenerate = async (req, res) => {
  try {
    const AIKEY = process.env.OPENAI_KEY;
    console.log(AIKEY);

    const configuration = new Configuration({
    });

    configuration.baseOptions.headers = {
      Authorization: `Bearer ${AIKEY}`,
    };

    console.log(configuration);
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a advertising expert." },
        {
          role: "user",
          content: `Please write a great campaign advertising for a restaurant promoting a campaign name ${req.name} with the offer ${req.offer} and the condition ${req.condition} that start ${req.startDate} and end at ${req.endDate} at roughly 20 words. Don't include restaurant name`,
        },
      ],
    });
    // console.log(completion.data.choices[0].message.content);
    return new NextResponse(
      JSON.stringify(completion.data.choices[0].message.content),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify("Database Error"), { status: 500 });
  }
};
