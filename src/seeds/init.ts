import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("music").del();

    // Inserts seed entries
    await knex("music").insert([
        { title: "I Love Me", artist: "Demi Lovato" }        
    ]);
};
