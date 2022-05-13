import { Account } from "../entities/Account";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateAccountFields } from "../utils/InputFields";
import bcyrpt from "bcryptjs";
import { AccountErrorMap, AdminErrorMap } from "../utils/errorMap";
import { ValidateRegister } from "../utils/validateRegister";
import { AppDataSource } from "..";
import { Secret } from "../entities/Secret";
import { MyContext } from "../types";
import { Admin } from "../entities/Admin";

@Resolver(Account)
export class AccountResolver {
  @Query(() => [Account])
  accounts(): Promise<Account[]> {
    return Account.find();
  }

  @Mutation(() => AccountErrorMap)
  async createAccount(
    @Arg("fields") fields: CreateAccountFields
  ): Promise<AccountErrorMap> {
    const errors = ValidateRegister(fields);
    if (errors) {
      return { errors };
    }

    let secret = parseInt(fields.secret);
    const findSecretKey = AppDataSource.getRepository(Secret);
    const mySecretKey = await findSecretKey.findOneBy({ secret });

    const hashedPassword = await bcyrpt.hash(fields.password, 12);
    let accounts;
    try {
      if (mySecretKey?.set === true) {
        return {
          errors: [
            {
              field: "secret",
              message: "Account with this secret key already exists",
            },
          ],
        };
      }
      if (mySecretKey?.permission !== "user") {
        return {
          errors: [
            {
              field: "Permission",
              message: "Account permission restricted",
            },
          ],
        };
      }
      if (mySecretKey) {
        await AppDataSource.manager.transaction(async (tm) => {
          const result = await tm
            .createQueryBuilder()
            .insert()
            .into(Account)
            .values({
              email: fields.email,
              username: fields.username,
              password: hashedPassword,
            })
            .returning("*")
            .execute();

          await tm
            .createQueryBuilder()
            .update(Secret)
            .set({
              set: true,
            })
            .where("secret= :secret", { secret })
            .execute();
          accounts = result.raw[0];
        });
      } else {
        return {
          errors: [
            {
              field: "secret",
              message: "Incorrect Secret Key",
            },
          ],
        };
      }
    } catch (error) {
      if ((error.code = "23505")) {
        return {
          errors: [
            {
              field: "email",
              message: "Email already exists",
            },
          ],
        };
      }
    }
    return { accounts };
  }

  @Mutation(() => AccountErrorMap)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<AccountErrorMap> {
    const findAccounts = AppDataSource.getRepository(Account);
    const accounts = await findAccounts.findOneBy({ email });
    if (!accounts) {
      return {
        errors: [
          {
            field: "email",
            message: "Email doesn't exist",
          },
        ],
      };
    }
    const validatePassword = await bcyrpt.compare(password, accounts.password);
    if (!validatePassword) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect Password",
          },
        ],
      };
    }
    req.session.accountId = accounts.id;
    return { accounts };
  }

  @Mutation(() => AdminErrorMap)
  async adminLogin(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<AdminErrorMap> {
    const findAccounts = AppDataSource.getRepository(Admin);
    const accounts = await findAccounts.findOneBy({ email });
    if (!accounts) {
      return {
        errors: [
          {
            field: "email",
            message: "Email doesn't exist",
          },
        ],
      };
    }
    const validatePassword = await bcyrpt.compare(password, accounts.password);
    if (!validatePassword) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect Password",
          },
        ],
      };
    }
    req.session.adminId = accounts.id;
    return { accounts };
  }

  @Mutation(() => AdminErrorMap)
  async adminRegister(
    @Arg("fields") fields: CreateAccountFields
  ): Promise<AdminErrorMap> {
    const errors = ValidateRegister(fields);
    if (errors) {
      return { errors };
    }

    let secret = parseInt(fields.secret);
    const findSecretKey = AppDataSource.getRepository(Secret);
    const mySecretKey = await findSecretKey.findOneBy({ secret });

    const hashedPassword = await bcyrpt.hash(fields.password, 12);
    let accounts;
    try {
      if (mySecretKey?.set === true) {
        return {
          errors: [
            {
              field: "secret",
              message: "Account with this secret key already exists",
            },
          ],
        };
      }
      if (mySecretKey?.permission !== "admin") {
        return {
          errors: [
            {
              field: "Permission",
              message: "Account permission restricted",
            },
          ],
        };
      }
      if (mySecretKey) {
        await AppDataSource.manager.transaction(async (tm) => {
          const result = await tm
            .createQueryBuilder()
            .insert()
            .into(Admin)
            .values({
              email: fields.email,
              username: fields.username,
              password: hashedPassword,
            })
            .returning("*")
            .execute();

          await tm
            .createQueryBuilder()
            .update(Secret)
            .set({
              set: true,
            })
            .where("secret= :secret", { secret })
            .execute();
          accounts = result.raw[0];
        });
      } else {
        return {
          errors: [
            {
              field: "secret",
              message: "Incorrect Secret Key",
            },
          ],
        };
      }
    } catch (error) {
      if ((error.code = "23505")) {
        return {
          errors: [
            {
              field: "email",
              message: "Email already exists",
            },
          ],
        };
      }
    }
    return { accounts };
  }

  @Query(() => Admin, { nullable: true })
  admin(@Ctx() { req }: MyContext) {
    const currentAdminId = req.session.adminId;
    if (!currentAdminId) {
      return null;
    }
    const findAdmin = AppDataSource.getRepository(Admin);
    return findAdmin.findOneBy({ id: currentAdminId });
  }

  @Query(() => Account, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    const currentAccountId = req.session.accountId;

    if (!currentAccountId) {
      return null;
    }
    const findAccounts = AppDataSource.getRepository(Account);

    return findAccounts.findOneBy({ id: currentAccountId });
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie("vid");
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
