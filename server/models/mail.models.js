const emailMessage = (email, token) => {
  return {
    from: `"MERN Authorization System "${process.env.SENDER_EMAIL}`, // sender address
    to: email, // list of receivers
    subject: "Verify Your MERN APP Email Address", // Subject line
    text: "Verify Your MERN APP Email Address", // plain text body
    html: `
    <h2><b>Please click on given link to activate your account</b></h2>
    <p>${process.env.CLIENT_URL}/authentication/activation/${token}</p>
    `, // html body
  };
};
module.exports = emailMessage;
