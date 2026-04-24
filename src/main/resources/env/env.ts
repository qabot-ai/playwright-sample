const ENV = {
    USERNAME: process.env.SuperAdminEmail || process.env.USERNAME,
    PASSWORD: process.env.SuperAdminPassword || process.env.PASSWORD,
    BASE_URL: process.env.BASE_URL,
}

export default ENV
