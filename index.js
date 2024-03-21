const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const fs = require('fs');

//setting up the envoirmental variables
dotenv.config( { 
    path: './config.env'
});

//emails as comma separated.
const RECIPIENTS = fs.readFileSync(`${__dirname}/emails.txt`,'utf-8');

const SUBJECT = "SUBJECT - RAPID MAILER";

const HTML_MESSAGE = fs.readFileSync(`${__dirname}/email-template.html`,'utf-8');


let sendMail = function(){
    //Gmail has a limit of 500 recipients a day (a message with one To and one Cc address counts as two messages since it has two recipients) for @gmail.com addresses and 2000 for Google Apps customers, larger SMTP providers usually offer about 200-300 recipients a day for free.
    const mailer = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
    const msg = {
      from: process.env.EMAIL,
      to: RECIPIENTS,
      subject: SUBJECT,
      html: HTML_MESSAGE,
      // use the text property to send a simple text email.
      //text: 'sample for sending text.',

      // MODIFY THE ATTACHMENTS array TO ADD OR REMOVE ATTACHMENTS.
      attachments: [
        {
            // use 'filename' property to change the name of a particular attachment.
            filename: 'example.docx',
            path: './attachments/sample-docx.docx'
        },
        {
            path: './attachments/sample-pdf.pdf'
        }
      ]
    };

    mailer.sendMail(
       msg,
       (err,data)=>{
        if (err){
            return console.log(err);
        }
        console.log(`SENT ${data.messageId}`);
       }
    );
}

sendMail();