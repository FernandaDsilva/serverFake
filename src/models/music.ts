import { Model } from 'objection';

export default class Music extends Model {
  static tableName = 'music';
  id!: string;
  title!: string;
  artist!: string;
  image!: string;
}