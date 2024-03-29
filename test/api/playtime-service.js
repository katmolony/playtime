import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const playtimeService = {
  playtimeUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.playtimeUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.playtimeUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.playtimeUrl}/api/users`);
    return res.data;
  },
  
  //playlist
  async createPlaylist(playlist) {
    const res = await axios.post(`${this.playtimeUrl}/api/playlists`, playlist);
    return res.data;
  },

  async deleteAllPlaylists() {
    const response = await axios.delete(`${this.playtimeUrl}/api/playlists`);
    return response.data;
  },

  async deletePlaylist(id) {
    const response = await axios.delete(`${this.playtimeUrl}/api/playlists/${id}`);
    return response;
  },

  async getAllPlaylists() {
    const res = await axios.get(`${this.playtimeUrl}/api/playlists`);
    return res.data;
  },

  async getPlaylist(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/playlists/${id}`);
    return res.data;
  },
};