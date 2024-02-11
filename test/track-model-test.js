import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testTracks, song } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";
import { EventEmitter } from "events";

// to generate a  cleaner test result
EventEmitter.setMaxListeners(25);

suite("Track Model tests", () => {

    setup(async () => {
      db.init("mongo");
      await db.trackStore.deleteAllTracks();
      for (let i = 0; i < testTracks.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        testTracks[i] = await db.trackStore.addTrack(testTracks[i]);
      }
    });
  
    test("create a track", async () => {
      const track = await db.trackStore.addTrack(song);
         
      assertSubset(song, track);
      assertSubset(track._id);
     // assert.isDefined(track._id);
    });
  
    test("delete all tracks", async () => {
      let returnedTracks = await db.trackStore.getAllTracks();
      assert.equal(returnedTracks.length, 3);
      await db.trackStore.deleteAllTracks();
      returnedTracks = await db.trackStore.getAllTracks();
      assert.equal(returnedTracks.length, 0);
    });
  
    test("get a track - success", async () => {
      const track = await db.trackStore.addTrack(song);
      const returnedTrack = await db.trackStore.getTrackById(track._id);
      // assert.equal(mozart, playlist);    
      assertSubset(song, track);
    });
  
    test("delete One Track - success", async () => { 
      const id = testTracks[0]._id;
      await db.trackStore.deleteTrack(id);
      const returnedTracks = await db.trackStore.getAllTracks();
      assertSubset(returnedTracks.length, testTracks.length - 1 );
      const deletedTrack = await db.trackStore.getTrackById(id);
      assert.isNull(deletedTrack);
    });
  
    test("get a track - bad params", async () => {
      assert.isNull(await db.trackStore.getTrackById(""));
      assert.isNull(await db.trackStore.getTrackById());
    });
  
    test("delete One Track - fail", async () => {
      await db.trackStore.deleteTrack("bad-id");
      const allTracks = await db.trackStore.getAllTracks();
      assert.equal(testTracks.length, allTracks.length);
    });
  });