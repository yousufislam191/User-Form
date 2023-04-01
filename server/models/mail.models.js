const emailMessage = (email, token) => {
  return {
    from: `"MERN Authorization System "${process.env.SENDER_EMAIL}`, // sender address
    to: email, // list of receivers
    subject: "Verify Your MERN APP Email Address", // Subject line
    text: "Verify Your MERN APP Email Address", // plain text body
    html: `
    <h3>Thanks for registering on our system</h3>
    <h4>Please verify your email to continue...<a href="http://localhost:5000/api/email-activate?token=${token}">verify your email</a></h4>
    `, // html body
  };
};
module.exports = emailMessage;

// <p>${process.env.CLIENT_URL}/authentication/activation/${token}</p>
