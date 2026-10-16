import mongoose, { Schema, Model } from "mongoose";

export interface IGroupVisitStats {
  teamName: string;
  promisedVisits: number;
  updatedAt?: Date;
}

const GroupVisitStatsSchema = new Schema<IGroupVisitStats>(
  {
    teamName: { type: String, required: true, trim: true, unique: true },
    promisedVisits: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true, collection: "GroupVisitStats" }
);

const GroupVisitStats: Model<IGroupVisitStats> =
  mongoose.models.GroupVisitStats || mongoose.model<IGroupVisitStats>("GroupVisitStats", GroupVisitStatsSchema);

export default GroupVisitStats;
