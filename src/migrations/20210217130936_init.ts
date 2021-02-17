import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('music', table => {
        table.uuid("id")
        .primary("book_id")
        .defaultTo(knex.raw("uuid_generate_v4()"));
        table.string('title').notNullable() // this is a column.
        table.string('artist').notNullable()
    }) 
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('music')
}
