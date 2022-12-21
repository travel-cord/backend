import { BaseEntity } from '@user/infrastructure/entities/base.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user', { database: 'MEMBER' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  seq: string

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
