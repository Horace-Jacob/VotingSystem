import { RegionErrorMap } from "../utils/errorMap";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Region } from "../entities/Region";
import { AppDataSource } from "..";
import { Vote } from "../entities/Vote";
import { MyContext } from "../types";
import { VoteStatus } from "../entities/VoteStatus";
import { isAdmin } from "../middleware/isAdmin";
import { isAuth } from "../middleware/isAuth";

@Resolver(Region)
export class RegionResolver {
  @Mutation(() => RegionErrorMap)
  async createRegion(@Arg("region") region: string): Promise<RegionErrorMap> {
    let regions;
    try {
      const result = await AppDataSource.createQueryBuilder()
        .insert()
        .into(Region)
        .values({
          region,
        })
        .returning("*")
        .execute();
      regions = result.raw[0];
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "region",
              message: "Region already exists",
            },
          ],
        };
      }
    }
    return { regions };
  }

  @Query(() => Boolean)
  @UseMiddleware(isAdmin)
  async resetVote() {
    const findVoteStatus = AppDataSource.getRepository(VoteStatus);
    const deleteVoteStatus = await findVoteStatus.delete({});

    const resetVote = await AppDataSource.createQueryBuilder()
      .update(Vote)
      .set({
        vote: 0,
      })
      .execute();
    if (deleteVoteStatus && resetVote) {
      return true;
    }
    return false;
  }

  @Mutation(() => Vote)
  async createTeam(
    @Arg("regionId", () => Int) regionId: number,
    @Arg("team") team: string
  ): Promise<Vote> {
    let teams;
    try {
      const result = await AppDataSource.createQueryBuilder()
        .insert()
        .into(Vote)
        .values({
          regionId,
          team,
        })
        .returning("*")
        .execute();
      teams = result.raw[0];
    } catch (error) {
      console.log(error);
    }
    return teams;
  }

  @Query(() => [Region])
  async getRegions(): Promise<Region[]> {
    const regions = await AppDataSource.getRepository(Region)
      .createQueryBuilder("region")
      .getMany();
    return regions;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(@Arg("team") team: string, @Ctx() { req }: MyContext) {
    const value = 1;
    const { accountId } = req.session;
    const findVote = AppDataSource.getRepository(Vote);
    const getVote = await findVote.findOneBy({ team });
    const findVoteStatus = AppDataSource.getRepository(VoteStatus);
    const getVoteStatus = await findVoteStatus.findOneBy({
      votedRegionId: getVote?.regionId,
      votedAccountId: accountId,
    });
    if (getVote) {
      if (!getVoteStatus) {
        await AppDataSource.manager.transaction(async (tm) => {
          await tm.query(
            `
          update vote set vote = vote + $1 where team = $2
        `,
            [value, team]
          );
          await tm.query(
            `
        insert into vote_status ("votedRegionId", "votedAccountId") values($1, $2)
        `,
            [getVote.regionId, accountId]
          );
        });
      } else {
        return false;
      }
    } else {
      return false;
    }
    return true;
  }

  @Query(() => [Vote])
  @UseMiddleware(isAdmin)
  async getVote(): Promise<Vote[] | null> {
    const findVote = AppDataSource.getRepository(Vote);

    const votes = await findVote.query(`
      select v.*, json_build_object(
        'id', r.id,
        'region', r.region
      )regions
      from vote v inner join region r on r.id = v."regionId"
      order by v.vote DESC
    `);
    if (!votes) {
      return null;
    }
    return votes;
  }

  @Query(() => [Vote], { nullable: true })
  async getTeam(@Arg("id", () => Int) id: number): Promise<Vote[] | null> {
    const findTeam = AppDataSource.getRepository(Vote);
    const getTeam = await findTeam.findBy({ regionId: id });
    if (!getTeam) {
      return null;
    }
    return getTeam;
  }
}
