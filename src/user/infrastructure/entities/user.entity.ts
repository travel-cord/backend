import { BaseEntity } from '@user/infrastructure/entities/base.entity'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryColumn({ type: 'binary', length: 16 })
  seq: Buffer

  @Column({ type: 'varchar' })
  id: string | number

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar', nullable: true })
  email?: string

  @Column({ type: 'varchar', nullable: true })
  birthday?: string

  @Column({ type: 'varchar', nullable: true })
  gender?: string

  @Column({ type: 'varchar', nullable: true })
  age?: string

  @Column({ type: 'varchar', nullable: true })
  profileImg?: string
}
