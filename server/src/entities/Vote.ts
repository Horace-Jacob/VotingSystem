import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Region } from "./Region";

@ObjectType()
@Entity()
export class Vote {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  regionId: number;

  @Field(() => Region)
  @ManyToOne(() => Region, (region) => region.vote)
  regions: Region;

  @Field()
  @Column({ unique: true })
  team: string;

  @Field()
  @Column({ default: 0 })
  vote: number;
}
