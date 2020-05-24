import 'reflect-metadata';
import mongoose, { Schema, Document } from 'mongoose';

export interface RecordEntity extends Document {
    key: string;
    value: string;
    createdAt: Date;
    counts: Array<number>;
}

const RecordSchema: Schema = new Schema({
    key: { type: String, required: true },
    value: { type: String, required: true },
    createdAt: { type: Date, required: true },
    counts: { type: Array, required: true }
});

export default mongoose.model<RecordEntity>('records', RecordSchema);
