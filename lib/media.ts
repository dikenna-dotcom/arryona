import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase";

export interface UploadedMedia {
  url: string;
  path: string;
  type: "image" | "video";
  name: string;
  size: number;
}

/**
 * Upload a file to Firebase Storage
 * @param file The file to upload
 * @param folder The folder path in storage (e.g., "products", "brands")
 * @param userId The user ID for organizing files
 * @returns Promise<UploadedMedia>
 */
export async function uploadMedia(
  file: File,
  folder: string,
  userId: string
): Promise<UploadedMedia> {
  // Validate file type
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  if (!isImage && !isVideo) {
    throw new Error("Only image and video files are allowed");
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error("File size must be less than 10MB");
  }

  // Create unique filename
  const timestamp = Date.now();
  const extension = file.name.split(".").pop();
  const filename = `${timestamp}_${file.name}`;
  const path = `${folder}/${userId}/${filename}`;

  // Create storage reference
  const storageRef = ref(storage, path);

  // Upload file
  await uploadBytes(storageRef, file);

  // Get download URL
  const url = await getDownloadURL(storageRef);

  return {
    url,
    path,
    type: isImage ? "image" : "video",
    name: file.name,
    size: file.size,
  };
}

/**
 * Delete a file from Firebase Storage
 * @param path The storage path of the file to delete
 */
export async function deleteMedia(path: string): Promise<void> {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}

/**
 * Upload multiple files
 * @param files Array of files to upload
 * @param folder The folder path in storage
 * @param userId The user ID
 * @returns Promise<UploadedMedia[]>
 */
export async function uploadMultipleMedia(
  files: File[],
  folder: string,
  userId: string
): Promise<UploadedMedia[]> {
  const uploadPromises = files.map(file => uploadMedia(file, folder, userId));
  return Promise.all(uploadPromises);
}