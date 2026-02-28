import mongoose from 'mongoose';

export interface ISiteContent extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  key: string;
  value: string;
  section: string;
}

const siteContentSchema = new mongoose.Schema<ISiteContent>({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
});

export const SiteContentModel = mongoose.model<ISiteContent>('SiteContent', siteContentSchema);