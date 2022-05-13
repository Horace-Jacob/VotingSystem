import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vote } from "./Vote";

@ObjectType()
@Entity()
export class Region {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  region: string;

  @OneToMany(() => Vote, (vote) => vote.regions)
  vote: Vote;
}
