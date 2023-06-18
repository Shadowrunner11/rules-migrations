import { Model } from 'objection'

export class Language extends Model {
  alias!: string;
  name!: string;

  static override get tableName(){
    return 'languages'
  }
}

