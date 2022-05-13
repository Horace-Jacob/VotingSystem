import { Secret } from "../entities/Secret";
import { Arg, Mutation, Resolver } from "type-graphql";
import { ValidateSecretKey } from "../utils/validateSecretKey";
import { SecretErrorMap } from "../utils/errorMap";
import { AppDataSource } from "..";

@Resolver(Secret)
export class SecretResolver {
  @Mutation(() => SecretErrorMap)
  async createSecret(
    @Arg("secret") secret: "",
    @Arg("permission") permission: ""
  ): Promise<SecretErrorMap> {
    const errors = ValidateSecretKey(secret);
    if (errors) {
      return { errors };
    }

    const secretToNumber = parseInt(secret);

    let secrets;
    try {
      const result = await AppDataSource.createQueryBuilder()
        .insert()
        .into(Secret)
        .values({
          secret: secretToNumber,
          permission,
        })
        .returning("*")
        .execute();
      secrets = result.raw[0];
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "secret",
              message: "Secret key already exists",
            },
          ],
        };
      }
    }
    return { secrets };
  }
}
