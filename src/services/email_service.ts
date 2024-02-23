import env from 'dotenv';
import fs from 'fs';
import { google } from 'googleapis';
import nodemailer from "nodemailer";
import { ResponseInterface } from '../interfaces/response_interface';
import { emailConfig, gmailConfig } from '../config'; '../config';

env.config();


export class EmailService {
  
  private gmailCredentials = {
    'service': 'gmail',
    'type': 'OAuth2',
    'sender': process.env.ACCOUNT,
    'clientId': process.env.ID_CLIENT,
    'clientSecret': process.env.SECRET_CLIENT,
    'refreshToken': process.env.REFRESH_TOKEN,
    'recoveryLink': process.env.RECOVERY_LINK
  };
  
  public async sendRecoveryEmailByGmail(target: string | [string], JWToken: string): Promise<ResponseInterface> {
    const {sender, clientId, clientSecret, refreshToken, recoveryLink} = gmailConfig;
    
    const authClient = new google.auth.OAuth2(clientId, clientSecret);
    authClient.setCredentials({ refresh_token: refreshToken });
    
    try {
      const { token }: any = await authClient.getAccessToken();
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: sender,
          clientId,
          clientSecret,
          refreshToken,
          accessToken: token,
        },
      });
      
      let html = fs.readFileSync('src/email/user_created.html', { encoding: 'utf-8' });
      html = html.replace('ENLACE A REEMPLAZAR',recoveryLink + JWToken);
      
      const info: any = await transporter.sendMail({
        from: sender,
        to: target,
        subject: 'Alba Recovery Password',
        html,
      });
      
      return {
        status: 200,
        success: true,
        msg: `Correo de recuperación enviado correctamente a ${target}`
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        success: false,
        msg: `Error al enviar correo de recuperación a ${target}`
      };
    }
  }
  
  public async sendRecoveryEmail(target: string | [string], JWToken: string) {
    
    const { HOSTEMAIL, PORTEMAIL, USEREMAIL, PASSWORDEMAIL, SENDEMAIL, RECOVERYLINK } = emailConfig;
    try {
      
      let html = fs.readFileSync('src/email/recovery_password.html', { encoding: 'utf-8' });
      html = html.replace('|ENLACE A REEMPLAZAR|', RECOVERYLINK + JWToken);  

      const transporter = nodemailer.createTransport({
        host: HOSTEMAIL,
        port: PORTEMAIL,
        secure: PORTEMAIL == 465 ? true : false,
        auth: {
          user: USEREMAIL,
          pass: PASSWORDEMAIL
        },
      });

      // const dataSend = {
      //   from: SENDEMAIL,
      //   to: '202331ed@gmail.com',
      //   subject: 'Subject',
      //   html: '<h1>Sendmail</h1>'
      // }

      const info = await transporter.sendMail({
        from: SENDEMAIL,
        to: target,
        subject: 'Alba Recovery Password',
        html,
      });

      return {
        status: 200,
        success: true,
        msg: `Correo de recuperación enviado correctamente a ${target}`
      }

    } catch (error) {

      console.log('Error al enviar el correo: ', error);

      return {
        status: 500,
        success: false,
        msg: 'Error al enviar el correo.'
      }
    }
  }
  public async sendUserCreatedEmail(target: string | [string], userData: {username: string, password: string}) {
    
    const { HOSTEMAIL, PORTEMAIL, USEREMAIL, PASSWORDEMAIL, SENDEMAIL, RECOVERYLINK } = emailConfig;
    try {
      
      let html = fs.readFileSync('src/email/user_created.html', { encoding: 'utf-8' });
      html = html.replace('|USERNAME|', userData.username);
      html = html.replace('|PASSWORD|', userData.password);

      const transporter = nodemailer.createTransport({
        host: HOSTEMAIL,
        port: PORTEMAIL,
        secure: PORTEMAIL == 465 ? true : false,
        auth: {
          user: USEREMAIL,
          pass: PASSWORDEMAIL
        },
      });

      // const dataSend = {
      //   from: SENDEMAIL,
      //   to: '202331ed@gmail.com',
      //   subject: 'Subject',
      //   html: '<h1>Sendmail</h1>'
      // }

      const info = await transporter.sendMail({
        from: SENDEMAIL,
        to: target,
        subject: 'Alba User Details',
        html,
      });

      return {
        status: 200,
        success: true,
        msg: `Usuario creado correctamente ${target}`
      }

    } catch (error) {

      console.log('Error al enviar el correo: ', error);

      return {
        status: 500,
        success: false,
        msg: 'Error al enviar el correo.'
      }
    }
  }
}


