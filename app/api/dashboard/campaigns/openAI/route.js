import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

// import { useNavigation } from "next/navigation";

export const GET = async (req, res) => {
  // const params = new URLSearchParams(req.url.split("?")[1]);
  // const formName = decodeURIComponent(params.get("formName"));
  // const formOffer = decodeURIComponent(params.get("formOffer"));
  // const formCondition = decodeURIComponent(params.get("formCondition"));
  // const formStartDate = decodeURIComponent(params.get("formStartDate"));
  // const formEndDate = decodeURIComponent(params.get("formEndDate"));

  const formName = decodeURIComponent(
    req.url.split("?")[1].split("=")[1].split("&")[0]
  );
  console.log("🚀 ~ file: route.js:9 ~ GET ~ formName:", formName);
  const formOffer = decodeURIComponent(
    req.url.split("?")[1].split("=")[2].split("&")[0]
  );
  console.log("🚀 ~ file: route.js:11 ~ GET ~ formOffer:", formOffer);
  const formCondition = decodeURIComponent(
    req.url.split("?")[1].split("=")[3].split("&")[0]
  );
  console.log("🚀 ~ file: route.js:13 ~ GET ~ formCondition:", formCondition);
  const formStartDate = decodeURIComponent(
    req.url.split("?")[1].split("=")[4].split("&")[0]
  );
  console.log("🚀 ~ file: route.js:15 ~ GET ~ formStartDate:", formStartDate);
  const formEndDate = decodeURIComponent(
    req.url.split("?")[1].split("=")[5].split("&")[0]
  );
  console.log("🚀 ~ file: route.js:17 ~ GET ~ formEndDate:", formEndDate);

  try {
    const AIKEY = process.env.OPENAIKEY;

    const configuration = new Configuration({});

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
          // content: `Please write a great campaign advertising for a mexican restaurant promoting a campaign that give away everybody a free taco at roughly 20 words. Don't include restaurant name`,
          content: `Please write a great campaign advertising for a restaurant promoting a campaign name ${formName} with the offer ${formOffer} and the condition ${formCondition} that start ${formStartDate} and end at ${formEndDate} at roughly 20 words. Don't include restaurant name`,
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
