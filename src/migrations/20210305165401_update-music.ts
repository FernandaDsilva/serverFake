import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("music", (table) => {
        table.string("image").notNullable();
      });
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropSchema("music")
}

