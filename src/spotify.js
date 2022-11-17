export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const CLIENT_ID = "2e05aad2c7654cbba58f51695751d5ef";
const REDIRECT_URI = "http://localhost:3000";
// const RESPONSE_TYPE = "token";

const scope = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",
  "user-library-modify",
  "user-library-read",
];

export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope.join(
  "%20"
)}&response_type=token&show_dialog=true`;
