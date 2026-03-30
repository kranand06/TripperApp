import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
    headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        "X-Goog-FieldMask": "places.displayName,places.photos"
    }
};

const GetPlaceDetails = async (data) => {
    try {
        const response = await axios.post(BASE_URL, data, config);
        return response.data;
    } catch (error) {
        console.error("Error fetching place details:", error);
        return null;
    }
};

const GetPhotoData = async (query) => {
    const data = { textQuery: query };

    try {
        const result = await GetPlaceDetails(data); 
        const photoData = result?.places?.[0]?.photos?.[0]?.name;
        return photoData;
    } catch (error) {
        console.error("Error fetching place details:", error);
        return null;
    }
};

const GetPhoto = async (name) => {
    try {
        const ref = await GetPhotoData(name);
        if (!ref) {
            console.error("No reference found for the given place name.");
            const htt = "https://source.unsplash.com/400x300/?travel";
            return htt;
        }

        const PHOTO_REF_URL = `https://places.googleapis.com/v1/${ref}/media?maxHeightPx=1000&maxWidthPx=1000&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`;
        return PHOTO_REF_URL;
    } catch (error) {
        console.error("Error fetching photo:", error);
        return null;
    }
};

export default GetPhoto;