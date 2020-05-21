export interface IConfigSet {
    MONGODB_CONNECTION_STRING: string;
}

const DEV: IConfigSet = {
    MONGODB_CONNECTION_STRING: ""
};

export {
    DEV
};
