import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class SongLyricsDto {
  @Field(() => ID)
  id: string;

  @Field()
  copyright: string;

  @Field(() => Boolean)
  explicit: boolean;

  @Field()
  lyrics: string;
}
