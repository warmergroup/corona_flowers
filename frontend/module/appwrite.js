import {Client, Storage} from "appwrite";

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('coronaflowerstestappid');

const storage = new Storage(client);

export {storage};
