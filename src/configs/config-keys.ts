export interface IConfigSet {
    MONGODB_CONNECTION_STRING: string;
}

const DEV: IConfigSet = {
    MONGODB_CONNECTION_STRING: "mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study"
};

export {
    DEV
};
