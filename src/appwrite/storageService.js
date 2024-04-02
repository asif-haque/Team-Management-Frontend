import { Client, Storage } from "appwrite";
import { useId } from "react";

const client = new Client();

const storage = new Storage(client);

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
const APPWRITE_URL = import.meta.env.VITE_APPWRITE_URL;

client.setEndpoint(APPWRITE_URL).setProject(PROJECT_ID);

export const createFile = (file) => {
  const fileId = useId();
  storage.createFile(BUCKET_ID, fileId, file).then(
    function (response) {
      console.log("File uploaded ", response); // Success
    },
    function (error) {
      console.log("Error uploading file ", error); // Failure
    }
  );
};
