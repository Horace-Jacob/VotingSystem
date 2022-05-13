import { Account } from "../entities/Account";
import { Field, ObjectType } from "type-graphql";
import { Secret } from "../entities/Secret";
import { Region } from "../entities/Region";
import { Admin } from "../entities/Admin";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class AccountErrorMap {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Account, { nullable: true })
  accounts?: Account;
}

@ObjectType()
export class AdminErrorMap {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Admin, { nullable: true })
  accounts?: Admin;
}

@ObjectType()
export class SecretErrorMap {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Secret, { nullable: true })
  secrets?: Secret;
}

@ObjectType()
export class RegionErrorMap {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Region, { nullable: true })
  regions?: Region;
}
