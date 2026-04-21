import mongoose, { Schema, Document } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  project?: string;
  message: string;
  status: "pending" | "contacted" | "resolved"|"new"|"jumeriah-towers";
  createdAt: Date;
}

const InquirySchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  project: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ["pending", "contacted", "resolved","new","jumeriah-towers"], default: "new" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
