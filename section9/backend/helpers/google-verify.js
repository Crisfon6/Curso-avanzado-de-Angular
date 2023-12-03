const { OAuth2Client } = require('google-auth-library');


const client = new OAuth2Client(process.env.GOOGLE_ID);

const verifyGoogleToken = async(idToken) => {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_ID
    });
    const payload = ticket.getPayload();
    console.log("payload verify google token", payload);
    return payload;
};


module.exports = {
    verifyGoogleToken
};