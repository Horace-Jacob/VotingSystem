import { Field, InputType } from "type-graphql";

@InputType()
export class CreateAccountFields {
  @Field()
  email: string;

  @Field()
  secret: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
