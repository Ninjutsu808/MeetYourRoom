import Listing from '../models/Listing.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

export const createListing = async (data) => {
  const listing = await Listing.create(data);
  await User.findByIdAndUpdate(data.ownerUserId, { $push: { createdPosts: listing._id } });
  const populated = await Listing.findById(listing._id)
    .populate('ownerUserId', 'name profilePic college branch email phone socialLinks')
    .lean();
  return populated;
};

export const getAllListings = async () => {
  return Listing.find()
    .populate('ownerUserId', 'name profilePic college branch email phone socialLinks')
    .sort({ createdAt: -1 })
    .lean();
};

export const getListingById = async (listingId) => {
  const listing = await Listing.findById(listingId)
    .populate('ownerUserId', 'name profilePic college branch email phone socialLinks')
    .lean();

  if (!listing) {
    throw new AppError('Listing not found', 404);
  }

  return listing;
};

export const getListingsByUser = async (userId) => {
  return Listing.find({ ownerUserId: userId })
    .populate('ownerUserId', 'name profilePic college branch email phone socialLinks')
    .sort({ createdAt: -1 })
    .lean();
};

export const deleteListing = async (listingId, userId) => {
  const listing = await Listing.findOneAndDelete({ _id: listingId, ownerUserId: userId });
  if (!listing) {
    throw new AppError('Listing not found or not authorized', 404);
  }

  return listing;
};
