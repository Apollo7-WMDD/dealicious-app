// Send SMS
export const sendSMS = async () => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    // const client = require('twilio')('ACbfab2bb79da6d6e59471055f10216ea9', '838a8c275189d7f62f5b9faccdf75111');
  
    try {
      const message = await client.messages.create({
        body: 'DEALicious Test',
        from: '+15416157617',
        to: '+14372105501'
      });
  
      console.log(message.sid);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
};


    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    // const client = require('twilio')(accountSid, authToken);
    // // const client = require('twilio')('ACbfab2bb79da6d6e59471055f10216ea9', '838a8c275189d7f62f5b9faccdf75111');

    // await client.messages
    //     .create({
    //     body: 'DEALicious Test',
    //     from: '+15416157617',
    //     to: '+14372105501'
    //     })
    //     .then(message => console.log(message.sid));

    // return true;

  