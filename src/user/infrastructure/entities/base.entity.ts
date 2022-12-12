import { CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn, VersionColumn } from 'typeorm'

@Entity()
export class BaseEntity {
  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date

  @DeleteDateColumn()
  deleteAt: Date | null

  @VersionColumn()
  version: number
}
