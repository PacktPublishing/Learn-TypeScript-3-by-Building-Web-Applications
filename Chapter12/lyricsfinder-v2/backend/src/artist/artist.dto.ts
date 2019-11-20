import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class ArtistDto {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
