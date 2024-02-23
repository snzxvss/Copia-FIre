import env from 'dotenv';
env.config();

export const gmailConfig: any = {
    'sender': process.env.ACCOUNT,
    'clientId': process.env.ID_CLIENT,
    'clientSecret': process.env.SECRET_CLIENT,
    'refreshToken': process.env.REFRESH_TOKEN,
    'recoveryLink': process.env.RECOVERY_LINK
}

export const emailConfig: any = {
    USEREMAIL: process.env.USEREMAIL,
    PASSWORDEMAIL: process.env.PASSWORDEMAIL,
    HOSTEMAIL: process.env.HOSTEMAIL,
    PORTEMAIL: process.env.PORTEMAIL,
    SENDEMAIL: process.env.SENDEMAIL,
    RECOVERYLINK: process.env.RECOVERY_LINK
}

export const configs: any = {
    app_name: 'ALBA',
    accessKeyId: process.env.ACCESSKEYS3,
    secretAccessKey: process.env.SECRETKEYS3,
    env: process.env.S3ENV,
    bucketImboxQA: process.env.BUCKETNAMEQAS3,
    bucketImboxDev: process.env.BUCKETNAMEDEVS3,
    bucketImboxProd: process.env.BUCKETNAMEPRODS3,
}