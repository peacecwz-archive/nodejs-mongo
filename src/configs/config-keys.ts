export interface IConfigSet {
    DEBUG_LOGGING_ENABLED: boolean;
    MONGODB_CONNECTION_STRING: string;
}

const DEV: IConfigSet = {
    DEBUG_LOGGING_ENABLED: true,
    MONGODB_CONNECTION_STRING: "mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study"
};

export {
    DEV
};
