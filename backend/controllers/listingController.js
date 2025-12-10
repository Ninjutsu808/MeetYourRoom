import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import {
  createListing,
  getAllListings,
  getListingById,
  getListingsByUser,
  deleteListing
} from '../services/listingService.js';

const parseAmenities = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
    return [];
  }
};

const toNumberOrNull = (value) => {
  if (value === undefined || value === null || value === '') return undefined;
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
};

export const create = catchAsync(async (req, res) => {
  const photos = req.files?.map((file) => `/uploads/${file.filename}`) || [];
  if (!photos.length) {
    throw new AppError('At least one photo is required', 400);
  }

  const listingData = {
    title: req.body.title,
    description: req.body.description,
    address: req.body.address,
    latitude: toNumberOrNull(req.body.latitude),
    longitude: toNumberOrNull(req.body.longitude),
    rent: Number(req.body.rent),
    roomType: req.body.roomType,
    genderPreference: req.body.genderPreference || 'Anyone',
    amenities: parseAmenities(req.body.amenities),
    photos,
    ownerUserId: req.user._id
  };

  const listing = await createListing(listingData);
  res.status(201).json(listing);
});

export const list = catchAsync(async (_req, res) => {
  const listings = await getAllListings();
  res.json(listings);
});

export const detail = catchAsync(async (req, res) => {
  const listing = await getListingById(req.params.id);
  res.json(listing);
});

export const listByUser = catchAsync(async (req, res) => {
  const listings = await getListingsByUser(req.params.userId);
  res.json(listings);
});

export const remove = catchAsync(async (req, res) => {
  await deleteListing(req.params.id, req.user._id);
  res.status(204).end();
});
