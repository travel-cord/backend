import { BaseEntity } from '@user/infrastructure/entities/base.entity'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryColumn({ type: 'binary', length: 16 })
  seq: Buffer

  @Column()
  id: string | number

  @Column()
  name: string

  @Column({ nullable: true })
  email?: string

  @Column({ nullable: true })
  birthday?: string

  @Column({ nullable: true })
  gender?: string

  @Column({ nullable: true })
  age?: string

  @Column({ nullable: true })
  profileImg?: string
}
