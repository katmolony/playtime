import { assert } from "chai";
import { db } from "../src/models/db.js";
import { playlistOne, testPlaylists } from "./fixtures.js";

suite("Playlist Model tests", () => {
    setup(async () => {
        db.init("json");
        await db.playlistStore.deleteAllPlaylists();
        for (let i =0; i <testPlaylists.length; i += 1) {
            testPlaylists[i] = await db.playlistStore.addPlaylist(testPlaylists[i]);
        }
    });

    test("create a playlist", async () => {
        const newPlaylist = await db.playlistStore.addPlaylist(playlistOne);
        assert.equal(newPlaylist, playlistOne);
    });

    test("delete all playlistAPI", async () => {
        let returnedPlaylists = await db.playlistStore.getAllPlaylists();
        assert.equal(returnedPlaylists.length, 3);
        await db.playlistStore.deleteAllPlaylists();
        returnedPlaylists = await db.playlistStore.getAllPlaylists();
        assert.equal(returnedPlaylists.length, 0);
    });

    test('get a playlist - success', async () => {
        const playlist = await db.playlistStore.addPlaylist(playlistOne);
        const returnedPlaylist1 = await db.playlistStore.getPlaylistById(playlist._id);
        assert.deepEqual(playlist, returnedPlaylist1);
    });
});