// Cloudinary configuration and upload utilities
interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
}

interface CloudinaryError {
  error: {
    message: string;
  };
}

// Configuration from environment variables
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

if (!CLOUD_NAME || !UPLOAD_PRESET) {
  console.warn('Cloudinary configuration missing. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file');
}

/**
 * Upload image to Cloudinary
 * @param file - File object to upload
 * @param folder - Optional folder path in Cloudinary (e.g., 'products')
 * @returns Promise with secure URL or error
 */
export const uploadToCloudinary = async (
  file: File,
  folder: string = 'products'
): Promise<{ url?: string; error?: string }> => {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    return { error: 'Cloudinary not configured' };
  }

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data: CloudinaryResponse | CloudinaryError = await response.json();

    if ('error' in data) {
      return { error: data.error.message };
    }

    return { url: data.secure_url };
  } catch (error: any) {
    return { error: error.message || 'Upload failed' };
  }
};

/**
 * Generate optimized image URL from Cloudinary URL
 * @param url - Original Cloudinary URL
 * @param width - Target width
 * @param height - Target height
 * @returns Optimized URL
 */
export const getOptimizedImageUrl = (
  url: string,
  width: number = 800,
  height: number = 800
): string => {
  if (!url || !url.includes('cloudinary.com')) {
    return url; // Return original if not a Cloudinary URL
  }

  // Insert transformation parameters into Cloudinary URL
  const transformation = `c_fill,w_${width},h_${height},q_auto,f_auto`;
  return url.replace('/upload/', `/upload/${transformation}/`);
};

/**
 * Validate file for upload (synchronous basic validation)
 * @param file - File to validate
 * @returns Validation result
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Please select an image file' };
  }

  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return { valid: false, error: 'Image must be less than 10MB' };
  }

  // Basic validation passed
  return { valid: true };
};

/**
 * Advanced async validation with dimensions check
 * @param file - File to validate
 * @returns Promise with validation result
 */
export const validateImageFileAsync = (file: File): Promise<{ valid: boolean; error?: string }> => {
  // First do basic validation
  const basicValidation = validateImageFile(file);
  if (!basicValidation.valid) {
    return Promise.resolve(basicValidation);
  }

  // Then check dimensions
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      if (img.width > 5000 || img.height > 5000) {
        resolve({ valid: false, error: 'Image dimensions too large (max 5000x5000px)' });
      } else {
        resolve({ valid: true });
      }
      URL.revokeObjectURL(img.src); // Clean up
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src); // Clean up
      resolve({ valid: false, error: 'Invalid image file' });
    };
    img.src = URL.createObjectURL(file);
  });
};

export default {
  upload: uploadToCloudinary,
  getOptimizedUrl: getOptimizedImageUrl,
  validateFile: validateImageFile,
};