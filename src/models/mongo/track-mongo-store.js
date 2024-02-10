import { Track } from "./track.js";

export const trackMongoStore = {
  async getAllTracks() {
    const tracks = await Track.find().lean();
    return tracks;
  },

  async getTrackById(id) {
    if (id) {
      const track = await Track.findOne({ _id: id }).lean();
      return track;
      }
      return null;
    },

  async addTrack(track) {
    const newTrack = new Track(track);
    const trackObj = await newTrack.save();
    return this.getTracksByPlaylistId(trackObj._id);
  },

    async getTracksByPlaylistId(id) {
    const tracks = await Track.find({ playlistid: id }).lean();
    return tracks;
  },


  // async getPlaylistTracks(playlistId) {
  //   await db.read();
  //   let foundTracks = tracks.filter((track) => track.playlistid === playlistId);
  //   if (!foundTracks) {
  //     foundTracks = null;
  //   }
  //   return foundTracks;
  // },

  // async deleteTrack(id) {
  //   await db.read();
  //   const index = db.data.tracks.findIndex((track) => track._id === id);
  //   if (index !== -1) db.data.tracks.splice(index, 1);
  //   await db.write();
  // },

  // async deleteAllTracks() {
  //   db.data.tracks = [];
  //   await db.write();
  // },

  // async updateTrack(track, updatedTrack) {
  //   track.title = updatedTrack.title;
  //   track.artist = updatedTrack.artist;
  //   track.duration = updatedTrack.duration;
  //   await db.write();
  // },
};