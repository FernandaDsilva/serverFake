import * as Knex from "knex";
import Music from "../models/music";
import { Model } from 'objection';

export async function seed(knex: Knex): Promise<void> {
    Model.knex(knex)
    // Deletes ALL existing entries
    
    await knex("music").del();
        
    // Inserts seed entries
    await Music.query().insert([
        { title: "I Love Me", artist: "Demi Lovato", image: "https://s2.glbimg.com/sOMfcD6gw7zQe0TushGcwzJ5pmc=/0x50:1080x873/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/q/k/OfR54kRgKgv6FBsNwURw/demilovato.jpg" }        
    ]);
};
