import mongoose, { Schema, Model } from "mongoose";

export interface ISiteVisit {
  visitDate: Date;
  partnerName: string;
  agentCode: string;
  teamName: string;
  leaderName: string;
  partnerMobile: string;
  customerName: string;
  visitTime: string;
  siteName: string;
  locationLink: string;
  cabType: string;
  requestedBy: string;
  remarks?: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SiteVisitSchema = new Schema<ISiteVisit>(
  {
    visitDate: {
      type: Date,
      required: true,
    },

    partnerName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    agentCode: {
      type: String,
      required: true,
      match: /^\d{6}$/,
    },

    teamName: {
      type: String,
      required: true,
      trim: true,
    },

    leaderName: {
      type: String,
      required: true,
      trim: true,
    },

    partnerMobile: {
      type: String,
      required: true,
      match: /^\d{10}$/,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    visitTime: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):[0-5]\d$/,
    },

    siteName: {
      type: String,
      required: true,
      trim: true,
    },

    locationLink: {
      type: String,
      required: true,
      trim: true,
    },

    cabType: {
      type: String,
      required: true,
      enum: ["5-Seater", "7-Seater"],
    },

    requestedBy: {
      type: String,
      required: true,
      trim: true,
    },

    remarks: {
      type: String,
      default: "",
      maxlength: 1000,
    },

    status: {
      type: String,
      default: "Requested",
      enum: ["Requested", "Confirmed", "Completed", "Cancelled"],
    },
  },
  {
    timestamps: true,
    collection: "SiteVisits",
  }
);

const SiteVisit: Model<ISiteVisit> =
  mongoose.models.SiteVisit ||
  mongoose.model<ISiteVisit>("SiteVisit", SiteVisitSchema);

export default SiteVisit;