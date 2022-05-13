import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class Secret extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  secret: number;

  @Field()
  @Column({ default: false })
  set: boolean;

  @Field()
  @Column({ default: "user" })
  permission: string;
}
