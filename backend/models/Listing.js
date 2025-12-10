import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    rent: { type: Number, required: true },
    photos: [{ type: String, required: true }],
    roomType: {
      type: String,
      enum: ['1RK', '1BHK', 'sharing', 'single'],
      required: true
    },
    genderPreference: {
      type: String,
      enum: ['Boys', 'Girls', 'Anyone'],
      default: 'Anyone'
    },
    amenities: [{ type: String }],
    ownerUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
