import {google} from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import { Injectable} from '@nestjs/common';
const nodemailer = require('nodemailer')
require("dotenv").config()
const client_id = process.env.client_id_google
const clientSecret = process.env.client_secret_google
const refreshToken = process.env.RefreshTokenGoogle
const oAuth2Client = new OAuth2Client(client_id,clientSecret,refreshToken)
oAuth2Client.setCredentials({
   refresh_token: process.env.RefreshTokenGoogle
})
@Injectable()
export default class EmailUtils {
    
    async sendEmail(email:string,content:String,subject:string):Promise<any> {
        const oAuth2Client = new google.auth.OAuth2(client_id, clientSecret, "https://developers.google.com/oauthplayground")
        oAuth2Client.setCredentials({
            refresh_token: process.env.RefreshTokenGoogle
        })
        const accessToken = await new Promise((resolve, reject) => {
            oAuth2Client.getAccessToken((err, token) => {
              if (err) {
                reject("Failed to create access token  <3");
              }
              resolve(token);
            });
          });
            try {
               const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        type: "OAUTH2",
                        user: "phamchaugiatu123@gmail.com",
                        client_id: client_id,
                        clientSecret: clientSecret,
                        refreshToken: refreshToken,
                        accessToken: accessToken
                    }
                })
                let info = await transporter.sendMail({
                    from: '"AIKING Test" <phamchaugiatu123@gmail.com>',
                    to: email,
                    subject: subject,
                    text: "AIKING BE TEAM Testing",
                    html: "<b> "+content+" </b>",
                });
                return info
            } catch (err) {
                return err
            }
        
    }
}