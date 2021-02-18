import * as Knex from "knex";
import Music from "../models/music";
import { Model } from 'objection';

export async function seed(knex: Knex): Promise<void> {
    Model.knex(knex)
    // Deletes ALL existing entries
    await knex("music").del();
        
    // Inserts seed entries
    await Music.query().insert([
        { title: "I Love Me", artist: "Demi Lovato" }        
    ]);
};
