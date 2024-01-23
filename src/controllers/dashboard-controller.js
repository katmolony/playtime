import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const playlists = await db.playlistStore.getUserPlaylists(loggedInUser._id);
      const viewData = {
        title: "Playtime Dashboard",
        user: loggedInUser,
        playlists: playlists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlaylist: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlayList = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.playlistStore.addPlaylist(newPlayList);
      return h.redirect("/dashboard");
    },
  },

  deletePlaylist: {
    handler: async function (request, h) {
   //   const loggedInUser = request.auth.credentials;
      const playlistId = request.params.id;

      await db.playlistStore.deletePlaylistById(playlistId);
      return h.redirect("/dashboard");
    },
  },

  // // async deleteStation(request, response) {
  // //   const stationId = request.params.id;
  // //   console.log(`Deleting Station called`);
  // //   await stationStore.deleteStationById(stationId);
  // //   response.redirect("/dashboard");
  // },
};