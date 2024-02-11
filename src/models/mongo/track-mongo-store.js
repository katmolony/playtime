import { Track } from "./track.js";
import { playlistMongoStore } from "./playlist-mongo-store.js";

export const trackMongoStore = {
  async getAllTracks() {
    const tracks = await Track.find().lean();
    return tracks;
  },

  async getTracksByPlaylistId(id) {
    const tracks = await Track.find({ playlistid: id }).lean();
    return tracks;
  },

  async addTrack(playlistId, track) {
    try {
        const playlist = await playlistMongoStore.getPlaylistById(playlistId);
        console.log("Retrieved playlist:", playlist); // Log the retrieved playlist

        const newTrack = new Track({ ...track, playlistid: playlistId});
        await newTrack.save();

        playlist.tracks.push(newTrack);

        console.log("Updated playlist:", playlist); // Log the updated playlist before returning

        return this.getTracksByPlaylistId(playlistId);
    } catch (error) {
        console.error("Error adding track:", error);
        throw error;
    }
},

  async getTrackById(id) {
    if (id) {
      const track = await Track.findOne({ _id: id }).lean();
      return track;
      }
      return null;
    },


  async getPlaylistTracks(playlistId) {
    if (playlistId) {
      const playlist = await playlistMongoStore.getPlaylistById(playlistId);
      //return playlist;
      const tracks = await this.getTracksByPlaylistId(playlist);
      return tracks;
    }
    // const tracks = await this.getTracksByPlaylistId(playlistId);
    // return tracks;
    // const playlist = await playlistMongoStore.getPlaylistById(playlistId);
    // const tracks = await this.getTracksByPlaylistId(playlist);
    // return tracks;

    // await db.read();
    // let foundTracks = tracks.filter((track) => track.playlistid === playlistId);
    // if (!foundTracks) {
    //   foundTracks = null;
    // }
    // return foundTracks;
  },

  async deleteTrack(id) {
    try {
      await Track.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllTracks() {
    await Track.deleteMany({});
  },

  // async updateTrack(track, updatedTrack) {
  //   track.title = updatedTrack.title;
  //   track.artist = updatedTrack.artist;
  //   track.duration = updatedTrack.duration;
  //   await db.write();
  // },
};